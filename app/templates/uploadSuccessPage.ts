import { apiBaseUrl } from "../path";

export function renderUploadSuccessPage(filename: string) {
  const url = new URL(`/file/${filename}`, apiBaseUrl).href;
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Upload complete</title>
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
    <p class="subtext">Your video is ready to share.</p>

    <div class="result">
      <label>URL</label>
      <div class="result-box">
        <input type="text" id="resultUrl" value="${url}" readonly>
        <button type="button" class="copy-btn" id="copyBtn">Copy</button>
      </div>
    </div>

    <div class="actions">
      <a href="${url}" class="primary">View video</a>
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
  </script>
</body>
</html>
`;
}
