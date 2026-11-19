import express from 'express'
const app = express()
import todoRouter from './routes/todo.routes.js'

app.use(express.json())
app.use('/api/todos', todoRouter)


app.get('/api/health',(req,res)=>{
    res.status(200).json({status:'ok'})
})


export default app   