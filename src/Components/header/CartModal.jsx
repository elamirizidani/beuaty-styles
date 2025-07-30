import React, { useState, useEffect } from 'react';
import { Modal, Button, Badge } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { useAuthStore } from '../../store/authStore';
import { Link } from 'react-router-dom';

const CartModal = () => {
  const [show, setShow] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const { cartData,addToCart,removeToCart,isLoggedIn } = useAuthStore();


// console.log(cartData)
  // Load cart data from localStorage or API
  useEffect(() => {
    const fetchCartData = () => {
      // Replace this with actual API call or localStorage retrieval
      
      const cartItems = cartData?.filter(cartItems => cartItems?.productId)
      setCartItems(cartItems || []);
      // Calculate total
      // console.log(JSON.stringify(cartItems))
      const calculatedTotal = cartItems?.reduce(
        (sum, item) => sum + (item?.productId?.price * item?.quantity), 0
      );
      setTotal(calculatedTotal);
    };

    fetchCartData();
  }, [cartData]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateQuantity = async (id, newQuantity) => {

    // console.log(id)
    // console.log(newQuantity)

    if (newQuantity < 1) return;

    await addToCart(id, newQuantity) 
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = async (id) => {
    // console.log(id)
    await removeToCart(id) 
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Recalculate total whenever cartItems change
  useEffect(() => {
    // console.log(cartItems)
    const newTotal = cartItems.reduce(
      (sum, item) => sum + (item?.productId?.price * item?.quantity), 0
    );
    setTotal(newTotal);
  }, [cartItems,isLoggedIn]);
  

  return (
    <>
      {/* Cart Icon in Header */}
      {/* <Nav.Link href="#">
              <div className='headerIcon'>
                <i class="bi bi-bag"></i>
                <em className='roundpoint'>{cartData?.length}</em>
              </div>
            </Nav.Link> */}
      <div 
        className="position-relative d-inline-block cursor-pointer"
        onClick={handleShow}
        style={{ cursor: 'pointer' }}
      >
        <FaShoppingCart size={20} className="text-dark" />
        {(cartItems.length > 0 && isLoggedIn)&& (
          <Badge 
            pill 
            bg="danger" 
            className="position-absolute top-0 start-100 translate-middle"
          >
            {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
          </Badge>
        )}
      </div>

      {/* Cart Modal */}
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Your Shopping Cart</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          {cartItems.length === 0 ? (
            <div className="text-center py-4">
              <h5>Your cart is empty</h5>
              <p>Start shopping to add items to your cart</p>
              <Button variant="dark" onClick={handleClose}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Product</th>
                      <th scope="col">Price</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Subtotal</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => {
                      if(item?.productId)
                      return(
                      <tr key={item?._id}>
                        <td>
                          <div className="d-flex align-items-center">
                            {/* <img 
                              src={item?.productId?.image} 
                              alt={item?.productId?.name} 
                              width="50" 
                              className="me-3"
                            /> */}
                            <span>{item?.productId?.name}</span>
                          </div>
                        </td>
                        <td>${item?.productId?.price?.toFixed(2)}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <Button 
                              variant="outline-secondary" 
                              size="sm"
                              onClick={() => updateQuantity(item?.productId?._id, Number(item?.quantity) - 1)}
                            >
                              -
                            </Button>
                            <span className="mx-2">{item?.quantity}</span>
                            <Button 
                              variant="outline-secondary" 
                              size="sm"
                              onClick={() => updateQuantity(item?.productId?._id, Number(item?.quantity) + 1)}
                            >
                              +
                            </Button>
                          </div>
                        </td>
                        <td>${(item?.productId?.price * item?.quantity).toFixed(2)}</td>
                        <td>
                          <Button 
                            variant="link" 
                            className="text-danger"
                            onClick={() => removeItem(item?.productId?._id)}
                          >
                            Remove
                          </Button>
                        </td>
                      </tr>
                    )}
                    )}
                  </tbody>
                </table>
              </div>
              
              <div className="d-flex justify-content-end mt-4">
                <div className="border p-3" style={{ width: '300px' }}>
                  <h5>Cart Summary</h5>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Subtotal:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span>Shipping:</span>
                    <span>FREE</span>
                  </div>
                  <div className="d-flex justify-content-between fw-bold">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <Link to='/Checkout' variant="dark" className="w-100 mt-3">
                  Proceed to Checkout</Link>
                </div>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CartModal;