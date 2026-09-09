import React, { useEffect, useRef } from 'react';

export const MovingDotsBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    interface Particle {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      vx: number;
      vy: number;
      alpha: number;
      phase: number;
    }

    let particles: Particle[] = [];
    const mouse = { x: -1000, y: -1000, active: false };

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      particles = [];
      const spacing = 36;
      const cols = Math.ceil(width / spacing) + 2;
      const rows = Math.ceil(height / spacing) + 2;

      for (let i = -1; i < cols; i++) {
        for (let j = -1; j < rows; j++) {
          const x = i * spacing;
          const y = j * spacing;
          particles.push({
            x,
            y,
            baseX: x,
            baseY: y,
            size: Math.random() < 0.25 ? 1.8 : 1.2,
            vx: (Math.random() - 0.5) * 0.2,
            vy: (Math.random() - 0.5) * 0.2,
            alpha: 0.15 + Math.random() * 0.25,
            phase: Math.random() * Math.PI * 2,
          });
        }
      }
    };

    const handleResize = () => {
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    init();

    let time = 0;
    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Draw background ambient dark glow
      const radialGlow = ctx.createRadialGradient(
        width * 0.5,
        height * 0.3,
        50,
        width * 0.5,
        height * 0.3,
        width * 0.8
      );
      radialGlow.addColorStop(0, 'rgba(14, 165, 233, 0.04)');
      radialGlow.addColorStop(0.5, 'rgba(59, 130, 246, 0.02)');
      radialGlow.addColorStop(1, 'rgba(7, 10, 17, 0)');
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, width, height);

      // Render connected lines & particle dots
      const maxDistance = 120;

      particles.forEach((p, idx) => {
        // Wave motion
        const wave = Math.sin(time + p.baseX * 0.01 + p.baseY * 0.01 + p.phase) * 3;
        const targetX = p.baseX + Math.cos(time * 0.8 + p.phase) * 2;
        const targetY = p.baseY + wave;

        // Mouse displacement effect
        let dx = mouse.x - targetX;
        let dy = mouse.y - targetY;
        let dist = Math.sqrt(dx * dx + dy * dy);

        let currentAlpha = p.alpha;
        let currentSize = p.size;

        if (dist < 160) {
          const force = (160 - dist) / 160;
          p.x = targetX - (dx / dist) * force * 15;
          p.y = targetY - (dy / dist) * force * 15;
          currentAlpha = Math.min(0.9, p.alpha + force * 0.6);
          currentSize = p.size + force * 1.5;
        } else {
          p.x += (targetX - p.x) * 0.1;
          p.y += (targetY - p.y) * 0.1;
        }

        // Draw Dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
        
        if (dist < 140) {
          ctx.fillStyle = `rgba(56, 189, 248, ${currentAlpha})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#00f2fe';
        } else {
          ctx.fillStyle = `rgba(186, 230, 253, ${currentAlpha * 0.5})`;
          ctx.shadowBlur = 0;
        }
        ctx.fill();

        // Connect nearby points to form dynamic Google AI Studio dot web on mouse hover
        if (dist < maxDistance) {
          particles.slice(idx + 1, idx + 12).forEach((other) => {
            const odx = other.x - p.x;
            const ody = other.y - p.y;
            const odist = Math.sqrt(odx * odx + ody * ody);
            if (odist < 55) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(other.x, other.y);
              const lineAlpha = (1 - odist / 55) * (1 - dist / maxDistance) * 0.35;
              ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha})`;
              ctx.lineWidth = 0.75;
              ctx.stroke();
            }
          });
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000 opacity-90"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
};
