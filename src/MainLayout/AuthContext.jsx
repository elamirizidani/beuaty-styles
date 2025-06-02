import React, { createContext, useState, useEffect } from 'react';
import { fetchData, insertData } from '../../utilty/data/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartData,setCartData] = useState()

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, []);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
  };

  const getCartData = async()=>{
    try {
      const response = await fetchData('user/cart')
      setCartData(response.cart)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    if(isLoggedIn)
      getCartData()
  },[isLoggedIn])

  const addToCart = async(productId,quantity)=>{
    const data={
      productId:productId,
      quantity:quantity
    }
    try {
      const response = await insertData('user/cart/add',data)
      if(response.cart)
        getCartData()

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout,cartData,addToCart }}>
      {children}
    </AuthContext.Provider>
  );
}