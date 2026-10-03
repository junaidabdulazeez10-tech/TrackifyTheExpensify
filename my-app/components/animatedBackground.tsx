"use client";

import { Engine } from "@tsparticles/engine";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useThemeContext } from "@/context/theme-context";
import SnowBackground from "./snowBackground";

export default function AnimatedBackground() {

  const { theme } = useThemeContext();

  const initParticles = async (engine: Engine) => {
    await loadSlim(engine);
  };


  const darkOptions = {
    particles: {
      number: {
        value: 100,
      },

      shape: {
        type: "star",
      },

      color: {
        value: "#ffffff",
      },

      size: {
        value: {
          min: 0.3,
          max: 2,
        },
      },

      opacity: {
        value: {
          min: 0.2,
          max: 1,
        },
        animation: {
          enable: true,
          speed: 1,
          sync: false,
        },
      },

      move: {
        enable: true,
        speed: 1,
      },
    }
  };

  const lightOptions = {
    particles: {
      number: {
        value: 100,
      },

      shape: {
        type: "char",
        options: {
          char: {
            value: ["❄", "❅", "❆"],
            font: "Arial",
            style: "",
            weight: "400",
          },
        },
      },

      paint: {
        color: {
          value: ["#64748b", "#94a3b8", "#cbd5e1"],
        },
      },

      size: {
        value: {
          min: 2,
          max: 6,
        },
      },

      opacity: {
        value: {
          min: 0.4,
          max: 0.9,
        },
      },

      move: {
        enable: true,
        direction: "bottom" as const,
        speed: {
          min: 0.5,
          max: 2,
        },
      },
    },
  };

  return (

    <div
      className={`fixed inset-0 z-0 pointer-events-none ${theme === "dark" ? "bg-black" : "bg-[#ffffff]"}`}>

      {theme === "dark" && (
        <ParticlesProvider init={initParticles}>
          <Particles
            id="tsparticles"
            className="absolute inset-0"
            options={darkOptions}
          />
        </ParticlesProvider>
      )}

      {theme === "light" && <SnowBackground />}


    </div>
  )
}
