import fs from "fs";
import path from "path";
import crypto from "crypto";
import express, { Request, Response, NextFunction } from "express";
import multer from "multer";

const maxFileSize = Number.parseInt(process.env.MAX_FILE_SIZE ?? "", 10);
if (Number.isNaN(maxFileSize) || maxFileSize <= 100) {
  throw new Error("MAX_FILE_SIZE is missing or invalid");
}
const apiKey = process.env.API_KEY;
if (!apiKey) {
  throw new Error("API_KEY is missing");
}

async function enforceMaxFiles(maxFiles = 10): Promise<void> {
  const entries = await fs.promises.readdir(uploadDir, { withFileTypes: true });
  const files = entries.filter((e) => e.isFile()).map((e) => e.name);

  if (files.length <= maxFiles) return;

  const filesWithStats = await Promise.all(
    files.map(async (name) => {
      const filePath = path.join(uploadDir, name);
      const stat = await fs.promises.stat(filePath);
      return { path: filePath, mtimeMs: stat.mtimeMs };
    }),
  );

  filesWithStats.sort((a, b) => a.mtimeMs - b.mtimeMs); // oldest first

  const excess = filesWithStats.length - maxFiles;
  const toDelete = filesWithStats.slice(0, excess);

  console.log(`Enforcing max files: deleting ${toDelete.length} old files`);
  await Promise.all(toDelete.map((f) => fs.promises.unlink(f.path)));
}

const uploadDir = "uploads/";
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "uploads/");
  },
  filename: (_req, file, cb) => {
    const slug = generateSlug();
    const ext = path.extname(file.originalname);
    cb(null, `${slug}${ext}`);
  },
});

const upload = multer({ storage, limits: { fileSize: maxFileSize } });

const app = express();

app.post("/upload", upload.single("file"), (req, res) => {
  console.log("Received upload request", req.file?.filename);
  enforceMaxFiles();
  res.json({ filename: req.file?.filename });
});

app.use("/files", express.static(path.resolve(uploadDir)));

function generateSlug() {
  return crypto.randomBytes(6).toString("base64url").slice(0, 8);
}

app.use((_req, res) => res.status(404).json({ error: "Not found" }));

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(3000, () => {
  console.log("Listening on post 3000");
});
