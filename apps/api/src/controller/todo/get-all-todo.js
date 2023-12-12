import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getAllTodo = async (req, res) => {
    try {
        const user = req.user;
        const todos = await prisma.todo.findMany({
            where: { authorId: user.id },
            include: { item: true },
        });

        return res.status(200).json({ message: 'success', data: { todos } });
    } catch (e) {
        return res.status(500).json({ message: e?.message });
    }
};

export default getAllTodo;
