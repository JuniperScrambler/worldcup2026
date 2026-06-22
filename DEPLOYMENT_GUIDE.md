# GitHub Pages デプロイ手順書

このダッシュボードアプリをGitHub Pagesにアップロードし、iPhoneでPWAとしてインストールできるようにする手順です。

## 前提条件
- GitHubアカウントをお持ちであること。
- ローカル環境に `git` がインストールされていること。

---

## ステップ 1: ローカルでのGit初期化とコミット

ターミナルを開き、プロジェクトディレクトリ（`/Users/andoryota/.gemini/antigravity/scratch/worldcup2026-pwa`）に移動して以下のコマンドを実行します。

```bash
# Gitリポジトリを初期化
git init

# 全ファイルを追加
git add .

# 初期コミットを作成
git commit -m "Initial commit: World Cup 2026 PWA Dashboard"
```

---

## ステップ 2: GitHubリポジトリの作成とプッシュ

1. [GitHub](https://github.com) にログインします。
2. 右上の「**+**」アイコンをクリックし、「**New repository**」を選択します。
3. リポジトリ名を設定します（例: `worldcup2026`）。
   - **Public**（パブリック）に設定してください（無料プランでGitHub Pagesを使用するために必要です）。
   - 「Initialize this repository with...」はすべて**チェックを外したまま**にしてください。
4. 「Create repository」ボタンをクリックします。
5. 作成後に表示される画面の「**…or push an existing repository from the command line**」のコマンドをターミナルで実行します。

```bash
# メインブランチ名を main に設定
git branch -M main

# リモートリポジトリの追加（YOUR_USERNAME と リポジトリ名 をご自身の設定に置き換えてください）
git remote add origin https://github.com/YOUR_USERNAME/worldcup2026.git

# コードをGitHubにプッシュ
git push -u origin main
```

---

## ステップ 3: GitHub Pagesの設定

1. GitHub上のリポジトリページを開きます。
2. 右上のメニューから **Settings**（設定）タブをクリックします。
3. 左側のメニューで「Code and automation」の下にある **Pages** を選択します。
4. **Build and deployment** セクションで以下を設定します：
   - **Source**: `Deploy from a branch` を選択。
   - **Branch**: `main` ブランチ、およびフォルダーを `/ (root)` に設定。
5. **Save**（保存）ボタンをクリックします。

---

## ステップ 4: アプリの確認とインストール

1. 1〜2分待つと、GitHub Pagesの画面上部にデプロイされたURLが表示されます。
   - URL形式: `https://<YOUR_USERNAME>.github.io/worldcup2026/`
2. **iPhoneのSafari**でこのURLにアクセスします。
3. 画面下部の「インストールガイド」またはSafariの「共有」ボタン（下矢印のついた四角形 ⎋ ）をタップします。
4. メニューから「**ホーム画面に追加**」を選択します。
5. ホーム画面にアイコンが追加されます。タップすると、ブラウザの枠のないフルスクリーン（スタンドアロンモード）でアプリが起動します！
