"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let mouseX = 0;
    let mouseY = 0;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create floating orbs
    const orbs = [];
    const orbCount = window.innerWidth < 768 ? 8 : 15;

    for (let i = 0; i < orbCount; i++) {
      orbs.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 100 + 50,
      });
    }

    // Mouse tracking
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update orb positions
      orbs.forEach((orb) => {
        orb.x += orb.vx;
        orb.y += orb.vy;

        // Bounce off edges
        if (orb.x < 0 || orb.x > canvas.width) orb.vx *= -1;
        if (orb.y < 0 || orb.y > canvas.height) orb.vy *= -1;

        // Keep orbs in bounds
        orb.x = Math.max(0, Math.min(canvas.width, orb.x));
        orb.y = Math.max(0, Math.min(canvas.height, orb.y));

        // Slight attraction to mouse
        const dx = mouseX - orb.x;
        const dy = mouseY - orb.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 300) {
          orb.vx += dx * 0.0001;
          orb.vy += dy * 0.0001;
        }
      });

      // Draw connections between nearby orbs
      orbs.forEach((orb1, i) => {
        orbs.slice(i + 1).forEach((orb2) => {
          const dx = orb2.x - orb1.x;
          const dy = orb2.y - orb1.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 200) {
            const opacity = (1 - distance / 200) * 0.3;
            ctx.strokeStyle = `rgba(0, 255, 153, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(orb1.x, orb1.y);
            ctx.lineTo(orb2.x, orb2.y);
            ctx.stroke();
          }
        });
      });

      // Draw gradient orbs
      orbs.forEach((orb) => {
        const gradient = ctx.createRadialGradient(
          orb.x,
          orb.y,
          0,
          orb.x,
          orb.y,
          orb.radius
        );
        gradient.addColorStop(0, "rgba(0, 255, 153, 0.15)");
        gradient.addColorStop(0.5, "rgba(0, 255, 153, 0.08)");
        gradient.addColorStop(1, "rgba(0, 255, 153, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: "screen" }}
      />
      {/* Additional floating gradient orbs */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 300 + 150}px`,
              height: `${Math.random() * 300 + 150}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, rgba(0, 255, 153, ${0.08 + Math.random() * 0.04}) 0%, transparent 70%)`,
              filter: "blur(60px)",
            }}
            animate={{
              x: [0, Math.random() * 300 - 150, Math.random() * 200 - 100, 0],
              y: [0, Math.random() * 300 - 150, Math.random() * 200 - 100, 0],
              scale: [1, 1.3, 0.9, 1],
              opacity: [0.3, 0.6, 0.4, 0.3],
            }}
            transition={{
              duration: Math.random() * 15 + 20,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5,
            }}
          />
        ))}
      </div>
      {/* Subtle grid overlay for tech feel */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 153, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 153, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  );
}

export default AnimatedBackground;

