import React, { useEffect,useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import TitleStyled from '../reUsable/TitleStyled'
import { Link } from 'react-router-dom'
import product from '../../assets/imgs/products/product.png'
import SectionContainer from '../reUsable/SectionContainer'
import axios from 'axios'
import { PRODUCTS } from '../../../utilty/data/products'

const API_KEY = 'AIzaSyA7v3yfSk1WIxsHgCFMg0yym50Mlxrxlos';

const userProfile = {
  hairType: 'curly',
  scalpCondition: 'dry',
  skinTone: 'medium',
  preferredFragrance: 'floral',
};

const purchaseHistory = [
  { productId: 'deep-conditioner' },
  { productId: 'argan-oil' },
];


function PopularProducts() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const productDescriptions = PRODUCTS.map((p, i) => {
          return `${i + 1}. ${p.name} – ${p.description}`;
        }).join('\n');

    const prompt = `
          You are a beauty product recommendation assistant.

          USER PROFILE:
          - Hair type: ${userProfile.hairType}
          - Scalp condition: ${userProfile.scalpCondition}
          - Skin tone: ${userProfile.skinTone}
          - Preferred fragrance: ${userProfile.preferredFragrance}

          PAST PURCHASES:
          ${purchaseHistory.map(p => `- ${p.productId}`).join('\n')}

          AVAILABLE PRODUCTS:
          ${productDescriptions}

          Based on the profile and past purchases, choose the 6 best products from the list above and return them as a JSON array using this format:

          [
          {
              "id": "",
              "name": "",
              "price": "",
              "image": "",
              "description": "",
              "reason": "Why it was recommended"
          }
          ]

          Only use products from the AVAILABLE PRODUCTS list.
          Return only valid JSON without any explanation.
        `;




const getSuggestions = async ()=>{
    try {
        setLoading(true);
    const res = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': API_KEY,
        },
      }
    );
    const aiResponseText = res.data.candidates?.[0]?.content?.parts?.[0]?.text;
    let cleanResponse = aiResponseText;
    cleanResponse = cleanResponse.replace(/```json|```/g, '');
    cleanResponse = cleanResponse.trim();

    const startIndex = cleanResponse.indexOf('[');
        const endIndex = cleanResponse.lastIndexOf(']') + 1;

        if (startIndex === -1 || endIndex === 0) {
          throw new Error('Could not find valid JSON array in the response');
        }
        
        cleanResponse = cleanResponse.substring(startIndex, endIndex);
        const parsedProducts = JSON.parse(cleanResponse);

        // const matchedProduct = PRODUCTS.find((p,i) => 
        //     p.name.toLowerCase() === parsedProducts[i].name.toLowerCase() || 
        //     p.id === parsedProducts[i].id
        //   );
          
          console.log('current product',PRODUCTS)
          console.log('sugested',parsedProducts)
          
        //   return {
        //     ...parsedProducts,
        //     image: parsedProducts.image || matchedProduct?.image || '/default-product-image.jpg',
        //   };


    

    // return res.data.candidates?.[0]?.content?.parts?.[0]?.text || 'No suggestions found.';
  } catch (error) {
    console.error('Gemini API error:', error);
    return 'There was an error fetching recommendations.';
  }
  finally {
        setLoading(false);
      }
}

useEffect(()=>{
    getSuggestions()
},[])

  return (
    <SectionContainer>
        <Container>
            <Row className='justify-content-between'>
                <Col lg={6}><TitleStyled title={'Popular Right Now'}/></Col>
                <Col lg={6} className='d-flex justify-content-end'><Link to='/' className='btn order_now'>Browse All Products</Link></Col>
            </Row>
            <Row className='py-4'>


{loading ? (
            <Col className='text-center py-5'>
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Finding perfect products for you...</p>
            </Col>
          ) : error ? (
            <Col className='text-center py-5'>
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            </Col>
          ) : (
            PRODUCTS.map((product, index) => (
              <Col lg={4} md={6} className="mb-4" key={index}>
                <div className="card border-0 h-100">
                  <img 
                    src={product.image} 
                    className="card-img-top" 
                    alt={product.name}
                    onError={(e) => {e.target.src = '/default-product-image.jpg'}}
                  />
                  <div className="card-body p-0 d-flex flex-column">
                    <div className='p-3 flex-grow-1'>
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">{product.description}</p>
                      {product.price && <p className="card-text fw-bold">${product.price}</p>}
                      <p className="card-text small text-muted">
                        <strong>Why it's for you:</strong> {product.reason}
                      </p>
                    </div>
                    <Link to={`/product/${product.id}`} className='btn order_now border-0 rounded-0 d-flex justify-content-center'>
                      Add to Bag
                    </Link>
                  </div>
                </div>
              </Col>
            ))
          )}
          
          {!loading && !error && PRODUCTS.length === 0 && (
            <Col className='text-center py-5'>
              <p>No product recommendations available at this time.</p>
            </Col>
          )}


            </Row>
        </Container>
    </SectionContainer>
  )
}

export default PopularProducts


