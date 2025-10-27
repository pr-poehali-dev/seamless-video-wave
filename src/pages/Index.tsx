import { useEffect, useRef } from 'react';

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const canvas = container.querySelector('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = 'https://cdn.poehali.dev/files/b2440fc2-89f1-40f9-8aba-ee00ca4f0875.png';

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      let startTime: number | null = null;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();

        const swayCycle = (elapsed % 14000) / 14000;
        const easeProgress = -(Math.cos(Math.PI * swayCycle) - 1) / 2;
        
        const swayAngle = (easeProgress - 0.5) * 0.015;
        const swayX = Math.sin(swayCycle * Math.PI * 2) * 8;
        const swayY = Math.sin(swayCycle * Math.PI * 2) * 4;

        ctx.translate(canvas.width / 2 + swayX, canvas.height / 2 + swayY);
        ctx.rotate(swayAngle);
        ctx.translate(-canvas.width / 2, -canvas.height / 2);

        ctx.drawImage(img, 0, 0);

        ctx.restore();

        requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
    };
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden bg-black flex items-center justify-center" ref={containerRef}>
      <canvas className="max-w-full max-h-full object-contain" />
    </div>
  );
};

export default Index;