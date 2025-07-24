import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Card, Row, Col, Modal } from 'react-bootstrap';
import { fetchData, insertData } from '../../../utilty/data/api';

export default function Posts() {
  const [news, setNews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: null,
    published: false
  });

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await fetchData('/posts');
      setNews(res);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('title', formData.title);
    form.append('content', formData.content);
    form.append('published', formData.published);
    form.append('image', formData.image);

    console.log(JSON.stringify(formData))

    try {
      await insertData('/posts', form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      fetchNews();
      setShowModal(false);
    } catch (error) {
      console.error('Error creating news:', error);
    }
  };

  return (
    <div className="p-4">
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Add News
      </Button>

      <Row className="mt-4">
        {news?.map(item => (
          <Col md={4} key={item._id} className="mb-4">
            <Card>
              {item.imageUrl && (
                <Card.Img variant="top" src={item.imageUrl} />
              )}
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.content.substring(0, 100)}...</Card.Text>
                <Button variant="info">Edit</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add News</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit} enctype="multipart/form-data">
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              {/* <Form.Control
                type="file"
                onChange={(e) => setFormData({...formData, image: e.target.files[0]})}
              /> */}

              <Form.Control
                type="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  console.log("Selected file:", file); // Debug
                  setFormData(prev => ({
                    ...prev,
                    image: file // Correctly updates the File object
                  }));
                }}
                required // Optional: if the image is mandatory
              />

            </Form.Group>

            <Form.Check
              type="switch"
              label="Publish Immediately"
              checked={formData.published}
              onChange={(e) => setFormData({...formData, published: e.target.checked})}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save News
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}