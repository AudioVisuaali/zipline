import fs from "node:fs/promises";
import path from "path";
import multer from "multer";
import express from "express";

const uploadDir = "files/";

const maxFileSize = Number.parseInt(process.env.MAX_FILE_SIZE ?? "", 10);
if (Number.isNaN(maxFileSize) || maxFileSize <= 100) {
  throw new Error("MAX_FILE_SIZE is missing or invalid");
}

fs.mkdir(uploadDir, { recursive: true });

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: maxFileSize },
});

export async function saveFile(
  filename: string,
  buffer: Buffer,
): Promise<void> {
  await fs.writeFile(path.join(uploadDir, filename), buffer);
}

export const resolveFileHandler = express.static(path.resolve(uploadDir));

export async function enforceMaxFiles(maxFiles = 10): Promise<void> {
  const entries = await fs.readdir(uploadDir, { withFileTypes: true });
  const files = entries.filter((e) => e.isFile()).map((e) => e.name);

  if (files.length <= maxFiles) return;

  const filesWithStats = await Promise.all(
    files.map(async (name) => {
      const filePath = path.join(uploadDir, name);
      const stat = await fs.stat(filePath);
      return { path: filePath, mtimeMs: stat.mtimeMs };
    }),
  );

  filesWithStats.sort((a, b) => a.mtimeMs - b.mtimeMs); // oldest first

  const excess = filesWithStats.length - maxFiles;
  const toDelete = filesWithStats.slice(0, excess);

  console.log(`Enforcing max files: deleting ${toDelete.length} old files`);
  await Promise.all(toDelete.map((f) => fs.unlink(f.path)));
}
