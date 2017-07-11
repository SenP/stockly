var walletSettings;

function CanInjectScript() {
	return !!NMH.getPort();
}

chrome.browserAction.setTitle({ title: TooltipStrings.off });
chrome.browserAction.setIcon({ path : "images/ico_wallet_off.png" });
walletStatus.buttonEnabled = false;
//chrome.browserAction.disable();

function RecheckCurrentTabForLogin()
{
    chrome.tabs.query({ active: true, currentWindow: true, status: "complete" }, function (tabs) {
        var tab = tabs[0];
        var tabId = tab.id;
        if (!tabsInfo.pendingLogins[tabId] || tabsInfo.pendingLogins[tabId].asked) {
		return; 
	}
	chrome.tabs.sendMessage(tab.id, {
		"verb" : "get-dom-info"
	}, function ( response ) {
		NMH.postMessage({
			method : "get-info-for-page",
			data : response || null
		});
	});
	tabsInfo.pendingLogins[tabId] = tabsInfo.pendingLogins[tabId] || {};
	tabsInfo.pendingLogins[tabId].asked = true;		
    });
}

function UpdateWithSettings(settings) {
	var agentRunningBefore = walletStatus.agent_running;
	walletStatus.enabled = (settings.settings["enabled"] || settings.default_settings["enabled"] || "false") == "true";
	walletStatus.enabled_for_chrome = (settings.settings["Chrome_enabled"] || settings.default_settings["Chrome_enabled"] || "false") == "true";
	walletStatus.agent_running = settings.agStatus == 2;
	walletStatus.buttonEnabled = walletStatus.enabled && walletStatus.enabled_for_chrome && walletStatus.agent_running;
	
	if (settings.dbStatus == 1) {
		walletStatus.db_status = "not configured";
	} 
	else if (settings.dbStatus == 3) {
	    walletStatus.db_status = "open";
	    RecheckCurrentTabForLogin();
	}
	else if (settings.dbStatus == 4 || settings.dbStatus == 2) {
		walletStatus.db_status = "locked";
	} 
	else {
		walletStatus.db_status = "unknown";
	}

	if (settings.subscriptionStatus == 1) {
	    walletStatus.subscriptionStatus = "valid";
	}
	else if (settings.subscriptionStatus == 2) {
	    walletStatus.subscriptionStatus = "invalid";
	}
	else {
	    walletStatus.subscriptionStatus = "unknown";
	}
	
	if (walletStatus.db_status == "not configured" 
		&& walletStatus.subscriptionStatus != "valid") {
		walletStatus.buttonEnabled = false;
	}

	if (walletStatus.agent_running && !agentRunningBefore && (walletStatus.openWalletTimestamp != 0)) {

        //agent just started
	    if (((!walletStatus.enabled || !walletStatus.enabled_for_chrome) && (walletStatus.subscriptionStatus == "invalid")) &&
			(Date.now() < walletStatus.openWalletTimestamp + 3000)) {

	        NMH.postMessage({
	            method: "open-wallet",
	            data: null
	        });
	    }

	    walletStatus.openWalletTimestamp = 0;
	}
	
	//Update content buttons
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		var tabId = tabs[0].id;
		var msg = (walletStatus.subscriptionStatus == "valid" 
			&& walletStatus.buttonEnabled
			&& walletStatus.db_status == "open") ? "show-wallet-controls" : "hide-wallet-controls";
		chrome.tabs.sendMessage(tabId, {
			"verb" : msg
		});
	});

	//Update button
	if (!walletStatus.buttonEnabled) {
		//chrome.browserAction.disable();
		chrome.browserAction.setIcon({ path : "images/ico_wallet_off.png" });
		chrome.browserAction.setTitle({ title: TooltipStrings.off });
		return;
	}

	//chrome.browserAction.enable();
	chrome.browserAction.setIcon({ path : "images/ico_wallet.png" });
	walletStatus.buttonEnabled = true;
	if (walletStatus.db_status == "not configured") {
	    chrome.browserAction.setIcon({ path: "images/ico_wallet_off.png" });
	    chrome.browserAction.setTitle({ title: TooltipStrings.configure });
	}
	else if (walletStatus.db_status == "locked") {
	    chrome.browserAction.setIcon({ path: "images/ico_wallet_locked.png" });
	    chrome.browserAction.setTitle({ title: TooltipStrings.locked });
	}
	else if (walletStatus.db_status == "open") {
	    chrome.browserAction.setIcon({ path: "images/ico_wallet.png" });
	    chrome.browserAction.setTitle({ title: TooltipStrings.on });
	} 
	else {
		//chrome.browserAction.disable();
		walletStatus.buttonEnabled = false;
		chrome.browserAction.setIcon({ path: "images/ico_wallet_off.png" });
		chrome.browserAction.setTitle({ title: TooltipStrings.off });
		//console.log("Unknown dbState: " + settings.dbStatus);
	}
}

NMH.addListener(function (msg) {
	try {
		if (typeof msg["wallet-init-data"] !== "undefined") {
			var walletData = msg["wallet-init-data"];
			//console.log("wallet-init-data received");
			//console.log(msg);
			var flags = walletData.flags;
			if (flags == -1) { //All new data
				walletSettings = walletData;
			}
			if (flags & 8) { //dbStatus change
				walletSettings.dbStatus = walletData.dbStatus;
			}

			UpdateWithSettings(walletSettings);
		}
		if (typeof msg["wallet-set-settings"] !== "undefined") {
			var newSettings = msg["wallet-set-settings"];
			//console.log("wallet-set-settings received");
			//console.log(msg);
			walletSettings.settings = newSettings;
			
			UpdateWithSettings(walletSettings);
		}

	        if (typeof msg["wallet-tooltip-texts"] !== "undefined") {
	            var newTexts = msg["wallet-tooltip-texts"];
	            //console.log("wallet-tooltip-texts");
	            //console.log(msg);
	            var walletStatus = {
					enabled: false,
					agent_running: false,
					db_status: "off",
					enabled_for_chrome: false
				};

	            TooltipStrings.locked = newTexts.locked || TooltipStrings.locked;
				TooltipStrings.on = newTexts.on || TooltipStrings.on;
				TooltipStrings.off = newTexts.off || TooltipStrings.off;
				TooltipStrings.configure = newTexts.configure || TooltipStrings.configure;
	        }

	} catch (e) {
        //console.log(e);
	}
});