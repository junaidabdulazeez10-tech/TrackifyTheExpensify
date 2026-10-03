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
        value: 60,
      },

      paint: {
        color: {
          value: ["#00ffb3", "#ff036c", "#00c4ff", "#ff00c4", "#c400ff", "#ffb300", "#b3ff00", "#00b3ff"],
        },
      },

      size: {
        value: {
          min: 3,
          max: 8,
        },
      },

      opacity: {
        value: {
          min: 0.1,
          max: 0.3,
        },
      },

      move: {
        enable: true,
        speed: 2,
      },
    },
  };

  return (

    <div
      className={`fixed inset-0 z-0 pointer-events-none ${theme === "dark" ? "bg-black" : "bg-gradient-to-br from-slate-50 via-cyan-50 to-emerald-50"}`}>

      {theme === "dark" && (
        <ParticlesProvider init={initParticles}>
          <Particles
            id="tsparticles"
            className="absolute inset-0"
            options={darkOptions}
          />
        </ParticlesProvider>
      )}

      {theme === "light" && (
        <ParticlesProvider init={initParticles}>
          <Particles
            id="tsparticles"
            className="absolute inset-0"
            options={lightOptions}
          />
        </ParticlesProvider>
      )}


    </div>
  )
}
