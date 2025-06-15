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
	// 最初に、更新対象のTODOが存在するかどうかを確認
	_, err := u.todoRepo.GetByID(id)
	if err != nil {
		return nil, err // 存在しなければエラーを返す
	}

	// 更新するデータを入れるための空のマップを作成
	updateData := make(map[string]interface{})

	// リクエスト(req)に来たフィールドだけをマップに追加していく
	if req.Title != "" {
		updateData["title"] = req.Title
	}
	if req.Assignee != "" {
		updateData["assignee"] = req.Assignee
	}
	if req.Deadline != "" {
		updateData["deadline"] = req.Deadline
	}
	if req.Status != "" {
		updateData["status"] = req.Status
	}
	// omitemptyがあるので、Contentは単純な比較でOK
	if req.Content != "" {
		updateData["content"] = req.Content
	}

	// もし更新するデータが何もなければ、何もしない
	if len(updateData) == 0 {
		return u.todoRepo.GetByID(id) // 現在のデータをそのまま返す
	}
	
	// repositoryのUpdateメソッドを、更新用マップを渡して呼び出す
	if err := u.todoRepo.Update(id, updateData); err != nil {
		return nil, err
	}

	// 最後に、更新後の最新のTODOデータをDBから取得して返す
	return u.todoRepo.GetByID(id)
}

func (u *TodoUsecase) DeleteTodo(id string) error {
	return u.todoRepo.Delete(id)
}