import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../utils/localStorage';

const PublicRoute = ({ children }) => {

  // const navigate = useNavigate();
  if (isLoggedIn()) {
    //   alert(!isLoggedIn());
    // user is not authenticated
    return <Navigate reloadDocument to="/adminlogin" />;
    // return <Navigate to="/dashboard" />;
  }
  return children;
};

export default PublicRoute;