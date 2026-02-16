# userscripts

GitHub の UX を改善するブラウザ拡張・スクリプト集。

## GitHub Tab Indent

GitHub の Markdown エディタにキーボードショートカットを追加する Chrome 拡張。

### 機能

| ショートカット | 動作 |
|---|---|
| `Tab` | 現在行（or 選択行）を 2 スペースインデント |
| `Shift+Tab` | 現在行（or 選択行）を 2 スペースアウトデント |
| `[]` + `Space` | `- [ ] ` に自動展開（タスクリスト） |

Issue, Pull Request, Comment すべての textarea で動作する。

### インストール

1. このリポジトリをクローン

   ```bash
   git clone https://github.com/m235ibmw/userscripts.git
   ```

2. Chrome で `chrome://extensions` を開く

3. 右上の **デベロッパー モード** を ON にする

4. **パッケージ化されていない拡張機能を読み込む** をクリック

5. `github-tab-indent-ext/` フォルダを選択

6. GitHub の Issue を開いて textarea で `Tab` を試す

### 更新方法

`git pull` で最新を取得した後:

1. `chrome://extensions` を開く
2. 「GitHub Tab Indent」カードのリロードアイコンをクリック
3. GitHub のページをリロード
