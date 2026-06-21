export function renderGenericFailurePage(title: string, description: string) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Invalid Token</title>
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%230d0d0f'/%3E%3Cpath d='M16 22V10M10 16l6-6 6 6' stroke='%236e6ef6' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3C/svg%3E">
<style>
  :root {
    --bg: #0d0d0f;
    --surface: #16161a;
    --border: #2a2a2e;
    --text: #e8e8ea;
    --text-dim: #9a9aa2;
    --accent: #6e6ef6;
  }

  * {
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
    margin: 0;
  }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .container {
    width: 100%;
    max-width: 1200px;
    padding: 24px;
    margin: 0 auto;
    text-align: center;
  }

  .code {
    font-size: clamp(3rem, 10vw, 7rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    margin: 0;
    color: var(--text);
  }

  .message {
    margin-top: 8px;
    font-size: 1.25rem;
    color: var(--text-dim);
  }

  .back-link {
    display: inline-block;
    margin-top: 32px;
    padding: 10px 20px;
    border: 1px solid var(--border);
    border-radius: 8px;
    color: var(--text);
    text-decoration: none;
    font-size: 0.95rem;
    transition: border-color 0.15s ease, background 0.15s ease;
  }

  .back-link:hover {
    border-color: var(--accent);
    background: var(--surface);
  }
</style>
</head>
<body>
  <div class="container">
    <p class="code">${title}</p>
    <p class="message">${description}</p>
    <a class="back-link" href="/">Back to home</a>
  </div>
</body>
</html>
`;
}
