// src/store/authStore.js
import { create } from 'zustand';
import { fetchData, insertData,login as apiLogin, register } from '../../utilty/data/api';


export const useAuthStore = create((set, get) => ({
  user: null,
  isLoggedIn: false,
  cartData: null,
  userRole:null,
  loading:true,
  showProfileEdit: false,

  changeShowProfile: () => {
    const currentState = get().showProfileEdit; // Get the current boolean value
    set({ showProfileEdit: !currentState }); // Toggle the boolean
  },

  checkAuth: async () => {
    try {
      const response = await fetchData('user/profile');
      if (response.user) {
        set({
          user: response.user,
          isLoggedIn: true,
          userRole:response.user.role
        });
        get().getCartData();
      } else {
        localStorage.removeItem('token');
        set({ isLoggedIn: false, user: null,userRole:null, });
      }
    } catch (error) {
      console.error('Failed to auto-login:', error);
      localStorage.removeItem('token');
      set({ isLoggedIn: false, user: null });
    }
  },
  
  // Actions
  login: () => set({ isLoggedIn: true }),
  adminLogin: async (userData) => {
  try {
    const response = await apiLogin(userData.email, userData.password);
    if (response.token) {
      localStorage.setItem('token', response.token);
      // set({
      //   isLoggedIn: true,
      //   user: response.user,
      //   userRole:response.user.role
      // });
      await get().checkAuth();
      get().getCartData();
      return {
        role:response.user.role,
        status:true
      };
    } else {
      set({ isLoggedIn: false, user: null,userRole:null });
      return {
        role:null,
        status:false
      };
    }
  } catch (error) {
    // console.log(error);
    set({ isLoggedIn: false, user: null });
    return {
        role:null,
        status:false
      };
  }
},
userRegistration: async (userData) =>{
  try {
    const response = await register(userData)
    console.log('returned data', response)
    if (response.token) {
      localStorage.setItem('token', response.token);
      set({
        isLoggedIn: true,
        user: response.user,
        userRole:response?.user?.role
      });
      get().getCartData();
      return {
        role:response?.user?.role,
        status:true
      };
    }
    else {
      set({ isLoggedIn: false, user: null,userRole:null });
      return {
        role:null,
        status:false
      };
    }
    
  } catch (error) {
    console.log(error);
    set({ isLoggedIn: false, user: null });
    return {
        role:null,
        status:false
      };
  }
  },

  adminLogout: () => {
    localStorage.removeItem('token');
    set({ isLoggedIn: false, user: null,userRole:null });
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ isLoggedIn: false, user: null,cartData: null, });
  },
  
  setUser: (user) => set({ user }),
  
  getCartData: async () => {
    try {

      const response = await fetchData('user/cart');
      set({ cartData: response.cart });
    } catch (error) {
      console.log(error);
    }
  },
  
  addToCart: async (productId, quantity) => {
    const data = {
      productId: productId,
      quantity: quantity
    };
    // console.log(data)
    try {
      const response = await insertData('user/cart/add', data);
      if (response.cart) {
        get().getCartData();
      }
    } catch (error) {
      console.log(error);
    }
  },

  removeToCart: async(productId)=>{
    const data = {
      productId: productId
    };
    try {
      const response = await insertData('user/cart/remove', data);
      if (response.cart) {
        get().getCartData();
      }
    } catch (error) {
      console.log(error);
    }
  },
  isAdmin: () => {
  const user = get().user;
  console.log(user?.role === 'admin');
  return user?.role === 'admin';
},
  
  loggedAdmin: () => {
    return get().user?.role === 'admin';
  },

  initialize: async () => {
    const token = localStorage.getItem('token');
    // console.log(token)
    if (!token) {
      set({ isLoggedIn: false, user: null,loading: false });
      return;
    }
    await get().checkAuth();
    set({ loading: false });
}
}));