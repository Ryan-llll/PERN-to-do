let to_do = []
let nextId = 1

const get_todos = (req,res) =>{
    res.status(200).json({success:true,data:to_do})
    
}


const get_one_todo = (req,res) =>{
    const {id} = req.params

    const todo = to_do.find((t) => t.id === Number(id))

    if (!todo){
        return res.status(404).json({success:false, msg:'todo not found'})
        
    }
    res.status(200).json({success:true,data:todo})
    
}  


const create_todo = (req,res) =>{
    const {title, completed = false} = req.body

    if (!title){
        return res.status(400).json({success:false, msg:'Title is required'})
    }
    const new_todo ={id: nextId++, title, completed: Boolean(completed)}
    to_do.push(new_todo)
    res.status(201).json({success:true,data:new_todo})
}


const update_todo = (req,res) =>{
    const {id} = req.params
    const {title, completed} = req.body

    const todo = to_do.find((t) => t.id === Number(id))

    if(!todo){
        return res.status(404).json({success:false, msg:'Todo not found'})
    }
    if (title !== undefined) todo.title = title
    if (completed !== undefined) todo.completed = completed
    res.status(200).json({success: true, data: todo})

}


const delete_todo = (req,res) =>{
    const {id} = req.params

    const index = to_do.findIndex((t) => t.id === Number(id))

    if(index === -1){
        return res.status(404).json({success:false, msg:'Todo not found'})
    }
    to_do.splice(index, 1)
    res.status(204).send()
}


export {get_todos, get_one_todo, create_todo, update_todo, delete_todo}