import express from "express";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware";
import { notFoundMiddleware } from "./middlewares/notFoundMiddleware";
import { requireAuthMiddleware } from "./middlewares/requireAuthMiddleware";
import { renderUploadSuccessPage } from "./templates/uploadSuccessPage";
import { renderUploadPage } from "./templates/uploadPage";
import { createUrl, returnResponse, wantsJson } from "./utils";
import { renderGenericFailurePage } from "./templates/genericErrorPage";
import multer from "multer";
import { storage } from "./storage/storage";
import { enforceMaxFiles } from "./storage/maxFileCheck";
import { config } from "./config";

const app = express();
app.use(express.urlencoded({ extended: true }));
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: config.maxFileSize },
});

app.get("/", (_req, res) => res.send(renderUploadPage()));

app.post(
  "/upload",
  upload.single("file"),
  requireAuthMiddleware,
  async (req, res) => {
    if (!req.file) {
      return returnResponse(
        req,
        res,
        200,
        () => ({ error: "No file uploaded" }),
        () => renderGenericFailurePage("400", "No file uploaded"),
      );
    }

    const { slug } = await storage.createFile({
      originalFilename: req.file.originalname,
      mimetype: req.file.mimetype,
      name: req.file.originalname,
      buffer: req.file.buffer,
    });
    console.log(`File uploaded (slug: ${slug})`);

    enforceMaxFiles();

    if (wantsJson(req)) {
      return res.status(200).json({ slug, url: createUrl(slug) });
    }

    res.redirect(`/upload/${slug}`);
  },
);

app.get("/upload/:slug", async (req, res) => {
  return res.send(renderUploadSuccessPage(req.params.slug));
});

app.get("/:slug", (req, res) => {
  const fileData = storage.getFile(req.params.slug);
  if (!fileData) {
    return returnResponse(
      req,
      res,
      400,
      () => ({ error: "Not Found" }),
      () => renderGenericFailurePage("400", "Not found"),
    );
  }

  res.set({
    "Content-Type": fileData.mimetype,
    "Content-Disposition": `inline; filename*=UTF-8''${encodeURIComponent(fileData.originalFilename)}`,
  });
  return res.sendFile(storage.getFileBlobPath(req.params.slug));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.listen(config.port, () => {
  console.log(`Listening on post ${config.port}`);
});
