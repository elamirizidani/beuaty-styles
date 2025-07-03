// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import { AuthContext } from './AuthContext';

// const AdminRoute = () => {
//   const { user, isAdmin } = useContext(AuthContext);

//   if (!user) {
//     return <Navigate to="/admin/login" />;
//   }

//   if (!isAdmin()) {
//     return <Navigate to="/" />;
//   }

//   return <Outlet />;
// };

// export default AdminRoute;


import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const AdminRoute = () => {
  const { user, isLoggedIn, isAdmin,loading } = useAuthStore();

  console.log(user)
  console.log(isAdmin)

  if (loading) return <div>Loading...</div>;
  
  if (!isLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;