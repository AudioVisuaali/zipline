"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveFileHandler = exports.upload = void 0;
exports.enforceMaxFiles = enforceMaxFiles;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const express_1 = __importDefault(require("express"));
const utils_1 = require("./utils");
const uploadDir = "files/";
const maxFileSize = Number.parseInt(process.env.MAX_FILE_SIZE ?? "", 10);
if (Number.isNaN(maxFileSize) || maxFileSize <= 100) {
    throw new Error("MAX_FILE_SIZE is missing or invalid");
}
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
exports.resolveFileHandler = express_1.default.static(path_1.default.resolve(uploadDir));
async function enforceMaxFiles(maxFiles = 10) {
    const entries = await fs_1.default.promises.readdir(uploadDir, { withFileTypes: true });
    const files = entries.filter((e) => e.isFile()).map((e) => e.name);
    if (files.length <= maxFiles)
        return;
    const filesWithStats = await Promise.all(files.map(async (name) => {
        const filePath = path_1.default.join(uploadDir, name);
        const stat = await fs_1.default.promises.stat(filePath);
        return { path: filePath, mtimeMs: stat.mtimeMs };
    }));
    filesWithStats.sort((a, b) => a.mtimeMs - b.mtimeMs); // oldest first
    const excess = filesWithStats.length - maxFiles;
    const toDelete = filesWithStats.slice(0, excess);
    console.log(`Enforcing max files: deleting ${toDelete.length} old files`);
    await Promise.all(toDelete.map((f) => fs_1.default.promises.unlink(f.path)));
}
