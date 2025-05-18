import { Routes, Route } from "react-router-dom";
import MainLayout from "./MainLayout";

import Home from '../Pages/Home'
import ContactUs from '../Pages/ContactUs'

export default function AppRouter() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </MainLayout>
  );
}