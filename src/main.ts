import { Food } from "@/core/entities/food.entity";
import { Monster } from "@/core/entities/monster.entity";
import { Renderer } from "@/core/renderer";
import { Sandbox } from "@/core/sandbox";
import { Simulation } from "@/core/simulation";
import { DebugService } from "@/services/debug.service";

import "@/style.css";
import { randomIntFromInterval } from "@/utility/random";
import { randomSandboxCoordinate } from "@/utility/random-sandbox-coordinate";

const renderer = new Renderer();
const debugService = new DebugService();
const sandbox = new Sandbox();

const simulation = new Simulation(renderer, sandbox, debugService);

for (let i = 0; i < 5; i++) {
  const { x, y } = randomSandboxCoordinate();

  sandbox.add(new Monster(x, y));
}

for (let i = 0; i < randomIntFromInterval(2, 15); i++) {
  const { x, y } = randomSandboxCoordinate();

  sandbox.add(new Food(x, y));
}

simulation.start();

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    simulation.stop();
  } else {
    simulation.start();
  }
});
