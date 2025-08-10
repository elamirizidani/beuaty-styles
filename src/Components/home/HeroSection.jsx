import React,{useState,useEffect} from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './home.css'
import { useMediaQuery } from 'react-responsive';
import img1 from '../../assets/imgs/hero.webp'
import img2 from '../../assets/imgs/hero2.webp'
import img3 from '../../assets/imgs/hero3.webp'


const images = [img1,img2,img3];

function HeroSection() {
    const isMediumUp = useMediaQuery({ minWidth: 768 });
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    useEffect(() => {
        const preloadImages = async () => {
            const imagePromises = images.map(src => {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.onload = resolve;
                    img.onerror = reject;
                    img.src = src;
                });
            });
            
            try {
                await Promise.all(imagePromises);
                setImagesLoaded(true);
            } catch (error) {
                console.error('Error preloading images:', error);
                setImagesLoaded(true); // Still show the component
            }
        };
        preloadImages();
    }, []);

    useEffect(() => {
        if (!imagesLoaded) return;
        
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [imagesLoaded]);

  return (
    
    <section className='hero_section align-items-center d-flex' 
    style={{
        backgroundImage: `url(${images[currentIndex]})`,
        height: isMediumUp ? '750px' : '450px',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        transition: 'opacity 0.6s ease-in-out',
    }}
    
    >
        <Container>
            <Row>
                <Col md={6} className='mb-5 mb-md-0 col-md-6'>
                <div className='hero-content-container p-sm-2'>
                    <h1 className='text-white here-title'>
                        Your<br/> Personalized Hair <br/>& Beauty Store
                    </h1>
                    <Link to='/shop' className='btn order_now'>Shop Now</Link>
                </div>
                </Col>
            </Row>
        </Container>
    </section>
  )
}

export default HeroSection
