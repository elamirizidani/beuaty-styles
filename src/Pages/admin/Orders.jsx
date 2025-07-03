// components/AdminOrders.js
import React, { useEffect, useState } from 'react';
import { Table, Button, Badge, Spinner, Card, Form, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import { fetchData } from '../../../utilty/data/api';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({
    dateFrom: '',
    dateTo: '',
    search: ''
  });

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await fetchData('admin/orders');
      setOrders(data);
    } catch (err) {
      setError('Failed to load orders');
      console.error('Order fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders
    .filter(order => 
      filter.dateFrom ? moment(order.date).isSameOrAfter(filter.dateFrom) : true
    )
    .filter(order =>
      filter.dateTo ? moment(order.date).isSameOrBefore(filter.dateTo) : true
    )
    .filter(order =>
      filter.search ?
        order.userName.toLowerCase().includes(filter.search.toLowerCase()) ||
        order.userEmail.toLowerCase().includes(filter.search.toLowerCase()) ||
        order.productName.toLowerCase().includes(filter.search.toLowerCase())
      : true
    );

  const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.total, 0);

  if (loading) return <Spinner animation="border" className="mt-4" />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="p-4">
      <h2 className="mb-4">Order Management</h2>
      
      {/* Filters */}
      <Card className="mb-4">
        <Card.Body>
          <Form>
            <Row>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>From Date</Form.Label>
                  <Form.Control
                    type="date"
                    onChange={(e) => setFilter({...filter, dateFrom: e.target.value})}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>To Date</Form.Label>
                  <Form.Control
                    type="date"
                    onChange={(e) => setFilter({...filter, dateTo: e.target.value})}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Search</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Search by user or product"
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
            Total Orders: {filteredOrders.length}
          </Badge>
          <Badge bg="success">
            Revenue: ${totalRevenue.toFixed(2)}
          </Badge>
        </div>
        <Button 
          variant="primary" 
          onClick={fetchOrders}
          disabled={loading}
        >
          {loading ? 'Refreshing...' : 'Refresh'}
        </Button>
      </div>

      {/* Orders Table */}
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map(order => (
                <tr key={order.orderId}>
                  <td>{order.orderId.toString().substring(0, 8)}...</td>
                  <td>
                    {order.userName}<br/>
                    <small className="text-muted">{order.userEmail}</small>
                  </td>
                  <td>{order.productName}</td>
                  <td>{order.quantity}</td>
                  <td>${order.productPrice.toFixed(2)}</td>
                  <td>${order.total.toFixed(2)}</td>
                  <td>
                    {moment(order.date).format('MMM D, YYYY')}<br/>
                    <small className="text-muted">
                      {moment(order.date).format('h:mm A')}
                    </small>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted py-4">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AdminOrders;