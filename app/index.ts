import path from "node:path";
import express from "express";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware";
import { notFoundMiddleware } from "./middlewares/notFoundMiddleware";
import {
  enforceMaxFiles,
  resolveFileHandler,
  saveFile,
  upload,
} from "./storage";
import { requireAuthMiddleware } from "./middlewares/requireAuthMiddleware";
import { renderUploadSuccessPage } from "./templates/uploadSuccessPage";
import { renderUploadPage } from "./templates/uploadPage";
import { createUrl, generateSlug, returnResponse } from "./utils";
import { renderGenericFailurePage } from "./templates/genericErrorPage";

const port = Number.parseInt(process.env.PORT ?? "", 10);
if (Number.isNaN(port) || port <= 0 || port > 65535) {
  throw new Error("PORT is missing or invalid");
}

const app = express();
app.use(express.urlencoded({ extended: true }));

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

    const slug = generateSlug();
    const ext = path.extname(req.file.originalname);

    const filename = `${slug}${ext}`;
    await saveFile(filename, req.file.buffer);
    enforceMaxFiles();
    return returnResponse(
      req,
      res,
      200,
      () => ({ filename, url: createUrl(filename) }),
      () => renderUploadSuccessPage(filename),
    );
  },
);

app.get("/upload/:slug", async (req, res) => {
  return res.send(renderUploadSuccessPage(req.params.slug));
});

app.use("/", resolveFileHandler);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log(`Listening on post ${port}`);
});
