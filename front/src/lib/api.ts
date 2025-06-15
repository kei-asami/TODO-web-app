import { Todo } from '@/types/todo';
import { TodoFormData } from '@/lib/validations';

const API_URL = 'http://localhost:8080/api';

export const apiClient = {
  async getTodos(): Promise<Todo[]> {
    const response = await fetch(`${API_URL}/todos`);
    return response.json();
  },

  async createTodo(data: TodoFormData): Promise<Todo> {
    const response = await fetch(`${API_URL}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async updateTodo(id: string, data: Partial<TodoFormData>): Promise<Todo> {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async deleteTodo(id: string): Promise<void> {
    await fetch(`${API_URL}/todos/${id}`, { method: 'DELETE' });
  },
};