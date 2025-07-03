// components/AdminUsers.js
import React, { useEffect, useState } from 'react';
import { Table, Button, Badge, Spinner, Card, Form, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import { fetchData } from '../../../utilty/data/api';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({
    role: '',
    search: '',
    minPurchases: ''
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await fetchData('user/users');
      setUsers(data);
    } catch (err) {
      setError('Failed to load users');
      console.error('User fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users
    .filter(user => 
      filter.role ? user.role === filter.role : true
    )
    .filter(user =>
      filter.search ?
        user.name.toLowerCase().includes(filter.search.toLowerCase()) ||
        user.email.toLowerCase().includes(filter.search.toLowerCase())
      : true
    )
    .filter(user =>
      filter.minPurchases ? user.totalPurchases >= parseInt(filter.minPurchases) : true
    );

  if (loading) return <Spinner animation="border" className="mt-4" />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="p-4">
      <h2 className="mb-4">User Management</h2>
      
      {/* Filters */}
      <Card className="mb-4">
        <Card.Body>
          <Form>
            <Row>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Role</Form.Label>
                  <Form.Select
                    onChange={(e) => setFilter({...filter, role: e.target.value})}
                  >
                    <option value="">All Roles</option>
                    <option value="user">Users</option>
                    <option value="admin">Admins</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Min Purchases</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Minimum purchases"
                    onChange={(e) => setFilter({...filter, minPurchases: e.target.value})}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Search</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Search by name or email"
                    onChange={(e) => setFilter({...filter, search: e.target.value})}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      {/* Stats */}
      <div className="d-flex justify-content-between mb-3">
        <div>
          <Badge bg="secondary" className="me-2">
            Total Users: {users.length}
          </Badge>
          <Badge bg="primary" className="me-2">
            Admins: {users.filter(u => u.role === 'admin').length}
          </Badge>
          <Badge bg="success">
            Active Customers: {users.filter(u => u.totalPurchases > 0).length}
          </Badge>
        </div>
        <Button 
          variant="primary" 
          onClick={fetchUsers}
          disabled={loading}
        >
          {loading ? 'Refreshing...' : 'Refresh'}
        </Button>
      </div>

      {/* Users Table */}
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>User</th>
              <th>Contact</th>
              <th>Role</th>
              <th>Member Since</th>
              <th>Last Purchase</th>
              <th>Purchases</th>
              <th>Total Spent</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <tr key={user._id}>
                  <td>
                    <strong>{user.name}</strong><br/>
                    <small className="text-muted">
                      ID: {user._id.toString().substring(0, 8)}...
                    </small>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <Badge bg={user.role === 'admin' ? 'danger' : 'primary'}>
                      {user.role}
                    </Badge>
                  </td>
                  <td>
                    {moment(user.createdAt).format('MMM D, YYYY')}<br/>
                    <small className="text-muted">
                      {moment(user.createdAt).fromNow()}
                    </small>
                  </td>
                  <td>
                    {user.lastPurchase ? 
                      moment(user.lastPurchase).format('MMM D, YYYY') : 
                      <span className="text-muted">Never</span>
                    }
                  </td>
                  <td>{user.totalPurchases}</td>
                  <td>
                    {user.totalSpent ? 
                      `$${user.totalSpent.toFixed(2)}` : 
                      <span className="text-muted">$0</span>
                    }
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted py-4">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AdminUsers;