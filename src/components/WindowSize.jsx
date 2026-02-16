import { useState, useEffect } from 'react';

export default function WindowSize() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    
    // Attach listener once on mount
    window.addEventListener('resize', handleResize);
    
    // Cleanup on unmount or effect re-run
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <p>Current width: {width}</p>;
}
