import fs from "fs/promises";
import { storageConstant } from "./constants";
import { storage } from "./storage";

export async function enforceMaxFiles(maxFiles = 15): Promise<void> {
  const entries = await fs.readdir(storageConstant.uploadFolder, {
    withFileTypes: true,
  });
  const files = entries.filter((e) => e.isFile()).map((e) => e.name);

  if (files.length <= maxFiles) return;

  const filesWithStats = await Promise.all(
    files.map(async (name) => {
      const filePath = storageConstant.uploadFile(name);
      const stat = await fs.stat(filePath);
      return { path: filePath, mtimeMs: stat.mtimeMs, slug: name };
    }),
  );

  filesWithStats.sort((a, b) => a.mtimeMs - b.mtimeMs); // oldest first

  const excess = filesWithStats.length - maxFiles;
  const toDelete = filesWithStats.slice(0, excess);

  await Promise.all(toDelete.map((f) => storage.deleteFile(f.slug)));
  console.log(
    `Enforced max files. Deleted ${toDelete.length} file(s): ${toDelete.map((f) => f.slug).join(" ")}`,
  );
}
