import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

const login = async (req, res) => {
    try {
        const { password, email } = req.body;
        if (!password || !email)
            return res
                .status(400)
                .json({ message: 'Field email and password is required' });

        const user = await prisma.user.findFirst({
            where: {
                email,
            },
        });

        if (!user)
            return res.status(401).json({ message: 'email not resgistered' });

        const match = await bcrypt.compare(password.toString(), user.password);
        if (!match) return res.status(401).json({ message: 'wrong password' });

        const accessToken = jwt.sign(
            {
                email: user.email,
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1m' }
        );

        const refreshToken = jwt.sign(
            {
                email: user.email,
            },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        await prisma.user.update({
            where: {
                email: user.email,
            },
            data: {
                refreshToken,
            },
        });

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.json({ message: 'Login success', data: { accessToken } });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

export default login;
