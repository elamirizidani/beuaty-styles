// src/store/productStore.js
import { create } from 'zustand';
import { fetchData, insertData, updateData, deleteData } from '../../utilty/data/api';

export const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,

  // Fetch all products
  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetchData('products'); // Matches your GET /api/products route
      set({ products: response, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Add new product
  addProduct: async (productData) => {
    set({ loading: true });
    try {
      const response = await insertData('products', productData); // Matches POST /api/products
      set((state) => ({
        products: [...state.products, response],
        loading: false
      }));
      return response;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Update product
  updateProduct: async (id, productData) => {
    set({ loading: true });
    try {
      const response = await updateData(`products/${id}`, productData); // Matches PUT /api/products/:id
      set((state) => ({
        products: state.products.map(product => 
          product._id === id ? response : product
        ),
        loading: false
      }));
      return response;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Delete product
  deleteProduct: async (id) => {
    set({ loading: true });
    try {
      await deleteData(`products/${id}`); // Matches DELETE /api/products/:id
      set((state) => ({
        products: state.products.filter(product => product._id !== id),
        loading: false
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  }
}));