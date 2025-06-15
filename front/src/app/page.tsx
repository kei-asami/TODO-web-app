'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useTodos } from '@/hooks/useTodos';
import { TodoForm } from '@/components/TodoForm';
import { TodoCard } from '@/components/TodoCard';
import { TodoFormData } from '@/lib/validations';

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const { todos, addTodo, deleteTodo, updateTodoStatus } = useTodos();

  const handleAddTodo = (data: TodoFormData) => {
    addTodo(data);
    setShowForm(false);
  };

  const handleCancelForm = () => {
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ヘッダー */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">TODO管理</h1>
          <p className="text-gray-600">チームのタスクを効率的に管理しましょう</p>
        </div>

        {/* 新規作成ボタン */}
        <div className="mb-6">
          
          <button
            onClick={() => setShowForm(prev => !prev)}
            className="inline-flex items-center gap-2 px-4 py-2 text-white rounded-md 
                      bg-gradient-to-r from-blue-500 to-purple-600 
                      hover:from-blue-600 hover:to-purple-700 
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 
                      transition-all"
          >
            <Plus size={20} />
            新しいTODOを作成
          </button>
          
        </div>

        {/* フォーム */}
        {showForm && (
          <TodoForm onSubmit={handleAddTodo} onCancel={handleCancelForm} />
        )}

        {/* TODO一覧 */}
        {todos.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Plus size={48} className="mx-auto" />
            </div>
            <h2 className="text-xl font-semibold text-gray-500 mb-2">
              TODOがまだありません
            </h2>
            <p className="text-gray-400">
              「新しいTODOを作成」ボタンからタスクを追加してください
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {todos.map((todo) => (
              <TodoCard
                key={todo.id}
                todo={todo}
                onDelete={deleteTodo}
                onStatusChange={updateTodoStatus}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}