export interface SpringConfig {
  stiffness: number;
  damping: number;
  mass: number;
}

export const SPRINGS = {
  /** Snappy, slight overshoot — pointer-driven UI. */
  snappy: { stiffness: 260, damping: 22, mass: 1 },
  /** Soft and floaty — large surfaces. */
  gentle: { stiffness: 120, damping: 18, mass: 1 },
} satisfies Record<string, SpringConfig>;

/**
 * Damped harmonic oscillator (Hooke's law + viscous damping), integrated with
 * semi-implicit Euler. Frame-rate independent: pass the real elapsed time.
 */
export class Spring {
  value: number;
  target: number;
  velocity = 0;

  constructor(
    initial: number,
    private readonly config: SpringConfig = SPRINGS.snappy,
  ) {
    this.value = initial;
    this.target = initial;
  }

  /** Advances the simulation. Returns true once the spring has settled. */
  step(dtSeconds: number): boolean {
    // Clamp dt so a backgrounded tab doesn't explode the integration.
    const dt = Math.min(dtSeconds, 1 / 30);
    const { stiffness, damping, mass } = this.config;
    const force = -stiffness * (this.value - this.target) - damping * this.velocity;
    this.velocity += (force / mass) * dt;
    this.value += this.velocity * dt;

    const settled = Math.abs(this.velocity) < 0.01 && Math.abs(this.value - this.target) < 0.01;
    if (settled) {
      this.value = this.target;
      this.velocity = 0;
    }
    return settled;
  }
}
