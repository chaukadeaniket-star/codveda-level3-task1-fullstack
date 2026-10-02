import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import CustomCursor from "../components/animation/CustomCursor";
import PageTransition from "../components/layout/PageTransition";

function MainLayout() {
  return (
    <>
      <CustomCursor />

      <PageTransition />

      <Navbar />

      <main className="main-content">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default MainLayout;