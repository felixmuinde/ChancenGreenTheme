# Plan: Chancen Green Theme

Goal: ship a polished dark + light VS Code theme pair, based on the 2026 Chancen International brand guidelines, to the Marketplace.

**Approach:** brand colours set the identity (backgrounds, chrome, accents). Anywhere the guidelines and everyday code readability disagree, readability wins, and we use the nearest brand-adjacent shade instead. Every deviation is listed in section 2.

## Status

- [x] Scaffold (manifest, starter theme, README, LICENSE, CHANGELOG, launch config)
- [x] Brand guidelines reviewed, palette and contrast checked (below)
- [ ] Everything else

## 1. Decisions made

- Two variants: **dark** (primary) and **light**
- Name stays provisional ("Chancen Green") while we test; keep it in few places so a rename is cheap (`package.json` `displayName`/`name`, theme `name` fields, README)
- Publisher: you, under your own Marketplace account. Chancen name/colours/logo on a public listing may still need their OK, so keep that in mind before the public release (a private or pre-release `.vsix` is fine for testing).
- High-contrast variants: later, after dark and light are done (not in v0.1.0)
- Fonts: the guidelines say Helvetica Neue / Avenir. Themes can't set fonts, so code stays in the user's editor font. We only mention the brand fonts in the README, if at all.

## 2. Palette

### Brand colours (from the guidelines)

| Role | Name | Hex |
| --- | --- | --- |
| Deepest background | Deep Green | `#0f1e12` |
| Brand dark | Dark Green | `#1F4834` |
| Buttons and links | Mid Green | `#3d7a45` |
| Brand highlight | Light Green | `#84BD00` |
| Bright accent | Bright Lime | `#a0d931` |
| Body text on dark | Light Sage | `#a8c4ac` |
| Page background | Cream | `#f6f4ee` |
| Section background | Light Mint | `#eef4e1` |
| Black / White | | `#000000` / `#FFFFFF` |

### Contrast results (WCAG ratio; code text needs 4.5:1 or higher)

**Dark variant**

| Foreground on Deep Green `#0f1e12` | Ratio | Verdict |
| --- | --- | --- |
| White | 17.3 | Fine |
| Cream | 15.7 | Fine |
| Bright Lime | 10.3 | Fine, best accent |
| Light Sage | 9.2 | Fine, good secondary text |
| Light Green | 7.6 | Fine on Deep Green |
| Mid Green | 3.4 | **Fails: never for text** |

On Dark Green `#1F4834` (sidebar or status bar if we use it): White 10.3, Bright Lime 6.1, Sage 5.5 are fine. Light Green is 4.55 (borderline, avoid for small text). Mid Green is 2.0 (disappears, as the guidelines say).

**Light variant**

| Foreground on Cream `#f6f4ee` | Ratio | Verdict |
| --- | --- | --- |
| Deep Green | 15.7 | Fine, default text |
| Dark Green | 9.4 | Fine |
| Mid Green | 4.7 | Passes narrowly: keywords, links |
| Light Green | 2.1 | **Fails: fills and decoration only** |

Also: Dark Green on Light Mint is 9.2, and Light Sage on white is 1.9, so sage is never text on light.

### Where we deviate from the guidelines, and why

1. **Light variant text:** the brand has no code-friendly syntax colours. Light Green and Lime fail on cream, so syntax uses Mid Green and a few darker shades derived from it (e.g. `#2f6a3a`, 5.9 on cream), plus a small set of non-green hues for variety.
2. **Syntax needs more than the brand's "two or three colours per screen".** Code needs about 6-8 distinguishable token colours. Plan: greens do most of the work (keywords, types, functions), with 2-3 muted supporting hues (a warm sand/amber for strings or numbers, a teal or blue for functions, a soft red for errors). Brand orange from the older impact report can serve as the warm accent.
3. **Comments:** the guidelines have no muted-grey equivalent. Use a desaturated sage, tuned to at least 4.5:1 in both variants (checked: `#6f8f78` on Deep Green is 4.8).
4. **Semantic colours** (errors, warnings, diff add/remove) come from outside the brand palette, tuned to match the greens' brightness.

## 3. Variant design

### Dark ("Chancen Green Dark")

Moved from Deep Green backgrounds to a near-black with a faint green tint, so the brand greens read as accents (closer to the black-to-green gradient look in the guidelines).

- Editor `#0b0e0c`; sidebar, activity bar, panel and tabs bar `#070908`; borders `#171d1a`
- Brand-green moment: status bar `#1F4834` with white text (10.3). Selection and active list rows also use Dark Green.
- Primary text warm off-white `#ece9e1`; secondary text Light Sage; comments and line numbers `#6f8f78` (passes 4.5:1)
- Keywords and accents: Bright Lime `#a0d931` (the guideline "best accent on dark"); types and property names Light Green `#84BD00`
- Strings sand `#e3c78a`, numbers and constants orange `#f0a35e`, functions teal `#7fd1c7`
- Buttons: Mid Green `#3d7a45` with white text (5.2)

### Light ("Chancen Green Light")

- Editor Cream `#f6f4ee`, sidebar Light Mint `#eef4e1` or white
- Text Deep Green; borders and selection from Light Mint / pale sage
- Accents: Mid Green for text accents; Light Green only as fills (selection, badges, active-tab top border)
- Buttons: Dark Green `#1F4834` with white, or Mid Green with white (5.2)

## 4. Build

- [x] Contrast check script (`npm run check`, `scripts/check-contrast.js`) covering the main text pairs, token colours and terminal colours. A shared palette file is not done: colours live in the two theme files.
- [x] Dark theme (first pass): workbench colours, terminal (16 ANSI colours), widgets, diff/git, token colours, semantic tokens
- [x] Light theme (first pass): same, with the light-specific accent rules above
- [x] Register both in `package.json` (`vs-dark` and `vs`)
- [ ] Languages to check: TypeScript/JavaScript, Python, HTML/CSS, JSON, Markdown, plus whatever else you use

## 5. Test

- [ ] F5 into the Extension Development Host; open sample files per language in both variants
- [ ] **Developer: Inspect Editor Tokens and Scopes** to fix wrong or missing colours
- [ ] Run the contrast script and fix any pair under 4.5:1 (UI chrome non-text can go down to 3:1)
- [ ] Check selection, find match, bracket match, and diff colours stay readable over text
- [ ] Try with a few common extensions (GitLens, Error Lens)

## 6. Marketplace assets

- [ ] 128x128 PNG icon. **Logo caveat:** the guidelines say the logo must be used exactly as supplied, from the master files. Use the official file if we use it at all, otherwise a simple non-logo mark.
- [ ] Screenshots of both variants in `images/`, linked in README
- [ ] `galleryBanner` colour (Deep Green) and theme in `package.json`
- [x] `repository`, `bugs`, `homepage` fields (point at the personal GitHub repo; update if it moves to chancenhq) (publisher ID `FelixMuinde` is already set)
- [ ] README tone: warm, clear, no jargon (per the guidelines' tone of voice)
- [ ] CHANGELOG entry for the release

## 7. Publish

- [ ] Azure DevOps PAT (scope: Marketplace > Manage), `npx vsce login <publisher>`
- [ ] `npm run package`, install the `.vsix` locally as a final check
- [ ] `npm run publish`, then tag the release (`v0.1.0`)
- [ ] Optional: Open VSX

## Open questions

- Final name, once testing is done
- Icon: official logo file from Chancen's shared drive, or a simple non-logo mark
