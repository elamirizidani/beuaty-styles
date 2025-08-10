import React, { useState } from 'react';
import { Offcanvas, Form, Button, ListGroup, Row } from 'react-bootstrap';
import { fetchData } from '../../../utilty/data/api';
import ProductItem from '../reUsable/ProductItem';

const SearchFilter = () => {
  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setShow(false);
    setSearchTerm('');
    setResults([]);
  };
  const handleShow = () => setShow(true);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetchData(`reviews/search?q=${searchTerm}`);
      // console.log(response)
      setResults(response.data.products);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div 
        className="position-relative d-inline-block cursor-pointer"
        onClick={handleShow}
        style={{ cursor: 'pointer' }}
      >
        <i class="bi bi-search" style={{fontSize:'24px'}}></i>
      </div>

      

      {/* Offcanvas search panel */}
      <Offcanvas show={show} onHide={handleClose} placement="bottom" className="search-offcanvas">
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title>Search Products</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form onSubmit={handleSearch}>
            <div className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="me-2"
                autoFocus
              />
              <Button 
                variant="primary" 
                type="submit" 
                className='order_now'
                disabled={!searchTerm.trim() || isLoading}
              >
                {isLoading ? 'Searching...' : 'Search'}
              </Button>
            </div>
          </Form>

          {/* Search results */}
          {results?.length > 0 && (
            <Row className="mt-3">
              {results?.map((product,index) => (
                <ProductItem
                callAfter={handleClose}
                key={index}
                product={product}
                />
              ))}
            </Row>
          )}

          {results?.length === 0 && searchTerm && !isLoading && (
            <div className="text-center mt-3 text-muted">
              No products found for "{searchTerm}"
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default SearchFilter;