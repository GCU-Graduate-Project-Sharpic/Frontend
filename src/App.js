import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from './component/Login';
import Register from './component/Register';
import Main from './Main';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;