"use client";

import { useCallback, useEffect, useState } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import type { Engine } from 'tsparticles-engine';
import Image from 'next/image';

interface ParticleBackgroundProps {
  className?: string;
}

export default function ParticleBackground({ className }: ParticleBackgroundProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  if (!mounted) return null;

  return (
    <div className={`relative w-full h-[500px] bg-boffin-background ${className}`}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        className="absolute inset-0 z-0"
        options={{
          fullScreen: { enable: false },
          fpsLimit: 120,
          particles: {
            color: {
              value: '#4ade80', // Light green color (Boffin brand color)
            },
            links: {
              color: '#4ade80', // Light green color (Boffin brand color)
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            move: {
              direction: 'none',
              enable: true,
              outModes: {
                default: 'bounce',
              },
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.7, // Increased opacity for better visibility
            },
            shape: {
              type: 'circle',
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: 'grab',
              },
              onClick: {
                enable: true,
                mode: 'push',
              },
              resize: true,
            },
            modes: {
              grab: {
                distance: 140,
                links: {
                  opacity: 1,
                },
              },
              push: {
                quantity: 4,
              },
            },
          },
        }}
      />
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white">
        <div className="relative w-40 h-40 mb-4">
          <Image
            src="/images/logo.svg"
            alt="Boffin Institute Logo"
            fill
            className="invert"
            priority
          />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-4">Boffin Institute</h1>
        <p className="text-xl md:text-2xl text-center max-w-2xl px-4">
          Empowering individuals and organizations with cutting-edge data analytics education
        </p>
      </div>
    </div>
  );
}
