import { useState, useEffect } from 'react';
import { Card, Badge, Row, Col } from 'react-bootstrap';
import { fetchData } from '../../../utilty/data/api';
import ReviewForm from './ReviewForm';
import { useAuthStore } from '../../store/authStore';
import defaultImg from '../../assets/imgs/default-avatar.png'

const ProductReviews = ({ productId }) => {
    const {isLoggedIn} = useAuthStore()
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {

    const fetchReviews = async () => {
        // console.log('productId1',productId)
      try {
        const response = await fetchData(`/reviews/product/${productId}`);
        console.log(response)
        setReviews(response);
      } catch (err) {
        console.log(err)
        setError('Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  const handleNewReview = (newReview) => {
    setReviews(prev => [newReview, ...prev]);
  };

  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <div className="reviews-section py-5">
      <p className="mb-4 h5">Reviews ({reviews?.length})</p>
      {
        (productId && isLoggedIn) &&
        <ReviewForm productId={productId} onReviewSubmit={handleNewReview} />
      }
      
      {reviews?.length === 0 ? (
        <p>No reviews yet. Be the first to review!</p>
      ) : (
        <Row>
          {reviews?.map(review => (
            <Col md={4} key={review?._id} className="mb-3">
              <Card.Body>
               
                <div className="text-warning">
                    {'★'.repeat(review?.rating)}{'☆'.repeat(5 - review?.rating)}
                </div>
                
                <Card.Text className="mt-2">{review?.comment}</Card.Text>
                 <div className="d-flex align-items-center mb-2">
                  <img 
                    src={review?.userId?.profilePicture || defaultImg} 
                    alt={review?.userId?.name}
                    style={{ 
                      width: '40px', 
                      height: '40px', 
                      borderRadius: '50%', 
                      marginRight: '10px' 
                    }}
                  />
                  <div>
                    <p className="h5 mb-0 fw-bold">{review?.userId?.name}</p>
                  </div>
                </div>
                
                {/* {review?.images?.length > 0 && (
                  <div className="mt-2">
                    {review?.images.map((img, index) => (
                      <img 
                        key={index}
                        src={img}
                        alt="Review"
                        style={{ 
                          width: '80px', 
                          height: '80px', 
                          objectFit: 'cover', 
                          marginRight: '10px' 
                        }}
                      />
                    ))}
                  </div>
                )} */}
                
                {/* <div className="d-flex justify-content-between mt-2">
                    {
                        review?.createdAt && <small className="text-muted">
                            {new Date(review?.createdAt).toLocaleDateString()}
                        </small>
                    }
                  
                  {review?.verifiedPurchase && (
                    <Badge bg="success">Verified Purchase</Badge>
                  )}
                </div> */}
              </Card.Body>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default ProductReviews;