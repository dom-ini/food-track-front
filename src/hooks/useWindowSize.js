import { useEffect, useState } from "react";

import { SMALL_SCREEN_BREAKPOINT } from "../globals/utils";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  const [isScreenSmall, setIsScreenSmall] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      setIsScreenSmall(window.innerWidth < SMALL_SCREEN_BREAKPOINT);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { windowSize, isScreenSmall };
};

export default useWindowSize;
