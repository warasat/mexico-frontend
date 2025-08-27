// DynamicAssetsLoader.tsx
import { useEffect } from 'react';

const DynamicAssetsLoader = () => {
  useEffect(() => {
    const path = window.location.pathname;

    const loadStyle = (href: string) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    };


    

    // Optionally, cleanup dynamically injected scripts or styles here

  }, []);

  return null;
};

export default DynamicAssetsLoader;
