import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { path: '/admin', icon: 'bi-speedometer2', label: 'Dashboard' },
    // { path: '/admin/posts', icon: 'bi-file-earmark-post', label: 'Posts' },
    { path: '/admin/orders', icon: 'bi-cart', label: 'Orders' },
    { path: '/admin/bookings', icon: 'bi-book', label: 'Bookings' },
    { path: '/admin/help', icon: 'bi-person-raised-hand', label: 'Help' },
    { path: '/admin/products', icon: 'bi-box-seam', label: 'Products' },
    { path: '/admin/users', icon: 'bi-people', label: 'Users' },
  ];

  return (
    <Nav className="flex-column sidebar bg-dark text-white p-3" style={{ width: '250px',height:'100vh' }}>
      <div className="sidebar-header mb-4">
        <h4>Admin Panel</h4>
      </div>
      {menuItems.map((item) => (
        <Nav.Item key={item.path}>
          <Nav.Link 
            as={Link} 
            to={item.path} 
            active={location.pathname === item.path}
            className="text-white mb-2"
          >
            <i className={`bi ${item.icon} me-2`}></i>
            {item.label}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
};

export default AdminSidebar;