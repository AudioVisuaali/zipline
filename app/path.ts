const maxFileSize = Number.parseInt(process.env.MAX_FILE_SIZE ?? "", 10);
if (Number.isNaN(maxFileSize) || maxFileSize <= 100) {
  throw new Error("MAX_FILE_SIZE is missing or invalid");
}

const envValue = process.env.API_BASE_URL;

if (!envValue) {
  throw new Error("API_BASE_URL is missing");
}

if (!/^https?:\/\/.+/.test(envValue)) {
  throw new Error(
    "API_BASE_URL must be a valid URL starting with http:// or https://",
  );
}

export const apiBaseUrl = envValue;

export function createUrl(path: string) {
  return new URL(path, apiBaseUrl).href;
}
