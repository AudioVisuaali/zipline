export function renderGenericFailurePage(title: string, description: string) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Invalid Token</title>
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
