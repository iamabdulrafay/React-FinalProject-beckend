import React from "react";
import Navbar from "../components/navbar/Navbar";
import Hero from "../components/hero/Hero";
import Stats from "../components/stats/Stats";
import Card from "../components/card/Card";
import Intro from "./Intro";
import { useTheme } from "../Teheme";

const Home = () => {
  const { theme } = useTheme();
  return (
    // <>

    // </>
    <div className={`${theme}`} style={{ overflowX: "hidden" }}>
      <Hero></Hero>
      {/* <Stats></Stats> */}
      {/* <div className="" style={{display:"flex" ,padding:"3vw",alignItems:"center",flexWrap:"wrap" ,gap:"6vw"}}> */}

      <Card></Card>
      {/* </div> */}
    </div>
  );
};

export default Home;
