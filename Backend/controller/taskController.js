const taskModel = require('../models/taskModel')

const addTask = async (req, res) => {
    const { task, description, deadline } = req.body; 

    try {
        if(!task || !deadline){
            return res.status(400).json({"message":"No task or Deadline given"})
        }
        const newTask = new taskModel({
            task,
            description,
            deadline,
        });

        await newTask.save();
        res.status(201).json(newTask);
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
};

module.exports = { addTask };