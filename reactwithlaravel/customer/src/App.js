import React from 'react';
import BooksListing from './components/BooksListing';
import Bookdescription from './components/Bookdescription';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
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
          <Route exact path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/books" element={<PrivateRoute><BooksListing /></PrivateRoute>} />
          <Route path="/bookdescription/:id" element={<Bookdescription />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/logout" element={<PublicRoute><Logout /></PublicRoute>} />
          {/* <Route path="/add-student" element={<PrivateRoute><Addstudent /></PrivateRoute>} />
          <Route path="/edit-student/:id" element={<PrivateRoute><Editstudent /></PrivateRoute>} /> */}
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
