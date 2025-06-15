package handler

import (
	"net/http"
	"backend/internal/model"
	"backend/internal/usecase"
	"github.com/labstack/echo/v4"
)

type TodoHandler struct {
	todoUsecase *usecase.TodoUsecase
}

func NewTodoHandler(todoUsecase *usecase.TodoUsecase) *TodoHandler {
	return &TodoHandler{todoUsecase: todoUsecase}
}

func (h *TodoHandler) GetAllTodos(c echo.Context) error {
	todos, err := h.todoUsecase.GetAllTodos()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}
	return c.JSON(http.StatusOK, todos)
}

func (h *TodoHandler) GetTodoByID(c echo.Context) error {
	id := c.Param("id")
	todo, err := h.todoUsecase.GetTodoByID(id)
	if err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "Todo not found"})
	}
	return c.JSON(http.StatusOK, todo)
}

func (h *TodoHandler) CreateTodo(c echo.Context) error {
	var req model.CreateTodoRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request"})
	}

	todo, err := h.todoUsecase.CreateTodo(&req)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusCreated, todo)
}

func (h *TodoHandler) UpdateTodo(c echo.Context) error {
	id := c.Param("id")
	var req model.UpdateTodoRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request"})
	}

	todo, err := h.todoUsecase.UpdateTodo(id, &req)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusOK, todo)
}

func (h *TodoHandler) DeleteTodo(c echo.Context) error {
	id := c.Param("id")
	err := h.todoUsecase.DeleteTodo(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusOK, map[string]string{"message": "Todo deleted"})
}