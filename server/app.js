const express = require('express')
const app = express()
const todoRouter = require('./routes/todo.routes')

app.use(express.json())
app.use('/api/todos', todoRouter)


app.get('/api/health',(req,res)=>{
    res.status(200).json({status:'ok'})
})


module.exports = app   