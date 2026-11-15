const express = require('express')
const router = express.Router()

const {get_todos, get_one_todo, create_todo, update_todo, delete_todo} = require('../controllers/todo.controller')

router.route('/').get(get_todos).post(create_todo)
router.route('/:id').get(get_one_todo).put(update_todo).delete(delete_todo)

module.exports = router