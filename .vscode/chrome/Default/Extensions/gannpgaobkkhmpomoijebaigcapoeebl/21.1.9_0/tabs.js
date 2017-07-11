var tabsInfo = (function () {
	var pendingLogins = {};
	var documentInfos = [];
	var delayedLogins
	
	return {
		pendingLogins : pendingLogins,
		documentInfos : documentInfos
	};
})();

chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
	delete tabsInfo.pendingLogins[tabId];
	var length = tabsInfo.documentInfos.length;
	for (var i = tabsInfo.documentInfos.length - 1; i >= 0; i--) {
		if (tabsInfo.documentInfos[i].tabId == tabId) {
			tabsInfo.documentInfos.splice(i,1);
		}
	}
});