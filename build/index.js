"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const io = new socket_io_1.Server({
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
const totalDrags = 100;
const dragIds = [...Array(totalDrags).keys()].map(el => `drag${el}`);
io.on("connection", (socket) => {
    console.log("conectado", socket.id);
    setInterval(() => {
        socket.emit("moveDrag", [generateMove()]);
    }, 0);
});
io.listen(4000);
function generateMove() {
    const id = Math.floor(clamp(Math.random() * totalDrags, 0, totalDrags - 1));
    const x = clamp(Math.random() * 1900, 50, 1800);
    const y = clamp(Math.random() * 1000, 50, 900);
    return `${dragIds[id]}|${x}|${y}`;
}
function generateAllMovements() {
    const arrRes = [];
    for (let index = 0; index < 30; index++) {
        arrRes.push(generateMove());
    }
    return arrRes;
}
