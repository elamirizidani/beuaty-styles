import React from 'react';
import AdminSidebar from './AdminSidebar';
import AdminNavbar from './AdminNavbar';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const AdminLayout = ({ children }) => {
  const {showMenuLabel} = useAuthStore()
  return (
    <div className="admin-container d-flex justify-content-end">
      <AdminSidebar />
      <div className="site-body" style={{ width: showMenuLabel ? 'calc(100% - 250px)' : 'calc(100% - 70px)' }}>
        <AdminNavbar />
        <Container fluid className="py-4">
          <Outlet/>
        </Container>
      </div>
    </div>
  );
};

export default AdminLayout;