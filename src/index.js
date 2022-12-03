"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var socket_io_1 = require("socket.io");
var io = new socket_io_1.Server({
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
var clamp = function (num, min, max) { return Math.min(Math.max(num, min), max); };
var totalDrags = 100;
var dragIds = __spreadArray([], Array(totalDrags).keys(), true).map(function (el) { return "drag".concat(el); });
io.on("connection", function (socket) {
    console.log("conectado", socket.id);
    setInterval(function () {
        var id = Math.floor(clamp(Math.random() * totalDrags, 0, totalDrags - 1));
        var x = clamp(Math.random() * 500, 50, 600);
        var y = clamp(Math.random() * 500, 50, 600);
        socket.emit("moveDrag", "".concat(dragIds[id], "|").concat(x, "|").concat(y));
    }, 10);
});
io.listen(4000);
