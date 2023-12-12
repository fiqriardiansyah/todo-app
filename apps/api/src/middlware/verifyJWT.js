import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();
const prisma = new PrismaClient();

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
        if (err || !decoded?.email) return res.sendStatus(403);
        const user = await prisma.user.findFirst({
            where: {
                email: decoded.email,
            },
        });
        if (!user) return res.status(404).json({ message: 'Cannot find user' });
        req.user = user;
        next();
    });
};

export default verifyJWT;
