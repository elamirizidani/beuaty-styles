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

    useEffect(() => {
        (async () => {
            setLoading(true)
            try {
                const res = await fetchData('products');
                console.log(res);
                setProductsData(res);
            } catch (err) {
                console.error('Error fetching data:', err);
            }
            finally {
                setLoading(false)
            }
        })();
    }, []);

    return (
        <>
            <PageHeader bgImage={bg} title={'Shop All Products'} />

            <SectionContainer classes={'container'} background={"#BE8F4508"}>

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
                        productsData?.map((product, index) => (
                            <Col lg={4} md={6} className="mb-4" key={index}>
                                <div className="card border-0 h-100">
                                    <Link
                                        to={`/OurProduct`}
                                        state={{ product }}
                                    >
                                        <img
                                            src={productImage}
                                            className="card-img-top"
                                            alt={product.name}
                                            onError={(e) => { e.target.src = '/default-product-image.jpg' }}
                                        />
                                    </Link>

                                    <div className="card-body p-0 d-flex flex-column">
                                        <div className='p-3 flex-grow-1'>
                                            <h5 className="card-title">{product.name}</h5>
                                            <p className="card-text">{product.description}</p>
                                            {product.price && <p className="card-text fw-bold">${product.price}</p>}
                                            <p className="card-text small text-muted">
                                                {product.description}
                                            </p>
                                        </div>
                                        {/* addToCart */}

                                        <Link onClick={() => addToCart(product._id, 1)} style={{ width: '100%' }} className='btn order_now border-0 rounded-0 d-flex justify-content-center'>
                                            Add to Bag
                                        </Link>
                                    </div>
                                </div>
                            </Col>
                        ))
                    )}

                    {!loading && !error && productsData.length === 0 && (
                        <Col className='text-center py-5'>
                            <p>No product recommendations available at this time.</p>
                        </Col>
                    )}
                </Row>
                {/* <div className="row">
                    <div className="col-md-4">
                        <section>

                            <section id="filters" data-auto-filter="true">
                                <h5>Filters</h5>


                                <section className="mb-4" data-filter="condition">
                                    <h6 className="font-weight-bold mb-3">Condition</h6>

                                    <div className="form-check mb-3">
                                        <input className="form-check-input" type="checkbox" value="new" id="condition-checkbox" />
                                        <label className="form-check-label text-uppercase small text-muted" for="condition-checkbox">
                                            New
                                        </label>
                                    </div>

                                    <div className="form-check mb-3">
                                        <input className="form-check-input" type="checkbox" value="used" id="condition-checkbox2" />
                                        <label className="form-check-label text-uppercase small text-muted" for="condition-checkbox2">
                                            Used
                                        </label>
                                    </div>

                                    <div className="form-check mb-3">
                                        <input className="form-check-input" type="checkbox" value="collectible" id="condition-checkbox3" />
                                        <label className="form-check-label text-uppercase small text-muted" for="condition-checkbox3">
                                            Collectible
                                        </label>
                                    </div>

                                    <div className="form-check mb-3">
                                        <input className="form-check-input" type="checkbox" value="renewed" id="condition-checkbox4" />
                                        <label className="form-check-label text-uppercase small text-muted" for="condition-checkbox4">
                                            Renewed
                                        </label>
                                    </div>
                                </section>

                                <section className="mb-4">
                                    <h6 className="font-weight-bold mb-3">Avg. Customer Review</h6>

                                    <ul className="rating" data-toggle="rating" id="filter-rating" tabindex="0">
                                        <li>
                                            <i className="fa-star fa-sm text-primary far" title="" data-toggle="tooltip" data-original-title="1"></i>
                                        </li>
                                        <li>
                                            <i className="fa-star fa-sm text-primary far" title="" data-toggle="tooltip" data-original-title="2"></i>
                                        </li>
                                        <li>
                                            <i className="fa-star fa-sm text-primary far" title="" data-toggle="tooltip" data-original-title="3"></i>
                                        </li>
                                        <li>
                                            <i className="fa-star fa-sm text-primary far" title="" data-toggle="tooltip" data-original-title="4"></i>
                                        </li>
                                        <li>
                                            <i className="far fa-star fa-sm text-primary" title="" data-toggle="tooltip" data-original-title="5"></i>
                                        </li>
                                    </ul>
                                </section>

                                <section className="mb-4">
                                    <h6 className="font-weight-bold mb-3">Price</h6>

                                    <div className="form-check mb-3">
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="price-radio" />
                                        <label className="form-check-label text-uppercase small text-muted" for="price-radio">
                                            Under $25
                                        </label>
                                    </div>

                                    <div className="form-check mb-3">
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="price-radio2" />
                                        <label className="form-check-label text-uppercase small text-muted" for="price-radio2">
                                            $25 to $50
                                        </label>
                                    </div>

                                    <div className="form-check mb-3">
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="price-radio3" />
                                        <label className="form-check-label text-uppercase small text-muted" for="price-radio3">
                                            $50 to $100
                                        </label>
                                    </div>

                                    <div className="form-check mb-3">
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="price-radio4" />
                                        <label className="form-check-label text-uppercase small text-muted" for="price-radio4">
                                            $100 to $200
                                        </label>
                                    </div>

                                    <div className="form-check mb-3">
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="price-radio5" />
                                        <label className="form-check-label text-uppercase small text-muted" for="price-radio5">
                                            $200 &amp; above
                                        </label>
                                    </div>
                                </section>

                                <section className="mb-4" data-filter="size">
                                    <h6 className="font-weight-bold mb-3">Size</h6>

                                    <div className="form-check mb-3">
                                        <input className="form-check-input" type="checkbox" value="34" id="price-checkbox" />
                                        <label className="form-check-label text-uppercase small text-muted" for="price-checkbox">
                                            34
                                        </label>
                                    </div>

                                    <div className="form-check mb-3">
                                        <input className="form-check-input" type="checkbox" value="36" id="price-checkbox2" />
                                        <label className="form-check-label text-uppercase small text-muted" for="price-checkbox2">
                                            36
                                        </label>
                                    </div>

                                    <div className="form-check mb-3">
                                        <input className="form-check-input" type="checkbox" value="38" id="price-checkbox3" />
                                        <label className="form-check-label text-uppercase small text-muted" for="price-checkbox3">
                                            38
                                        </label>
                                    </div>

                                    <div className="form-check mb-3">
                                        <input className="form-check-input" type="checkbox" value="40" id="price-checkbox4" />
                                        <label className="form-check-label text-uppercase small text-muted" for="price-checkbox4">
                                            40
                                        </label>
                                    </div>
                                </section>

                                <section className="mb-4" data-filter="color">
                                    <h6 className="font-weight-bold mb-3">Color</h6>

                                    <div className="form-check form-check-inline m-0 p-0 pr-3">
                                        <input className="btn-check" type="radio" name="colorRadio" id="colorRadio1" value="white" />
                                        <label className="btn bg-light btn-rounded p-3" for="colorRadio1"></label>
                                    </div>

                                    <div className="form-check form-check-inline m-0 p-0 pr-3">
                                        <input className="btn-check" type="radio" name="colorRadio" id="colorRadio2" value="grey" />
                                        <label className="btn btn-rounded p-3" for="colorRadio2" style={{ backgroundColor: '#bdbdbd' }}></label>
                                    </div>

                                    <div className="form-check form-check-inline m-0 p-0 pr-3">
                                        <input className="btn-check" type="radio" name="colorRadio" id="colorRadio3" value="black" />
                                        <label className="btn bg-dark text-white btn-rounded p-3" for="colorRadio3"></label>
                                    </div>

                                    <div className="form-check form-check-inline m-0 p-0 pr-3">
                                        <input className="btn-check" type="radio" name="colorRadio" id="colorRadio5" value="blue" />
                                        <label className="btn bg-primary btn-rounded p-3" for="colorRadio5"></label>
                                    </div>

                                    <div className="form-check form-check-inline mt-3 mr-0 p-0 pr-3">
                                        <input className="btn-check" type="radio" name="colorRadio" id="colorRadio9" value="red" />
                                        <label className="btn bg-danger btn-rounded p-3" for="colorRadio9"></label>
                                    </div>

                                    <div className="form-check form-check-inline mt-3 mr-0 p-0 pr-3">
                                        <input className="btn-check" type="radio" name="colorRadio" id="colorRadio10" value="orange" />
                                        <label className="btn bg-warning btn-rounded p-3" for="colorRadio10"></label>
                                    </div>
                                </section>

                            </section>

                        </section>

                    </div>
                    <div className="col-md-8">
                        <div className="row justify-content-center">
                            <div className="col-md-6 my-auto py-3">
                                <div id="select-wrapper-678383" className="select-wrapper">
                                    <div className="form-outline">
                                        <input className="form-control select-input" type="text" role="listbox" aria-multiselectable="false" aria-disabled="false" aria-haspopup="true" aria-expanded="false" readonly="" />
                                        <label className="form-label select-label active" style={{ marginLeft: 0 }}>Sort</label>
                                        <span className="select-arrow"></span>
                                        <div className="form-notch">
                                            <div className="form-notch-leading" style={{ width: 9 }}></div>
                                            <div className="form-notch-middle" style={{ width: 32 }}></div>
                                            <div className="form-notch-trailing"></div>
                                        </div>
                                    </div>
                                    <select className="select initialized" id="sort-select">
                                        <option value="1">Best rating</option>
                                        <option value="2">Lowest price first</option>
                                        <option value="3">Highest price first</option>
                                    </select></div>

                            </div>
                        </div>
                        <div className="row mb-4" id="content" style={{ display: 'flex' }}>
                            <div className="col-md-4 my-4 justify-content-center text-center animation fade-in">
                                <div className="bg-image hover-overlay hover-zoom hover-shadow ripple rounded">
                                    <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/13.jpg" className="img-fluid w-100" style={{ height: 325 }} />
                                    <a href="#!">
                                        <div className="mask rounded" style={{ backgroundColor: 'rgba(66, 66, 66, 0.2)' }}></div>
                                    </a>
                                </div>
                                <div className="pt-4">
                                    <h5>Fantasy T-shirt</h5>
                                    <strong>$12.99</strong>
                                </div>
                            </div>


                            <div className="col-md-4 my-4 justify-content-center text-center animation fade-in">
                                <div className="bg-image hover-overlay hover-zoom hover-shadow ripple rounded">
                                    <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/15.jpg" className="img-fluid w-100" style={{ height: 325 }} />
                                    <a href="#!">
                                        <div className="mask rounded" style={{ backgroundColor: 'rgba(66, 66, 66, 0.2);' }}></div>
                                    </a>
                                </div>
                                <div className="pt-4">
                                    <h5>Denim Jacket</h5>
                                    <strong>$40.99</strong>
                                </div>
                            </div>


                            <div className="col-md-4 my-4 justify-content-center text-center animation fade-in">
                                <div className="bg-image hover-overlay hover-zoom hover-shadow ripple rounded">
                                    <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/11.jpg" className="img-fluid w-100" style={{ height: 325 }} />
                                    <a href="#!">
                                        <div className="mask rounded" style={{ backgroundColor: 'rgba(66, 66, 66, 0.2);' }}></div>
                                    </a>
                                </div>
                                <div className="pt-4">
                                    <h5>Ripped jeans</h5>
                                    <strong>$20.99</strong>
                                </div>
                            </div>


                            <div className="col-md-4 my-4 justify-content-center text-center animation fade-in">
                                <div className="bg-image hover-overlay hover-zoom hover-shadow ripple rounded">
                                    <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/5.jpg" className="img-fluid w-100" style={{ height: 325 }} />
                                    <a href="#!">
                                        <div className="mask rounded" style={{ backgroundColor: 'rgba(66, 66, 66, 0.2);' }}></div>
                                    </a>
                                </div>
                                <div className="pt-4">
                                    <h5>Red chinos</h5>
                                    <strong>$62.99</strong>
                                </div>
                            </div>


                            <div className="col-md-4 my-4 justify-content-center text-center animation fade-in">
                                <div className="bg-image hover-overlay hover-zoom hover-shadow ripple rounded">
                                    <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/4.jpg" className="img-fluid w-100" style={{ height: 325 }} />
                                    <a href="#!">
                                        <div className="mask rounded" style={{ backgroundColor: 'rgba(66, 66, 66, 0.2);' }}></div>
                                    </a>
                                </div>
                                <div className="pt-4">
                                    <h5>Camel coat</h5>
                                    <strong>$62.99</strong>
                                </div>
                            </div>


                            <div className="col-md-4 my-4 justify-content-center text-center animation fade-in">
                                <div className="bg-image hover-overlay hover-zoom hover-shadow ripple rounded">
                                    <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/3.jpg" className="img-fluid w-100" style={{ height: 325 }} />
                                    <a href="#!">
                                        <div className="mask rounded" style={{ backgroundColor: 'rgba(66, 66, 66, 0.2);' }}></div>
                                    </a>
                                </div>
                                <div className="pt-4">
                                    <h5>Blue jeans</h5>
                                    <strong>$42.99</strong>
                                </div>
                            </div>


                            <div className="col-md-4 my-4 justify-content-center text-center animation fade-in">
                                <div className="bg-image hover-overlay hover-zoom hover-shadow ripple rounded">
                                    <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/12.jpg" className="img-fluid w-100" style={{ height: 325 }} />
                                    <a href="#!">
                                        <div className="mask rounded" style={{ backgroundColor: 'rgba(66, 66, 66, 0.2);' }}></div>
                                    </a>
                                </div>
                                <div className="pt-4">
                                    <h5>Fantasy T-shirt</h5>
                                    <strong>$12.99</strong>
                                </div>
                            </div>


                            <div className="col-md-4 my-4 justify-content-center text-center animation fade-in">
                                <div className="bg-image hover-overlay hover-zoom hover-shadow ripple rounded">
                                    <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/10.jpg" className="img-fluid w-100" style={{ height: 325 }} />
                                    <a href="#!">
                                        <div className="mask rounded" style={{ backgroundColor: 'rgba(66, 66, 66, 0.2);' }}></div>
                                    </a>
                                </div>
                                <div className="pt-4">
                                    <h5>Boyfriend jeans</h5>
                                    <strong>$20.99</strong>
                                </div>
                            </div>


                            <div className="col-md-4 my-4 justify-content-center text-center animation fade-in">
                                <div className="bg-image hover-overlay hover-zoom hover-shadow ripple rounded">
                                    <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/7.jpg" className="img-fluid w-100" style={{ height: 325 }} />
                                    <a href="#!">
                                        <div className="mask rounded" style={{ backgroundColor: 'rgba(66, 66, 66, 0.2);' }}></div>
                                    </a>
                                </div>
                                <div className="pt-4">
                                    <h5>Ripped sweatshirt</h5>
                                    <strong>$29.99</strong>
                                </div>
                            </div>


                            <div className="col-md-4 my-4 justify-content-center text-center animation fade-in">
                                <div className="bg-image hover-overlay hover-zoom hover-shadow ripple rounded">
                                    <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/8.jpg" className="img-fluid w-100" style={{ height: 325 }} />
                                    <a href="#!">
                                        <div className="mask rounded" style={{ backgroundColor: 'rgba(66, 66, 66, 0.2);' }}></div>
                                    </a>
                                </div>
                                <div className="pt-4">
                                    <h5>Longsleeve</h5>
                                    <strong>$120.99</strong>
                                </div>
                            </div>


                            <div className="col-md-4 my-4 justify-content-center text-center animation fade-in">
                                <div className="bg-image hover-overlay hover-zoom hover-shadow ripple rounded">
                                    <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/6.jpg" className="img-fluid w-100" style={{ height: 325 }} />
                                    <a href="#!">
                                        <div className="mask rounded" style={{ backgroundColor: 'rgba(66, 66, 66, 0.2);' }}></div>
                                    </a>
                                </div>
                                <div className="pt-4">
                                    <h5>Stripped sweatshirt</h5>
                                    <strong>$32.99</strong>
                                </div>
                            </div>


                            <div className="col-md-4 my-4 justify-content-center text-center animation fade-in">
                                <div className="bg-image hover-overlay hover-zoom hover-shadow ripple rounded">
                                    <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/2.jpg" className="img-fluid w-100" style={{ height: 325 }} />
                                    <a href="#!">
                                        <div className="mask rounded" style={{ backgroundColor: 'rgba(66, 66, 66, 0.2);' }}></div>
                                    </a>
                                </div>
                                <div className="pt-4">
                                    <h5>Ballerina skirt</h5>
                                    <strong>$12.99</strong>
                                </div>
                            </div>


                            <div className="col-md-4 my-4 justify-content-center text-center animation fade-in">
                                <div className="bg-image hover-overlay hover-zoom hover-shadow ripple rounded">
                                    <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/14.jpg" className="img-fluid w-100" style={{ height: 325 }} />
                                    <a href="#!">
                                        <div className="mask rounded" style={{ backgroundColor: 'rgba(66, 66, 66, 0.2);' }}></div>
                                    </a>
                                </div>
                                <div className="pt-4">
                                    <h5>Fantasy T-shirt</h5>
                                    <strong>$40.99</strong>
                                </div>
                            </div>


                            <div className="col-md-4 my-4 justify-content-center text-center animation fade-in">
                                <div className="bg-image hover-overlay hover-zoom hover-shadow ripple rounded">
                                    <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/3.jpg" className="img-fluid w-100" style={{ height: 325 }} />
                                    <a href="#!">
                                        <div className="mask rounded" style={{ backgroundColor: 'rgba(66, 66, 66, 0.2);' }}></div>
                                    </a>
                                </div>
                                <div className="pt-4">
                                    <h5>Orange T-shirt</h5>
                                    <strong>$12.99</strong>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 mt-3 text-center">
                                <div className="spinner-border text-primary mx-auto my-5" id="spinner" role="status" style={{ display: 'none' }}>
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}

            </SectionContainer>
        </>
    )
}

export default Shop
