    import React, { useContext, useEffect, useState, useRef } from "react";
    import "./body.css";
    import { App_Context } from "../context/context";
    import axios from "axios";
    import { toast } from "react-toastify";
    import TaskAdder from "../taskAdder/taskAdder";

    const Body = ({ isModalOpen, setIsModalOpen }) => {
        const { url,searchTerm,setPendingCount,setCompletedCount } = useContext(App_Context);
        const [tasks, setTasks] = useState([]);
        const pendingDeletesRef = useRef({});

        const handleAddTask = (newTask) => {
            setTasks([newTask, ...tasks]);
        };

        useEffect(() => {
            const fetchTasks = async () => {
                try {
                    let newurl = url + '/api/task/getTasks';
                    const res = await axios.get(newurl);
                    const tasks = res.data || [];
                    setTasks(tasks);
                }   
                catch (error) {
                    console.error("Error fetching Task:", error);
                }
            };

            fetchTasks();
        }, [url]);

        const filteredTasks = tasks.filter((task) =>
            task.task.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const deleteHandler = (id) => {
        const deletedTask = tasks.find((t) => t._id === id);
        if (!deletedTask) return;

        setTasks((prev) => prev.filter((t) => t._id !== id));

        const timeoutId = setTimeout(async () => {
        try {
            const newurl = url + "/api/task/delete";
            await axios.delete(newurl, { data: { id } });
            // remove that pending-delete entry after permanent deletion
            delete pendingDeletesRef.current[id];
            console.log("Task permanently deleted:", id);
        } catch (err) {
            console.error("Error deleting task permanently:", err);
        }
        }, 5000);

        // store timeout + task in ref so we can undo
        pendingDeletesRef.current[id] = { timeoutId, task: deletedTask };

        toast.info(
        <div>
            Task deleted
            <button className="undo-button" onClick={() => undoDelete(id)}>
            Undo
            </button>
        </div>,
        { autoClose: 5000 }
        );
    };

        const completedhandeler = async (id) => {
            try {
                let newurl = url + '/api/task/completed';
                await axios.put(newurl, { id });
                setTasks(prev =>
                    prev.map((task) =>
                        task._id === id ? { ...task, status: 'completed' } : task
                    )
                );
            } catch (error) {
                console.error("Error marking task as completed:", error);
            }
        };

        const undoDelete = (id) => {
            const entry = pendingDeletesRef.current[id];
            if (!entry) {
            toast.error("Undo not available (too late)");
            return;
            }
            // cancel pending deletion
            clearTimeout(entry.timeoutId);

            setTasks((prev) => [entry.task, ...prev]);
            // remove from pending map
            delete pendingDeletesRef.current[id];

            toast.success("Undo successful!");
        };

        const sortedTasks = [...tasks].sort((a,b) => {
            if (a.status === 'pending' && b.status === 'completed') return -1;
            if (a.status === 'completed' && b.status === 'pending') return 1;
        });
        
        useEffect(() => {
            setPendingCount(tasks.filter(task => task.status === 'pending').length);
            setCompletedCount(tasks.filter(task => task.status === 'completed').length);
            }, [tasks]);

        return (
            <div className="Tasks">

                <TaskAdder
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onAddTask={handleAddTask}
                />

                <div className="tasks_container">
                    {tasks.length === 0 ? (
                        <div className="no-requests">
                            <p>No pending tasks for now</p>
                            <p>Click on the + icon to add Tasks</p>
                        </div>
                    ) : (
                        <div className="task-list">
                        {filteredTasks.length === 0 ? (
                            <div className="no-requests">
                            <p>No tasks match your search.</p>
                            </div>
                        ) : (
                            filteredTasks.map((task, idx) => (
                                <div key={task._id || idx} className={`task-item${task.status === 'completed' ? ' completed' : ''}`}>
                                    <div className="task-main">
                                    <span className="task-name">{task.task}</span>
                                    <span className="description">{task.description}</span>
                                    <span className="task-deadline">
                                        {new Date(task.deadline).toISOString().split("T")[0]}
                                    </span>
                                    </div>
                                    <div className="options">
                                    <button className="acc" onClick={() => completedhandeler(task._id)}>
                                        {task.status === 'completed' ? 'Completed' : 'Mark as done'}
                                    </button>
                                    <button className="rej" onClick={() => deleteHandler(task._id)}>
                                        Delete
                                    </button>
                                    </div>
                                </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    export default Body;
