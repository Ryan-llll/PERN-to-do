import express from 'express'
const router = express.Router()

import { get_todos, get_one_todo, create_todo, update_todo, delete_todo } from '../controllers/todo.controller.js'

router.route('/').get(get_todos).post(create_todo)
router.route('/:id').get(get_one_todo).put(update_todo).delete(delete_todo)
  
export default router