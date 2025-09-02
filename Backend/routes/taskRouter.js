const express = require('express')
const userRouter = express.Router()
const {addTask,getTasks,deleteTask,completedTask} = require('../controller/taskController')

userRouter.post('/add',addTask)
userRouter.get('/getTasks', getTasks)
userRouter.delete('/delete',deleteTask)
userRouter.put('/completed',completedTask)

module.exports = userRouter