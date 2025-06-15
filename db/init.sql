SET NAMES utf8mb4;

-- データベース作成
CREATE DATABASE IF NOT EXISTS todo_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE todo_db;

-- todosテーブル作成
CREATE TABLE IF NOT EXISTS todos (
    id VARCHAR(36) PRIMARY KEY COMMENT 'UUID',
    title VARCHAR(255) NOT NULL COMMENT 'タイトル',
    assignee VARCHAR(255) NOT NULL COMMENT '担当者名',
    deadline DATE NOT NULL COMMENT '締切日',
    status ENUM('未着手', '進行中', '完了') NOT NULL DEFAULT '未着手' COMMENT 'ステータス',
    content TEXT COMMENT '詳細内容',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '作成日時',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日時',
    INDEX idx_deadline (deadline),
    INDEX idx_status (status),
    INDEX idx_assignee (assignee)
) ENGINE=InnoDB COMMENT='TODOテーブル';

-- サンプルデータ挿入（開発用）
INSERT INTO todos (id, title, assignee, deadline, status, content) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'プロジェクトお疲れ様会資料', '田中太郎', '2025-06-20', '進行中', '会場予約とプレゼン資料を準備する'),
('550e8400-e29b-41d4-a716-446655440002', 'クライアント会議準備', '佐藤花子', '2025-06-18', '未着手', '提案資料の最終確認と印刷'),
('550e8400-e29b-41d4-a716-446655440003', 'システム統合テスト', '山田次郎', '2025-06-15', '完了', 'ユーザーシナリオに基づく統合テストを実施');