"use strict";

const INDENT = "  ";

const nativeSetter = Object.getOwnPropertyDescriptor(
  HTMLTextAreaElement.prototype,
  "value"
).set;

function setValue(ta, newValue) {
  nativeSetter.call(ta, newValue);
  ta.dispatchEvent(new InputEvent("input", { bubbles: true }));
}

// Tab / Shift+Tab indent/outdent
document.addEventListener(
  "keydown",
  function (e) {
    if (e.key !== "Tab") return;
    const ta = e.target;
    if (ta.tagName !== "TEXTAREA") return;

    e.preventDefault();
    e.stopPropagation();

    const { value, selectionStart, selectionEnd } = ta;

    const lineStart = value.lastIndexOf("\n", selectionStart - 1) + 1;
    const lineEnd =
      value.indexOf("\n", selectionEnd) === -1
        ? value.length
        : value.indexOf("\n", selectionEnd);

    const selectedBlock = value.substring(lineStart, lineEnd);
    const lines = selectedBlock.split("\n");

    let newLines;
    let startDelta = 0;
    let totalDelta = 0;

    if (e.shiftKey) {
      newLines = lines.map((line, i) => {
        const match = line.match(/^( {1,2})/);
        if (match) {
          const removed = match[1].length;
          if (i === 0) startDelta = -removed;
          totalDelta -= removed;
          return line.substring(removed);
        }
        return line;
      });
    } else {
      newLines = lines.map((line, i) => {
        if (i === 0) startDelta = INDENT.length;
        totalDelta += INDENT.length;
        return INDENT + line;
      });
    }

    const newBlock = newLines.join("\n");
    const before = value.substring(0, lineStart);
    const after = value.substring(lineEnd);

    setValue(ta, before + newBlock + after);

    if (selectionStart === selectionEnd) {
      const newPos = Math.max(lineStart, selectionStart + startDelta);
      ta.selectionStart = newPos;
      ta.selectionEnd = newPos;
    } else {
      ta.selectionStart = Math.max(lineStart, selectionStart + startDelta);
      ta.selectionEnd = selectionEnd + totalDelta;
    }
  },
  true
);

// "[] " → "- [ ] " auto-expansion
document.addEventListener(
  "keydown",
  function (e) {
    if (e.key !== " ") return;
    const ta = e.target;
    if (ta.tagName !== "TEXTAREA") return;

    const { value, selectionStart } = ta;
    const lineStart = value.lastIndexOf("\n", selectionStart - 1) + 1;
    const lineBeforeCursor = value.substring(lineStart, selectionStart);

    // Match "[]" with optional leading whitespace
    const match = lineBeforeCursor.match(/^(\s*)\[\]$/);
    if (!match) return;

    e.preventDefault();
    e.stopPropagation();

    const indent = match[1];
    const replacement = indent + "- [ ] ";
    const before = value.substring(0, lineStart);
    const after = value.substring(selectionStart);

    setValue(ta, before + replacement + after);

    const newPos = lineStart + replacement.length;
    ta.selectionStart = newPos;
    ta.selectionEnd = newPos;
  },
  true
);
