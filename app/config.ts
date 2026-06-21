const port = Number.parseInt(process.env.PORT ?? "", 10);
if (Number.isNaN(port) || port <= 0 || port > 65535) {
  throw new Error("PORT is missing or invalid");
}

const maxFileSize = Number.parseInt(process.env.MAX_FILE_SIZE ?? "", 10);
if (Number.isNaN(maxFileSize) || maxFileSize <= 100) {
  throw new Error("MAX_FILE_SIZE is missing or invalid");
}

const baseUrl = process.env.API_BASE_URL;
if (!baseUrl) {
  throw new Error("API_BASE_URL is missing");
}
if (!/^https?:\/\/.+/.test(baseUrl)) {
  throw new Error(
    "API_BASE_URL must be a valid URL starting with http:// or https://",
  );
}

export const config = {
  baseUrl,
  port,
  maxFileSize,
};
