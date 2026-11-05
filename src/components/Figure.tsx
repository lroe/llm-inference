import React from 'react';
import {C, STROKE} from '../theme';
import {SketchCircle, SketchLine, SketchPath, SketchRect} from './Sketch';

export type Pose =
  | 'stand'
  | 'walk'
  | 'walk2'
  | 'point'
  | 'think'
  | 'carry'
  | 'cheer'
  | 'shrug'
  | 'sit'
  | 'pull'
  | 'lean';

type FigureProps = {
  x: number;
  y: number;
  scale?: number;
  pose?: Pose;
  color?: string;
  at?: number;
  dur?: number;
  flip?: boolean;
  hat?: 'chef' | 'cap' | 'none';
  accent?: string;
  opacity?: number;
  hold?: {x: number; y: number; kind: 'tray' | 'box' | 'none'};
};

export const Figure: React.FC<FigureProps> = ({
  x,
  y,
  scale = 1,
  pose = 'stand',
  color = C.fg,
  at = 0,
  dur = 0.9,
  flip = false,
  hat = 'none',
  accent = C.cyan,
  opacity = 1,
  hold = {x: 0, y: 0, kind: 'none'},
}) => {
  const armY = -160;
  const shoulderY = -178;
  const hipY = -92;

  const arms: Record<Pose, {l: [number, number, number, number]; r: [number, number, number, number]}> = {
    stand: {l: [-52, armY + 32, -66, armY + 58], r: [52, armY + 32, 66, armY + 58]},
    walk: {l: [-50, armY + 30, -72, armY + 52], r: [50, armY + 30, 72, armY + 52]},
    walk2: {l: [-48, armY + 30, -68, armY + 64], r: [48, armY + 30, 68, armY + 46]},
    point: {l: [-46, armY + 32, -60, armY + 60], r: [48, armY + 28, 136, armY + 4]},
    think: {l: [-46, armY + 32, -56, armY + 58], r: [42, armY + 26, 28, shoulderY + 66]},
    carry: {l: [-44, armY + 30, -18, armY + 10], r: [44, armY + 30, 18, armY + 10]},
    cheer: {l: [-46, armY + 24, -78, shoulderY - 44], r: [46, armY + 24, 78, shoulderY - 44]},
    shrug: {l: [-46, armY + 24, -78, shoulderY + 20], r: [46, armY + 24, 78, shoulderY + 20]},
    sit: {l: [-46, armY + 30, -56, armY + 62], r: [46, armY + 30, 56, armY + 62]},
    pull: {l: [-46, armY + 26, -82, shoulderY - 20], r: [46, armY + 26, 82, shoulderY - 20]},
    lean: {l: [-44, armY + 30, -54, armY + 64], r: [46, armY + 26, 88, armY + 22]},
  };

  const legs: Record<Pose, {l: [number, number, number, number]; r: [number, number, number, number]}> = {
    stand: {l: [-4, hipY, -34, 0], r: [4, hipY, 34, 0]},
    walk: {l: [-4, hipY, -46, -8], r: [4, hipY, 38, 0]},
    walk2: {l: [-4, hipY, -38, 0], r: [4, hipY, 46, -8]},
    point: {l: [-4, hipY, -34, 0], r: [4, hipY, 34, 0]},
    think: {l: [-4, hipY, -30, 0], r: [4, hipY, 34, 0]},
    carry: {l: [-4, hipY, -34, 0], r: [4, hipY, 34, 0]},
    cheer: {l: [-4, hipY, -42, 0], r: [4, hipY, 42, 0]},
    shrug: {l: [-4, hipY, -32, 0], r: [4, hipY, 32, 0]},
    sit: {l: [-4, hipY, -54, -22], r: [4, hipY, 54, -22]},
    pull: {l: [-4, hipY, -38, 0], r: [4, hipY, 42, 0]},
    lean: {l: [-4, hipY, -34, 0], r: [4, hipY, 38, 0]},
  };

  const a = arms[pose];
  const l = legs[pose];
  const headY = -212;

  return (
    <g
      opacity={opacity}
      transform={`translate(${x} ${y}) scale(${scale * (flip ? -1 : 1)} ${scale})`}
    >
      {pose === 'sit' ? (
        <SketchLine x1={-78} y1={-62} x2={78} y2={-62} at={at} dur={dur} stroke={C.panel} strokeWidth={10} seed={71} />
      ) : null}

      <SketchCircle cx={0} cy={headY} r={31} at={at + 0.05} dur={dur * 0.6} stroke={color} strokeWidth={STROKE + 1} seed={73} />
      <SketchLine x1={0} y1={headY + 31} x2={0} y2={hipY} at={at + 0.18} dur={dur * 0.55} stroke={color} strokeWidth={STROKE + 1} seed={75} />
      <SketchLine x1={0} y1={shoulderY} x2={a.l[0]} y2={a.l[1]} at={at + 0.28} dur={dur * 0.5} stroke={color} strokeWidth={STROKE + 1} seed={77} />
      <SketchLine x1={a.l[0]} y1={a.l[1]} x2={a.l[2]} y2={a.l[3]} at={at + 0.33} dur={dur * 0.5} stroke={color} strokeWidth={STROKE + 1} seed={79} />
      <SketchLine x1={0} y1={shoulderY} x2={a.r[0]} y2={a.r[1]} at={at + 0.28} dur={dur * 0.5} stroke={color} strokeWidth={STROKE + 1} seed={81} />
      <SketchLine x1={a.r[0]} y1={a.r[1]} x2={a.r[2]} y2={a.r[3]} at={at + 0.33} dur={dur * 0.5} stroke={color} strokeWidth={STROKE + 1} seed={83} />
      <SketchLine x1={0} y1={hipY} x2={l.l[0]} y2={l.l[1]} at={at + 0.4} dur={dur * 0.5} stroke={color} strokeWidth={STROKE + 1} seed={85} />
      <SketchLine x1={l.l[0]} y1={l.l[1]} x2={l.l[2]} y2={l.l[3]} at={at + 0.46} dur={dur * 0.5} stroke={color} strokeWidth={STROKE + 1} seed={87} />
      <SketchLine x1={0} y1={hipY} x2={l.r[0]} y2={l.r[1]} at={at + 0.4} dur={dur * 0.5} stroke={color} strokeWidth={STROKE + 1} seed={89} />
      <SketchLine x1={l.r[0]} y1={l.r[1]} x2={l.r[2]} y2={l.r[3]} at={at + 0.46} dur={dur * 0.5} stroke={color} strokeWidth={STROKE + 1} seed={91} />

      {/* face */}
      <circle cx={-10} cy={headY - 4} r={3.4} fill={color} opacity={0.9} />
      <circle cx={10} cy={headY - 4} r={3.4} fill={color} opacity={0.9} />
      <SketchPath
        d={
          pose === 'cheer'
            ? `M -10 ${headY + 14} Q 0 ${headY + 25} 10 ${headY + 14}`
            : pose === 'shrug'
              ? `M -9 ${headY + 15} Q 0 ${headY + 17} 9 ${headY + 15}`
              : `M -9 ${headY + 13} Q 0 ${headY + 19} 9 ${headY + 13}`
        }
        at={at + 0.5}
        dur={dur * 0.4}
        stroke={color}
        strokeWidth={3.4}
        roughness={0.7}
        seed={93}
      />

      {hat === 'chef' ? (
        <>
          <SketchRect x={-30} y={headY - 50} w={60} h={24} rx={7} at={at + 0.55} dur={dur * 0.4} stroke={color} strokeWidth={3.6} seed={95} />
          <SketchCircle cx={0} cy={headY - 62} r={22} at={at + 0.55} dur={dur * 0.4} stroke={color} strokeWidth={3.6} seed={96} />
          <SketchCircle cx={-21} cy={headY - 52} r={15} at={at + 0.58} dur={dur * 0.4} stroke={color} strokeWidth={3.6} seed={97} />
          <SketchCircle cx={21} cy={headY - 52} r={15} at={at + 0.58} dur={dur * 0.4} stroke={color} strokeWidth={3.6} seed={99} />
          <SketchLine x1={-28} y1={headY - 26} x2={28} y2={headY - 26} at={at + 0.6} dur={dur * 0.4} stroke={color} strokeWidth={4} seed={101} />
        </>
      ) : null}

      {hat === 'cap' ? (
        <>
          <SketchPath d={`M -30 ${headY - 18} Q 0 ${headY - 54} 30 ${headY - 18}`} at={at + 0.55} dur={dur * 0.4} stroke={accent} strokeWidth={5} seed={103} />
          <SketchLine x1={-30} y1={headY - 18} x2={36} y2={headY - 18} at={at + 0.6} dur={dur * 0.4} stroke={accent} strokeWidth={5} seed={105} />
        </>
      ) : null}

      {hold.kind === 'tray' ? (
        <g transform={`translate(${hold.x} ${hold.y})`}>
          <SketchLine x1={-44} y1={0} x2={44} y2={0} at={at + 0.62} dur={dur * 0.4} stroke={accent} strokeWidth={5} seed={107} />
          <SketchLine x1={-34} y1={2} x2={-34} y2={-8} at={at + 0.64} dur={dur * 0.35} stroke={accent} strokeWidth={4} seed={109} />
          <SketchLine x1={34} y1={2} x2={34} y2={-8} at={at + 0.64} dur={dur * 0.35} stroke={accent} strokeWidth={4} seed={111} />
        </g>
      ) : null}

      {hold.kind === 'box' ? (
        <g transform={`translate(${hold.x} ${hold.y})`}>
          <rect x={-26} y={-46} width={52} height={46} fill={C.panel} stroke={color} strokeWidth={3.5} />
          <path d={`M -26 -46 L 0 -54 L 26 -46`} fill="none" stroke={color} strokeWidth={3.5} strokeLinejoin="round" />
        </g>
      ) : null}
    </g>
  );
};
