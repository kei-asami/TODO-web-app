import { z } from 'zod';

export const todoSchema = z.object({
  title: z.string().min(1, 'タイトルは必須です'),
  assignee: z.string().min(1, '担当者名は必須です'),
  deadline: z.string().min(1, '締切日は必須です'),
  status: z.enum(['未着手', '進行中', '完了']),
  content: z.string().optional(),
});

export type TodoFormData = z.infer<typeof todoSchema>;