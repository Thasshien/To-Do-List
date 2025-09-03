import { useContext, useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/navbar/navbar';
import Body from './components/body/body';
import { ToastContainer } from "react-toastify";
import { App_Context } from './components/context/context';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {pendingCount, completedCount, setTheme} = useContext(App_Context);   

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
