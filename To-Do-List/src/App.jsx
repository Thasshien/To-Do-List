
import { useState } from 'react';
import './App.css';
import Navbar from './components/navbar/navbar';
import Body from './components/body/body';
import TaskAdder from "./components/taskAdder/taskAdder";
import { ToastContainer } from "react-toastify";

function App() {
  // Example state: replace with your actual logic
  const [pendingCount, setPendingCount] = useState(3);
  const [completedCount, setCompletedCount] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Navbar pending={pendingCount} completed={completedCount} onAddClick={() => setIsModalOpen(true)}/>
      <TaskAdder 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
      <Body />
      <ToastContainer position="bottom-right"/>
    </>
  );
}

export default App;
