import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';

//components
import Home from './Components/Home';
import Quiz from './Components/Quiz';


function App() { 
  return (
    <div className="App mt-5">
      <Router>
          <Routes>
            <Route element={<Home/>} path='/'/>
            <Route element={<Quiz/>} path="/quiz"/>
          </Routes>
        </Router>
    </div>
  );
  
}

export default App;
