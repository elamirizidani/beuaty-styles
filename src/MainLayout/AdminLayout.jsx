import React from 'react';
import AdminSidebar from './AdminSidebar';
import AdminNavbar from './AdminNavbar';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-container d-flex">
      <AdminSidebar />
      <div className="flex-grow-1">
        <AdminNavbar />
        <Container fluid className="py-4">
          <Outlet/>
        </Container>
      </div>
    </div>
  );
};

export default AdminLayout;