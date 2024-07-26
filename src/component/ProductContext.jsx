import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5173/api/v1/products');
        setProducts(response.data.data);
      } catch (error) {
        console.error('Gagal memuat produk', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const saveProducts = async () => {
      try {
        await axios.post('http://localhost:5173/api/v1/products', { products });
      } catch (error) {
        console.error('Gagal menyimpan produk', error);
      }
    };

    saveProducts();
  }, [products]);

  const addProduct = async (product) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token tidak ditemukan');
      }

      const response = await axios.post('http://localhost:5173/api/v1/products', product, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      setProducts([...products, response.data.data]);
    } catch (error) {
      console.error('Gagal menambah produk', error);
    }
  };

  const updateProduct = async (updatedProduct) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token tidak ditemukan');
      }

      await axios.put(`http://localhost:5173/api/v1/products/${updatedProduct.id}`, updatedProduct, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      setProducts(products.map(product =>
        product.id === updatedProduct.id ? updatedProduct : product
      ));
    } catch (error) {
      console.error('Gagal memperbarui produk', error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token tidak ditemukan');
      }

      await axios.delete(`http://localhost:5173/api/v1/products/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error('Gagal menghapus produk', error);
    }
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
