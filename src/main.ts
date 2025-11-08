import { Monster } from "@/core/entities/monster.entity";
import { Renderer } from "@/core/renderer";
import { Sandbox } from "@/core/sandbox";
import { Simulation } from "@/core/simulation";

import "@/style.css";

const renderer = new Renderer();

const simulate = () => {
  const sandbox = new Sandbox();

  for (let i = 0; i < 5; i++) {
    sandbox.add(new Monster(60 + i * 40, 50));
  }

  const simulation = new Simulation(renderer, sandbox);

  simulation.start();
};

simulate();
