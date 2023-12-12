import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getTodo = async (req, res) => {
    try {
        const id = req.params?.id;
        const user = req?.user;

        if (isNaN(id))
            return res.status(400).json({ message: 'need id number' });
        if (!id) return res.sendStatus(404);

        const todo = await prisma.todo.findFirst({
            where: {
                id: parseInt(id),
                authorId: parseInt(user?.id),
            },
            include: {
                item: true,
            },
        });

        if (!todo)
            return res
                .status(404)
                .json({ message: `Cannot find todo with id ${id}` });

        return res.status(200).json({ data: todo, message: 'success' });
    } catch (e) {
        return res.status(500).json({ message: e?.message });
    }
};

export default getTodo;
