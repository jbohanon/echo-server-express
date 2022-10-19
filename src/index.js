"use strict";
exports.__esModule = true;
var express = require("express");
var timeout = require("connect-timeout");
var server = express();
server.use(timeout('5s'));
server.use(function (req, res, next) {
    if (!req.timedout)
        next();
});
server.get('/', function (request, response) {
    var m = new Object();
    for (var hkey in request.headers) {
        var s_1 = void 0;
        if (typeof request.headers[hkey] === "string") {
            s_1 = request.headers[hkey];
        }
        else {
            s_1 = request.headers[hkey].join(",");
        }
        m[hkey] = s_1;
        console.log("[".concat(hkey, "]: ").concat(s_1));
        response.setHeader(hkey, s_1);
    }
    m["body"] = request.body;
    var s = JSON.stringify(m);
    response.setHeader("Content-Length", s.length);
    console.log(s);
    response.send(s);
});
server.listen(3000, function () {
    console.log("Server listening on localhost:3000!");
});
