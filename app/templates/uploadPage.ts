const template = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Share</title>
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
    --error: #f87171;
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

  h1 {
    font-size: 1.75rem;
    font-weight: 600;
    letter-spacing: -0.02em;
    margin: 0 0 24px;
  }

  .page-header {
    margin-bottom: 32px;
  }

  .page-header h1 {
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin: 0 0 8px;
  }

  .page-header p {
    color: var(--text-dim);
    font-size: 0.95rem;
    margin: 0;
  }

  .dropzone {
    width: 100%;
    border: 2px dashed var(--border);
    border-radius: 12px;
    background: var(--surface);
    padding: 64px 24px;
    text-align: center;
    cursor: pointer;
    transition: border-color 0.15s ease, background 0.15s ease;
  }

  .dropzone:hover,
  .dropzone.dragover {
    border-color: var(--accent);
    background: #1a1a20;
  }

  .dropzone.error {
    border-color: var(--error);
  }

  .dropzone-icon {
    font-size: 2.5rem;
    margin-bottom: 12px;
    opacity: 0.8;
  }

  .dropzone-text {
    font-size: 1rem;
    color: var(--text);
    margin: 0 0 4px;
  }

  .dropzone-subtext {
    font-size: 0.85rem;
    color: var(--text-dim);
    margin: 0;
  }

  .file-input {
    display: none;
  }

  .file-chip {
    display: none;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-top: 16px;
    padding: 12px 16px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 8px;
    font-size: 0.9rem;
  }

  .file-chip.visible {
    display: flex;
  }

  .file-chip-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--text);
  }

  .file-chip-remove {
    background: none;
    border: none;
    color: var(--text-dim);
    cursor: pointer;
    font-size: 1rem;
    line-height: 1;
    padding: 4px;
  }

  .file-chip-remove:hover {
    color: var(--error);
  }

  .field {
    margin-top: 20px;
  }

  .field label {
    display: block;
    font-size: 0.85rem;
    color: var(--text-dim);
    margin-bottom: 6px;
  }

  .field input[type="text"],
  .field input[type="password"] {
    width: 100%;
    height: 42px;
    padding: 10px 12px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 8px;
    color: var(--text);
    font-size: 0.95rem;
    outline: none;
    transition: border-color 0.15s ease;
  }

  .field input[type="text"]:focus,
  .field input[type="password"]:focus {
    border-color: var(--accent);
  }

  .secret-chip {
    display: none;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    height: 42px;
    padding: 0 12px;
    background: rgba(74, 222, 128, 0.08);
    border: 1px solid rgba(74, 222, 128, 0.3);
    border-radius: 8px;
    font-size: 0.9rem;
  }

  .secret-chip.visible {
    display: flex;
  }

  .secret-chip-text {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--text);
  }

  .secret-chip-text svg {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    color: var(--success);
  }

  .secret-chip-change {
    background: none;
    border: none;
    color: var(--accent);
    cursor: pointer;
    font-size: 0.85rem;
    padding: 4px;
  }

  .secret-chip-change:hover {
    text-decoration: underline;
  }

  .submit-btn {
    margin-top: 24px;
    padding: 12px 24px;
    background: var(--accent);
    border: none;
    border-radius: 8px;
    color: #fff;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.15s ease;
  }

  .submit-btn:hover {
    opacity: 0.9;
  }
</style>
</head>
<body>
  <div class="container">
    <div class="page-header">
      <h1>Share</h1>
      <p>Drop a video below to upload and get a shareable link.</p>
    </div>

    <!--
      Native form submit — no JS fetch/intercept.
      Browser sends a standard multipart/form-data POST and navigates
      to whatever the server returns.
    -->
    <form id="uploadForm" action="/upload" method="POST" enctype="multipart/form-data">
      <div class="dropzone" id="dropzone">
        <div class="dropzone-icon">⬆</div>
        <p class="dropzone-text">Drag and drop a video here, or click to browse</p>
        <p class="dropzone-subtext">MP4, MOV, WebM, etc.</p>
        <input type="file" id="fileInput" class="file-input" name="file" required>
      </div>

      <div class="file-chip" id="fileChip">
        <span class="file-chip-name" id="fileChipName"></span>
        <button type="button" class="file-chip-remove" id="fileChipRemove" title="Remove file">✕</button>
      </div>

      <div class="field">
        <label for="secretInput">Secret</label>
        <input type="password" id="secretInput" name="secret" placeholder="Your upload secret" required>
        <div class="secret-chip" id="secretChip">
          <span class="secret-chip-text">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Using stored secret
          </span>
          <button type="button" class="secret-chip-change" id="secretChipChange">Change</button>
        </div>
      </div>

      <button type="submit" class="submit-btn" id="submitBtn">Upload</button>
    </form>

  </div>

  <script>
    // This JS handles drag-and-drop UX and remembering the secret.
    // The actual submit is a plain form POST; nothing here intercepts it.

    const dropzone = document.getElementById('dropzone');
    const fileInput = document.getElementById('fileInput');
    const fileChip = document.getElementById('fileChip');
    const fileChipName = document.getElementById('fileChipName');
    const fileChipRemove = document.getElementById('fileChipRemove');
    const secretInput = document.getElementById('secretInput');
    const secretChip = document.getElementById('secretChip');
    const secretChipChange = document.getElementById('secretChipChange');

    // Always start with no file selected, on every page load — covers
    // both fresh loads and bfcache-restored back/forward navigation,
    // where the browser can silently lose the file selection while the
    // chip UI still shows it as attached.
    fileInput.value = '';
    fileChip.classList.remove('visible');

    const SECRET_STORAGE_KEY = 'upload_secret';

    function showStoredSecret() {
      secretInput.style.display = 'none';
      secretInput.required = false;
      secretChip.classList.add('visible');
    }

    function showSecretInput(clearValue) {
      secretInput.style.display = '';
      secretInput.required = true;
      secretChip.classList.remove('visible');
      if (clearValue) {
        secretInput.value = '';
      }
      secretInput.focus();
    }

    // Restore remembered secret
    const savedSecret = localStorage.getItem(SECRET_STORAGE_KEY);
    if (savedSecret) {
      secretInput.value = savedSecret;
      showStoredSecret();
    }

    secretInput.addEventListener('input', () => {
      localStorage.setItem(SECRET_STORAGE_KEY, secretInput.value);
    });

    secretChipChange.addEventListener('click', () => {
      showSecretInput(true);
    });

    function setSelectedFile(file) {
      if (!file) return;

      const dt = new DataTransfer();
      dt.items.add(file);
      fileInput.files = dt.files;

      fileChipName.textContent = file.name + ' (' + formatBytes(file.size) + ')';
      fileChip.classList.add('visible');
      dropzone.querySelector('.dropzone-text').textContent = 'Ready to upload';
    }

    function clearSelectedFile() {
      fileInput.value = '';
      fileChip.classList.remove('visible');
      dropzone.querySelector('.dropzone-text').textContent = 'Drag and drop a video here, or click to browse';
    }

    function formatBytes(bytes) {
      if (bytes === 0) return '0 B';
      const units = ['B', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(1024));
      return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + units[i];
    }

    // Click to browse
    dropzone.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', () => {
      if (fileInput.files[0]) setSelectedFile(fileInput.files[0]);
    });

    fileChipRemove.addEventListener('click', (e) => {
      e.stopPropagation();
      clearSelectedFile();
    });

    // Drag and drop
    ['dragenter', 'dragover'].forEach(evt => {
      dropzone.addEventListener(evt, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.add('dragover');
      });
    });

    ['dragleave', 'drop'].forEach(evt => {
      dropzone.addEventListener(evt, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.remove('dragover');
      });
    });

    dropzone.addEventListener('drop', (e) => {
      const file = e.dataTransfer.files[0];
      if (file) setSelectedFile(file);
    });

    // Safety net: if the browser restores this page from bfcache
    // (back/forward), re-apply the file reset without forcing a full
    // reload — the file input can't be restored by the browser anyway,
    // so this just keeps the chip UI in sync with that reality.
    window.addEventListener('pageshow', () => {
      fileInput.value = '';
      fileChip.classList.remove('visible');
      dropzone.querySelector('.dropzone-text').textContent = 'Drag and drop a video here, or click to browse';
    });
  </script>
</body>
</html>
`;
export function renderUploadPage() {
  return template;
}
