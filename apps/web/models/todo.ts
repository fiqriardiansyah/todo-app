import { z } from 'zod';

export const todoItem = z.object({
    id: z.number().optional(),
    description: z.string(),
    isChecked: z.boolean(),
    checkedAt: z.string(),
});

export const todo = z.object({
    id: z.number().optional(),
    title: z.string(),
    description: z.string().optional(),
    createdAt: z.string().optional(),
    isDone: z.boolean().optional(),
    item: z.array(todoItem).optional(),
    secure: z.boolean().optional(),
    password: z.string().optional(),
});

export type TodoType = z.infer<typeof todo>;
export type TodoTypeResponse = {
    todoId: number;
};
