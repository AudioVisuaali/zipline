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
    display: inline-flex;
    align-items: center;
    gap: 10px;
    transition: opacity 0.15s ease;
  }

  .submit-btn:hover {
    opacity: 0.9;
  }

  .submit-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .submit-btn .spinner {
    display: none;
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255, 255, 255, 0.35);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  .submit-btn.loading .spinner {
    display: inline-block;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .recent-uploads {
    display: none;
    margin-top: 40px;
  }

  .recent-uploads.visible {
    display: block;
  }

  .recent-uploads h2 {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-dim);
    margin: 0 0 12px;
  }

  .recent-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .recent-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 12px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 8px;
  }

  .recent-item-info {
    flex: 1;
    min-width: 0;
  }

  .recent-item-url {
    display: block;
    color: var(--text);
    font-size: 0.9rem;
    text-decoration: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .recent-item-url:hover {
    color: var(--accent);
  }

  .recent-item-time {
    display: block;
    color: var(--text-dim);
    font-size: 0.78rem;
    margin-top: 2px;
  }

  .recent-item-actions {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .recent-item-copy,
  .recent-item-remove {
    flex-shrink: 0;
    background: var(--bg);
    border: 1px solid var(--border);
    color: var(--text-dim);
    cursor: pointer;
    font-size: 0.95rem;
    line-height: 1;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    transition: color 0.15s ease, background 0.15s ease, border-color 0.15s ease;
  }

  .recent-item-copy svg {
    width: 15px;
    height: 15px;
  }

  .recent-item-copy:hover {
    color: var(--accent);
    border-color: var(--accent);
    background: rgba(110, 110, 246, 0.1);
  }

  .recent-item-copy.copied {
    color: var(--success);
    border-color: var(--success);
    background: rgba(74, 222, 128, 0.1);
  }

  .recent-item-remove:hover {
    color: var(--error);
    border-color: var(--error);
    background: rgba(248, 113, 113, 0.1);
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

      <button type="submit" class="submit-btn" id="submitBtn">
        <span class="spinner"></span>
        <span class="submit-btn-text">Upload</span>
      </button>
    </form>

    <div class="recent-uploads" id="recentUploads">
      <h2>Your recent uploads</h2>
      <div class="recent-list" id="recentList"></div>
    </div>

  </div>

  <script>
    // This JS handles drag-and-drop UX and remembering the secret.
    // The actual submit is a plain form POST; nothing here intercepts it.

    const uploadFormEl = document.getElementById('uploadForm');
    const submitBtn = document.getElementById('submitBtn');
    const submitBtnText = submitBtn.querySelector('.submit-btn-text');
    const dropzone = document.getElementById('dropzone');
    const fileInput = document.getElementById('fileInput');
    const fileChip = document.getElementById('fileChip');
    const fileChipName = document.getElementById('fileChipName');
    const fileChipRemove = document.getElementById('fileChipRemove');
    const secretInput = document.getElementById('secretInput');
    const secretChip = document.getElementById('secretChip');
    const secretChipChange = document.getElementById('secretChipChange');

    // Purely visual — the browser performs the actual POST and
    // navigation, this just shows a spinner while that happens.
    // No preventDefault, so the native submit is never blocked.
    uploadFormEl.addEventListener('submit', () => {
      submitBtn.disabled = true;
      submitBtn.classList.add('loading');
      submitBtnText.textContent = 'Uploading…';
    });

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

      submitBtn.disabled = false;
      submitBtn.classList.remove('loading');
      submitBtnText.textContent = 'Upload';

      renderRecentUploads();
    });

    // ---- Recent uploads list ----
    // Populated by upload-success.html when a user lands there after a
    // successful upload. This page only reads/renders/removes entries.

    const RECENT_UPLOADS_KEY = 'recent_uploads';
    const RECENT_UPLOADS_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 1 week
    const recentUploadsSection = document.getElementById('recentUploads');
    const recentList = document.getElementById('recentList');

    function getRecentUploads() {
      let uploads;
      try {
        uploads = JSON.parse(localStorage.getItem(RECENT_UPLOADS_KEY)) || [];
      } catch {
        uploads = [];
      }

      const now = Date.now();
      const fresh = uploads.filter(function (entry) {
        const uploadedAt = new Date(entry.uploadedAt).getTime();
        return now - uploadedAt < RECENT_UPLOADS_TTL_MS;
      });

      // persist the pruned list so expired entries don't linger in storage
      if (fresh.length !== uploads.length) {
        setRecentUploads(fresh);
      }

      return fresh;
    }

    function setRecentUploads(uploads) {
      localStorage.setItem(RECENT_UPLOADS_KEY, JSON.stringify(uploads));
    }

    function formatRelativeTime(date) {
      const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
      const intervals = [
        { label: 'year', secs: 31536000 },
        { label: 'month', secs: 2592000 },
        { label: 'day', secs: 86400 },
        { label: 'hour', secs: 3600 },
        { label: 'minute', secs: 60 }
      ];

      if (seconds < 60) return 'just now';

      for (let i = 0; i < intervals.length; i++) {
        const count = Math.floor(seconds / intervals[i].secs);
        if (count >= 1) {
          return count + ' ' + intervals[i].label + (count !== 1 ? 's' : '') + ' ago';
        }
      }
      return 'just now';
    }

    function removeRecentUpload(url) {
      const uploads = getRecentUploads().filter(function (entry) {
        return entry.url !== url;
      });
      setRecentUploads(uploads);
      renderRecentUploads();
    }

    async function copyRecentUrl(url, button) {
      try {
        await navigator.clipboard.writeText(url);
      } catch {
        const temp = document.createElement('textarea');
        temp.value = url;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
      }

      const originalHtml = button.innerHTML;
      button.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
      button.classList.add('copied');
      setTimeout(function () {
        button.innerHTML = originalHtml;
        button.classList.remove('copied');
      }, 1200);
    }

    function renderRecentUploads() {
      const uploads = getRecentUploads();

      if (uploads.length === 0) {
        recentUploadsSection.classList.remove('visible');
        recentList.innerHTML = '';
        return;
      }

      recentUploadsSection.classList.add('visible');
      recentList.innerHTML = '';

      uploads.forEach(function (entry) {
        const item = document.createElement('div');
        item.className = 'recent-item';

        const info = document.createElement('div');
        info.className = 'recent-item-info';

        const link = document.createElement('a');
        link.className = 'recent-item-url';
        link.href = entry.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = entry.url;

        const time = document.createElement('span');
        time.className = 'recent-item-time';
        time.dataset.uploadedAt = entry.uploadedAt;
        time.textContent = formatRelativeTime(new Date(entry.uploadedAt));

        info.appendChild(link);
        info.appendChild(time);

        const actions = document.createElement('div');
        actions.className = 'recent-item-actions';

        const copyBtn = document.createElement('button');
        copyBtn.type = 'button';
        copyBtn.className = 'recent-item-copy';
        copyBtn.title = 'Copy link';
        copyBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
        copyBtn.addEventListener('click', function () {
          copyRecentUrl(entry.url, copyBtn);
        });

        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'recent-item-remove';
        removeBtn.title = 'Remove from recent uploads';
        removeBtn.textContent = '✕';
        removeBtn.addEventListener('click', function () {
          removeRecentUpload(entry.url);
        });

        actions.appendChild(copyBtn);
        actions.appendChild(removeBtn);

        item.appendChild(info);
        item.appendChild(actions);
        recentList.appendChild(item);
      });
    }

    renderRecentUploads();

    // Keep relative timestamps ("3 minutes ago") fresh without
    // re-rendering the whole list (which would interrupt any in-flight
    // copy-button feedback state).
    setInterval(function () {
      document.querySelectorAll('.recent-item-time').forEach(function (el) {
        el.textContent = formatRelativeTime(new Date(el.dataset.uploadedAt));
      });
    }, 30000);
  </script>
</body>
</html>
`;
export function renderUploadPage() {
  return template;
}
