/**
 * a11y Contrast Checker — API Server
 * Author: Yara Vasquez
 *
 * Computes WCAG 2.2 color contrast ratios between two colors
 * and returns pass/fail results for AA and AAA compliance levels.
 *
 * WCAG 2.2 contrast requirements:
 *   AA  — 4.5:1 normal text,  3:1 large text
 *   AAA — 7.0:1 normal text, 4.5:1 large text
 */

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ------------------------------------------------------------------
// Utility: Convert a hex color string to { r, g, b } (0–255)
// ------------------------------------------------------------------
function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  const num = parseInt(full, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

// ------------------------------------------------------------------
// Utility: Compute relative luminance per WCAG 2.2 spec
// https://www.w3.org/TR/WCAG22/#dfn-relative-luminance
// ------------------------------------------------------------------
function relativeLuminance({ r, g, b }) {
  const linearize = (channel) => {
    const s = channel / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return (
    0.2126 * linearize(r) +
    0.7152 * linearize(g) +
    0.0722 * linearize(b)
  );
}

// ------------------------------------------------------------------
// Utility: Compute contrast ratio between two luminance values
// ------------------------------------------------------------------
function contrastRatio(l1, l2) {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// ------------------------------------------------------------------
// Utility: Evaluate WCAG pass/fail at AA and AAA levels
// ------------------------------------------------------------------
function evaluate(ratio) {
  return {
    AA: {
      normalText: ratio >= 4.5,
      largeText: ratio >= 3.0,
    },
    AAA: {
      normalText: ratio >= 7.0,
      largeText: ratio >= 4.5,
    },
  };
}

// ------------------------------------------------------------------
// POST /check
// Body: { foreground: "#000000", background: "#ffffff" }
// ------------------------------------------------------------------
app.post("/check", (req, res) => {
  const { foreground, background } = req.body;

  if (!foreground || !background) {
    return res.status(400).json({
      error: "Both 'foreground' and 'background' hex colors are required.",
    });
  }

  const hexPattern = /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
  if (!hexPattern.test(foreground) || !hexPattern.test(background)) {
    return res.status(400).json({
      error: "Invalid hex color format. Use #RRGGBB or #RGB.",
    });
  }

  const fgRgb = hexToRgb(foreground);
  const bgRgb = hexToRgb(background);

  const fgLuminance = relativeLuminance(fgRgb);
  const bgLuminance = relativeLuminance(bgRgb);
  const ratio = contrastRatio(fgLuminance, bgLuminance);
  const results = evaluate(ratio);

  res.json({
    foreground,
    background,
    contrastRatio: parseFloat(ratio.toFixed(2)),
    wcag: results,
  });
});

// ------------------------------------------------------------------
// GET /health — simple health check endpoint
// ------------------------------------------------------------------
app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "a11y-contrast-checker" });
});

app.listen(PORT, () => {
  console.log(`a11y Contrast Checker running on http://localhost:${PORT}`);
});