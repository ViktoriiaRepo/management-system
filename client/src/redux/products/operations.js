import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:1880';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    try {
      const response = await axios.get(`${BASE_URL}/getProducts`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }
);

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (product) => {
    try {
      const response = await axios.post(`${BASE_URL}/createProduct`, product);
      return response.data;
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ updatedData }) => {
    try {
      const response = await fetch(`${BASE_URL}/updateProduct`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId) => {
    try {
      await axios.delete(`${BASE_URL}/deleteProduct`, {
        data: { _id: productId },
      });
      return productId;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }
);
