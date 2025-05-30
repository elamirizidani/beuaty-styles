import React from "react";

import Footer from "../Components/footer/Footer";
import Header from "../Components/header/Header";

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