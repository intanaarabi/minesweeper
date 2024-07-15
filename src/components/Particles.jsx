import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadStarsPreset } from "@tsparticles/preset-stars";

const ParticlesBackground = () => {
    const [init, setInit] = useState(false);

    // this should be run only once per application lifetime
    useEffect(() => {
      initParticlesEngine(async (engine) => {
        await loadStarsPreset(engine);
      }).then(() => {
        setInit(true);
      });
    }, []);
  
    const particlesLoaded = (container) => {
      console.log(container);
    };
  
    const options = useMemo(
      () => ({
        background: {
          color: {
            value: "#302537",
          },
        },
        particles: {
            shape: {
              type: "circle", // starting from v2, this require the square shape script
            },
            color: {
                value: ["#F55A70", "#00D4AD", "#FE7E75","#584561"]
              },
            number: {
                value: 100, // number of particles
            },
          },
        preset: "stars",
      }),
      [],
    );
  
    if (init) {
      return (
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={options}
        />
      );
    }
  
    return <></>;
};

export default ParticlesBackground;