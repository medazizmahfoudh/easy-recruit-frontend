import { useEffect } from "react";
import { useLocation } from "react-router";

const ScrollRestoration = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return null;
};

export default ScrollRestoration;
