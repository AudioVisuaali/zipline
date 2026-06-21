import fs from "node:fs/promises";
import { generateSlug } from "../utils";
import { blobStorage } from "./blobStorage";

const dataFile = "files/data.json";

type File = {
  name: string;
  originalFilename: string;
  mimetype: string;
  slug: string;
};

let files: Record<string, File> = {};

async function writeFile() {
  await fs.writeFile(dataFile, JSON.stringify(files));
}

type CreateFileParams = {
  name: string;
  buffer: Buffer<ArrayBufferLike>;
  originalFilename: string;
  mimetype: string;
};

export const storage = {
  createFile: async ({
    name,
    buffer,
    originalFilename,
    mimetype,
  }: CreateFileParams): Promise<File> => {
    const slug = generateSlug();
    const file: File = {
      name,
      originalFilename,
      mimetype,
      slug,
    };
    files[slug] = file;
    await writeFile();
    await blobStorage.create(slug, buffer);
    return file;
  },

  getFile: (slug: string): File | undefined => {
    return files[slug];
  },
  getFileBlobPath: (slug: string): string => blobStorage.getFilePath(slug),
  deleteFile: async (slug: string): Promise<void> => {
    delete files[slug];
    await writeFile();
    await blobStorage.delete(slug);
  },
};

async function loadInitialState() {
  try {
    const data = await fs.readFile(dataFile, "utf-8");
    const parsed = JSON.parse(data) as Record<string, File>;
    files = parsed;
    const slugs = Object.keys(files);
    console.log(
      `Loaded files data (count: ${slugs.length}): ${slugs.join(" ")}`,
    );
  } catch (err) {
    const error = err as NodeJS.ErrnoException;
    if (error.code === "ENOENT") {
      console.warn("Data file not found, starting with empty files data.");
      return;
    }
    console.error("Error reading files data:", error);
    return;
  }
}
loadInitialState();
