import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

const MIN_LENGTH_PASSWORD = 8;

const register = async (req, res) => {
    try {
        const { name, password, email } = req.body;
        if (!name || !password || !email) {
            return res.status(400).json({
                message: 'Field name, password and email is required',
            });
        }

        if (password.toString().length < MIN_LENGTH_PASSWORD) {
            return res.status(400).json({
                message: 'Min password length is 8 character',
            });
        }

        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (user)
            return res.status(409).json({ message: 'email already exist' });

        const hashedPassword = await bcrypt.hash(password.toString(), 10);
        const newUser = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
                createdAt: new Date().toISOString(),
            },
        });

        return res
            .status(201)
            .json({ message: 'User created!', data: { id: newUser.id } });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

export default register;
