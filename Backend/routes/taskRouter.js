const express = require('express')
const userRouter = express.Router()
const {addTask,getTasks,deleteTask,completedTask,getCounts} = require('../controller/taskController')

userRouter.post('/add',addTask)
userRouter.get('/getTasks', getTasks)
userRouter.delete('/delete',deleteTask)
userRouter.put('/completed',completedTask)
userRouter.get('/getCounts',getCounts)

module.exports = userRouter