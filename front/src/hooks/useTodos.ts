import { useState, useCallback, useEffect } from 'react';
import { Todo, TodoStatus } from '@/types/todo';
import { TodoFormData } from '@/lib/validations';
import { apiClient } from '@/lib/api';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = useCallback(async () => {
    try {
      const data = await apiClient.getTodos();
      setTodos(data);
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const addTodo = useCallback(async (data: TodoFormData) => {
    try {
      const newTodo = await apiClient.createTodo(data);
      setTodos(prev => [newTodo, ...prev]);
    } catch (error) {
      console.error('Failed to create todo:', error);
    }
  }, []);

  const deleteTodo = useCallback(async (id: string) => {
    try {
      await apiClient.deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  }, []);

  const updateTodoStatus = useCallback(async (id: string, status: TodoStatus) => {
    try {
      const updatedTodo = await apiClient.updateTodo(id, { status });
      setTodos(prev => prev.map(todo => todo.id === id ? updatedTodo : todo));
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  }, []);

  return { todos, addTodo, deleteTodo, updateTodoStatus };
};