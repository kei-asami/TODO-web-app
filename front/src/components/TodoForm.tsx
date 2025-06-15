import React from 'react';
import { FileText, User, Calendar, Clock } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { todoSchema, TodoFormData } from '@/lib/validations';

interface TodoFormProps {
  onSubmit: (data: TodoFormData) => void;
  onCancel: () => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({ onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TodoFormData>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      status: '未着手',
    },
  });

  const handleFormSubmit = (data: TodoFormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">新しいTODOを作成</h3>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div>
          <label htmlFor="title" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
            <FileText size={16} className="text-gray-500" />
            <span>タイトル</span>
            <span className="text-red-500">*</span>
          </label>
          <input
            {...register('title')}
            type="text"
            id="title"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
            placeholder="TODOのタイトルを入力"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="assignee" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
            <User size={16} className="text-gray-500" />
            <span>担当者名</span>
            <span className="text-red-500">*</span>
          </label>
          <input
            {...register('assignee')}
            type="text"
            id="assignee"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
            placeholder="担当者名を入力"
          />
          {errors.assignee && (
            <p className="mt-1 text-sm text-red-600">{errors.assignee.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="deadline" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
            <Calendar size={16} className="text-gray-500" />
            <span>締切日</span>
            <span className="text-red-500">*</span>
          </label>
          <input
            {...register('deadline')}
            type="date"
            id="deadline"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          />
          {errors.deadline && (
            <p className="mt-1 text-sm text-red-600">{errors.deadline.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="status" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
            <Clock size={16} className="text-gray-500" />
            <span>ステータス</span>
          </label>
          <select
            {...register('status')}
            id="status"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          >
            <option value="未着手">未着手</option>
            <option value="進行中">進行中</option>
            <option value="完了">完了</option>
          </select>
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            内容
          </label>
          <textarea
            {...register('content')}
            id="content"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
            placeholder="TODOの詳細な説明を入力"
          />
        </div>

        <div className="flex gap-3 pt-2">
            <button
                type="submit"
                className="px-4 py-2 font-semibold text-white rounded-lg shadow-md 
                            bg-gradient-to-r from-green-500 to-emerald-600 
                            hover:from-green-600 hover:to-emerald-700 
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 
                            transition-all"
                >
                作成
            </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-white bg-gray-400 rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            キャンセル
          </button>
        </div>
      </form>
    </div>
  );
};