import express from 'express';
import login from '../controller/auth/login.js';
import register from '../controller/auth/register.js';
import logout from '../controller/auth/logout.js';
const routes = express.Router();

routes.post('/register', register);
routes.post('/login', login);
routes.get('/logout', logout);

export default routes;
