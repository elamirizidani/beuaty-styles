// components/Adminhelps.js
import React, { useEffect, useState } from 'react';
import { Table, Button, Badge, Spinner, Card, Form, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import { fetchData } from '../../../utilty/data/api';

const Adminhelps = () => {
  const [helps, setHelps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({
    dateFrom: '',
    dateTo: '',
    search: ''
  });

  const fetchHelps = async () => {
    try {
      setLoading(true);
      const data = await fetchData('helps');
    //   console.log(data)
      setHelps(data || []);
    } catch (err) {
      setError('Failed to load helps');
      console.error('Order fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHelps();
  }, []);

  const filteredhelps = helps
    .filter(order => 
      filter?.dateFrom ? moment(order?.createdAt).isSameOrAfter(filter?.dateFrom) : true
    )
    .filter(order =>
      filter?.dateTo ? moment(order?.createdAt).isSameOrBefore(filter?.dateTo) : true
    )
    .filter(order =>
      filter.search ?
        order?.fullName.toLowerCase().includes(filter.search.toLowerCase()) ||
        order?.email.toLowerCase().includes(filter.search.toLowerCase()) ||
        order?.about.toLowerCase().includes(filter.search.toLowerCase()) ||
        order?.message.toLowerCase().includes(filter.search.toLowerCase())
      : true
    );

  const totalRevenue = filteredhelps.reduce((sum, order) => sum + order?.total, 0);

  if (loading) return <Spinner animation="border" className="mt-4" />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="p-4">
      <h2 className="mb-4">Help & Surpport</h2>
      
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
        
        <Button 
          variant="primary" 
          onClick={fetchHelps}
          disabled={loading}
        >
          {loading ? 'Refreshing...' : 'Refresh'}
        </Button>
      </div>

      {/* helps Table */}
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredhelps.length > 0 ? (
              filteredhelps.map(order => (
                <tr key={order?._id}>
                  <td>{order?._id?.toString().substring(0, 8)}...</td>
                  <td>
                    {order?.fullName}<br/>
                    <small className="text-muted">{order?.email}</small>
                  </td>
                  <td>{order?.about}</td>
                  <td>{order?.message}</td>
                  <td>
                    {moment(order?.createdAt).format('MMM D, YYYY')}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted py-4">
                  No helps found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Adminhelps;