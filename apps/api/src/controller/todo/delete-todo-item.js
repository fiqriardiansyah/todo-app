import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const deleteTodoItem = async (req, res) => {
    try {
        const { id, itemid } = req.params;
        const user = req?.user;

        if (!id || !itemid) return res.sendStatus(404);
        if (isNaN(id) || isNaN(itemid))
            return res
                .status(400)
                .json({ message: 'need id number and item id' });

        const deleteTodoItem = await prisma.todoItem.delete({
            where: {
                id: parseInt(itemid),
                todoId: parseInt(id),
                authorId: parseInt(user?.id),
            },
        });

        return res.status(201).json({
            message: 'Delete success',
            data: { itemId: deleteTodoItem.id },
        });
    } catch (e) {
        res.status(500).json({ message: e?.message });
    }
};

export default deleteTodoItem;
