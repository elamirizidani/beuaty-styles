import React from "react";
import Header from "../components/header/Header";
import Footer from "../Components/footer/Footer";
const MainLayout = ({children}) => {
    return (
        <>
        <Header/>
        <div>{children}</div>
        <Footer/>
        </>
    );
};

export default MainLayout;