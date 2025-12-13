'use client';

import React, { useEffect, useRef } from 'react';

interface Orb {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

interface Particle {
  x: number;
  y: number;
  radius: number;
  baseRadius: number;
  dx: number;
  dy: number;
  color: string;
}

export const InteractiveLavaBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbs = useRef<Orb[]>([]);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: 0, y: 0, radius: 150 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    // Lava color palette
    const colorPalette = {
      primary: 'rgba(255, 165, 0, 0.6)', // Orange, increased opacity
      secondary: 'rgba(255, 85, 0, 0.6)', // Red, increased opacity
      tertiary: 'rgba(113, 113, 122, 0.2)' // Gray for lines (not used now)
    };

    const resize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      initOrbs();
      initParticles();
    };

    const initOrbs = () => {
      orbs.current = [];
      // Reduced count but increased size for "soft glow" effect
      const orbCount = 12; 
      
      // Deep, rich lava colors (Crimson, Dark Orange, Burnt Sienna)
      const colors = [
        'rgba(255, 69, 0, 0.15)',   // Red-Orange (Subtle)
        'rgba(255, 140, 0, 0.12)',  // Dark Orange
        'rgba(220, 20, 60, 0.1)',   // Crimson (Deep)
        'rgba(180, 40, 0, 0.08)',   // Burnt Orange
      ];

      for (let i = 0; i < orbCount; i++) {
        orbs.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          // Slower, more viscous movement
          vx: (Math.random() - 0.5) * 0.3, 
          vy: (Math.random() - 0.5) * 0.3,
          // Large radius for smooth gradients
          radius: Math.random() * 300 + 150, 
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const initParticles = () => {
      particles.current = [];
      const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 20000), 80);

      for (let i = 0; i < particleCount; i++) {
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          baseRadius: Math.random() * 4 + 2, // Bigger particles
          radius: Math.random() * 4 + 2,
          dx: (Math.random() - 0.5) * 0.3,
          dy: (Math.random() - 0.5) * 0.3,
          color: Math.random() > 0.5 ? colorPalette.primary : colorPalette.secondary,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // 'Screen' blend mode creates the glowing light effect on dark bg
      ctx.globalCompositeOperation = 'screen'; 

      orbs.current.forEach((orb) => {
        // Move orbs
        orb.x += orb.vx;
        orb.y += orb.vy;

        // Soft wall bounce
        if (orb.x < -orb.radius) orb.x = canvas.width + orb.radius;
        if (orb.x > canvas.width + orb.radius) orb.x = -orb.radius;
        if (orb.y < -orb.radius) orb.y = canvas.height + orb.radius;
        if (orb.y > canvas.height + orb.radius) orb.y = -orb.radius;

        // Interactive: Mouse pushes orbs gently
        const dx = mouse.current.x - orb.x;
        const dy = mouse.current.y - orb.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 600; // Large interaction radius

        if (distance < maxDist) {
          const force = (maxDist - distance) / maxDist;
          orb.x -= (dx / distance) * force * 0.5;
          orb.y -= (dy / distance) * force * 0.5;
        }

        // Draw soft glowing orb
        const gradient = ctx.createRadialGradient(
          orb.x, orb.y, 0,
          orb.x, orb.y, orb.radius
        );
        
        gradient.addColorStop(0, orb.color); 
        gradient.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw particles
      ctx.globalCompositeOperation = 'source-over';
      particles.current.forEach((particle) => {
        // Update particle position
        if (particle.x + particle.radius > canvas.width || particle.x - particle.radius < 0) particle.dx = -particle.dx;
        if (particle.y + particle.radius > canvas.height || particle.y - particle.radius < 0) particle.dy = -particle.dy;

        particle.x += particle.dx;
        particle.y += particle.dy;

        // Mouse interactivity
        const dxMouse = mouse.current.x - particle.x;
        const dyMouse = mouse.current.y - particle.y;
        const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distanceMouse < mouse.current.radius) {
          if (particle.radius < particle.baseRadius * 3) {
            particle.radius += 0.2;
          }
        } else if (particle.radius > particle.baseRadius) {
          particle.radius -= 0.05;
        }

        // Draw particle with glow
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = particle.color;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow
      });

      // Connect particles
      // connectParticles(); // Removed connecting lines

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        radius: 150,
      };
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    // Deep black background (#020202) for contrast
    <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none bg-[#020202]">
      <canvas ref={canvasRef} className="absolute inset-0" />
      {/* Subtle technical grid overlay for financial texture */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
    </div>
  );
};