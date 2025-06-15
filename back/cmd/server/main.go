package main

import (
	"log"
	"backend/internal/config"
	"backend/internal/handler"
	"backend/internal/repository"
	"backend/internal/usecase"
	"backend/pkg/database"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	cfg := config.LoadConfig()

	db, err := database.NewConnection(&cfg.Database)
	if err != nil {
		log.Fatal(err)
	}

	todoRepo := repository.NewTodoRepository(db)
	todoUsecase := usecase.NewTodoUsecase(todoRepo)
	todoHandler := handler.NewTodoHandler(todoUsecase)

	e := echo.New()
	e.Use(middleware.CORS())

	e.GET("/health", func(c echo.Context) error {
		return c.JSON(200, map[string]string{"status": "ok"})
	})

	api := e.Group("/api")
	api.GET("/todos", todoHandler.GetAllTodos)
	api.GET("/todos/:id", todoHandler.GetTodoByID)
	api.POST("/todos", todoHandler.CreateTodo)
	api.PUT("/todos/:id", todoHandler.UpdateTodo)
	api.DELETE("/todos/:id", todoHandler.DeleteTodo)

	log.Printf("Server starting on port %s", cfg.Server.Port)
	e.Start(":" + cfg.Server.Port)
}