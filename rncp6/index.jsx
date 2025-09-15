import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from "./src/security/authContext.jsx";
import ProtectRoute from './src/security/protectRoutes.jsx';
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
import Campaigns from './src/pages/Campaigns.jsx';
import NewCampaignPage from './src/pages/newCampaignPage.jsx';
import MailingLists from './src/pages/MailingLists.jsx';
import NewMailingListPage from './src/pages/newMailingListsPage.jsx';
import EditMailingListPage from './src/pages/editMailingList.jsx';
import EditCampaignPage from "./src/pages/editCampaign.jsx";


const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signupform />} />
      <Route path="/test" element={<Test />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/dashboard" element={<ProtectRoute><Dashboard /></ProtectRoute>}/>
      <Route path="/campaigns" element={<ProtectRoute><Campaigns /></ProtectRoute> }/>
      <Route path="/campaign/new" element={  <ProtectRoute> <NewCampaignPage />  </ProtectRoute>      }/>
      <Route path="/mailinglists" element={  <ProtectRoute> <MailingLists />  </ProtectRoute>      }/>
      <Route path="/newmailinglist" element={  <ProtectRoute> <NewMailingListPage />  </ProtectRoute>      }/>
      <Route path="/mailinglist/edit/:id" element={  <ProtectRoute> <EditMailingListPage />  </ProtectRoute>      }/>
      <Route path="/campaign/edit/:id" element={  <ProtectRoute> <EditCampaignPage />  </ProtectRoute>      }/>
    </Routes>

  </Router>
);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<AuthProvider>
		<App />
	</AuthProvider>
);
