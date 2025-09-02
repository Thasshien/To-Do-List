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

const getTasks = async (req, res) => {
    try {
        const tasks = await taskModel.find();
        res.status(200).json(tasks);
    }  
    catch (error) {
        res.status(500).json({ error: error.message });
    }  
};

const deleteTask = async (req, res) => {
    const { id } = req.body;   
    try {
        if(!id){
            return res.status(400).json({"message":"No ID given"})
        }       
        const deletedTask = await taskModel.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task deleted successfully" });
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const completedTask = async(req,res) => {
    console.log('Entered backend')
    const { id } = req.body;
    console.log(id);
    try {       
        if(!id){
            return res.status(400).json({"message":"No ID given"})
        }
        const task = await taskModel.findById(id);
        console.log(task); 
        if(!completedTask){
            return res.status(404).json({ message: "Task not found" });
        }
        task.status = "completed";
        await task.save();
        console.log("after changes: ",task);
        res.status(200).json({ message: "Task Completed successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {addTask , getTasks, deleteTask, completedTask};