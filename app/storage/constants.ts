import path from "path";

const basePath = path.join(process.cwd(), "files/");

export const storageConstant = {
  uploadFolder: path.join(basePath, "uploads"),
  uploadFile: (slug: string) => path.join(basePath, "uploads", slug),
  dataFile: path.join(basePath, "data.json"),
};
