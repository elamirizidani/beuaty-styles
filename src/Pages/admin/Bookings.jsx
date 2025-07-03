import React, { useEffect, useState } from 'react';
import { Table, Button, Badge, Form, InputGroup, Spinner, Card, Row, Col } from 'react-bootstrap';
import { fetchData } from '../../../utilty/data/api';
import moment from 'moment';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({
    date: '',
    serviceType: '',
    search: ''
  });

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await fetchData('bookings');
      setBookings(data);
    } catch (err) {
      setError('Failed to load bookings');
      console.error('Booking fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const filteredBookings = bookings
    .filter(booking => 
      filter.date ? booking.date === filter.date : true
    )
    .filter(booking =>
      filter.serviceType ? booking.serviceType === filter.serviceType : true
    )
    .filter(booking =>
      filter.search ? 
        booking.fullName.toLowerCase().includes(filter.search.toLowerCase()) ||
        booking.email.toLowerCase().includes(filter.search.toLowerCase()) ||
        booking.phoneNumber.includes(filter.search)
      : true
    )
    .sort((a, b) => {
      const dateA = moment(`${a.date} ${a.timeSlot}`);
      const dateB = moment(`${b.date} ${b.timeSlot}`);
      return dateA - dateB;
    });

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await fetchData(`bookings/${id}`, 'DELETE');
        setBookings(bookings.filter(b => b._id !== id));
      } catch (err) {
        console.error('Delete failed:', err);
      }
    }
  };

  if (loading) return <Spinner animation="border" className="mt-4" />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="p-4">
      <h2 className="mb-4">Manage Bookings</h2>
      
      {/* Filters */}
      <Card className="mb-4">
        <Card.Body>
          <Form>
            <Row>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    onChange={(e) => setFilter({...filter, date: e.target.value})}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Service Type</Form.Label>
                  <Form.Select
                    onChange={(e) => setFilter({...filter, serviceType: e.target.value})}
                  >
                    <option value="">All Services</option>
                    {[...new Set(bookings.map(b => b.serviceType))].map(service => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Search</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      placeholder="Search by name, email or phone"
                      onChange={(e) => setFilter({...filter, search: e.target.value})}
                    />
                    <Button 
                      variant="outline-secondary" 
                      onClick={() => setFilter({ date: '', serviceType: '', search: '' })}
                    >
                      Clear
                    </Button>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      {/* Bookings Table */}
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Client</th>
              <th>Contact</th>
              <th>Service</th>
              <th>Date & Time</th>
              <th>Special Requests</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length > 0 ? (
              filteredBookings.map(booking => (
                <tr key={booking._id}>
                  <td>
                    <strong>{booking.fullName}</strong><br/>
                    {booking.reminder && (
                      <Badge bg="info" className="me-1">Reminder</Badge>
                    )}
                    <small className="text-muted">
                      {moment(booking.createdAt).format('MMM DD, YYYY')}
                    </small>
                  </td>
                  <td>
                    {booking.email}<br/>
                    {booking.phoneNumber}
                  </td>
                  <td>{booking.serviceType}</td>
                  <td>
                    {moment(booking.date).format('ddd, MMM DD, YYYY')}<br/>
                    <Badge bg="primary">{booking.timeSlot}</Badge>
                  </td>
                  <td className="text-truncate" style={{ maxWidth: '200px' }}>
                    {booking.specialRequests || 'None'}
                  </td>
                  <td>
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => handleDelete(booking._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted py-4">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* Stats */}
      <div className="d-flex justify-content-between mt-3">
        <div>
          <Badge bg="secondary" className="me-2">
            Total Bookings: {bookings.length}
          </Badge>
          <Badge bg="success" className="me-2">
            Today: {bookings.filter(b => b.date === moment().format('YYYY-MM-DD')).length}
          </Badge>
        </div>
        <Button 
          variant="primary" 
          onClick={fetchBookings}
          disabled={loading}
        >
          {loading ? 'Refreshing...' : 'Refresh'}
        </Button>
      </div>
    </div>
  );
};

export default AdminBookings;