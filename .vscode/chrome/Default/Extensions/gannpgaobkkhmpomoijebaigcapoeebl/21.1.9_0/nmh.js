var NMH = NMH || function (undefined) {
	var port = undefined;

	function getPort() {
		return port;
	}

	var subscribers = [];
	var fragments = {};

	function addListener(callback) {
		subscribers.push(callback);
	}

	function removeListener(callback) {
		var index = subscribers.indexOf(callback);
		if (index >= 0) {
			subscribers.splice(index, 1);
		}
	}
	
	var pingInterval = null;
	
	function stopPing() {
		if (pingInterval) {
			clearInterval(pingInterval);
			pingInterval = null;
		}
	}

	function onMessage(msg) {
		try {
			stopPing();
			if (msg.reply === "success") {
				//console.log("nmh message fragment id:" + msg.id + " fragment-no:" + msg.fragment);
				fragments[msg.id] = fragments[msg.id] || "";
				if (msg.fragment === "final") {
					var assembledMessage = fragments[msg.id] + msg.data;
					delete fragments[msg.id];

					var utf8Arr = base64DecToArr(assembledMessage);
					var stringMessage = UTF8ArrToStr(utf8Arr);
					var finalMessage = JSON.parse(stringMessage);

					var i = 0;
					for (var i = 0, size = subscribers.length; i < size; i++) {
						subscribers[i](finalMessage);
					}
				} else {
					//TODO: Check id order. Shouldn't be an issue, though;
					var currMessage = fragments[msg.id];
					fragments[msg.id] = currMessage + msg.data;
				}
			}
		} catch (e) {
			//console.log(e);
		}
		return true;
	}
	
	function postMessage(msg) {
		function splitSubstr(str, len) {
			var ret = [];
			for (var offset = 0, strLen = str.length; offset < strLen; offset += len) {
				ret.push(str.substr(offset, len));
			}
			return ret;
		}

		function genid() {
			var id = [];
			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

			for (var i = 0; i < 10; i++)
				id.push(possible.charAt(Math.floor(Math.random() * possible.length)));

			return id.join();
		}
		try {
			var manifest = chrome.runtime.getManifest();
			if (typeof manifest == "undefined") {
				manifest = {
					'version' : "unknown"
				};
			}
			msg['__version__'] = manifest.version;
			var str_msg = JSON.stringify(msg);
		
			var utf8array = strToUTF8Arr(str_msg);
			var base64enc = base64EncArr(utf8array);

			var encLenght = base64enc.length;

			var chunks = splitSubstr(base64enc, 512);

			var id = genid();

			var i = 0,
			size = 0;
			for (i = 0, size = chunks.length; i < size; i++) {
				port.postMessage({
					'id' : id,
					'fragment' : ((i == size - 1) ? 'final' : i),
					'msg' : chunks[i]
				});
			}
		} catch (e) {
			//console.log(e);
		}
	}

	var autoConnect = true;
	var retryCount = 64;

	function autoConnectOn() {
		retryCount = 64;
		autoConnect = true;
	}
	function autoConnectOff() {
		autoConnect = false;
	}

	function initPort(nologging) {
	    stopPing();
	    if (!nologging) {
	        //console.log("nmh starting new port");
	    }
		if (port != undefined) {
			port.disconnect();
		}
		port = chrome.runtime.connectNative('com.bitdefender.wallet.v19');
		port.onDisconnect.addListener(function () {
		    if (!nologging) {
		        //console.log("Port disconnected");
		    }			
		    uninitPort(nologging);
			if (chrome.runtime.lastError.message == "Specified native messaging host not found.") {
			    if (!nologging) {
			        //console.log("Missing native messaging host");
			    }
				//bd_wallet_enabled = false;
			    retryCount = 64; //when we reconnect we can try reconnects again if we have another error with the nmh process
			    //chrome.management.setEnabled(chrome.i18n.getMessage("@@extension_id"), false);

				setTimeout(function () {
				    initPort(true);
				}, 5000);
			}
			else if (autoConnect && retryCount > 0) {
				--retryCount;
				//console.log("Autoconnecting...");
				initPort();
			}
		});
		port.onMessage.addListener(onMessage);
		postMessage({
			'method':'init-host',
			'data':null
		});
		pingInterval = setInterval(function () {
			postMessage({
				'method':'ping',
				'data':null
			});
		}, 1000);
	}

	function uninitPort(nologging) {
		stopPing();
		if (port != undefined) {
		    if (!nologging) {
		        //console.log("nmh destroying port");
		    }			
			port.disconnect();
			port = undefined;
		}
		//chrome.browserAction.disable();
		chrome.browserAction.setTitle({ title: TooltipStrings.off });
		chrome.browserAction.setIcon({ path : "images/ico_wallet_off.png" });
		walletStatus.buttonEnabled = false;
	}
	
	initPort();

	return {
		name : "NMH",
		initPort : initPort,
		uninitPort : uninitPort,
		getPort : getPort,
		autoConnectOn : autoConnectOn,
		autoConnectOff : autoConnectOff,
		postMessage : postMessage,
		addListener : addListener,
		removeListener : removeListener
	}
}
();

