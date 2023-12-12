import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const updateTodoItem = async (req, res) => {
    try {
        const { id, itemid } = req.params;
        const { description, isChecked, checkedAt } = req.body;
        const user = req?.user;

        if (!id || !itemid) return res.sendStatus(404);
        if (isNaN(id) || isNaN(itemid))
            return res
                .status(400)
                .json({ message: 'need id number and item id' });

        if (!description) {
            return res
                .status(400)
                .json({ message: 'todo item description cannot be empty' });
        }

        const todoItem = await prisma.todoItem.update({
            where: {
                todoId: parseInt(id),
                id: parseInt(itemid),
                authorId: parseInt(user?.id),
            },
            data: {
                isChecked,
                description,
                checkedAt,
            },
        });

        return res
            .status(201)
            .json({ message: 'success', data: { itemId: todoItem.id } });
    } catch (e) {
        res.status(500).json({ message: e?.message });
    }
};

export default updateTodoItem;
