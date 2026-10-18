import { expect, it } from "vitest";
import {
  finishTimer,
  formatTime,
  pauseTimer,
  remaining,
  resumeTimer,
  startTimer,
  stopTimer,
  tick,
} from "./timer";

it("uses the deadline after delayed callbacks and requires manual completion", () => {
  const timer = startTimer(2, 1_000);
  expect(remaining(timer, 61_000)).toBe(60_000);
  const elapsed = tick(timer, 180_000);
  expect(elapsed.status).toBe("elapsed");
  expect(finishTimer(elapsed).status).toBe("completed");
});
it("freezes the remaining duration while paused", () => {
  const paused = pauseTimer(startTimer(2, 0), 20_000);
  expect(remaining(paused, 500_000)).toBe(100_000);
  expect(remaining(resumeTimer(paused, 500_000), 550_000)).toBe(50_000);
  expect(stopTimer(paused).status).toBe("stopped");
});
it("does not turn a late pause into extra time", () => {
  expect(pauseTimer(startTimer(2, 0), 130_000).status).toBe("elapsed");
  expect(formatTime(1)).toBe("00:01");
  expect(formatTime(0)).toBe("00:00");
});
