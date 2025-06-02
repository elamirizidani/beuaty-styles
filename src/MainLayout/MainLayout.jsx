import React from "react";
import { AuthProvider } from './AuthContext';
import Footer from "../Components/footer/Footer";
import Header from "../Components/header/Header";

const MainLayout = ({children}) => {
    return (
        <AuthProvider>
          <Header/>
            <div>{children}</div>
          <Footer/>
        </AuthProvider>
    );
};

export default MainLayout;