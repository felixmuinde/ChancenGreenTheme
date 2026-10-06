# Plan: Chancen Green Theme

Goal: ship a polished dark + light VS Code theme pair, based on the 2026 Chancen International brand guidelines, to the Marketplace.

**Approach:** brand colours set the identity (backgrounds, chrome, accents). Anywhere the guidelines and everyday code readability disagree, readability wins, and we use the nearest brand-adjacent shade instead. Every deviation is listed in section 2.

## Status

- [x] Scaffold (manifest, starter theme, README, LICENSE, CHANGELOG, launch config)
- [x] Brand guidelines reviewed, palette and contrast checked (below)
- [ ] Everything else

## 1. Decisions made

- Two variants: **dark** (primary) and **light**
- Name is provisional ("Chancen Green"); keep it in one place so a rename is cheap (`package.json` `displayName`/`name`, theme `name` fields, README)
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

- Editor `#0f1e12` (Deep Green), sidebar and activity bar slightly darker or `#0b160e`
- Active chrome accents: Light Green `#84BD00` for borders and focus (large or non-text uses)
- Brand-green moment: status bar `#1F4834` with white text (10.3)
- Primary text Cream / White; secondary text Light Sage
- Keywords and accent text: Bright Lime `#a0d931` (the guideline "best accent on dark")
- Buttons: Mid Green `#3d7a45` with white text (5.2)

### Light ("Chancen Green Light")

- Editor Cream `#f6f4ee`, sidebar Light Mint `#eef4e1` or white
- Text Deep Green; borders and selection from Light Mint / pale sage
- Accents: Mid Green for text accents; Light Green only as fills (selection, badges, active-tab top border)
- Buttons: Dark Green `#1F4834` with white, or Mid Green with white (5.2)

## 4. Build

- [ ] Palette file or table in the repo (single source of truth) and a script that checks every foreground/background pair against 4.5:1
- [ ] Dark theme: workbench colours, terminal (16 ANSI colours), widgets, diff/git, token colours, semantic tokens
- [ ] Light theme: same, with the light-specific accent rules above
- [ ] Register both in `package.json` (`vs-dark` and `vs`), plus optional high-contrast variants later
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
- [ ] `repository`, `bugs`, `homepage` fields; `YOUR-PUBLISHER-ID` replaced
- [ ] README tone: warm, clear, no jargon (per the guidelines' tone of voice)
- [ ] CHANGELOG entry for the release

## 7. Publish

- [ ] Azure DevOps PAT (scope: Marketplace > Manage), `npx vsce login <publisher>`
- [ ] `npm run package`, install the `.vsix` locally as a final check
- [ ] `npm run publish`, then tag the release (`v0.1.0`)
- [ ] Optional: Open VSX

## Open questions

1. **Publisher:** will this go out under your personal publisher or Chancen's? Using the Chancen name, colours and any logo on a public listing probably needs their sign-off, so it's worth confirming before publishing.
2. **Final name** (e.g. "Chancen Green", "Chancen", something else)?
3. **High-contrast variants** later, or skip?
