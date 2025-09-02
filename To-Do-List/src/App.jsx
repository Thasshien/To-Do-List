import { useState } from 'react';
import './App.css';
import Navbar from './components/navbar/navbar';
import Body from './components/body/body';
import { ToastContainer } from "react-toastify";

function App() {
  const [pendingCount, setPendingCount] = useState(3);
  const [completedCount, setCompletedCount] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);  

  return (
    <div className="App">
      <Navbar
        pending={pendingCount}
        completed={completedCount}
        onAddClick={() => setIsModalOpen(true)}
      />
      <Body
        isModalOpen={isModalOpen}     
        setIsModalOpen={setIsModalOpen} 
      />
      <ToastContainer position="bottom-right"/>
    </div>
  );
}

export default App;
