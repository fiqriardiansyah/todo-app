import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const user = req?.user;

        if (!id) return res.sendStatus(404);
        if (isNaN(id))
            return res.status(400).json({ message: 'need id number' });

        const deleteTodo = await prisma.todo.delete({
            where: {
                id: parseInt(id),
                authorId: parseInt(user?.id),
            },
            include: {
                item: true,
            },
        });

        return res.status(201).json({
            message: 'Delete success',
            data: { itemId: deleteTodo.id },
        });
    } catch (e) {
        res.status(500).json({ message: e?.message });
    }
};

export default deleteTodo;
