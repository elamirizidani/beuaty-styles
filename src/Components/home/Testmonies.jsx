import React, { useState, useEffect, useRef } from 'react';
import { Container } from 'react-bootstrap'
import TitleStyled from '../reUsable/TitleStyled';
import SectionContainer from '../reUsable/SectionContainer'
import { fetchData } from '../../../utilty/data/api';
import defaultImg from '../../assets/imgs/default-avatar.png'

function CustomCarousel({ children, responsive = {}, loop = true, autoplay = false, autoplayTimeout = 3000 }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(1);
  const autoplayRef = useRef(null);
  const totalSlides = React.Children.count(children);
  const maxSlide = Math.max(0, totalSlides - itemsToShow);

  // Determine how many items to show based on responsive breakpoints
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1000 && responsive[1000]) {
        setItemsToShow(responsive[1000].items);
      } else if (width >= 600 && responsive[600]) {
        setItemsToShow(responsive[600].items);
      } else {
        setItemsToShow(responsive[0]?.items || 1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [responsive]);

  // Handle autoplay
  useEffect(() => {
    if (autoplay) {
      autoplayRef.current = setInterval(() => {
        goToNext();
      }, autoplayTimeout);
    }
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [currentSlide, autoplay, autoplayTimeout]);

  const goToNext = () => {
    if (loop) {
      setCurrentSlide((prev) => (prev + 1) % (maxSlide + 1));
    } else {
      setCurrentSlide((prev) => Math.min(prev + 1, maxSlide));
    }
  };

  const goToPrev = () => {
    if (loop) {
      setCurrentSlide((prev) => (prev - 1 + maxSlide + 1) % (maxSlide + 1));
    } else {
      setCurrentSlide((prev) => Math.max(prev - 1, 0));
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Touch event handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      goToNext();
    }
    if (touchStart - touchEnd < -50) {
      // Swipe right
      goToPrev();
    }
  };

  return (
    <div className="custom-carousel" style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>

      {/* Carousel Track */}
      <div 
        style={{ 
          display: 'flex',
          transition: 'transform 0.3s ease',
          transform: `translateX(-${currentSlide * (100 / itemsToShow)}%)`,
          width: `${100 * (totalSlides / itemsToShow)}%`,
          gap: "32px"
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {React.Children.map(children, (child) => (
          <div 
            style={{ 
              flexShrink: 0,
              flexGrow: 0,
              flexBasis: `${90 / totalSlides}%`,
              width: `${100 / totalSlides}%`,
              padding: '0 10px',
              boxSizing: 'border-box',
            }}
          >
            {child}
          </div>
        ))}
      </div>


      {/* Dots navigation */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
        {Array.from({ length: maxSlide + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              width: currentSlide === index ? "25px" :'10px',
              height: '10px',
              borderRadius: currentSlide === index  ? "20px" : '50%',
              backgroundColor: currentSlide === index ? '#FFFFFF' : '#FFFFFF33',
              margin: '0 5px',
              padding: 0,
              border: 'none',
              cursor: 'pointer',
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}



function Testmonies() {

const [loading, setLoading] = useState(true);
const [review,setReviews] = useState([])

    const responsive = {
        0: { items: 1 },
        600: { items: 2 },
        1000: { items: 2.3 },
      };

       useEffect(() => {
            (async () => {
                setLoading(true)
                try {
                const res = await fetchData('reviews/latest');
                // console.log(res.recommendedProducts);
                setReviews(res);
                } catch (err) {
                console.error('Error fetching data:', err);
                }
                finally{
                    setLoading(false)
                }
            })();
            }, []);
    

  return (
    <SectionContainer background={'#141414'}>
        <Container>
            <h2 className="title-text text-white text-center">
                          Real Results. Real Experiences.
                  </h2>
        <div className='py-5'>
        <CustomCarousel
          responsive={responsive}
          loop={true}
          autoplay={true}
          autoplayTimeout={5000}
        >
          { !loading &&
          review?.map((review) => (
            <div
              key={review._id} 
              style={{
                padding:'32px',
                gap:'20px',
                backgroundColor:'#FFFFFF'
              }}
            >
              <p>{review?.comment}</p>
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
            </div>
          ))}
        </CustomCarousel>
        </div>



        </Container>
    </SectionContainer>
  )
}

export default Testmonies
