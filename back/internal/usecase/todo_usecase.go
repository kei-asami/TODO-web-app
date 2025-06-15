package usecase

import (
	"backend/internal/model"
	"backend/internal/repository"
	"github.com/google/uuid"
)

type TodoUsecase struct {
	todoRepo *repository.TodoRepository
}

func NewTodoUsecase(todoRepo *repository.TodoRepository) *TodoUsecase {
	return &TodoUsecase{todoRepo: todoRepo}
}

func (u *TodoUsecase) GetAllTodos() ([]*model.Todo, error) {
	return u.todoRepo.GetAll()
}

func (u *TodoUsecase) GetTodoByID(id string) (*model.Todo, error) {
	return u.todoRepo.GetByID(id)
}

func (u *TodoUsecase) CreateTodo(req *model.CreateTodoRequest) (*model.Todo, error) {
	if req.Status == "" {
		req.Status = "未着手"
	}

	todo := &model.Todo{
		ID:       uuid.New().String(),
		Title:    req.Title,
		Assignee: req.Assignee,
		Deadline: req.Deadline,
		Status:   req.Status,
		Content:  req.Content,
	}

	err := u.todoRepo.Create(todo)
	return todo, err
}

func (u *TodoUsecase) UpdateTodo(id string, req *model.UpdateTodoRequest) (*model.Todo, error) {
	todo, err := u.todoRepo.GetByID(id)
	if err != nil {
		return nil, err
	}

	if req.Title != "" {
		todo.Title = req.Title
	}
	if req.Assignee != "" {
		todo.Assignee = req.Assignee
	}
	if req.Deadline != "" {
		todo.Deadline = req.Deadline
	}
	if req.Status != "" {
		todo.Status = req.Status
	}
	if req.Content != "" {
		todo.Content = req.Content
	}

	err = u.todoRepo.Update(todo)
	return todo, err
}

func (u *TodoUsecase) DeleteTodo(id string) error {
	return u.todoRepo.Delete(id)
}