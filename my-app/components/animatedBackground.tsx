"use client";

import { Engine } from "@tsparticles/engine";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useThemeContext } from "@/context/theme-context";

export default function AnimatedBackground() {

  const { theme } = useThemeContext();

  const initParticles = async (engine: Engine) => {
    await loadSlim(engine);
  };


  const darkOptions = {
    particles: {
      number: {
        value: 100
      },
      color: {
        value: "#ffffff",
      },
      size: {
        value: {
          min: 1,
          max: 3,
        },
      },
      opacity: {
        value: {
          min: 0.1,
          max: 1,
        },
      },
      animation: {
        enable: true,
        speed: 4,
        sync: false,
      },
      move: {
        enable: true,
        speed: 0.15,
      },
    }
  };

  const lightOptions = {
    particles: {
      number: {
        value: 40,
      },

      shape: {
        type: "square",
      },

      paint: {
        color: {
          value: ["#00ffcc", "#2bff00", "#3b82f6", "#00fff2", "#a6ff00", "#ff006a", "#ffd900", "#ea00ff8e"],
        },
      },

      size: {
        value: {
          min: 5,
          max: 15,
        },
      },

      opacity: {
        value: {
          min: 0.3,
          max: 0.7,
        },
      },

      move: {
        enable: true,
        speed: 0.5,
      },
    },
  };


  return (
    <div
      className={`fixed inset-0 z-0 pointer-events-none ${theme === "dark" ? "bg-black" : "bg-neutral-300"
        }`}
    >

      <ParticlesProvider init={initParticles}>
        <Particles
          id="tsparticles"
          className="absolute inset-0"
          options={theme === "dark" ? darkOptions : lightOptions}
        />
      </ParticlesProvider>

    </div>
  )
}