/*
* This file is part of Wakanda software, licensed by 4D under
*  (i) the GNU General Public License version 3 (GNU GPL v3), or
*  (ii) the Affero General Public License version 3 (AGPL v3) or
*  (iii) a commercial license.
* This file remains the exclusive property of 4D and/or its licensors
* and is protected by national and international legislations.
* In any event, Licensee's compliance with the terms and conditions
* of the applicable license constitutes a prerequisite to any use of this file.
* Except as otherwise expressly stated in the applicable license,
* such license does not include any other license or rights on this file,
* 4D's and/or its licensors' trademarks and/or other proprietary rights.
* Consequently, no title, copyright or other proprietary rights
* other than those specified in the applicable license is granted.
*/
/**

* @author ouissam.gouni@4d.com

*/

directory.setLoginListener("myLogin");

addHttpRequestHandler("/getSessionCookie/", "bootStrap.js", "getSessionCookie");

addHttpRequestHandler("/getCookies/", "bootStrap.js", "getCookies");

addHttpRequestHandler("/invalidateSessionCookie/", "bootStrap.js", "invalidateSessionCookie");

function getSessionCookie(request, response) {
    var cookies = request.headers["Cookie"];
    console.log(cookies);
    if (cookies != null) {
        var key = "WASID";
        var i, x, y, ARRcookies = cookies.split(";");
        for (i = 0; i < ARRcookies.length; i++) {
            x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
            y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
            x = x.replace(/^\s+|\s+$/g, "");
            if (x == key) {
                return unescape(y);
            }
        }
    }
    return "undefined";

}

function getCookies(request, response) {
    var cookies = request.headers["Cookie"];
    if (cookies != null) {
        return cookies;
    }
    else {
        return "undefined";
    }
}

function invalidateSessionCookie(request, response) {
    var key = "WASID"
    var date = new Date();
    date.setDate(date.getDate() - 1);
    var setCookie = escape(key) + '=; Path=/;expires=' + date.toUTCString();
    response.headers["Set-Cookie"] = setCookie;
    return setCookie;
}