import express from 'express';
import getAllTodo from '../controller/todo/get-all-todo.js';
import getTodo from '../controller/todo/get-todo.js';
import updateTodo from '../controller/todo/update-todo.js';
import updateTodoItem from '../controller/todo/update-todo-item.js';
import createTodo from '../controller/todo/create-todo.js';
import deleteTodoItem from '../controller/todo/delete-todo-item.js';
import deleteTodo from '../controller/todo/delete-todo.js';
const routes = express.Router();

routes.get('/', getAllTodo);
routes.post('/', createTodo);
routes.get('/:id', getTodo);
routes.put('/:id', updateTodo);
routes.delete('/:id', deleteTodo);
routes.delete('/:id/:itemid', deleteTodoItem);
routes.put('/:id/:itemid', updateTodoItem);

export default routes;
