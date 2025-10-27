import { useEffect, useRef } from 'react';

const Index = () => {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;

    let startTime: number | null = null;
    const duration = 12000;
    const amplitude = 25;

    const easeInOutSine = (x: number): number => {
      return -(Math.cos(Math.PI * x) - 1) / 2;
    };

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = (elapsed % duration) / duration;
      
      const easedProgress = easeInOutSine(progress);
      const y = (easedProgress - 0.5) * amplitude * 2;
      
      image.style.transform = `translateY(${y}px)`;
      
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden bg-black flex items-center justify-center">
      <img
        ref={imageRef}
        src="https://cdn.poehali.dev/files/589e2078-c5dc-491c-982b-a8b962ed023f.png"
        alt="Floating artwork"
        className="max-w-full max-h-full object-contain will-change-transform"
      />
    </div>
  );
};

export default Index;