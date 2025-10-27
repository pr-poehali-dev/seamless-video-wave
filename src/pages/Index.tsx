import { useEffect, useRef } from 'react';

const Index = () => {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;

    let startTime: number | null = null;
    const duration = 8000;
    const amplitude = 30;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = (elapsed % duration) / duration;
      
      const y = Math.sin(progress * Math.PI * 2) * amplitude;
      
      image.style.transform = `translateY(${y}px)`;
      
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden bg-black flex items-center justify-center">
      <img
        ref={imageRef}
        src="https://cdn.poehali.dev/files/e3555fdc-b9f2-425c-9853-6f4613cb226f.png"
        alt="Floating artwork"
        className="max-w-full max-h-full object-contain will-change-transform"
        style={{
          transition: 'transform 0.1s linear'
        }}
      />
    </div>
  );
};

export default Index;
