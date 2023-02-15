import React from 'react';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Adminregister from './components/Adminregister';
import Adminlogin from './components/Adminlogin';
import Logout from './components/Logout';
import Books from './components/Books';
import Addbook from './components/Addbook';
//import Addcustomer from './components/Addcustomer';
//import Customers from './components/Customers';
//import Editcustomer from './components/Editcustomer';
import Editbook from './components/Editbook';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// React Notification
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContextProvider } from './store/AuthContext';

const App = () => {
  return (
    <Router>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          {/* <Route exact path="/" element={<Login />} /> */}
          {/* <Route exact path="/" element={<Home />} /> */}
          <Route exact path="/adminlogin" element={<PublicRoute><Adminlogin /></PublicRoute>} />
          <Route path="/adminregister" element={<PublicRoute><Adminregister /></PublicRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/books" element={<PrivateRoute><Books /></PrivateRoute>} />
          <Route path="/add-book" element={<PrivateRoute><Addbook /></PrivateRoute>} />
          <Route path="/edit-book/:id" element={<PrivateRoute><Editbook /></PrivateRoute>} />
          {/* <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} /> */}
          {/* <Route path="/adminlogout" element={<PublicRoute><Logout /></PublicRoute>} /> */}
        </Routes>
      </AuthContextProvider>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Router>
  );

}

export default App;
