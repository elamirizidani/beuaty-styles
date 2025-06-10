import { Routes, Route } from "react-router-dom";
import MainLayout from "./MainLayout";

import Home from '../Pages/Home'
import ContactUs from '../Pages/ContactUs'
import BookService from "../Pages/BookService";
import Shop from "../Pages/Shop";
import Login from "../Pages/Login";
import AIproducts from "../Pages/products/AIproducts";
import OurProduct from "../Pages/products/OurProduct";

export default function AppRouter() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bookService" element={<BookService/>} />
        <Route path="/shop" element={<Shop/>} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<Login/>} />

        <Route path="/AIproducts" element={<AIproducts/>}/>
        <Route path="/OurProduct" element={<OurProduct/>}/>
      </Routes>
    </MainLayout>
  );
}