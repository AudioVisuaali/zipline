import express from "express";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware";
import { notFoundMiddleware } from "./middlewares/notFoundMiddleware";
import { enforceMaxFiles, resolveFileHandler, upload } from "./storage";
import { requireAuthMiddleware } from "./middlewares/requireAuthMiddleware";

const app = express();

app.post(
  "/upload",
  requireAuthMiddleware,
  upload.single("file"),
  (req, res) => {
    console.log("Received upload request", req.file?.filename);
    enforceMaxFiles();
    res.json({ filename: req.file?.filename });
  },
);

app.use("/", resolveFileHandler);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.listen(3000, () => {
  console.log("Listening on post 3000");
});
