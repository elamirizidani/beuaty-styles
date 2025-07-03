import React from "react";
import { AuthProvider } from './AuthContext';
import Footer from "../Components/footer/Footer";
import Header from "../Components/header/Header";

import { Outlet } from "react-router-dom"; 


const MainLayout = () => {
    return (
        <AuthProvider>
          <Header/>
            <div> <Outlet/> </div>
          <Footer/>
        </AuthProvider>
    );
};

export default MainLayout;