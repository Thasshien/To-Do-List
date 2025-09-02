import React, { useState, useContext } from "react";
import "./taskAdder.css";
import {App_Context} from "../context/context";
import axios from "axios";
import { toast } from "react-toastify";

const TaskAdder = ({ isOpen, onClose}) => {
  const [task, setTask] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setdescription] = useState("")
  const {url} = useContext(App_Context);

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!task.trim()){
        return;
    }
    
    let newurl = url + '/api/task/add';

    try{
        const response = await axios.post(newurl, {task, description, deadline});
        toast.success("Task added successfully");
    }
    catch(error){
        toast.error("Error adding task");
        return;
    }

    setTask("");
    setDeadline("");
    setdescription("");
    onClose();
  };

  if (!isOpen){
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="heading-container">
            <h2>Add New Task</h2>
        </div>  
        <div className="input-container">
            <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
            <input
                type="text"
                placeholder="description"
                value={description}
                onChange={(e) => setdescription(e.target.value)}
            />
            <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
            />
            <div className="modal-actions">
                <button type="button" onClick={onClose}>
                Cancel
                </button>
                <button type="submit">Add Task</button>
            </div>
            </form>
        </div>
      </div>
    </div>  
  );
};

export default TaskAdder;
