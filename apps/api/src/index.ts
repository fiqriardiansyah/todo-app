import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// routes
import authRoutes from './routes/auth.js';
import todoRoutes from './routes/todo.js';
import refreshRoutes from './routes/refresh.js';

// middleware
import verifyJWT from './middlware/verifyJWT.js';
import credentials from './middlware/credentials.js';
import corsOptions from './config/cors-options.js';

dotenv.config();

const app = express();

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/refresh', refreshRoutes);

app.use(verifyJWT);
app.use('/todo', todoRoutes);

app.listen(process.env.PORT, () => {
    console.log(`server running on port http://localhost:${process.env.PORT}`);
});
