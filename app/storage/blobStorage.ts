import fs from "node:fs/promises";
import { storageConstant } from "./constants";

fs.mkdir(storageConstant.uploadFolder, { recursive: true });

export const blobStorage = {
  getFilePath: (slug: string) => storageConstant.uploadFile(slug),
  create: (slug: string, buffer: Buffer) =>
    fs.writeFile(storageConstant.uploadFile(slug), buffer),
  delete: (slug: string) => fs.unlink(storageConstant.uploadFile(slug)),
};
