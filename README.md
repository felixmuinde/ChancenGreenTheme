# Chancen Green Theme

Dark and light themes for Visual Studio Code, built on the Chancen International brand greens and tuned for comfortable reading.

<!-- TODO: add screenshots (images/ folder) once the themes are tested. -->

## Installation

1. Open the Extensions view (`Ctrl+Shift+X`).
2. Search for **Chancen Green Theme**.
3. Click **Install**, then pick **Chancen Green Dark** or **Chancen Green Light** via `Ctrl+K Ctrl+T`.

## Development

- Press `F5` to launch an Extension Development Host with the theme loaded.
- Edit the files in [themes/](themes/); use
  **Developer: Inspect Editor Tokens and Scopes** to find scopes to tweak.
- `npm run check` checks the contrast of every readable colour pair (needs 4.5:1; UI-only pairs 3:1).
- `npm install` then `npm run package` builds a `.vsix`.

## License

[MIT](LICENSE)
