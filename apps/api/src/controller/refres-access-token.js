import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();
const prisma = new PrismaClient();

const refreshAccessToken = async (req, res) => {
    const cookies = req.cookies;

    console.log('REFRESHH', cookies);

    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' });
    const refreshToken = cookies.jwt;

    const user = await prisma.user.findFirst({ where: { refreshToken } });
    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || decoded.email !== user.email)
                return res.status(403).json({ message: 'Unauthorized' });

            const accessToken = jwt.sign(
                { email: user.email },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            );

            res.json({
                data: { accessToken },
                message: 'Access token refreshed!',
            });
        }
    );
};

export default refreshAccessToken;
