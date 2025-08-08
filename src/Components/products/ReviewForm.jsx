import React,{ useEffect, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { insertData } from '../../../utilty/data/api';
const ReviewForm = ({ productId, onReviewSubmit }) => {
  const [formData, setFormData] = useState({
    rating: 0,
    comment: '',
    images: []
  });

    useEffect(() => {
      console.log('productId',productId)
    },[productId])
  

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (rating) => {
    setFormData({ ...formData, rating });
  };

  // const handleImageUpload = async (e) => {
  //   const files = Array.from(e.target.files);
  //   if (files.length > 3) {
  //     setError('Maximum 3 images allowed');
  //     return;
  //   }
  //   console.log(files)

  //   try {
  //     const uploadedImages = await Promise.all(
  //       files.map(file => uploadImage(file))
  //     );
  //     setFormData(prev => ({
  //       ...prev,
  //       images: [...prev.images, ...uploadedImages]
  //     }));
  //   } catch (err) {
  //     setError('Failed to upload images');
  //   }
  // };

  // const uploadImage = async (file) => {
  //   // Implement your image upload logic here
  //   // This should return the image URL
  //   return 'https://example.com/image.jpg'; // Replace with actual URL
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (formData.rating === 0) {
      setError('Please select a rating');
      setLoading(false);
      return;
    }

    try {
      const response = await insertData('reviews', {
        productId,
        rating: formData.rating,
        comment: formData.comment,
        // images: formData.images
      });

      setSuccess('Review submitted successfully!');
      setFormData({ rating: 0, comment: '' });
      if (onReviewSubmit) onReviewSubmit(response.data);
    } catch (err) {
      console.log(err)
      setError(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="review-form p-4 border rounded mb-4">
      <h4>Write a Review</h4>
      
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Rating</Form.Label>
          <div>
            {[1, 2, 3, 4, 5].map((star) => (
              <span 
                key={star}
                style={{ 
                  cursor: 'pointer',
                  color: star <= formData.rating ? '#ffc107' : '#e4e5e9',
                  fontSize: '2rem'
                }}
                onClick={() => handleRatingChange(star)}
              >
                ★
              </span>
            ))}
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Review</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            maxLength={500}
            placeholder="Share your experience with this product..."
          />
          <Form.Text className="text-muted">
            {formData.comment.length}/500 characters
          </Form.Text>
        </Form.Group>

        {/* <Form.Group className="mb-3">
          <Form.Label>Upload Images (Optional, max 3)</Form.Label>
          <Form.Control
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
          />
          <div className="mt-2">
            {formData.images.map((img, index) => (
              <img 
                key={index}
                src={img}
                alt="Review"
                style={{ width: '80px', height: '80px', objectFit: 'cover', marginRight: '10px' }}
              />
            ))}
          </div>
        </Form.Group> */}

        <Button 
          variant="primary" 
          type="submit" 
          disabled={loading || formData?.rating === 0}
        >
          {loading ? 'Submitting...' : 'Submit Review'}
        </Button>
      </Form>
    </div>
  );
};

export default ReviewForm;