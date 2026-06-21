import { config } from "../config";

export function renderUploadSuccessPage(filename: string) {
  const url = new URL(`/${filename}`, config.baseUrl).href;
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Upload complete</title>
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%230d0d0f'/%3E%3Cpath d='M16 22V10M10 16l6-6 6 6' stroke='%236e6ef6' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3C/svg%3E">
<style>
  :root {
    --bg: #0d0d0f;
    --surface: #16161a;
    --border: #2a2a2e;
    --text: #e8e8ea;
    --text-dim: #9a9aa2;
    --accent: #6e6ef6;
    --success: #4ade80;
  }

  * {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    min-height: 100%;
    background: var(--bg);
    color: var(--text);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  }

  .container {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    padding: 48px 24px 64px;
  }

  .header-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 8px;
  }

  .icon {
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgba(74, 222, 128, 0.12);
    color: var(--success);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon svg {
    width: 16px;
    height: 16px;
  }

  h1 {
    font-size: 1.75rem;
    font-weight: 600;
    letter-spacing: -0.02em;
    margin: 0;
  }

  .subtext {
    color: var(--text-dim);
    font-size: 0.95rem;
    margin: 0 0 24px;
  }

  .result label {
    display: block;
    font-size: 0.85rem;
    color: var(--text-dim);
    margin-bottom: 6px;
  }

  .result-box {
    display: flex;
    align-items: stretch;
    gap: 8px;
  }

  .result-box input {
    flex: 1;
    min-width: 0;
    padding: 10px 12px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 8px;
    color: var(--success);
    font-size: 0.95rem;
    outline: none;
  }

  .copy-btn {
    padding: 10px 16px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 8px;
    color: var(--text);
    font-size: 0.9rem;
    cursor: pointer;
    white-space: nowrap;
    transition: border-color 0.15s ease, background 0.15s ease;
  }

  .copy-btn:hover {
    border-color: var(--accent);
    background: #1a1a20;
  }

  .copy-btn.copied {
    border-color: var(--success);
    color: var(--success);
  }

  .actions {
    margin-top: 24px;
    display: flex;
    gap: 12px;
  }

  .actions a {
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 0.9rem;
    text-decoration: none;
    transition: border-color 0.15s ease, background 0.15s ease, opacity 0.15s ease;
  }

  .actions .primary {
    background: var(--accent);
    color: #fff;
  }

  .actions .primary:hover {
    opacity: 0.9;
  }

  .actions .secondary {
    border: 1px solid var(--border);
    color: var(--text);
  }

  .actions .secondary:hover {
    border-color: var(--accent);
    background: var(--surface);
  }
</style>
</head>
<body>
  <div class="container">
    <div class="header-row">
      <div class="icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <h1>Upload complete</h1>
    </div>
    <p class="subtext">Your file is ready to share.</p>

    <div class="result">
      <label>URL</label>
      <div class="result-box">
        <input type="text" id="resultUrl" value="${url}" readonly>
        <button type="button" class="copy-btn" id="copyBtn">Copy</button>
      </div>
    </div>

    <div class="actions">
      <a href="${url}" class="primary">Open file</a>
      <a href="/" class="secondary">Upload another</a>
    </div>
  </div>

  <script>
    const resultUrl = document.getElementById('resultUrl');
    const copyBtn = document.getElementById('copyBtn');

    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(resultUrl.value);
        copyBtn.textContent = 'Copied!';
        copyBtn.classList.add('copied');
        setTimeout(() => {
          copyBtn.textContent = 'Copy';
          copyBtn.classList.remove('copied');
        }, 1500);
      } catch {
        resultUrl.select();
        document.execCommand('copy');
      }
    });

    // Record this upload in localStorage so the upload page can show
    // the 5 most recent links. Stored per-browser, same pattern as the
    // remembered secret. Entries older than 1 week are dropped.
    const RECENT_UPLOADS_KEY = 'recent_uploads';
    const MAX_RECENT_UPLOADS = 5;
    const RECENT_UPLOADS_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 1 week

    function saveRecentUpload(url) {
      if (!url) return;

      let uploads = [];
      try {
        uploads = JSON.parse(localStorage.getItem(RECENT_UPLOADS_KEY)) || [];
      } catch {
        uploads = [];
      }

      const now = Date.now();
      uploads = uploads.filter((entry) => {
        const uploadedAt = new Date(entry.uploadedAt).getTime();
        return now - uploadedAt < RECENT_UPLOADS_TTL_MS;
      });

      // avoid duplicate entries if this page is reloaded
      uploads = uploads.filter((entry) => entry.url !== url);

      uploads.unshift({ url: url, uploadedAt: new Date().toISOString() });
      uploads = uploads.slice(0, MAX_RECENT_UPLOADS);

      localStorage.setItem(RECENT_UPLOADS_KEY, JSON.stringify(uploads));
    }

    saveRecentUpload(resultUrl.value);
  </script>
</body>
</html>
`;
}
