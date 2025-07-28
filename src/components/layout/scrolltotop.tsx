// src/components/ScrollToTop.jsx
import { useEffect } from 'react';

interface ScrollToTopProps {
  seccionActiva: string;
}

export default function ScrollToTop({ seccionActiva }: ScrollToTopProps) {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [seccionActiva]);
  return null;
}
