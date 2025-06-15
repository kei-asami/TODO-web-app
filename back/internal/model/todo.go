package model

import "time"

type Todo struct {
	ID        string    `json:"id" gorm:"primaryKey;type:varchar(36)"`
	Title     string    `json:"title" gorm:"type:varchar(255);not null"`
	Assignee  string    `json:"assignee" gorm:"type:varchar(255);not null"` // ← 型と長さを明示的に指定
	Deadline  string    `json:"deadline" gorm:"type:date;not null"`
	Status    string    `json:"status" gorm:"type:enum('未着手','進行中','完了');not null;default:'未着手'"`
	Content   string    `json:"content" gorm:"type:text"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

type CreateTodoRequest struct {
	Title    string `json:"title"`
	Assignee string `json:"assignee"`
	Deadline string `json:"deadline"`
	Status   string `json:"status"`
	Content  string `json:"content"`
}

type UpdateTodoRequest struct {
	Title    string `json:"title,omitempty"`
	Assignee string `json:"assignee,omitempty"`
	Deadline string `json:"deadline,omitempty"`
	Status   string `json:"status,omitempty"`
	Content  string `json:"content,omitempty"`
}