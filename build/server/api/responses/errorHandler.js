"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function onError(res, status, message, err) {
    console.log("Error: " + err);
    res.status(status).send(message);
}
exports.onError = onError;
