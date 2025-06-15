package model

import "time"

type Todo struct {
	ID        string    `json:"id" gorm:"primaryKey"`
	Title     string    `json:"title"`
	Assignee  string    `json:"assignee"`
	Deadline  string    `json:"deadline"`
	Status    string    `json:"status"`
	Content   string    `json:"content"`
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