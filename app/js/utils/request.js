/**
 * util-request.js - The utilities for requesting script and style files
 *
 */

var $ = require('../../../bower_components/jquery/dist/jquery')

function isType(type) {
    return function(obj) {
        return {}.toString.call(obj) == "[object " + type + "]"
    }
}

var isString = isType("String")
var isUndefined = isType("Undefined")

var doc = document
var head = doc.head || doc.getElementsByTagName("head")[0] || doc.documentElement
var baseElement = head.getElementsByTagName("base")[0]

var IS_CSS_RE = /\.css(?:\?|$)/i
var currentlyAddingScript
var interactiveScript

// `onload` event is not supported in WebKit < 535.23 and Firefox < 9.0
// ref:
//  - https://bugs.webkit.org/show_activity.cgi?id=38995
//  - https://bugzilla.mozilla.org/show_bug.cgi?id=185236
//  - https://developer.mozilla.org/en/HTML/Element/link#Stylesheet_load_events
var isOldWebKit = +navigator.userAgent
    .replace(/.*(?:AppleWebKit|AndroidWebKit)\/(\d+).*/, "$1") < 536


function request(url, callback, charset, crossorigin) {
    var isCSS = IS_CSS_RE.test(url)
    var node = doc.createElement(isCSS ? "link" : "script")

    if (charset) {
        node.charset = charset
    }

    // crossorigin default value is `false`.
    if (!isUndefined(crossorigin)) {
        node.setAttribute("crossorigin", crossorigin)
    }


    addOnload(node, callback, isCSS, url)

    if (isCSS) {
        node.rel = "stylesheet"
        node.href = url
    } else {
        node.async = true
        node.src = url
    }

    node.id = url;

    // For some cache cases in IE 6-8, the script executes IMMEDIATELY after
    // the end of the insert execution, so use `currentlyAddingScript` to
    // hold current node, for deriving url in `define` call
    currentlyAddingScript = node

    // ref: #185 & http://dev.jquery.com/ticket/2709
    baseElement ?
        head.insertBefore(node, baseElement) :
        head.appendChild(node)

    currentlyAddingScript = null
}

function addOnload(node, callback, isCSS, url) {
    var supportOnload = "onload" in node

    // for Old WebKit and Old Firefox
    if (isCSS && (isOldWebKit || !supportOnload)) {
        setTimeout(function() {
                pollCss(node, callback)
            }, 1) // Begin after node insertion
        return
    }

    if (supportOnload) {
        node.onload = function (event) {
            onload('resolve')
        }
        node.onerror = function() {
            onload('reject')
        }
    } else {
        node.onreadystatechange = function() {
            if (/loaded|complete/.test(node.readyState)) {
                onload('resolve')
            }
        }
    }

    function onload(state) {
        // Ensure only run once and handle memory leak in IE
        node.onload = node.onerror = node.onreadystatechange = null

        // Remove the script to reduce memory leak
        // if (!isCSS) {
        //     head.removeChild(node)
        // }

        // Dereference the node
        node = null

        callback(state)
    }
}

function pollCss(node, callback) {
    var sheet = node.sheet
    var isLoaded

    // for WebKit < 536
    if (isOldWebKit) {
        if (sheet) {
            isLoaded = true
        }
    }
    // for Firefox < 9.0
    else if (sheet) {
        try {
            if (sheet.cssRules) {
                isLoaded = true
            }
        } catch (ex) {
            // The value of `ex.name` is changed from "NS_ERROR_DOM_SECURITY_ERR"
            // to "SecurityError" since Firefox 13.0. But Firefox is less than 9.0
            // in here, So it is ok to just rely on "NS_ERROR_DOM_SECURITY_ERR"
            if (ex.name === "NS_ERROR_DOM_SECURITY_ERR") {
                isLoaded = true
            }
        }
    }

    setTimeout(function() {
        if (isLoaded) {
            // Place callback here to give time for style rendering
            callback('resolve')
        } else {
            pollCss(node, callback)
        }
    }, 20)
}

function requestDfd(url, charset, crossorigin){

    var dfd = $.Deferred();

    request(url, function (state) {

        if(state === 'resolve'){

            dfd.resolve();

        }else if(state === 'reject'){

            dfd.reject();

        }

    }, charset, crossorigin);

    return dfd;

}

function requests(requesArr, doneCallback, failCallback, alwaysCallback) {

    if($.isArray(requesArr)){

        var len = requesArr.length, i = 0, dfdArr = [], requesParam;

        for (; i < len; i++) {

            requesParam = requesArr[i];

            if($.isFunction(requesParam.promise)){

                dfdArr.push(requesParam);

                continue;

            }

            if(typeof requesParam === 'string'){

                requesParam = {url: requesParam, charset: undefined, crossorigin: undefined};

            }

            if(requesParam.url){

                (function(dfd){

                    request(requesParam.url, function (state) {

                        if(state === 'resolve'){

                            dfd.resolve();

                        }else if(state === 'reject'){

                            dfd.reject();

                        }

                    }, requesParam.charset, requesParam.crossorigin);

                    dfdArr.push(dfd);

                })($.Deferred());

            }

        }

        return $.when.apply(null, dfdArr).done(doneCallback).fail(failCallback).always(alwaysCallback);

    }

}

module.exports = {request: request, requests: requests, requestDfd: requestDfd};
