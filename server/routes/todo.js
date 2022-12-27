import express from "express"

import todoController from '../controllers/todoController.js'

const router = express.Router()

router.get('/', todoController.getAllTodos)
router.get('/get-todo/:id', todoController.getTodo)
router.post('/create-todo', todoController.createTodo)
router.patch('/update-todo/:id', todoController.updateTodo)
router.delete('/delete-todo/:id', todoController.deleteTodo)


export default router