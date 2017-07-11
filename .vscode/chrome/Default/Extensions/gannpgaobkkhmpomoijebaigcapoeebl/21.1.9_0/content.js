

function SendMessageToBackground(message) {
    //console.log("sending", message);
    chrome.runtime.sendMessage(null, message);

}

function ListenForMessageFromBackground(callback) {
    chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
        //console.log("received", request);
    	callback(request, sendResponse);
    });
}



    var FormAttrs = [
        "action"
        , "class"
        , "data-bind"
        , "data-reactid"
        , "id"
        , "name"
        , "wtx-context"
        , "wtx-form-context"

    ];

    var InputAttrs = [
        "class"
        , "data-bind"
        , "data-bind-class-invalid"
        , "data-bind-hide"
        , "data-bind-value"
        , "data-ng-model"
        , "data-reactid"
        , "id"
        , "multiple" //:bool
        , "name"
        , "ng-model"
        , "ng-model-options"
        , "value"
        , "wtx-context"
        , "wtx-form-context"
        , "placeholder"
    ];


    var SelectAttrs = [
        "data-bind"
        , "id"
        , "multiple" //:bool
        , "name"
        , "ng-model"
        , "wtx-context"
        , "wtx-form-context"
    ];

    var RuleAttrs = [
        "wtx-rule-v3"
        , "wtx-rule-checked-v3"
        , "wtx-rule-text-v3"
        , "wtx-has-pwdgenerator"
    ];

var hidden = "hidden";
var visibilityChange = "visibilitychange";


//
//  Uuid
//
function UuidCreate() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("").toUpperCase();
    return uuid;
}


function getElementProp(element, propertyName, defaultOnNull) {
    var v = "";

    try {
        v = element.getAttribute(propertyName);
        if (!v) {
            v = defaultOnNull;
        }
    } catch (ex) {
        v = "";
    }
    return v;
}



function getElementRect(elem) {
    var pa = { left: 0, top: 0, right: 0, bottom: 0 },
        doc = elem && elem.ownerDocument;

    if (!doc) return pa;

    var docElem = doc.documentElement || document.body.parentNode || doc.body;
    var win = doc.defaultView || doc.parentWindow;

    var bbox = { top: 0, left: 0 };

    if (typeof elem.getBoundingClientRect !== "undefined") {
        bbox = elem.getBoundingClientRect();
    }

    var xscroll = null;
    var yscroll = null;
    if (!win) {
        try {
            var style = window.getComputedStyle(elem);
            if (docElem.scrollLeft == 0) {
                xscroll = parseInt(style.getPropertyValue("width"));
            }
            if (docElem.scrollTop == 0) {
                yscroll = parseInt(style.getPropertyValue("height"));
            }
        }
        catch (ex) {
            xscroll = docElem.scrollLeft;
            yscroll = docElem.scrollTop;
        }
    }
    else {
        xscroll = win.pageXOffset || docElem.scrollLeft;
        yscroll = win.pageYOffset || docElem.scrollTop;
    }

    pa.top = bbox.top + yscroll - docElem.clientTop;
    pa.bottom = pa.top + bbox.height;
    pa.left = bbox.left + xscroll - docElem.clientLeft;
    pa.right = pa.left + bbox.width;

    return pa;
}

function getElementMaxZIndex(elem) {
    var maxZIndex = 0;
    if (elem.children) {
        for (var i = 0; i < elem.children.length; i++) {
            var child = elem.children[i];
            var zIndex = 0;
            try {
                var style = window.getComputedStyle(child);
                zIndex = parseInt(style.getPropertyValue("z-index"));
            }
            catch (ex) {
                zIndex = parseInt(child.style.zIndex);
            }
            if (zIndex && (maxZIndex < zIndex)) {
                maxZIndex = zIndex;
            }
        }
    }
    return maxZIndex;
}

/*
<a style="background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAWCAMAAAD3n0w0AAAAn1BMVEUAAAD///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABh2uUCAAAANHRSTlMAAAcJDBETFBUYIyUnKCswODs8QExTX2NmbHJ3e3+Aka22uLrAw8fK2+Tq7/Hy8/X5+vv+UKDaTwAAAKRJREFUeAGNy9dOhFAUheFfHYsDimIv4rGgSBHLev9ncx+zQ3K4IPNd/lmLWqkaI+n3/W6NkzxGbzcHKPLomnTp0qXbaPl6VsX49XiyWk1xGyrxUeAUHcKOKMhC34fM4zmsBXkn0+U0Ms9wKwj6F9i/fvmR7i/GFnqpLKVPzN7V07faYxgsnno0u5fWHuR3JlPrjuZtHEI+bxWw3JABluJWBMn1D/pjLTzg1rbeAAAAAElFTkSuQmCC);
        height:22px;
        width:20px;   
        display:block;
        padding:0px;
        margin:0px;
        border:0px;
        " href="javascript:void(0)">  
</a>

http://www.freeformatter.com/javascript-escape.html
*/


var walletButtonsInPage = [];


function repositionWalletButtons() {
    var i = 0;
    var length = walletButtonsInPage.length;
    for (var i = 0; i < length; i++) {
        try {
            var buttonInfo = walletButtonsInPage[i];
            var iel = buttonInfo.iel;
            var button = buttonInfo.button;
            var container = buttonInfo.container;
            var containerPosition = getElementRect(container);
            var inputPosition = getElementRect(iel);

            if ((inputPosition.bottom <= inputPosition.top) || (inputPosition.right <= inputPosition.left)) {
                button.style.display = "none";
                return;
            }


            var finalTop = (inputPosition.top - containerPosition.top);
            var finalLeft = (inputPosition.right - containerPosition.left);

            button.style.top = "" + finalTop + "px";
            button.style.left = "" + finalLeft + "px";

            var buttonPosition = getElementRect(button);
            var buttonHeight = buttonPosition.bottom - buttonPosition.top;
            var buttonWidth = buttonPosition.right - buttonPosition.left;
            var inputHeight = inputPosition.bottom - inputPosition.top;
            finalTop = finalTop + 2 + (inputHeight - buttonHeight) / 2;
            finalLeft = finalLeft - buttonWidth - 3;
            button.style.top = "" + finalTop + "px";
            button.style.left = "" + finalLeft + "px";
            button.style.display = "block";
        } catch (ex) {
            //console.log("Button can't we worked on, removing", ex);
            walletButtonsInPage.splice(i, 1);
            length = length - 1;
            i = i-1;
            continue;
        }
    }
}

function toggleWalletButtons(enable) {
    var i = 0;
    var length = walletButtonsInPage.length;
    for (var i = 0; i < length; i++) {
        try {
            var buttonInfo = walletButtonsInPage[i];
            var iel = buttonInfo.iel;
            var button = buttonInfo.button;
            var container = buttonInfo.container;
            container.style.display = enable ? "block" : "none";
        } catch (ex) {

            //console.log("Button can't we worked on, removing", ex);
            walletButtonsInPage.splice(i, 1);
            length = length - 1;
            i = i-1;
            continue;
        }
    }
    repositionWalletButtons();
}

function updateWalletButtons() {
    SendMessageToBackground({
        verb: "update-buttons-status",
        data: null
    });
}


var completedForms = {};

function onsubmitForm(e) {
    try {
        if (e.target.hasAttribute("wtx-context")) {
            var formContext = e.target.getAttribute("wtx-context");
            var reply = getDOMInfo2({ formCtx: formContext, addRules: true });
            reply["wtx-verb"] = "before-navigate";
            reply["wtx-form-context"] = formContext;
            SendMessageToBackground( {
                    verb: "info-onsubmit",
                    data: reply
                });
        }
    } catch (ex) {
        //console.log(ex);
    }
}
function onclickInput(e) {
    try {
        if (e.target.hasAttribute("wtx-context")) {
            if (e.target.form) {
                var formContext = e.target.form.getAttribute("wtx-context");
            }
            else {
                var formContext = e.target.ownerDocument.documentElement.getAttribute("wtx-context");
            }
            if (!completedForms[formContext]) {
                completedForms[formContext] = true;
                var reply = getDOMInfo2({ formCtx: formContext });
                reply["wtx-verb"] = "doc-complete";
                reply["wtx-form-context"] = formContext;
                reply["wtx-click-context"] = e.target.getAttribute("wtx-context");
                SendMessageToBackground( {
                        verb: "info-onclick",
                        data: reply
                    });
            }
        }
    } catch (ex) {
        //console.log(ex);
    }
}



var docList = [];

var defaultPageValues = {};
function saveDefaultValue(iel) {
    try {
        if (iel.value && iel.value != "" && iel.hasAttribute("wtx-context") && iel.ownerDocument.documentElement.hasAttribute("wtx-context")) {
            var docCtx = iel.ownerDocument.documentElement.getAttribute("wtx-context");
            var inputCtx = iel.getAttribute("wtx-context");
            if (!defaultPageValues[docCtx]) {
                defaultPageValues[docCtx] = {};
            }
            if (!defaultPageValues[docCtx][inputCtx]) {
                defaultPageValues[docCtx][inputCtx] = iel.value;
            }
        }
    } catch (ex) {
        console.log(ex);
    }
}
function getDefaultValue(iel) {
    try {
    if (iel.ownerDocument.documentElement.hasAttribute("wtx-context")) {
        if (iel.hasAttribute("wtx-context")) {
            var docCtx = iel.ownerDocument.documentElement.getAttribute("wtx-context");
            var inputCtx = iel.getAttribute("wtx-context");
            if (defaultPageValues[docCtx] && defaultPageValues[docCtx][inputCtx]) {
                return defaultPageValues[docCtx][inputCtx];
            }
        }
    }
    } catch (ex) {
        console.log(ex);
    }
    return "";
}

function clearDefaultValues(del) {
    try {
    if (del.hasAttribute("wtx-context")) {
        var docCtx = del.getAttribute("wtx-context");
        if (defaultPageValues[docCtx]) {
            delete defaultPageValues[docCtx];
        }
    }
    } catch (ex) {
        console.log(ex);
    }
}


function getDocumentsToScan() {
    var documentsToScan = [document];
    //var frames = document.defaultView.frames;
    //var length = frames.length;
    //for (var c = 0; c < length; c++) {
    //    var currentFrame = frames[c];
    //    try {
    //        documentsToScan.push(currentFrame.contentWindow.document);
    //    }
    //    catch (ex) {
    //        //console.log(ex);
    //    }
    //}
    return documentsToScan;
}

function walkAllElements(element, tagName) {
    if (element.getElementsByTagName) {
        var nodeList = element.getElementsByTagName(tagName);
        var length = nodeList.length;
        for (var i = 0; i < length; i++) {
            var el = nodeList[i];
            var arLength = arguments.length;
            for (var a = 2; a < arLength; a++) {
                var callback = arguments[a];
                try {
                    var ret = callback(el);
                    if (ret) {
                        break;
                    }
                } catch (ex) {
                    //console.log(ex);
                }
            }
        }
    }
}

function setupWtxContext(element) {
    if (element.hasAttribute("wtx-context")) {
        return false;
    } else {
        element.setAttribute("wtx-context", UuidCreate());
        return true;
    }
}


var SubmitCode = function (Uuid) {
    var form = document.querySelector('form[wtx-context="' + Uuid + '"]');
    if (form) {
        form.submit = (function (oldSubmit) {
            return function () {
                this.dispatchEvent(new CustomEvent('Bdwtsubmit'));
                return oldSubmit.apply(this, arguments);
            };
        })(form.submit);
    }
};

var currentItemId;

function getDOMInfo2(parameters) {
    var documents;
    var includeFrames;
    var formCtx;
    var addRules = false;

    if (parameters) {
        if (parameters.documents) {
            documents = parameters.documents;
        }
        if (parameters.includeFrames) {
            includeFrames = parameters.includeFrames;
        }
        if (parameters.formCtx) {
            formCtx = parameters.formCtx;
        }

        if (parameters.addRules) {
            addRules = parameters.addRules;
        }
    }


    if (!documents) {
        if (includeFrames) {
            documents = getDocumentsToScan();
        } else {
	            documents = [document];
        }
    }

    var reply = {};

    var mainDocument = documents[0];
    var existingContext = mainDocument.documentElement.getAttribute("wtx-context");
    if (!existingContext) {
        existingContext = "<none>";
    }
    //console.log("getDOMInfo2 called, existingContext:" + existingContext);
    if (setupWtxContext(mainDocument.documentElement)) {
        mainDocument.documentElement.addEventListener("submit", onsubmitForm, true);
        mainDocument.documentElement.addEventListener("Bdwtsubmit", onsubmitForm, true);
    }
    reply["wtx-context"] = mainDocument.documentElement.getAttribute("wtx-context");

    var topmostTitle = '';
    var topmostUrl = '';
    try {
        topmostTitle = mainDocument.title;
        topmostUrl = mainDocument.documentURI;
        var topmostWindow = mainDocument.defaultView;
        while (topmostWindow != topmostWindow.parent) {
            topmostWindow = topmostWindow.parent;
            try {
                topmostTitle = topmostWindow.document.title;
            }
            catch (ex) {
                //console.log(ex);
            }
            try {
                topmostUrl = topmostWindow.document.documentURI;
            }
            catch (ex) {
                //console.log(ex);
            }
        }
    }
    catch (ex) {
        //console.log(ex);
    }

    reply["wtx-source"] = "chrome";
    reply["wtx-title"] = topmostTitle;
    reply["wtx-before-url"] = mainDocument.documentURI;
    if (topmostUrl == '') {
        reply["wtx-parent-url"] = mainDocument.documentURI;
    } else {
        reply["wtx-parent-url"] = topmostUrl;
    }

    reply["elements"] = [];
    reply["forms"] = [];

    

    documents.reduce(function (acc, currentDocument) {
        var entry = {};
        var newForms = 0;
        walkAllElements(currentDocument, "form", function (fel) {
            if (formCtx) {
                if (fel.getAttribute("wtx-context") != formCtx) {
                    return true;
                }
            }
        }, function (fel) {
            if (setupWtxContext(fel)) { newForms++; }
            entry = FormAttrs.reduce(function (acc, attr) {
                var val = getElementProp(fel, attr, "");
                if (val != "") {
                    acc[attr] = val;
                }
                return acc;
            }, {});

            if (addRules) {
                entry = RuleAttrs.reduce(function (acc, attr) {
                    var val = getElementProp(fel, attr, "");
                    if (val != "") {
                        acc[attr] = val;
                    }
                    return acc;
                }, entry);
            }

            if (formCtx) {
                if (currentItemId) {
                    entry["wtx-item-id"] = currentItemId;
                }
            }
            reply["forms"].push(entry);
        });
        var newElements = 0;
        walkAllElements(currentDocument, "input", function (iel) {
            if (formCtx) {
                var ctx = null;
                if (iel.form) {
                    ctx = iel.form.getAttribute("wtx-context")
                } else {
                    ctx = iel.ownerDocument.documentElement.getAttribute("wtx-context");
                }
                if (formCtx != ctx) {
                    return true;
                }
            }
        }, function (iel) {
            if (setupWtxContext(iel)) {
                newElements++;
                saveDefaultValue(iel);
            }
            entry = InputAttrs.reduce(function (acc, attr) {
                var val = getElementProp(iel, attr, "");
                if (val != "") {
                    acc[attr] = val;
                }
                return acc;
            }, {});
            if (iel.type) {
                entry["type"] = iel.type;
            }

            if (addRules) {
                entry = RuleAttrs.reduce(function (acc, attr) {
                    var val = getElementProp(iel, attr, "");
                    if (val != "") {
                        acc[attr] = val;
                    }
                    return acc;
                }, entry);
            }

            entry["wtx-type"] = "wtx-input";

            entry["wtx-form-context"] = reply["wtx-context"];
            if (iel.form) {
                entry["wtx-form-context"] = iel.form.getAttribute("wtx-context");
            }

            entry["value"] = iel.value;
            var defValue = getDefaultValue(iel);
            if (defValue && defValue != "") {
                entry["wtx-defvalue"] = defValue;
            }

            reply["elements"].push(entry);
        });
        walkAllElements(currentDocument, "select", function (iel) {
            if (formCtx) {
                var ctx = null;
                if (iel.form) {
                    ctx = iel.form.getAttribute("wtx-context")
                } else {
                    ctx = iel.ownerDocument.documentElement.getAttribute("wtx-context");
                }
                if (formCtx != ctx) {
                    return true;
                }
            }
        }, function (sel) {
            if (setupWtxContext(sel)) { newElements++; }
            entry = SelectAttrs.reduce(function (acc, attr) {
                var val = getElementProp(sel, attr, "");
                if (val != "") {
                    acc[attr] = val;
                }
                return acc;
            }, {});
	    
			if (sel.type) {
                entry["type"] = sel.type;
            }

            if (addRules) {
                entry = RuleAttrs.reduce(function (acc, attr) {
                    var val = getElementProp(sel, attr, "");
                    if (val != "") {
                        acc[attr] = val;
                    }
                    return acc;
                }, entry);
            }


            entry["wtx-form-context"] = reply["wtx-context"];
            if (sel.form) {
                entry["wtx-form-context"] = sel.form.getAttribute("wtx-context");
            }

            entry["wtx-type"] = "wtx-select";
            reply["elements"].push(entry);
        });
	if (newForms > 0) {
        	reply["wtx-new-elements"] = "true";
	}
	if (newElements > 0) {
        	reply["wtx-new-forms"] = "true";
	}

    }, null);
    return reply;
}


ListenForMessageFromBackground(function (request, sendResponse) {
    //console.log(request);

    var verb = request["wtx-verb"];
    if (verb) {
        var elementsMap = {};
        var maxI = request.elements.length;
        for (var i = 0; i < maxI; i++) {
            var el = request.elements[i];
            elementsMap[el["wtx-context"]] = el;
        }

        var maxI = request.forms.length;
        for (var i = 0; i < maxI; i++) {
            var el = request.forms[i];
            elementsMap[el["wtx-context"]] = el;
        }

        var documentsToScan = getDocumentsToScan();

        function runIfMatch(callback) {
            return function (el) {
                var context = getElementProp(el, "wtx-context", null);
                if (context) {
                    var info = elementsMap[context];
                    if (info) {
                        return callback(el, info);
                    }
                }
                return true;
            }
        }

        if (verb == "doc-complete") {
            documentsToScan.reduce(function (acc, currentDocument) {


                var walletButtonTemplate = currentDocument.createElement("div");
                walletButtonTemplate.innerHTML = "<a style=\"background-image: url(data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAWCAMAAAD3n0w0AAAAn1BMVEUAAAD\/\/\/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABh2uUCAAAANHRSTlMAAAcJDBETFBUYIyUnKCswODs8QExTX2NmbHJ3e3+Aka22uLrAw8fK2+Tq7\/Hy8\/X5+vv+UKDaTwAAAKRJREFUeAGNy9dOhFAUheFfHYsDimIv4rGgSBHLev9ncx+zQ3K4IPNd\/lmLWqkaI+n3\/W6NkzxGbzcHKPLomnTp0qXbaPl6VsX49XiyWk1xGyrxUeAUHcKOKMhC34fM4zmsBXkn0+U0Ms9wKwj6F9i\/fvmR7i\/GFnqpLKVPzN7V07faYxgsnno0u5fWHuR3JlPrjuZtHEI+bxWw3JABluJWBMn1D\/pjLTzg1rbeAAAAAElFTkSuQmCC);\r\n            height:22px;\r\n            width:20px;   \r\n          \tdisplay:block;\r\n\t\t\tpadding:0px;\r\n\t\t\tmargin:0px;\r\n\t\t\tborder:0px;\r\n            \" href=\"javascript:void(0)\">  \r\n\t<\/a>";
                walletButtonTemplate = walletButtonTemplate.firstChild;

                var completeWithAttributes = runIfMatch(function (el, info) {
                    if (info["wtx-rule-v3"]) {
                        var oldProp = getElementProp(el, "wtx-rule-v3", "");
                        if (oldProp != info["wtx-rule-v3"]) {
                            el.setAttribute("wtx-rule-v3", info["wtx-rule-v3"]);
                            return false;
                        }
                    }
                    return true;
                });


                var buttonCheck = {};

                var newForms = {};

                var setElementFormOfInterest = function (el) {
                    if (el.form) {
                        newForms[el.form.getAttribute("wtx-context")] = true;
                    }
                };

                walkAllElements(currentDocument, "input",
                    runIfMatch(function (iel, info) {
                        if (iel.type != "submit") {
                            if (info["wtx-has-pwdgenerator"] == "true") {
                                var fcontext = iel.form ? iel.form.getAttribute("wtx-context") : doc.documentElement.getAttribute("wtx-context");
                                if (buttonCheck[fcontext]) {
                                    return;
                                }
                                buttonCheck[fcontext] = true;

                                var prevAttr = getElementProp(iel, "wtx-has-pwdgenerator", "");
                                if (prevAttr != "true") {
                                    iel.setAttribute("wtx-has-pwdgenerator", "true");
                                    //console.log("Installing wtx buttons");

                                    var container = currentDocument.createElement("div");
                                    container.style.position = "relative";
                                    container.style.width = 0;
                                    container.style.width = 0;
                                    container.style.margin = 0;
                                    container.style.padding = 0;
                                    container.style.display = "none";

                                    var button = walletButtonTemplate.cloneNode(true);
                                    container.appendChild(button);
                                    button.style.position = "absolute";
                                    button.style.zIndex = "" + (getElementMaxZIndex(iel.parentNode) + 999);

                                    (function (iel, container, button) {
                                        button.addEventListener("mousedown", function () {
                                            //console.log("iel.focus()");
                                            setTimeout(function () { iel.focus(); }, 0);
                                            var doc = iel.ownerDocument;
                                            var fcontext = iel.form ? iel.form.getAttribute("wtx-context") : doc.documentElement.getAttribute("wtx-context");
                                            var reply = getDOMInfo2({ documents: [doc], formCtx: fcontext });
                                            reply["wtx-verb"] = "doc-password-generator";
                                            reply["wtx-form-context"] = fcontext;
                                            SendMessageToBackground({
                                                verb: "request-generate-password",
                                                data: reply
                                            });
                                        });

                                        iel.parentNode.insertBefore(container, iel.nextSibling);
                                        walletButtonsInPage.push({ iel: iel, container: container, button: button });

                                    })(iel, container, button);

                                }
                            }
                        }
                    }),
                    completeWithAttributes,
                    runIfMatch(function (iel, info) {
                        var ruleType = info["wtx-rule-v3"];
                        if ((ruleType.lastIndexOf("{{login.", 0) != 0) && (iel.type != "submit")) {
                            iel.addEventListener("click", onclickInput, false);
                            //(function () {
                            //    var timedEvent = null;
                            //    var dContext = iel.ownerDocument.documentElement.getAttribute("wtx-context");
                            //    var fContext = dContext;
                            //    if (iel.form) {
                            //        fContext = iel.form.getAttribute("wtx-context");
                            //    }
                            //    var iContext = iel.getAttribute("wtx-context");
                            //    iel.addEventListener("input", function (e) {
                            //        if (timedEvent != null) {
                            //            clearTimeout(timedEvent);
                            //            timedEvent = null;
                            //        }
                            //        CredStore.SetCredentials(dContext, iContext, e.target.value);
                            //    });
                            //}());
                        }
                        else if (ruleType.lastIndexOf("{{login.", 0) == 0) {

                        }
                    }),
                    setElementFormOfInterest);
                walkAllElements(currentDocument, "select", completeWithAttributes, setElementFormOfInterest);


                for (var newFormCtx in newForms) {
                    if (newForms.hasOwnProperty(newFormCtx)) {
                        var actualCode = '(' + SubmitCode + ')("' + newFormCtx + '")';
                        var script = currentDocument.createElement('script');
                        script.textContent = actualCode;
                        (currentDocument.head || currentDocument.documentElement).appendChild(script);
                        script.parentNode.removeChild(script);
                    }
                }

            }, null);

            var params = { addRules : true };
            if (request["wtx-form-context"]) {
                params.formCtx = request["wtx-form-context"];
            }

            var reply = getDOMInfo2(params);
            reply["wtx-verb"] = "doc-autofill";
            if (request["doc-autofill-more-data"]) {
                //console.log('Requesting more data instead of autofill');
                reply["wtx-verb"] = "doc-autofill-more-data";
                reply["doc-autofill-more-data"] = request["doc-autofill-more-data"];
                currentItemId = null;
            }
            if (request["wtx-click-context"]) {
                reply["wtx-click-context"] = request["wtx-click-context"];
            }
            reply["wtx-form-context"] = request["wtx-form-context"];
            SendMessageToBackground({
                    verb: "info-oncomplete",
                    data: reply
                });

            repositionWalletButtons();
            updateWalletButtons();
        }

        else if (verb == "doc-autofill") {
            currentItemId = false;
            documentsToScan.reduce(function (acc, currentDocument) {
                walkAllElements(currentDocument, "form", runIfMatch(function (iel, info) {
                    if (info["wtx-item-id"] && !request["doc-autofill-more-data"]) {
                        //console.log("wtx-item-id found");
                        currentItemId = info["wtx-item-id"];
                        return true;
                    }
                }));
                    var firstInput = null;
                    walkAllElements(currentDocument, "input", runIfMatch(function (iel, info) {
                        if (info["wtx-value"]) {
                            if (iel.type == "radio") {
                                if (info["wtx-value"] == "false") {
                                    iel.checked = false;
                                }
                                iel.checked = true;
                            }
                            else {
                                if (!firstInput) {
                                    firstInput = iel;
                                }
                                iel.focus();

                                iel.value = info["wtx-value"];

                                // generate input event
                                try {
                                    var inputEvent = currentDocument.createEvent("HTMLEvents");
                                    inputEvent.initEvent("input", true, true);
                                    iel.dispatchEvent(inputEvent);
                                }
                                catch (err) {
                                    //console.log(err);
                                }

                                iel.blur();

                            }
                        }
                    }));

                    if (firstInput) {
                        firstInput.focus();
                        // generate input event
                        try {
                            var inputEvent = currentDocument.createEvent("HTMLEvents");
                            inputEvent.initEvent("input", true, true);
                            firstInput.dispatchEvent(inputEvent);
                        }
                        catch (err) {
                            //console.log(err);
                        }
                    firstInput.blur();
                }

                walkAllElements(currentDocument, "select", runIfMatch(function (el, info) {
                    if (info["wtx-value"]) {
                        walkAllElements(el, "option", function (opt) {
                            var value = opt.value;
                            var text = opt.textContent;
                            var lvalue = value.toLowerCase();
                            var ltext = text.toLowerCase();
                            var linfo = info["wtx-value"].toLowerCase();

                            if (linfo == "iasi") {
                                return;
                            }

                            if (ltext == linfo || lvalue == linfo) {
                                el.value = value;
                            }
                        });
                        //el.setAttribute("value", info["wtx-value"]);
                    }
                }));
            }, null);
        }
        else if (verb == "doc-password-generator-rsp") {
            documentsToScan.reduce(function (acc, currentDocument) {

                walkAllElements(currentDocument, "form", function (fel) {
                    var fcontext = getElementProp(fel, "wtx-context", "");
                    if (fcontext == request["wtx-form-context"]) {
                        walkAllElements(fel, "input", function (iel) {
                            if (iel.type == "password") {
                                iel.focus();

                                iel.value = request["wnd::password"];

                                // generate input event
                                try {
                                    var inputEvent = currentDocument.createEvent("HTMLEvents");
                                    inputEvent.initEvent("input", true, true);
                                    iel.dispatchEvent(inputEvent);
                                }
                                catch (err) {
                                    //console.log(err);
                                }

                                iel.blur();
                            }
                        });
                    }
                });
            }, null);
        }
        else if (verb == "before-navigate") {
            if (request["wtx-form-context"]) {
                var moreDataNeeded = false;
                documentsToScan.reduce(function (acc, currentDocument) {
                    walkAllElements(currentDocument, "form", function (fel) {
                        var fcontext = getElementProp(fel, "wtx-context", "");
                        if (fcontext == request["wtx-form-context"]) {
                            moreDataNeeded = true;
                            return true;
                        }
                    });
                }, null);
                if (moreDataNeeded) {
                    var params = {};
                    params.formCtx = request["wtx-form-context"];
                    var reply = getDOMInfo2(params);
                    reply["wtx-verb"] = "doc-complete";
                    reply["wtx-form-context"] = request["wtx-form-context"];
                    reply["doc-autofill-more-data"] = request["wtx-form-context"];
                    SendMessageToBackground({
                        verb: "info-oncomplete",
                        data: reply
                    });
                }
            }
        }
        else if (verb == "handle-menu-rsp") {
            var params = {addRules : true};
            currentItemId = request["wtx-item-id"];
            var reply = getDOMInfo2(params);
            reply["wtx-item-id"] = request["wtx-item-id"];
            reply["wtx-verb"] = "doc-autofill";
            SendMessageToBackground({
                verb: "info-oncomplete",
                data: reply
            });
        }
        else {
            var reply = {
                "type": "verb-unknown",
                "data": request
            };
            sendResponse(reply);
        }
    }
    else if (request.verb) {
        var verb = request.verb;
        if (verb == "hide-wallet-controls") {
            //console.log("hide-wallet-controls caled");
            toggleWalletButtons(false);
        } 
        else if (verb == "show-wallet-controls") {
            //console.log("show-wallet-controls caled");
            toggleWalletButtons(true);
        }
        else if (verb == "before-navigate-event") {
            var reply = getDOMInfo2({ addRules: true });
            reply["wtx-verb"] = "before-navigate";
            SendMessageToBackground({
                verb: "info-onsubmit",
                data: reply
            });
        }
    }
});


function onVisible(e) {
    try {
        if (!document[hidden]) {
            var reply = getDOMInfo2({ documents: [document] });
            reply["wtx-verb"] = "doc-complete";
            SendMessageToBackground({
                    verb: "info-oncomplete",
                    data: reply
                });
            document.removeEventListener(visibilityChange, onVisible);
        }
    } catch (ex) {
        //console.log(ex);
    }
}

function processDocument(document) {
    try {
        if (!document[hidden]) {
            var reply = getDOMInfo2({ documents: [document] });
            reply["wtx-verb"] = "doc-complete";
            SendMessageToBackground({
                verb: "info-oncomplete",
                data: reply
            });
        } else {
            document.addEventListener(visibilityChange, onVisible, false);
        }

    } catch (ex) {
        //console.log(ex);
    }
}

function onComplete(e) {

    processDocument(document);

    document.addEventListener(visibilityChange, function () {
        if (!document[hidden]) {
            updateWalletButtons();
        }
    }, false);
    
    // select the target node
    var target = document.documentElement;

    // create an observer instance
    var observer = new document.defaultView.MutationObserver(function (mutations) {
        var somethingNew = false;
        function test(node) {
            if (node.tagName == "FORM" || node.tagName == "INPUT" || node.tagName == "SELECT") {
                somethingNew = true;
                if (node.hasAttribute("wtx-context")) {
                    node.removeAttribute("wtx-context");
                }
                //console.log("somethingNew set to true");
                return true;
            }
        }

        mutations.forEach(function (mutation) {
            //console.log("Mutation ", mutation.type, " : ", mutation);
            for (var i = 0; i < mutation.addedNodes.length; i++) {
                var node = mutation.addedNodes[i];
                test(node);
                walkAllElements(node, "form", test);
                walkAllElements(node, "input", test);
                walkAllElements(node, "select", test);
            }
        });
        if (somethingNew) {
            //console.log("Processing...");
            processDocument(document);
        }
    });

    // configuration of the observer:
    var config = { childList: true, subtree : true };

    // pass in the target node, as well as the observer options
    observer.observe(target, config);
}

function pageScript(event) {
    window.addEventListener("resize", repositionWalletButtons);
    window.addEventListener("unload", function (event) {
        var doc = event.target;
    });

    if (typeof document.webkitHidden !== "undefined") {
        hidden = "webkitHidden";
        visibilityChange = "webkitvisibilitychange";
    }


    var totalForms = 0;

    if (document.readyState == "complete" || document.readyState == "interactive") {
        onComplete(event);
    } else {
        //console.log("shouldn't arrive here");
        window.addEventListener("DOMContentLoaded", onComplete, false);
    }

    return true;
};
//console.log("content.js loaded", document);
pageScript();
