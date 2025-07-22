import React, { useContext, useEffect, useState } from 'react'
import PageHeader from '../Components/reUsable/PageHeader'
import bg from '../assets/imgs/headers/shop.webp'
import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'
import SectionContainer from '../Components/reUsable/SectionContainer'
import { fetchData } from '../../utilty/data/api'
import { AuthContext } from '../MainLayout/AuthContext'
import productImage from '../assets/imgs/products/product.png'

function Shop() {
    const { addToCart } = useContext(AuthContext)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [productsData, setProductsData] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [productsCategories, setProductsCategories] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])

    // Fetch all products
    useEffect(() => {
        (async () => {
            setLoading(true)
            try {
                const res = await fetchData('products');
                setProductsData(res);
                setFilteredProducts(res); // Initialize filtered products with all products
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to load products');
            } finally {
                setLoading(false)
            }
        })();
    }, []);

    // Fetch categories
    useEffect(() => {
        (async () => {
            try {
                const res = await fetchData('products/categories');
                setProductsCategories(res);
            } catch (err) {
                console.error('Error fetching categories:', err);
            }
        })();
    }, []);

    // Handle category selection
    const handleCategoryChange = (category) => {
        setSelectedCategories(prev => {
            if (prev.includes(category)) {
                return prev.filter(c => c !== category);
            } else {
                return [...prev, category];
            }
        });
    };

    // Apply filters whenever selectedCategories changes
    useEffect(() => {
        if (selectedCategories.length === 0) {
            setFilteredProducts(productsData);
        } else {
            const filtered = productsData.filter(product =>
                selectedCategories.includes(product.category)
            );
            setFilteredProducts(filtered);
        }
    }, [selectedCategories, productsData]);

    return (
        <>
            <PageHeader bgImage={bg} title={'Shop All Products'} />

            <SectionContainer classes={'container'} background={"#BE8F4508"}>
                <Row>
                    <Col md="3" className='p-5'>
                        <section className="mb-4">
                            <h6 className="font-weight-bold mb-3">Categories</h6>
                            {productsCategories?.map((category, i) => (
                                <div className="form-check mb-3" key={i}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={`category-checkbox-${i}`}
                                        checked={selectedCategories.includes(category)}
                                        onChange={() => handleCategoryChange(category)}
                                    />
                                    <label
                                        className="form-check-label text-uppercase small text-muted"
                                        htmlFor={`category-checkbox-${i}`}
                                    >
                                        {category}
                                    </label>
                                </div>
                            ))}
                        </section>
                    </Col>
                    <Col md="9">
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
                                filteredProducts?.map((product, index) => (
                                    <Col lg={4} md={6} className="mb-4" key={index}>
                                        <div className="card border-0 h-100">
                                            <Link
                                                to={`/OurProduct`}
                                                state={{ product }}
                                            >
                                                <img
                                                    src={product.productImage || productImage}
                                                    className="card-img-top"
                                                    alt={product.name}
                                                    onError={(e) => { e.target.src = productImage }}
                                                />
                                            </Link>

                                            <div className="card-body p-0 d-flex flex-column">
                                                <div className='p-3 flex-grow-1'>
                                                    <h5 className="card-title">{product.name}</h5>
                                                    <p className="card-text">{product.description}</p>
                                                    {product.price && <p className="card-text fw-bold">${product.price}</p>}
                                                    <p className="card-text small text-muted">
                                                        {product.category}
                                                    </p>
                                                </div>
                                                <Link
                                                    onClick={() => addToCart(product._id, 1)}
                                                    style={{ width: '100%' }}
                                                    className='btn order_now border-0 rounded-0 d-flex justify-content-center'
                                                >
                                                    Add to Bag
                                                </Link>
                                            </div>
                                        </div>
                                    </Col>
                                ))
                            )}

                            {!loading && !error && filteredProducts.length === 0 && (
                                <Col className='text-center py-5'>
                                    <p>No products match your selected filters.</p>
                                    <button
                                        className="btn btn-link"
                                        onClick={() => setSelectedCategories([])}
                                    >
                                        Clear all filters
                                    </button>
                                </Col>
                            )}
                        </Row>
                    </Col>
                </Row>
            </SectionContainer>
        </>
    )
}

export default Shop