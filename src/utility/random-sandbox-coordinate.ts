import { CONSTANTS } from "@/constants";

export type Coordinate = {
  x: number;
  y: number;
};

export const randomSandboxCoordinate = (): Coordinate => {
  return {
    x: Math.floor(Math.random() * (CONSTANTS.sandbox.width + 1)),
    y: Math.floor(Math.random() * (CONSTANTS.sandbox.height + 1)),
  };
};
