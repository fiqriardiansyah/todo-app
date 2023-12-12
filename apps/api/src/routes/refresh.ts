import express from 'express';
import refreshAccessToken from '../controller/refres-access-token.js';

const routes = express.Router();

routes.get('/', refreshAccessToken);

export default routes;
