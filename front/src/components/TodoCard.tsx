import React from 'react';
import { User, Calendar, Trash2 } from 'lucide-react';
import { Todo, TodoStatus } from '@/types/todo';

interface TodoCardProps {
  todo: Todo;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TodoStatus) => void;
}

export const TodoCard: React.FC<TodoCardProps> = ({ 
  todo, 
  onDelete, 
  onStatusChange 
}) => {
  const getStatusColor = (status: TodoStatus) => {
    switch (status) {
      case '未着手':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      case '進行中':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case '完了':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const isOverdue = () => {
    const today = new Date();
    const deadline = new Date(todo.deadline);
    return today > deadline && todo.status !== '完了';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  };

  return (
    <div className="group bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-shadow duration-200">
      {/* ヘッダー部分 */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">
          {todo.title}
        </h3>
        <button
          onClick={() => onDelete(todo.id)}
          className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all duration-200"
          title="削除"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* 担当者 */}
      <div className="flex items-center gap-2 mb-2">
        <User size={16} className="text-indigo-500" />
        <span className="text-sm text-gray-900 font-normal">{todo.assignee}</span>
      </div>

      {/* 締切日 */}
      <div className="flex items-center gap-2 mb-3">
        <Calendar size={16} className="text-indigo-500" />
        <span className={`text-sm ${isOverdue() ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
          {formatDate(todo.deadline)}
          {isOverdue() && (
            <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
              期限切れ
            </span>
          )}
        </span>
      </div>

      {/* 内容 */}
      {todo.content && (
        <div className="mt-3 p-3 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-700 whitespace-pre-wrap">
            {todo.content}
          </p>
        </div>
      )}

      {/* ステータス */}
      <div className="relative mt-4 w-fit">
        <select
          value={todo.status}
          onChange={(e) => onStatusChange(todo.id, e.target.value as TodoStatus)}
          className={`px-3 py-1 rounded-lg text-sm border ${getStatusColor(todo.status)} focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          <option value="未着手">未着手</option>
          <option value="進行中">進行中</option>
          <option value="完了">完了</option>
        </select>
      </div>

    </div>
  );
};