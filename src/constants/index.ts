export const CONSTANTS = {
  simulation: {
    actionsPerDay: 20,
    dayDurationMs: 30000, // 30 seconds
  },

  rendering: {
    fps: 60,
  },

  sandbox: {
    width: 640,
    height: 360,
  },
} as const;
