import React, { useEffect } from "react";
import "./Intro.css";
import gsap from "gsap";
import { useRef } from "react";

const Intro = ({ bgcolor }) => {
  const Width = window.innerWidth; // Get screen width

  // Define the timeline outside of the useEffect hook
  const tl = useRef(gsap.timeline());

  useEffect(() => {
    // Animation for white box reveal
    tl.current.from(".white-box", {
      width: "0%",
      duration: 1,
      onComplete: () => {
        const introDiv = document.querySelector(".intro-div");
        tl.current.to(introDiv, {
          x: -Width,
          duration: 0.8,
        });
      },
    });

    // Fading out white box
    tl.current.to(".white-box", {
      opacity: 0,
      duration: 0.1,
    });

    // Animation for large white box
    tl.current.to(".large-white", {
      width: "100vw",
      height: "100vh",
      opacity: 1,
      duration: 0.6,
      onComplete: () => {
        const largeWhite = document.querySelector(".name");
        tl.current.to(largeWhite, {
          x: -Width,
          duration: 0.8,
        });
      },
    });

    // Text animation: wave-like motion with rotation
    tl.current.from(".char", {
      duration: 1.5,
      y: -50,
      rotation: 45,
      opacity: 0,
      ease: "elastic.out(1, 0.5)", // Bouncy effect
      stagger: 0.05, // Each character animates in sequence
    });
    tl.current.from(".course-line", {
      duration: 1.5,
      y: -50,
      rotation: 45,
      opacity: 0,
      ease: "elastic.out(1, 0.5)", // Bouncy effect
      stagger: 0.05, // Each character animates in sequence
    });
  }, [Width]); // Ensure the animation updates based on screen width

  return (
    <div className="intro-div">
      {/* Box animations */}
      {/* <div className="white-box"></div> */}
      {/* <div className="large-white" style={{ background: `${bgcolor}` }}></div> */}

      {/* Text animation */}
      <h1 className="name">
        {"Coder Snippets".split("").map((char, index) => (
          <span className="char" key={index}>
            {char}
          </span>
        ))}
      </h1>

      <p className="course-line">Course Web</p>
    </div>
  );
};

export default Intro;
