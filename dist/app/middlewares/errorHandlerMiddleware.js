"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = errorHandlerMiddleware;
function errorHandlerMiddleware(err, _req, res, _next) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
}
