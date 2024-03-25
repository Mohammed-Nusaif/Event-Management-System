import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { LoggedInContext } from '../../App';

const PrivateRoute = ({ element, ...rest }) => {
  const [isLoggedIn] = useContext(LoggedInContext);

  return isLoggedIn ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
