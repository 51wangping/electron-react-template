/*! For license information please see main.js.LICENSE.txt */
(()=>{var e={electron:e=>{"use strict";e.exports=require("electron")},"electron-is-dev":e=>{"use strict";e.exports=require("electron-is-dev")},path:e=>{"use strict";e.exports=require("path")}},t={};function r(o){var n=t[o];if(void 0!==n)return n.exports;var i=t[o]={exports:{}};return e[o](i,i.exports,r),i.exports}(()=>{var e=r("electron"),t=e.app,o=e.BrowserWindow,n=r("electron-is-dev"),i=r("path");function s(){var e=new o({width:800,height:600,webPreferences:{preload:i.join(__dirname,"preload.js")}});n?e.loadURL("http://localhost:9000"):e.loadURL("file://".concat(i.join(__dirname,"../build/index.html")))}t.whenReady().then((function(){s(),t.on("activate",(function(){0===o.getAllWindows().length&&s()}))})),t.on("window-all-closed",(function(){"darwin"!==process.platform&&t.quit()}))})()})();