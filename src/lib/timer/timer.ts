export type Timer = {
  status: "running" | "paused" | "elapsed" | "completed" | "stopped";
  remainingMs: number;
  deadline: number | null;
};
export function startTimer(minutes: number, now: number): Timer {
  return {
    status: "running",
    remainingMs: minutes * 60_000,
    deadline: now + minutes * 60_000,
  };
}
export function remaining(timer: Timer, now: number) {
  return timer.deadline === null
    ? timer.remainingMs
    : Math.max(0, timer.deadline - now);
}
export function tick(timer: Timer, now: number): Timer {
  return timer.status === "running" && remaining(timer, now) === 0
    ? { status: "elapsed", remainingMs: 0, deadline: null }
    : timer;
}
export function pauseTimer(timer: Timer, now: number): Timer {
  const current = tick(timer, now);
  return current.status === "running"
    ? { status: "paused", remainingMs: remaining(current, now), deadline: null }
    : current;
}
export function resumeTimer(timer: Timer, now: number): Timer {
  return timer.status === "paused"
    ? { ...timer, status: "running", deadline: now + timer.remainingMs }
    : timer;
}
export function finishTimer(timer: Timer): Timer {
  return { ...timer, status: "completed", deadline: null };
}
export function stopTimer(timer: Timer): Timer {
  return { ...timer, status: "stopped", deadline: null };
}
export function formatTime(ms: number) {
  const seconds = Math.ceil(ms / 1000);
  return `${Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;
}
