import React, { useState,  useContext } from "react";
import "./navbar.css";
import imgs from '../../assets/assets';
import { App_Context } from "../context/context";


const Navbar = ({ pending, completed, onAddClick }) => {

    const{searchTerm , setSearchTerm} = useContext(App_Context);

    return (
        <div className="navbar">
            <div className="navbar-left">
                <div className="logo-section">
                    <img src={imgs.icon} className="icon-wrapper" alt="Site Logo" />
                    <h1 className="title">To Do</h1>
                </div>
            </div>
            <div className="navbar-center">
                <div className="search-container">
                    <span className="search-icon">🔍</span>
                    <input type="text" placeholder="Search tasks..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}  className="search-input"/>
                </div>
            </div>
            <div className="navbar-right">
                <div className="stats-container">
                    <div className="stat-card pending-card">
                        <div className="stat-icon">⏱️</div>
                        <div className="stat-info">
                            <span className="stat-number">{pending}</span>
                            <span className="stat-label">Pending</span>
                        </div>
                    </div>
                    <div className="stat-card completed-card">
                        <div className="stat-icon">✅</div>
                        <div className="stat-info">
                            <span className="stat-number">{completed}</span>
                            <span className="stat-label">Completed</span>
                        </div>
                    </div>
                </div>
                <div className="action-buttons">
                    <button className="action-btn add-btn" onClick={onAddClick}>
                        +
                    </button>
                </div>
                
            </div>
        </div>
    );
}
export default Navbar;