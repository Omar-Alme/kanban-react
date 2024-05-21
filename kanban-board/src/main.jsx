import React from 'react';
import ReactDOM from 'react-dom/client'
import App from './App.jsx';
import { TaskProvider } from './context/TaskContext'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter, Routes, and Route
import TodoPage from './pages/TodoPage.jsx';
import DoingPage from'./pages/DoingPage.jsx';
import DonePage from'./pages/DonePage.jsx';


    ReactDOM.createRoot(document.getElementById('root')).render(
        <TaskProvider>
            <Router>
                <Routes>
            
                    <Route path="/" element={<App />}></Route>
                    <Route path='/todo' element={<TodoPage />}></Route>
                    <Route path='/doing' element={<DoingPage />}></Route>
                    <Route path='/done' element={<DonePage />}></Route>
                </Routes>
            </Router>
        </TaskProvider>
    );