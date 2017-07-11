function ajax(method, url, params, headers) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.timeout = 5000;
    if (headers && Array.isArray(headers)){
        for (var i = 0; i < headers.length ; i+=2){
            xhr.setRequestHeader(headers[i],headers[i+1]);
        }
    }
    xhr.send(params);

    return new Promise(function (resolve, reject) {
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
                resolve(xhr);
            } else if (xhr.readyState == 4) {
                reject(xhr.status);
            }
        };
    });
}

function doPost(url, data, response_type, success, err, config, headers) {
    var promise = ajax_post(url, JSON.stringify(data), response_type, headers);

    promise = success ? promise.then(success) : promise;
    promise = err ? promise.catch(err) : promise;

    return promise;
}

function ajax_post(url, params, type, headers) {
    return ajax('POST', url, params, headers).then(function (xhr) {
        if (type == 'xml') {
            return xhr.responseXML;
        } else if (type == 'text') {
            return xhr.responseText;
        } else if (type === 'json') {
            return JSON.parse(xhr.responseText);
        } else {
            return xhr;
        }
    }).catch(function (reason) {
            return 'error';
        }

    );
}

function getBrowserFlavor(type) {
    var chrome_str = (type == 'beacon') ? 'chrome' : localStorage['client'];
    var chmm_str = (type == 'beacon') ? 'chmm' : 'chromium';

    var i, p = window.navigator.plugins, b = chrome_str;
    for (i = 0; i < p.length; i++) {
        if (p[i].name.indexOf('PDF') > -1 && p[i].name.indexOf('Chromium') > -1) {
            b = chmm_str;
        }
    }

    return b;
}

function trackStatusEvent(evtType, extra1, extra2, callback) {
    var protocol = localStorage['sec_http'] == '1' ? 'https://' : 'http://';
    var url = localStorage['track'];
    return doPost(protocol + url,
        trackStatusEventGetDataObject(evtType, extra1, extra2), '', callback);
};

function trackStatusEventGetDataObject(evtType, extra1, extra2) {
    var properties = JSON.parse(localStorage['tracking']);
    return {
        'table': properties.trackTable,
        'data': trackStatusEventGetData(evtType, extra1, extra2)
    }
}

function trackStatusEventGetData(evtType, extra1, extra2) {
    var properties = JSON.parse(localStorage['tracking']);
    var details = chrome.app.getDetails();
    var version = details.version;
    var id = details.id;
    var id4 = id ? id.substring(0, 4) : undefined;
    var allKeys = Object.keys(localStorage);

    // TODO: use a format for the tracking url from the config and try to replace all the placeholders from the
    var assets = '', click_location = '';
    var popupDelay = localStorage['popup_delay'];

    if (typeof extra1 == 'object' && extra1 != null) {
        click_location = extra1['click_location'] || '';
        assets = extra1['assets'] || '';
        extra1 = extra1['extra1'] || popupDelay || '';
    } else if (popupDelay && !extra1) {
        extra1 = popupDelay;
    }


    var data = properties.trackingUrlFormat;

    try {

        var placeholders = {
            'click_location': click_location,
            assets: assets,
            evtType: evtType,
            client: getBrowserFlavor,
            ver: version,
            id4: id4,
            extra1: (extra1 || ''),
            extra2: (extra2 || ''),
            z: (1000000000 + Math.floor(Math.random() * (2147483647 - 1000000000)))
        };

        for (var key in placeholders) {
            var str = new RegExp('{{' + key + '}}', 'g');
            data = data.replace(str, placeholders[key]);
        }

        var storageKeys = allKeys;

        for (var i = 0; i < storageKeys.length; i++) {
            var key = storageKeys[i];
            var str = new RegExp('{{' + key + '}}', 'g');
            data = data.replace(str, localStorage[key]);
        }
        // replace "un-replaced" placeholder with ''
        var str = new RegExp('\{\{(.*?)\}\}', 'g');
        data = data.replace(str, '');

        if (evtType.indexOf('search-set') == -1 && evtType.indexOf('search-') == 0) {
            data = data + '&scategory=' + localStorage['selected_cat'].toLowerCase();
        }

        return btoa(data);
    } catch (e) {
    }
}

function getSearchEngines() {
    var engines = JSON.parse(localStorage['engines']);
    var enginesNames = [];

    for (var i = 0; i < Object.keys(engines).length; i++) {
        enginesNames.push(engines[i].shortName);
    }
    return enginesNames;

}

function capitalizeFirstLetter(string) {
    return string.substring(0,1).toUpperCase() + string.slice(1);
}

function executeScript() {
    if (localStorage['sengine'] != this.value.toLowerCase()){
        localStorage['sengine'] = this.value.toLowerCase();
        trackStatusEvent('search-set');
    }

    document.getElementById("button" + this.value).setAttribute("class", "selected");

    engines = getSearchEngines();

    for (var i = 0; i < Object.keys(engines).length; i++) {
        if (!(engines[i] == this.value)){
            document.getElementById("button" + engines[i]).removeAttribute('class');
        }
    }

    setTimeout(function () {
        window.close();
    }, 100);

}

function closePopup(timeout) {
    setTimeout(function () {
        window.close();
    }, timeout);
}

function fillDropDown(parId, options) {
    for (var i=0 ; i < options.length ; i++){
        var tempElement = document.createElement('option');
        tempElement.setAttribute('id', options[i]);
        tempElement.setAttribute('class', 'dropdownOptions');
        document.getElementById(parId).appendChild(tempElement);
        var tempContent = document.createTextNode(options[i]);
        document.getElementById(options[i]).appendChild(tempContent);
        document.getElementById(options[i]).setAttribute('value', options[i].toLowerCase())
    }
}

var settings = {};
// settings['sengine'] = localStorage['sengine'];
document.addEventListener('DOMContentLoaded', function () {
    trackStatusEvent('tb_icon_click');
    var engines = getSearchEngines();
    var currentSengine = capitalizeFirstLetter(localStorage['sengine']);
    for(var i = engines.length - 1; i >= 0; i--) {
        if(engines[i] === currentSengine) {
            engines.splice(i, 1);
        }
    }

    engines.unshift(currentSengine);
    fillDropDown('searchEnginesDropDown', engines);

    trackStatusEvent('tb_icon_popup');

    document.getElementById('uninstall').addEventListener('click', function (e) {
        trackStatusEvent('tb_icon_uninstall');
        chrome.management.uninstallSelf({showConfirmDialog: true});
        closePopup(100);
    });

    document.getElementById('searchEnginesDropDown').addEventListener('change', function (e) {
        settings['sengine'] = this.value;
        if (this.value == currentSengine.toLowerCase()){
            delete settings['sengine'];
        }
    });

    document.getElementById('submit').addEventListener('click', function (e) {
        for (key in settings){
            localStorage.setItem(key, settings[key]);
            if (key == 'sengine'){
                trackStatusEvent('search-set');
            }
        }
        closePopup(100);
    })
});


