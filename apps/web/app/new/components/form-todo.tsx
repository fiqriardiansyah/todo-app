'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useCreateTodoMutation } from 'store/api/api-todo-slice';
import { z } from 'zod';

const validationFormTodo = z.object({
    title: z.string().min(5, { message: 'min title character length is 5' }),
    description: z.string(),
});

type ValidationFormTodo = z.infer<typeof validationFormTodo>;

export default function FormTodo() {
    const [createTodoMutation, createTodoState] = useCreateTodoMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ValidationFormTodo>({
        resolver: zodResolver(validationFormTodo),
    });

    const onSubmit: SubmitHandler<ValidationFormTodo> = (data) => {
        createTodoMutation(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
            <input id="title" placeholder="title" {...register('title')} />
            {errors.title && <span className="text-red-300">{errors?.title?.message}</span>}
            <textarea id="description" cols={30} rows={10} {...register('description')} />
            <button>create todo</button>
        </form>
    );
}
