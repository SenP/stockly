chrome.webNavigation['onBeforeNavigate'].addListener( function (e) {
	//console.log("onBeforeNavigate, tabID " + e.tabId + ", frameID " + e.frameId);
    if (e.frameId == 0) {
        if (walletStatus.subscriptionStatus != "invalid"
            && walletStatus.buttonEnabled
            && walletStatus.db_status == "open") {
            chrome.tabs.sendMessage(e.tabId, {
                "verb": "before-navigate-event"
            });
        }
    }
	if (e.frameId == 0 && tabsInfo.pendingLogins[e.tabId] && tabsInfo.pendingLogins[e.tabId].asked) {
		delete tabsInfo.pendingLogins[e.tabId];
	}
});

chrome.webNavigation['onDOMContentLoaded'].addListener( function (e) {
	//console.log("onDOMContentLoaded, tabID " + e.tabId + ", frameID " + e.frameId);
	var tabId = e.tabId;
	try {
		if (CanInjectScript() ) {
			chrome.tabs.executeScript(tabId, { file: "content.js", frameId: e.frameId});
		}
	} catch (e) { }//console.log(e); }
});

chrome.webNavigation['onTabReplaced'].addListener( function (e) {
	//console.log("onTabReplaced, tabID " + e.tabId);
	var tabId = e.tabId;
	try {
		if (CanInjectScript()) {
			chrome.tabs.executeScript(tabId, { file: "content.js", frameId: e.frameId});
		}
	} catch (e) { }//console.log(e); }
});

function passMessageToTab(msg, doc_context, forgetIds) {
    var tabs = tabsInfo.documentInfos;
    if (doc_context) {
        for (var i = 0, size = tabs.length; i < size; i++) {
            if (tabs[i].context == doc_context) {
                chrome.tabs.sendMessage(tabs[i].tabId, msg);

                break;
            }
        }
    }
    else {
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
            if (tabs && tabs[0]) {
                chrome.tabs.sendMessage(tabs[0].id, msg);
            }
        });
    }
	if (forgetIds) {
		delete tabsInfo.pendingLogins[tabs[i].tabId];
	}
}

NMH.addListener(function (msg) {
	try {
		if (typeof msg["wallet_html_doc_update"] !== "undefined") {
			//console.log("wallet_html_doc_update received");
			//console.log(msg);

			var msgDoc = msg["wallet_html_doc_update"];
			var verb = msgDoc["wtx-verb"];

			if (verb == "doc-complete") {
                //Update inputs with rule field
			    var context = msgDoc["wtx-context"];
			    passMessageToTab(msgDoc, context);
			}
			else if (verb == "doc-autofill") {
                //Autofill with values
			    var context = msgDoc["wtx-context"];
			    passMessageToTab(msgDoc, context, true);
			}
			else if (verb == "doc-password-generator-rsp") {
                //Fill with pwd values
			    var context = msgDoc["wtx-context"];
			    passMessageToTab(msgDoc, context);
			}
            
			else if (verb == "before-navigate") {
			    //Handle 2-phase login
			    var context = msgDoc["wtx-context"];
			    passMessageToTab(msgDoc, context);
			}
		    else if (verb == "handle-menu-rsp") {
		        //Autofill with form values
		        var context = msgDoc["wtx-context"];
		        passMessageToTab(msgDoc, context);
			}
			else if (verb == "open-page") {
                //Autofill with values
			    chrome.tabs.create({
			        "url": msgDoc["open-url"]
			    }, function (tab) {
			        //console.log("new tab callback for id " + tab.id);
			        tabsInfo.pendingLogins[tab.id] = { id: msgDoc["wtx-item-id"], asked: false };
			    });
			}
			else if (verb == "handle-menu-report") {
                //Autofill with values
			    chrome.tabs.create({
			        "url": msgDoc["open-url"]
			    });
			}
		}		
		if (typeof msg["ping"] !== "undefined") {
			var ping = msg["ping"];
			//console.log("ping received: " + ping);			
			NMH.postMessage({'ping_response': ping});
		}
	} catch (e) {
		//console.log(e);
	}
});

chrome.browserAction.onClicked.addListener(function () {
	//console.log("button clicked");
	var msg = {};
	if (walletStatus.buttonEnabled) {
		if (walletStatus.db_status === "not configured") {
			NMH.postMessage({
				method : "configure-wallet",
				data : null
			});
		} else if (walletStatus.db_status === "open") {	
		    NMH.postMessage({
		        method: "drop-down",
		        data: null
		    });
		} else if (walletStatus.db_status === "locked") {
			NMH.postMessage({
				method : "unlock-wallet",
				data : null
			});
		}
	}
	else if (!walletStatus.agent_running && (walletStatus.subscriptionStatus != "valid")) {
	    walletStatus.openWalletTimestamp = Date.now();
	    NMH.postMessage({
	        method: "start-agent",
	        data: null
	    });
	}
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	if (!walletStatus.buttonEnabled || walletStatus.db_status != "open") {
		return;
	}
	//console.log("received", message);
	try {
		if (message.verb == "request-generate-password") {
			NMH.postMessage({
				method : "request-generate-password",
				data : message.data
			});
		} else if (message.verb == "info-onclick") {
			NMH.postMessage({
				method : "on-msg-html-doc",
				data : message.data
			});
		} else if (message.verb == "info-onsubmit") {
			NMH.postMessage({
				method : "on-msg-html-doc",
				data : message.data
			});
		} else if (message.verb == "info-oncomplete") {
			var tabId = sender.tab.id;		
			var msg = message.data;
			//console.log("Interogating loginId of new tab " + tabId);
			if (tabsInfo.pendingLogins[tabId] && tabsInfo.pendingLogins[tabId].id) {
				msg["wtx-item-id"] = tabsInfo.pendingLogins[tabId].id;
				tabsInfo.pendingLogins[tabId].asked = true;
			}
			
			tabsInfo.documentInfos.push({
				tabId : sender.tab.id,
				context : msg["wtx-context"]
			});
			
			NMH.postMessage({
				method : "on-msg-html-doc",
				data : msg
			});
		} else if (message.verb == "update-buttons-status") {
			var tabId = sender.tab.id;
			var msg = (walletStatus.subscriptionStatus != "invalid"
				&& walletStatus.buttonEnabled
				&& walletStatus.db_status == "open") ? "show-wallet-controls" : "hide-wallet-controls";
			chrome.tabs.sendMessage(tabId, {
				"verb" : msg
			});
		}
	} catch (ex) { }//console.log(ex); }
});