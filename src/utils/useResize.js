import { useEffect, useState } from 'react';

const useResize = () => {
  const [width, setWidth] = useState({ width: 0 });

  useEffect(() => {
    const getWidth = () => setWidth({ width: window.innerWidth });

    getWidth();

    window.addEventListener('resize', getWidth);
    return () => window.removeEventListener('resize', getWidth);
  }, []);

  return width;
};

export default useResize;