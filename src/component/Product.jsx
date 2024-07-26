import React from "react";
import { Routes, Route } from "react-router-dom";
import { ProductProvider } from "./ProductContext";
import ProductList from "./ProductList";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";




function Product() {
  return (
    <ProductProvider>
      <Routes>
      
        <Route path="/*" element={<ProductList />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/edit/:id" element={<EditProduct />} />
      </Routes>
    </ProductProvider>
  );
}

export default Product;
