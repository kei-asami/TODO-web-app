import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Todo, TodoStatus } from '@/types/todo';
import { TodoFormData } from '@/lib/validations';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = useCallback((data: TodoFormData) => {
    const newTodo: Todo = {
      id: uuidv4(),
      title: data.title,
      assignee: data.assignee,
      deadline: data.deadline,
      status: data.status,
      content: data.content || '',
      createdAt: new Date(),
    };
    
    setTodos(prev => [...prev, newTodo]);
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  const updateTodoStatus = useCallback((id: string, status: TodoStatus) => {
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id ? { ...todo, status } : todo
      )
    );
  }, []);

  return {
    todos,
    addTodo,
    deleteTodo,
    updateTodoStatus,
  };
};