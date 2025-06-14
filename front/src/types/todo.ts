export type TodoStatus = '未着手' | '進行中' | '完了';

export interface Todo {
  id: string;
  title: string;
  assignee: string;
  deadline: string; // YYYY-MM-DD形式
  status: TodoStatus;
  content?: string;
  createdAt: Date;
}

export interface TodoFormData {
  title: string;
  assignee: string;
  deadline: string;
  status: TodoStatus;
  content?: string;
}