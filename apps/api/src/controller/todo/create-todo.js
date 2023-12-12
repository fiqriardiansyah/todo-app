import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createTodo = async (req, res) => {
    try {
        const { title, description, items, isDone } = req.body;
        const user = req.user;

        console.log(req.body);

        if (!title) {
            return res.status(400).json({ message: 'Field title is required' });
        }

        const saveTodo = await prisma.$transaction(async (tx) => {
            const saveTodo = await tx.todo.create({
                data: {
                    title,
                    description,
                    createdAt: new Date().toISOString(),
                    authorId: user.id,
                    isDone,
                },
            });

            if (items?.length) {
                // save item todo
                await tx.todo.update({
                    where: { id: saveTodo.id },
                    data: {
                        item: {
                            createMany: {
                                data: items,
                            },
                        },
                    },
                });
            }

            return saveTodo;
        });

        res.status(201).json({
            message: 'Todo create success',
            data: { todoId: saveTodo.id },
        });
    } catch (e) {
        res.status(500).json({ message: e?.message });
    }
};

export default createTodo;
