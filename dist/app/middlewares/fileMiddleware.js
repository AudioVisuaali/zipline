"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const utils_1 = require("../utils");
const maxFileSize = Number.parseInt(process.env.MAX_FILE_SIZE ?? "", 10);
if (Number.isNaN(maxFileSize) || maxFileSize <= 100) {
    throw new Error("MAX_FILE_SIZE is missing or invalid");
}
const uploadDir = "storage/uploads/";
fs_1.default.mkdirSync(uploadDir, { recursive: true });
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDir),
    filename: (_req, file, cb) => {
        const slug = (0, utils_1.generateSlug)();
        const ext = path_1.default.extname(file.originalname);
        cb(null, `${slug}${ext}`);
    },
});
exports.upload = (0, multer_1.default)({ storage, limits: { fileSize: maxFileSize } });
