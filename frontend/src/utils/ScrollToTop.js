import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  // This hook gives us the current URL's pathname
  const { pathname } = useLocation();

  // This effect will run every time the 'pathname' changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // This component doesn't render any visible UI
  return null;
}

export default ScrollToTop;
