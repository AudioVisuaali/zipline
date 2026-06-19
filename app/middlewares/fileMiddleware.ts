import fs from "fs";
import path from "path";
import multer from "multer";
import { generateSlug } from "../utils";

const maxFileSize = Number.parseInt(process.env.MAX_FILE_SIZE ?? "", 10);
if (Number.isNaN(maxFileSize) || maxFileSize <= 100) {
  throw new Error("MAX_FILE_SIZE is missing or invalid");
}

const uploadDir = "storage/uploads/";
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const slug = generateSlug();
    const ext = path.extname(file.originalname);
    cb(null, `${slug}${ext}`);
  },
});

export const upload = multer({ storage, limits: { fileSize: maxFileSize } });
