import { useState, useEffect } from 'react';

export function useScrollPosition(threshold: number = 0) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const position = window.scrollY || document.documentElement.scrollTop;
      setScrollPosition(position);
      setIsScrolled(position > threshold);
    }
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  return { scrollPosition, isScrolled };
}
