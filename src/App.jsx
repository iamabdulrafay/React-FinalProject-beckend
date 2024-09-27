import React, { useRef } from "react";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { Outlet } from "react-router-dom";
import "./index.css";
// import "../../courses/src/components/locomotivescroll/LocomotiveScrollTrigger.css";
// import "locomotive-scroll/dist/locomotive-scroll.css";
import Intro from "./screens/Intro";
import { ThemeProvider } from "./Teheme";

const App = () => {
  const containerRef = useRef(null);

  return (
    <>
      <Intro bgcolor={"#000"}> </Intro>
      <LocomotiveScrollProvider
        options={{ smooth: true }}
        containerRef={containerRef}>
        <main data-scroll-container ref={containerRef}>
          <ThemeProvider>
            <Navbar />

            <Outlet />

            <Footer />
          </ThemeProvider>
        </main>
      </LocomotiveScrollProvider>
    </>
  );
};

export default App;
