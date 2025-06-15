# TODO-web-app
チームメンバーのタスク管理を効率化し、プロジェクトの進捗を可視化するためのTODO管理アプリケーション

## 技術スタック
- **Frontend**: Next.js 15 + TypeScript + Tailwind CSS
- **Backend**: Go + Echo + GORM
- **Database**: MySQL 8.0
- **Container**: Docker + Docker Compose

## 起動方法

```bash
# リポジトリクローン
git clone https://github.com/mike-nut/TODO-web-app.git
cd todo-project

# フロントエンド用
cp front/.env.example front/.env.local

# バックエンド用
cp back/.env.example back/.env

# Docker Composeで起動
docker-compose up --build
```

## アクセス
- フロントエンド: http://localhost:3000
- バックエンドAPI: http://localhost:8080
- MySQL: localhost:3306

## API仕様
- `GET /api/todos` - TODO一覧取得
- `POST /api/todos` - TODO作成
- `PUT /api/todos/:id` - TODO更新
- `DELETE /api/todos/:id` - TODO削除

## プロジェクト構成
```
todo-project/
├── front/          # Next.js frontend
├── back/           # Go backend  
├── db/             # Database init
└── docker-compose.yml
```