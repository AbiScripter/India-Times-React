import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const Layout = () => {
  return (
    <div>
      <NavBar />
      <div className="text-4xl bg-beige dark:bg-dark-brown dark:text-beige sm:text-6xl md:text-8xl text-center">
        India Times
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
