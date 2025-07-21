'use client';
import { useEffect, useRef } from 'react';

export default function MouseEffect() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (ref.current) {
        ref.current.style.transform = `translate(${e.clientX - 75}px, ${e.clientY - 75}px)`;
      }
    };

    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return <div ref={ref} className="red-trail" />;
}
