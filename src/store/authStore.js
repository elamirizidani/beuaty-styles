// src/store/authStore.js
import { create } from 'zustand';
import { fetchData, insertData,login as apiLogin } from '../../utilty/data/api';


export const useAuthStore = create((set, get) => ({
  user: null,
  isLoggedIn: false,
  cartData: null,
  userRole:null,
  isAdmin:false,
  loading:true,

  checkAuth: async () => {
  
  try {
    // Optionally set loading state here
    const response = await fetchData('user/profile'); // or whatever endpoint returns user info
    if (response.user) {
      set({
        user: response.user,
        isLoggedIn: true,
      });
      get().getCartData();
    } else {
      localStorage.removeItem('token');
      set({ isLoggedIn: false, user: null });
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
      set({
        isLoggedIn: true,
        user: response.user
      });
      get().getCartData();
      return response.user.role;
    } else {
      set({ isLoggedIn: false, user: null });
      return null;
    }
  } catch (error) {
    console.log(error);
    set({ isLoggedIn: false, user: null });
    return null;
  }
},

  adminLogout: () => {
    localStorage.removeItem('token');
    set({ isLoggedIn: false, user: null });
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ isLoggedIn: false, user: null });
  },
  
  setUser: (user) => set({ user }),
  
  getCartData: async () => {
    try {

      const response = await fetchData('user/cart');
      // console.log('====================================');
      // console.log(response);
      // console.log('====================================');

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
    try {
      const response = await insertData('user/cart/add', data);
      if (response.cart) {
        get().getCartData();
      }
    } catch (error) {
      console.log(error);
    }
  },
  
  loggedAdmin: () => {
    return get().user?.role === 'admin';
  },

  initialize: async () => {
    const token = localStorage.getItem('token');
    console.log(token)
    if (!token) {
      set({ isLoggedIn: false, user: null, isAdmin: false,loading: false });
      
      return;
    }
    await get().checkAuth();
    const role = await get().loggedAdmin();
    set({ isAdmin: role,loading: false });

    get().getCartData();
}
}));