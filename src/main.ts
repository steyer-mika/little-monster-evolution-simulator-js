import { Food } from "@/core/entities/food.entity";
import { Monster } from "@/core/entities/monster.entity";
import { Renderer } from "@/core/renderer";
import { Sandbox } from "@/core/sandbox";
import { Simulation } from "@/core/simulation";
import { DebugService } from "@/services/debug.service";

import "@/style.css";

const renderer = new Renderer();
const debugService = new DebugService();

const simulate = () => {
  const sandbox = new Sandbox();

  for (let i = 0; i < 5; i++) {
    sandbox.add(new Monster(60 + i * 40, 50));
  }

  for (let i = 0; i < 5; i++) {
    sandbox.add(new Food(160 + i * 40, 150));
  }

  const simulation = new Simulation(renderer, sandbox, debugService);

  simulation.start();
};

simulate();
