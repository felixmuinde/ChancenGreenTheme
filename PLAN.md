# Plan: Chancen Green Theme

Goal: ship a polished green dark theme to the VS Code Marketplace.

## Status

- [x] Scaffold (manifest, starter theme, README, LICENSE, CHANGELOG, launch config)
- [ ] Everything below

## 1. Design decisions

- [ ] Decide variants: dark only, or also light / a softer "dim" variant
- [ ] Lock the palette: background ramp, one primary green accent, 3-4 supporting syntax colours
- [ ] Check contrast (aim for WCAG AA, 4.5:1, for text on `editor.background`)
- [ ] Decide on italics for comments / parameters

## 2. Build the theme

- [ ] Workbench colours: editor, sidebar, activity bar, tabs, status bar, title bar
- [ ] Panels: terminal (incl. 16 ANSI colours), debug, problems, output
- [ ] Widgets: input, dropdown, list, quick pick, notifications, scrollbar, minimap
- [ ] Editor extras: find match, bracket match, diff colours, git decorations, gutter
- [ ] Token colours for core scopes
- [ ] Semantic highlighting (`semanticHighlighting: true` and `semanticTokenColors`)
- [ ] Language checks: TypeScript/JavaScript, Python, HTML/CSS, JSON, Markdown, Rust/Go (whatever you use)

## 3. Test

- [ ] F5 into the Extension Development Host and check each language above
- [ ] Use **Developer: Inspect Editor Tokens and Scopes** to fix wrong or missing colours
- [ ] Check with a few popular extensions (GitLens, Error Lens) for clashes
- [ ] Validate JSON (no trailing commas; `$schema` warnings are clean)

## 4. Marketplace assets

- [ ] 128x128 PNG icon (`icon.png`), referenced in `package.json`
- [ ] Screenshots in `images/` (one per language or variant) and linked in README
- [ ] `galleryBanner` colour and theme (`"dark"`) in `package.json`
- [ ] `repository`, `bugs` and `homepage` fields in `package.json`
- [ ] Final README pass: description, screenshots, install steps
- [ ] CHANGELOG entry for the release version

## 5. Publish

- [ ] Replace `YOUR-PUBLISHER-ID` in `package.json`
- [ ] Create an Azure DevOps personal access token (scope: Marketplace > Manage)
- [ ] `npm install`, then `npx vsce login <publisher>`
- [ ] `npm run package` and install the `.vsix` locally as a final check
- [ ] `npm run publish` (or upload the `.vsix` at marketplace.visualstudio.com/manage)
- [ ] Tag the release in git (`v0.1.0`)

## 6. After release

- [ ] Optional: publish to Open VSX (for VSCodium and similar)
- [ ] Collect feedback and fix colour issues; bump version and update CHANGELOG each time

## Open questions

- Publisher ID?
- Final theme name(s) and variants?
- Icon / branding: do you have one, or should we make a simple one?
