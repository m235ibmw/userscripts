# userscripts

Browser extensions & scripts for GitHub UX enhancements.

## GitHub Tab Indent

Chrome extension that adds keyboard shortcuts to GitHub's markdown editor.

### Features

| Shortcut | Action |
|---|---|
| `Tab` | Indent current line (or selected lines) by 2 spaces |
| `Shift+Tab` | Outdent current line (or selected lines) by 2 spaces |
| `[]` + `Space` | Auto-expand to `- [ ] ` (task list item) |

Works in all GitHub textareas — Issues, Pull Requests, Comments.

### Install

1. Clone this repo

   ```bash
   git clone https://github.com/m235ibmw/userscripts.git
   ```

2. Open `chrome://extensions` in Chrome

3. Enable **Developer mode** (toggle in the top right)

4. Click **Load unpacked**

5. Select the `github-tab-indent-ext/` folder

6. Open any GitHub Issue and try `Tab` in a textarea

### Update

After pulling new changes:

1. Open `chrome://extensions`
2. Click the reload icon on the "GitHub Tab Indent" card
3. Reload the GitHub page
