const express = require('express');
const cors = require('cors')
require('dotenv').config()
const app = express();
app.use(express.json())
app.use(cors())
const mongoose = require('mongoose')
const connectDB = require('./config/dbConn')

const port = process.env.PORT || 3000;

connectDB()

app.use('/api/task', require('./routes/taskRouter'))

app.get("/", (req, res) => {
  res.send("API Working")
})

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`)
})