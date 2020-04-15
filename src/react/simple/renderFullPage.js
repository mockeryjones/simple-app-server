export default (html, css, initialState) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>My page</title>
        <style id="jss-server-side">${css}</style>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <script>window.__APP_INITIAL_STATE__ = ${initialState}</script>
      </head>
      <body>
        <script async src="/js/bundle.js"></script>
        <div id="root">${html}</div>
      </body>
    </html>
  `;
}