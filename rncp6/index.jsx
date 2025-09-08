import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from "./src/authContext.jsx";
import './src/global.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

import Home from './src/pages/Home.jsx';
import About from './src/pages/About.jsx';
import Login from './src/pages/Login.jsx';
import Signupform from './src/pages/Signup.jsx';
import Test from './src/pages/Test.jsx';
import SignIn from './src/pages/Signin.jsx';
import Dashboard from './src/pages/Dashboard.jsx';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signupform />} />
      <Route path="/test" element={<Test />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </Router>
);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<AuthProvider>
		<App />
	</AuthProvider>
);
