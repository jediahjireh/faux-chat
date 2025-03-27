"use client";

import { useState, useEffect } from "react";

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // initial check
    checkIfMobile();

    // add event listener
    window.addEventListener("resize", checkIfMobile);

    // clean up
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  return isMobile;
}
