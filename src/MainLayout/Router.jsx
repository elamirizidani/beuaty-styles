import { Routes, Route } from "react-router-dom";
import MainLayout from "./MainLayout";

import Home from '../Pages/Home'
import ContactUs from '../Pages/ContactUs'
import BookService from "../Pages/BookService";

export default function AppRouter() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bookService" element={<BookService/>} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </MainLayout>
  );
}