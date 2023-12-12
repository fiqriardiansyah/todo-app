import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

const logout = async (req, res) => {
    try {
        const cookies = req.cookies;
        if (!cookies?.jwt) return res.sendStatus(204);

        const refreshToken = cookies?.jwt;

        const user = await prisma.user.findFirst({
            where: {
                refreshToken,
            },
        });

        if (!user) {
            res.clearCookie('jwt', {
                httpOnly: true,
                sameSite: 'None',
                secure: true,
            });
            return res.sendStatus(204);
        }

        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                refreshToken: '',
            },
        });

        res.clearCookie('jwt', {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
        });
        return res.sendStatus(204);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

export default logout;
