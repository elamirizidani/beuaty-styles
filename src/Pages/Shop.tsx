import React, { useContext, useEffect, useState } from 'react'
import PageHeader from '../Components/reUsable/PageHeader'
import bg from '../assets/imgs/headers/shop.webp'
import { Link } from 'react-router-dom'
import { Col, Container, Form, InputGroup, Pagination, Row } from 'react-bootstrap'
import SectionContainer from '../Components/reUsable/SectionContainer'
import { fetchData } from '../../utilty/data/api'
import { AuthContext } from '../MainLayout/AuthContext'
import productImage from '../assets/imgs/products/product.png'
import UpperFooterPart from '../Components/footer/UpperFooterPart'
import { useAuthStore } from '../store/authStore'
import NotSure from '../Components/NotSure'

function Shop() {
    const { addToCart, isLoggedIn } = useAuthStore();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [productsData, setProductsData] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [productsCategories, setProductsCategories] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(12)
    const [searchQuery, setSearchQuery] = useState('');



    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Pagination items
    let paginationItems = [];
    for (let number = 1; number <= totalPages; number++) {
        paginationItems.push(
            <Pagination.Item
                key={number}
                active={number === currentPage}
                onClick={() => paginate(number)}
            >
                {number}
            </Pagination.Item>
        );
    }


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
    // useEffect(() => {
    //     if (selectedCategories.length === 0) {
    //         setFilteredProducts(productsData);
    //     } else {
    //         const filtered = productsData.filter(product =>
    //             selectedCategories.includes(product.category)
    //         );
    //         setFilteredProducts(filtered);
    //     }
    // }, [selectedCategories, productsData]);

    // Apply filters whenever selectedCategories or searchQuery changes
    useEffect(() => {
        let filtered = productsData;
        if (selectedCategories.length === 0) {
            setFilteredProducts(productsData);
        }
        // Filter by category
        if (selectedCategories.length > 0) {
            filtered = filtered.filter(product =>
                selectedCategories.includes(product.category)
            );
        }

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchQuery) ||
                product.description.toLowerCase().includes(searchQuery)
            );
        }

        setFilteredProducts(filtered);
    }, [selectedCategories, searchQuery, productsData])


    // Handle search
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        setCurrentPage(1);
    }

    return (
        <>
            <PageHeader bgImage={bg} title={'Shop All Products'} />

            <SectionContainer classes={'container'} background={"#BE8F4508"}>
                <Row>
                    <Col md="3" className='p-5'>
                        <section className="mb-4">

                            <Form.Group className='mb-4' controlId="productSearch">
                                <InputGroup>
                                    <Form.Control
                                        type="text"
                                        placeholder="Type in to Search products by name, concern…"
                                        value={searchQuery}
                                        onChange={handleSearch}
                                        className='search-product'
                                    />
                                    {searchQuery && (
                                        <InputGroup.Text
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => {
                                                setSearchQuery('');
                                                setCurrentPage(1);
                                            }}
                                        >
                                            <i className="bi bi-x"></i>
                                        </InputGroup.Text>
                                    )}
                                </InputGroup>
                            </Form.Group>
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
                                currentProducts?.map((product, index) => (
                                    <Col lg={4} md={6} className="mb-4" key={index}>
                                        <div className="card border-0 h-100">
                                            <Link
                                                to={`/Product`}
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
                                                <div className='p-3 flex-grow-1 d-flex justify-content-between'>
                                                    <div className='flex-grow-4' style={{ flex: 4, width: '80%' }}>
                                                        <h6 className="card-title fw-bold">{product.name}</h6>
                                                        <p className="card-text small text-muted text-truncate" style={{ maxWidth: '100%' }}>
                                                            {product.description}
                                                        </p>
                                                    </div>
                                                    {product.price && <p className="card-text fw-bold flex-grow-1 justify-content-end d-flex align-items-center" style={{ flex: 1 }}>${product.price}</p>}
                                                </div>
                                                {/* addToCart */}
                                                {
                                                    isLoggedIn ?
                                                        <Link onClick={() => addToCart(product._id, 1)} style={{ width: '100%' }} className='btn order_now border-0 rounded-0 d-flex justify-content-center align-items-center gap-2'>
                                                            <i className="bi bi-handbag" style={{ fontSize: '24px' }}></i>
                                                            Add to Bag
                                                        </Link>
                                                        :
                                                        <Link to={'/login'} style={{ width: '100%' }} className='btn order_now border-0 rounded-0 d-flex justify-content-center align-items-center gap-2'>
                                                            <i className="bi bi-handbag" style={{ fontSize: '24px' }}></i>
                                                            Add to Bag
                                                        </Link>
                                                }

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

                        {filteredProducts.length > productsPerPage && (
                            <div className="d-flex justify-content-center mt-4">
                                <Pagination>
                                    <Pagination.Prev
                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                    />
                                    {paginationItems}
                                    <Pagination.Next
                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                    />
                                </Pagination>
                            </div>
                        )}

                    </Col>
                </Row>

            </SectionContainer>
            <SectionContainer classes={''} background={"#fff"}>
                <NotSure />
            </SectionContainer>
            <UpperFooterPart />
        </>
    )
}

export default Shop