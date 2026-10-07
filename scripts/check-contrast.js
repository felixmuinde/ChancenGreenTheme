// Checks WCAG contrast for the colour pairs that matter for readability.
// Usage: node scripts/check-contrast.js   (exits 1 if any pair is below its minimum)
const fs = require("fs");
const path = require("path");

const themesDir = path.join(__dirname, "..", "themes");

const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)];
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
};

// [foreground key, background key, minimum ratio]; text pairs use 4.5, UI-only pairs 3.
const colourPairs = [
  ["editor.foreground", "editor.background", 4.5],
  ["editor.foreground", "editor.lineHighlightBackground", 4.5],
  ["editor.foreground", "editor.selectionBackground", 4.5],
  ["editorLineNumber.foreground", "editor.background", 4.5],
  ["editorLineNumber.activeForeground", "editor.background", 4.5],
  ["foreground", "sideBar.background", 4.5],
  ["sideBar.foreground", "sideBar.background", 4.5],
  ["sideBarTitle.foreground", "sideBar.background", 4.5],
  ["list.activeSelectionForeground", "list.activeSelectionBackground", 4.5],
  ["list.inactiveSelectionForeground", "list.inactiveSelectionBackground", 4.5],
  ["list.highlightForeground", "sideBar.background", 4.5],
  ["tab.activeForeground", "tab.activeBackground", 4.5],
  ["tab.inactiveForeground", "tab.inactiveBackground", 4.5],
  ["activityBar.foreground", "activityBar.background", 3],
  ["activityBar.inactiveForeground", "activityBar.background", 3],
  ["activityBarBadge.foreground", "activityBarBadge.background", 4.5],
  ["statusBar.foreground", "statusBar.background", 4.5],
  ["statusBarItem.remoteForeground", "statusBarItem.remoteBackground", 4.5],
  ["titleBar.activeForeground", "titleBar.activeBackground", 4.5],
  ["titleBar.inactiveForeground", "titleBar.inactiveBackground", 3],
  ["button.foreground", "button.background", 4.5],
  ["button.secondaryForeground", "button.secondaryBackground", 4.5],
  ["badge.foreground", "badge.background", 4.5],
  ["input.foreground", "input.background", 4.5],
  ["input.placeholderForeground", "input.background", 3],
  ["menu.foreground", "menu.background", 4.5],
  ["menu.selectionForeground", "menu.selectionBackground", 4.5],
  ["notifications.foreground", "notifications.background", 4.5],
  ["panelTitle.activeForeground", "panel.background", 4.5],
  ["panelTitle.inactiveForeground", "panel.background", 4.5],
  ["terminal.foreground", "terminal.background", 4.5],
  ["editorError.foreground", "editor.background", 4.5],
  ["editorWarning.foreground", "editor.background", 4.5],
  ["editorInfo.foreground", "editor.background", 4.5],
  ["textLink.foreground", "editor.background", 4.5],
];

let failures = 0;
const report = (theme, label, fg, bg, min) => {
  const r = ratio(fg, bg);
  const ok = r >= min;
  if (!ok) failures++;
  console.log(`${ok ? "ok  " : "FAIL"} ${r.toFixed(2).padStart(5)} (min ${min})  ${theme}: ${label}  ${fg} on ${bg}`);
};

const isOpaque = (c) => typeof c === "string" && /^#[0-9a-f]{6}$/i.test(c);

for (const file of fs.readdirSync(themesDir).filter((f) => f.endsWith("-color-theme.json"))) {
  const theme = JSON.parse(fs.readFileSync(path.join(themesDir, file), "utf8"));
  const name = theme.name;
  const c = theme.colors;
  const bg = c["editor.background"];
  const strict = theme.type === "hc"; // high-contrast themes need 7:1 for text, 4.5:1 for UI
  const need = (min) => (strict ? (min >= 4.5 ? 7 : 4.5) : min);

  for (const [fgKey, bgKey, min] of colourPairs) {
    if (isOpaque(c[fgKey]) && isOpaque(c[bgKey])) report(name, `${fgKey} / ${bgKey}`, c[fgKey], c[bgKey], need(min));
  }
  for (const key of Object.keys(c).filter((k) => k.startsWith("terminal.ansi") && k !== "terminal.ansiBlack")) {
    report(name, key, c[key], c["terminal.background"], need(3));
  }
  for (const rule of theme.tokenColors) {
    const fg = rule.settings.foreground;
    if (isOpaque(fg)) report(name, `token ${[].concat(rule.scope)[0]}`, fg, bg, need(4.5));
  }
  for (const [scope, value] of Object.entries(theme.semanticTokenColors || {})) {
    const fg = typeof value === "string" ? value : value.foreground;
    if (isOpaque(fg)) report(name, `semantic ${scope}`, fg, bg, need(4.5));
  }
}

console.log(failures ? `\n${failures} pair(s) below minimum` : "\nAll pairs pass");
process.exit(failures ? 1 : 0);
