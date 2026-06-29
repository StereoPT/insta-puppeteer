type DelayAction =
  | "click"
  | "like"
  | "follow"
  | "type"
  | "scroll"
  | "navigate"
  | "default";

class DelayService {
  private actionCount = 0;

  async wait(action: DelayAction = "default") {
    this.actionCount++;

    const delays = {
      click: [1000, 3000],
      like: [1500, 4000],
      follow: [2000, 5000],
      type: [2000, 4000],
      scroll: [1000, 3000],
      navigate: [3000, 8000],
      default: [1500, 4000],
    } as const;

    const [min, max] = delays[action] || delays.default;
    let delay = this.random(min, max);

    if (this.actionCount % this.random(10, 15) === 0) {
      delay += this.random(5000, 15000);
    }

    await this.sleep(delay);
  }

  async quick() {
    await this.sleep(this.random(800, 2000));
  }

  private random(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  private sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export const delay = new DelayService();
