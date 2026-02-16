// ==UserScript==
// @name         GitHub Task List Tab Indent
// @namespace    niko-dev/userscripts
// @version      1.0.0
// @description  Tab/Shift+Tab to indent/outdent lines in GitHub textareas
// @match        https://github.com/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const INDENT = "  "; // 2 spaces

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Tab") return;
    const ta = e.target;
    if (ta.tagName !== "TEXTAREA") return;

    e.preventDefault();

    const { value, selectionStart, selectionEnd } = ta;

    // Find the start of the first selected line
    const lineStart = value.lastIndexOf("\n", selectionStart - 1) + 1;
    // Find the end of the last selected line
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
      // Outdent
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
      // Indent
      newLines = lines.map((line, i) => {
        if (i === 0) startDelta = INDENT.length;
        totalDelta += INDENT.length;
        return INDENT + line;
      });
    }

    const newBlock = newLines.join("\n");
    const before = value.substring(0, lineStart);
    const after = value.substring(lineEnd);

    ta.value = before + newBlock + after;

    // Restore selection
    if (selectionStart === selectionEnd) {
      // No selection — just move cursor
      const newPos = Math.max(lineStart, selectionStart + startDelta);
      ta.selectionStart = newPos;
      ta.selectionEnd = newPos;
    } else {
      // Selection — adjust range
      ta.selectionStart = Math.max(lineStart, selectionStart + startDelta);
      ta.selectionEnd = selectionEnd + totalDelta;
    }

    // Notify GitHub's internal state of the change
    ta.dispatchEvent(new Event("input", { bubbles: true }));
  });
})();
