import React, {useMemo} from 'react';
import rough from 'roughjs';
import type {Drawable, Options, PathInfo} from 'roughjs/bin/core';
import {C, FONT, STROKE} from '../theme';
import {draw, pop} from '../lib/anim';

const generator = rough.generator();

export const sketchPaths = (drawable: Drawable): PathInfo[] => generator.toPaths(drawable);

type BaseProps = {
  at?: number;
  dur?: number;
  progress?: number;
  stroke?: string;
  fill?: string;
  fillStyle?: 'solid' | 'hachure' | 'cross-hatch' | 'dots' | 'zigzag' | 'dashed';
  strokeWidth?: number;
  roughness?: number;
  bowing?: number;
  seed?: number;
  opacity?: number;
  className?: string;
};

const defaults = {
  stroke: C.fg,
  strokeWidth: STROKE,
  roughness: 1.15,
  bowing: 1.1,
};

const usePaths = (make: () => Drawable, deps: React.DependencyList) =>
  useMemo(() => {
    try {
      return generator.toPaths(make());
    } catch {
      return [];
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

const Paths: React.FC<{
  paths: PathInfo[];
  progress: number;
  opacity?: number;
}> = ({paths, progress, opacity = 1}) => (
  <g opacity={opacity}>
    {paths.map((p, i) => {
      const isFill = Boolean(p.fill && p.fill !== 'none');
      if (isFill) {
        return (
          <path
            key={i}
            d={p.d}
            fill={p.fill}
            fillOpacity={progress * 0.92}
            stroke="none"
          />
        );
      }
      const local = Math.max(0, Math.min(1, (progress - i * 0.12) / 0.88));
      return (
        <path
          key={i}
          d={p.d}
          fill="none"
          stroke={p.stroke}
          strokeWidth={p.strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - local}
        />
      );
    })}
  </g>
);

const useProgress = (at: number, dur: number, progress?: number) => {
  return (frame: number) => (progress === undefined ? draw(frame, at, dur) : progress);
};

export const SketchLine: React.FC<
  BaseProps & {x1: number; y1: number; x2: number; y2: number}
> = ({x1, y1, x2, y2, at = 0, dur = 0.7, progress, stroke, strokeWidth, roughness, bowing, seed, opacity}) => {
  const paths = usePaths(
    () =>
      generator.line(x1, y1, x2, y2, {
        stroke: stroke ?? defaults.stroke,
        strokeWidth: strokeWidth ?? defaults.strokeWidth,
        roughness: roughness ?? defaults.roughness,
        bowing: bowing ?? defaults.bowing,
        seed: seed ?? 11,
      }),
    [x1, y1, x2, y2, stroke, strokeWidth, roughness, bowing, seed]
  );
  return <SketchProgress paths={paths} at={at} dur={dur} progress={progress} opacity={opacity} />;
};

const SketchProgress: React.FC<{
  paths: PathInfo[];
  at: number;
  dur: number;
  progress?: number;
  opacity?: number;
}> = ({paths, at, dur, progress, opacity}) => {
  const frame = useCurrentFrameSafe();
  const get = useProgress(at, dur, progress);
  return <Paths paths={paths} progress={get(frame)} opacity={opacity} />;
};

// Kept as a tiny wrapper so every primitive reads the current frame in one place.
import {useCurrentFrame} from 'remotion';
const useCurrentFrameSafe = () => useCurrentFrame();

export const SketchRect: React.FC<
  BaseProps & {x: number; y: number; w: number; h: number; rx?: number}
> = ({x, y, w, h, rx = 0, at = 0, dur = 0.7, progress, stroke, fill, fillStyle, strokeWidth, roughness, bowing, seed, opacity}) => {
  const paths = usePaths(() => {
    const options: Options = {
      stroke: stroke ?? defaults.stroke,
      strokeWidth: strokeWidth ?? defaults.strokeWidth,
      roughness: roughness ?? defaults.roughness,
      bowing: bowing ?? defaults.bowing,
      seed: seed ?? 23,
      ...(fill ? {fill, fillStyle: fillStyle ?? 'solid'} : {}),
    };
    if (rx > 0) {
      const d = roundedRect(x, y, w, h, rx);
      return generator.path(d, options);
    }
    return generator.rectangle(x, y, w, h, options);
  }, [x, y, w, h, rx, stroke, fill, fillStyle, strokeWidth, roughness, bowing, seed]);
  return <SketchProgress paths={paths} at={at} dur={dur} progress={progress} opacity={opacity} />;
};

export const SketchCircle: React.FC<
  BaseProps & {cx: number; cy: number; r: number}
> = ({cx, cy, r, at = 0, dur = 0.7, progress, stroke, fill, fillStyle, strokeWidth, roughness, bowing, seed, opacity}) => {
  const paths = usePaths(
    () =>
      generator.circle(cx, cy, r * 2, {
        stroke: stroke ?? defaults.stroke,
        strokeWidth: strokeWidth ?? defaults.strokeWidth,
        roughness: roughness ?? defaults.roughness,
        bowing: bowing ?? defaults.bowing,
        seed: seed ?? 31,
        ...(fill ? {fill, fillStyle: fillStyle ?? 'solid'} : {}),
      }),
    [cx, cy, r, stroke, fill, fillStyle, strokeWidth, roughness, bowing, seed]
  );
  return <SketchProgress paths={paths} at={at} dur={dur} progress={progress} opacity={opacity} />;
};

export const SketchEllipse: React.FC<
  BaseProps & {cx: number; cy: number; rx: number; ry: number}
> = ({cx, cy, rx, ry, at = 0, dur = 0.7, progress, stroke, fill, fillStyle, strokeWidth, roughness, bowing, seed, opacity}) => {
  const paths = usePaths(
    () =>
      generator.ellipse(cx, cy, rx * 2, ry * 2, {
        stroke: stroke ?? defaults.stroke,
        strokeWidth: strokeWidth ?? defaults.strokeWidth,
        roughness: roughness ?? defaults.roughness,
        bowing: bowing ?? defaults.bowing,
        seed: seed ?? 37,
        ...(fill ? {fill, fillStyle: fillStyle ?? 'solid'} : {}),
      }),
    [cx, cy, rx, ry, stroke, fill, fillStyle, strokeWidth, roughness, bowing, seed]
  );
  return <SketchProgress paths={paths} at={at} dur={dur} progress={progress} opacity={opacity} />;
};

export const SketchPath: React.FC<
  BaseProps & {d: string}
> = ({d, at = 0, dur = 0.7, progress, stroke, fill, fillStyle, strokeWidth, roughness, bowing, seed, opacity}) => {
  const paths = usePaths(
    () =>
      generator.path(d, {
        stroke: stroke ?? defaults.stroke,
        strokeWidth: strokeWidth ?? defaults.strokeWidth,
        roughness: roughness ?? defaults.roughness,
        bowing: bowing ?? defaults.bowing,
        seed: seed ?? 41,
        ...(fill ? {fill, fillStyle: fillStyle ?? 'solid'} : {}),
      }),
    [d, stroke, fill, fillStyle, strokeWidth, roughness, bowing, seed]
  );
  return <SketchProgress paths={paths} at={at} dur={dur} progress={progress} opacity={opacity} />;
};

export const SketchPolygon: React.FC<
  BaseProps & {points: [number, number][]}
> = ({points, at = 0, dur = 0.7, progress, stroke, fill, fillStyle, strokeWidth, roughness, bowing, seed, opacity}) => {
  const paths = usePaths(
    () =>
      generator.polygon(points, {
        stroke: stroke ?? defaults.stroke,
        strokeWidth: strokeWidth ?? defaults.strokeWidth,
        roughness: roughness ?? defaults.roughness,
        bowing: bowing ?? defaults.bowing,
        seed: seed ?? 43,
        ...(fill ? {fill, fillStyle: fillStyle ?? 'solid'} : {}),
      }),
    [JSON.stringify(points), stroke, fill, fillStyle, strokeWidth, roughness, bowing, seed]
  );
  return <SketchProgress paths={paths} at={at} dur={dur} progress={progress} opacity={opacity} />;
};

export const SketchArrow: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  at?: number;
  dur?: number;
  color?: string;
  strokeWidth?: number;
  head?: number;
  curve?: number;
  opacity?: number;
  dashed?: boolean;
}> = ({x1, y1, x2, y2, at = 0, dur = 0.8, color = C.fg, strokeWidth = STROKE, head = 18, curve = 0, opacity, dashed}) => {
  const frame = useCurrentFrameSafe();
  const p = draw(frame, at, dur);
  const shaftP = Math.min(1, p / 0.78);
  const headP = Math.max(0, (p - 0.72) / 0.28);
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const angle = Math.atan2(dy, dx);
  const mx = (x1 + x2) / 2 + (-dy / len) * curve;
  const my = (y1 + y2) / 2 + (dx / len) * curve;
  const d = `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;
  const back = angle + Math.PI;
  const hx1 = x2 + Math.cos(back - 0.55) * head;
  const hy1 = y2 + Math.sin(back - 0.55) * head;
  const hx2 = x2 + Math.cos(back + 0.55) * head;
  const hy2 = y2 + Math.sin(back + 0.55) * head;
  return (
    <g opacity={opacity}>
      <SketchPath
        d={d}
        progress={shaftP}
        stroke={color}
        strokeWidth={strokeWidth}
        roughness={1}
        bowing={0.6}
        seed={53}
      />
      {headP > 0 ? (
        <>
          <SketchLine x1={x2} y1={y2} x2={hx1} y2={hy1} progress={headP} stroke={color} strokeWidth={strokeWidth} roughness={0.7} seed={57} />
          <SketchLine x1={x2} y1={y2} x2={hx2} y2={hy2} progress={headP} stroke={color} strokeWidth={strokeWidth} roughness={0.7} seed={59} />
        </>
      ) : null}
    </g>
  );
};

export const Label: React.FC<{
  x: number;
  y: number;
  children: React.ReactNode;
  size?: number;
  color?: string;
  at?: number;
  dur?: number;
  align?: 'left' | 'center' | 'right';
  font?: 'hand' | 'marker';
  weight?: number;
  maxWidth?: number;
  lineHeight?: number;
  opacity?: number;
  rotate?: number;
  letterSpacing?: number;
}> = ({
  x,
  y,
  children,
  size = 48,
  color = C.fg,
  at = 0,
  dur = 0.55,
  align = 'center',
  font = 'hand',
  weight = 400,
  maxWidth,
  lineHeight = 1.05,
  opacity = 1,
  rotate = 0,
  letterSpacing = 0,
}) => {
  const frame = useCurrentFrameSafe();
  const s = pop(frame, at, dur);
  const tx = align === 'center' ? '-50%' : align === 'right' ? '-100%' : '0%';
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(${tx}, -50%) translateY(${(1 - s.opacity) * 12}px) scale(${0.96 + 0.04 * s.opacity}) rotate(${rotate}deg)`,
        opacity: s.opacity * opacity,
        color,
        fontFamily: FONT[font],
        fontWeight: weight,
        fontSize: size,
        lineHeight,
        textAlign: align,
        maxWidth,
        whiteSpace: maxWidth ? 'normal' : 'pre',
        letterSpacing,
        textShadow: 'none',
        WebkitFontSmoothing: 'antialiased',
        textRendering: 'optimizeLegibility',
        pointerEvents: 'none',
      }}
    >
      {children}
    </div>
  );
};

export const HandUnderline: React.FC<{
  x: number;
  y: number;
  w: number;
  color?: string;
  at?: number;
  dur?: number;
  progress?: number;
  seed?: number;
}> = ({x, y, w, color = C.yellow, at = 0, dur = 0.5, progress, seed = 61}) => {
  const d = `M ${x} ${y} Q ${x + w * 0.25} ${y - 9} ${x + w * 0.5} ${y - 1} T ${x + w} ${y - 5}`;
  return (
    <SketchPath
      d={d}
      at={at}
      dur={dur}
      progress={progress}
      stroke={color}
      strokeWidth={5}
      roughness={1.4}
      seed={seed}
    />
  );
};

export const FadeGroup: React.FC<{
  at?: number;
  dur?: number;
  opacity?: number;
  y?: number;
  x?: number;
  children: React.ReactNode;
}> = ({at = 0, dur = 0.55, opacity = 1, y = 10, x = 0, children}) => {
  const frame = useCurrentFrameSafe();
  const r = revealLocal(frame, at, dur);
  return (
    <g
      opacity={r.opacity * opacity}
      transform={`translate(${x} ${(1 - r.opacity) * y})`}
    >
      {children}
    </g>
  );
};

const revealLocal = (frame: number, at: number, dur: number) => {
  const start = at * 30;
  const end = start + dur * 30;
  const p = Math.min(1, Math.max(0, (frame - start) / (end - start)));
  return {opacity: p};
};

export const roundedRect = (x: number, y: number, w: number, h: number, r: number) => {
  const rr = Math.min(r, w / 2, h / 2);
  return `M ${x + rr} ${y} L ${x + w - rr} ${y} Q ${x + w} ${y} ${x + w} ${y + rr} L ${x + w} ${y + h - rr} Q ${x + w} ${y + h} ${x + w - rr} ${y + h} L ${x + rr} ${y + h} Q ${x} ${y + h} ${x} ${y + h - rr} L ${x} ${y + rr} Q ${x} ${y} ${x + rr} ${y} Z`;
};
