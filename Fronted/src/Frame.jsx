import React from "react";
import Header from "./components/Header";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";
import './index.css';
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

const Frame = () => {
  return (
    <>
    <Header />
    <main className="flex-1 flex flex-col overflow-hidden md:mt-2 md:ml-64 md:mr-64">
      <LeftSidebar />
      <RightSidebar />

      <div className="flex-1 md:p-2" id="tech-product-section">
       <Outlet />
      </div>
    </main>
    <Footer />
    </>
  );
};

export default Frame;