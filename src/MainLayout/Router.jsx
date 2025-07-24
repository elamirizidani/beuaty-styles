import { Routes, Route } from "react-router-dom";
import MainLayout from "./MainLayout";
import AdminLayout from "./AdminLayout";
import AdminRoute from './AdminRoute';

// User pages
import Home from '../Pages/Home'
import ContactUs from '../Pages/ContactUs'
import BookService from "../Pages/BookService";
import BookingForm from "../Pages/BookingForm";
import Shop from "../Pages/Shop";
import Login from "../Pages/Login";
import AIproducts from "../Pages/products/AIproducts";
import OurProduct from "../Pages/products/OurProduct";
import SingleProduct from "../Pages/products/SingleProduct";


// Admin pages
import AdminDashboard from "../Pages/admin/Dashboard";
import AdminProducts from "../Pages/admin/Products";
import AdminUsers from "../Pages/admin/Users";
import AdminOrders from "../Pages/admin/Orders";
import AdminAnalytics from "../Pages/admin/Analytics";
import AdminBookings from "../Pages/admin/Bookings";
import AdminPosts from "../Pages/admin/Posts";
// import AdminLogin from "../Pages/admin/Login";
import { useEffect } from "react";
import { useAuthStore } from '../store/authStore';
export default function AppRouter() {

  const { initialize } = useAuthStore();
  useEffect(()=>{
    initialize()
  },[])

  return (
    <Routes>
      {/* User routes with MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/bookService" element={<BookService />} />
        <Route path="/bookingForm" element={<BookingForm />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/AIproducts" element={<AIproducts />} />
        <Route path="/OurProduct" element={<OurProduct />} />
        <Route path="/Product" element={<SingleProduct />} />
        
      </Route>

      {/* Admin routes */}
      {/* <Route path="/admin/login" element={<AdminLogin />} /> */}
      <Route element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
          <Route path="/admin/bookings" element={<AdminBookings />} />
          <Route path="/admin/posts" element={<AdminPosts/>}/>
        </Route>
      </Route>
    </Routes>
  );
}