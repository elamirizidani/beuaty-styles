import React, { createContext, useState, useEffect } from 'react';
import { fetchData, insertData } from '../../utilty/data/api';
import { useNavigate } from 'react-router-dom';
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartData,setCartData] = useState()
  const navigate = useNavigate();
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
  const isAdmin = () => {
    return user?.role === 'admin';
  };

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
    <AuthContext.Provider value={{ isLoggedIn, login, logout,cartData,addToCart,isAdmin,user }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);





// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   const login = (userData, token) => {
//     localStorage.setItem('token', token);
//     setUser(userData);
    
//     // Redirect based on role
//     if (userData.role === 'admin') {
//       navigate('/admin');
//     } else {
//       navigate('/');
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setUser(null);
//     navigate('/login');
//   };

//   const isAdmin = () => {
//     return user?.role === 'admin';
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);



// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check for existing session on initial load
//     const storedUser = localStorage.getItem('user');
//     const storedToken = localStorage.getItem('token');
//     if (storedUser && storedToken) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const login = (userData, token) => {
//     localStorage.setItem('user', JSON.stringify(userData));
//     localStorage.setItem('token', token);
//     setUser(userData);
    
//     // Redirect based on role
//     if (userData.role === 'admin') {
//       navigate('/admin');
//     } else {
//       navigate('/');
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('user');
//     localStorage.removeItem('token');
//     setUser(null);
//     navigate('/login');
//   };

//   const isAdmin = () => {
//     return user?.role === 'admin';
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);