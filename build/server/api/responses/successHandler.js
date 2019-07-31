"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function onSuccess(res, status, data) {
    res.status(status).json({ payload: data });
}
exports.onSuccess = onSuccess;
