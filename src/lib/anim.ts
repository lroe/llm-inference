import {interpolate, spring} from 'remotion';
import {FPS} from '../theme';

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/** Frames -> seconds, for readable scene code. */
export const sec = (n: number) => Math.round(n * FPS);

/** Soft fade/rise reveal. `at` and `dur` are in seconds. */
export const reveal = (frame: number, at: number, dur = 0.55) => {
  const start = at * FPS;
  const end = start + dur * FPS;
  const opacity = interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const y = interpolate(frame, [start, end], [14, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return {opacity, transform: `translateY(${y}px)`};
};

/** Pop with a gentle spring overshoot. `at` in seconds. */
export const pop = (frame: number, at: number, dur = 0.6) => {
  const p = spring({
    frame: frame - at * FPS,
    fps: FPS,
    durationInFrames: Math.round(dur * FPS),
    config: {damping: 16, mass: 0.6, stiffness: 120},
  });
  const opacity = clamp01(p * 2.2);
  return {
    opacity,
    transform: `scale(${0.92 + 0.08 * p})`,
  };
};

/** 0..1 line-draw progress starting at `at` seconds. */
export const draw = (frame: number, at: number, dur = 0.7) =>
  interpolate(frame, [at * FPS, (at + dur) * FPS], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

/** Fade a scene in/out through the Dracula background (4 frames = 0.13 s). */
export const sceneOpacity = (frame: number, durationInFrames: number) =>
  interpolate(
    frame,
    [0, 4, durationInFrames - 4, durationInFrames],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Width used by the monospace-ish token blocks. */
export const tokenWidth = (text: string, size = 34) =>
  Math.max(46, text.length * size * 0.56 + 36);
