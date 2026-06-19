"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorHandlerMiddleware_1 = require("./middlewares/errorHandlerMiddleware");
const notFoundMiddleware_1 = require("./middlewares/notFoundMiddleware");
const storage_1 = require("./storage");
const requireAuthMiddleware_1 = require("./middlewares/requireAuthMiddleware");
const app = (0, express_1.default)();
app.post("/upload", requireAuthMiddleware_1.requireAuthMiddleware, storage_1.upload.single("file"), (req, res) => {
    console.log("Received upload request", req.file?.filename);
    (0, storage_1.enforceMaxFiles)();
    res.json({ filename: req.file?.filename });
});
app.use("/", storage_1.resolveFileHandler);
app.use(notFoundMiddleware_1.notFoundMiddleware);
app.use(errorHandlerMiddleware_1.errorHandlerMiddleware);
app.listen(3000, () => {
    console.log("Listening on post 3000");
});
