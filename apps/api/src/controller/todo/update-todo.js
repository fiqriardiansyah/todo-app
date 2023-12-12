import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const updateTodo = async (req, res) => {
    try {
        const id = req.params?.id;
        const user = req?.user;

        if (!id) return res.sendStatus(404);
        if (isNaN(id))
            return res.status(400).json({ message: 'need id number' });

        const { title, description, isDone, items } = req.body;

        if (!title) {
            return res.status(400).json({ message: 'Field title is required' });
        }

        const updateTodo = await prisma.$transaction(async (tx) => {
            const updateTodo = await tx.todo.update({
                where: {
                    id: parseInt(id),
                    authorId: parseInt(user?.id),
                },
                data: {
                    title,
                    description,
                    isDone,
                },
            });

            if (items?.length) {
                await Promise.all(
                    items.map(async (item) => {
                        return await tx.todo.update({
                            where: { id: updateTodo.id },
                            data: {
                                item: {
                                    update: {
                                        where: { id: item?.id },
                                        data: {
                                            ...item,
                                        },
                                    },
                                },
                            },
                        });
                    })
                );
            }

            return updateTodo;
        });

        res.status(201).json({
            message: 'Todo update success',
            data: { todoId: updateTodo.id },
        });
    } catch (e) {
        res.status(500).json({ message: e?.message });
    }
};

export default updateTodo;
