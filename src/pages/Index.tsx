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
    img.src = 'https://cdn.poehali.dev/files/589e2078-c5dc-491c-982b-a8b962ed023f.png';

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      let startTime: number | null = null;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();

        const breathingCycle = (elapsed % 4000) / 4000;
        const breathScale = 1 + Math.sin(breathingCycle * Math.PI * 2) * 0.008;

        const floatCycle = (elapsed % 8000) / 8000;
        const floatY = Math.sin(floatCycle * Math.PI * 2) * 3;

        const swayX = Math.sin((elapsed % 10000) / 10000 * Math.PI * 2) * 2;

        ctx.translate(canvas.width / 2, canvas.height / 2 + floatY);
        ctx.scale(breathScale, breathScale);
        ctx.translate(-canvas.width / 2 + swayX, -canvas.height / 2);

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
