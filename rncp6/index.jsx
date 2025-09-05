import React from 'react';
import ReactDOM from 'react-dom/client';
import './src/global.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

import Home from './src/pages/Home';
import About from './src/pages/About';
import Login from './src/pages/Login';
import Signupform from './src/pages/Signup';
import Test from './src/pages/Test';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signupform />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  </Router>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
