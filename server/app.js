import express from 'express'
const app = express()
import todoRouter from './routes/todo.routes.js' 
import authRouter from './routes/auth.routes.js'
import auth from './middleware/auth.js'

app.use(express.json())
app.use('/api/todos', auth, todoRouter)
app.use('/api/auth', authRouter)


app.get('/api/health',(req,res)=>{
    res.status(200).json({status:'ok'})
})


export default app   