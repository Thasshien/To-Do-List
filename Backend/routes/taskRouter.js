const express = require('express')
const userRouter = express.Router()
const {addTask} = require('../controller/taskController')

userRouter.post('/add',addTask)

module.exports = userRouter