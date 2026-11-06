import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {Canvas, SceneShell} from '../components/SceneShell';
import {SketchArrow, SketchCircle, SketchLine, SketchPath, SketchRect} from '../components/Sketch';
import {Chip, MemoryStack, SvgLabel} from '../components/Objects';

export const SceneTwoMinute: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  const frame = useCurrentFrame();
  const dim = interpolate(frame, [5.9 * 30, 6.6 * 30], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const stopFade = interpolate(frame, [6.4 * 30, 6.9 * 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <SceneShell durationInFrames={durationInFrames} ground>
      <Canvas>
        <g opacity={dim}>
          <Chip x={480} y={400} size={280} label="GPU" color={C.cyan} at={0.1} dur={0.8} active />
          <MemoryStack x={1370} y={410} w={100} h={250} label="MEMORY" color={C.orange} at={0.4} dur={0.8} />
          <SketchArrow x1={1345} y1={540} x2={790} y2={540} at={1.0} dur={0.7} color={C.orange} strokeWidth={5} />
          <Magnifier x={980} y={480} r={132} at={1.6} />
        </g>

        <g opacity={stopFade}>
          <Stopwatch x={960} y={545} r={148} at={6.4} />
        </g>
      </Canvas>
    </SceneShell>
  );
};

const Magnifier: React.FC<{x: number; y: number; r: number; at: number}> = ({x, y, r, at}) => (
  <g>
    <SketchCircle cx={x} cy={y} r={r} at={at} dur={0.55} stroke={C.yellow} strokeWidth={7} seed={1801} />
    <SketchCircle cx={x} cy={y} r={r - 13} at={at + 0.15} dur={0.5} stroke={C.panel} strokeWidth={3} seed={1802} />
    <SketchLine x1={x + r * 0.70} y1={y + r * 0.70} x2={x + r * 1.47} y2={y + r * 1.47} at={at + 0.3} dur={0.35} stroke={C.yellow} strokeWidth={12} seed={1803} />
    <SketchLine x1={x + r * 0.79} y1={y + r * 0.61} x2={x + r * 1.56} y2={y + r * 1.38} at={at + 0.35} dur={0.35} stroke={C.panel} strokeWidth={4} seed={1804} />
    <SketchPath d={`M ${x - r * 0.42} ${y - r * 0.46} Q ${x - r * 0.16} ${y - r * 0.60} ${x - r * 0.02} ${y - r * 0.48}`} at={at + 0.4} dur={0.3} stroke={C.fg} strokeWidth={4} seed={1805} />
    <SketchPath d={`M ${x - r * 0.56} ${y - r * 0.28} Q ${x - r * 0.34} ${y - r * 0.38} ${x - r * 0.24} ${y - r * 0.30}`} at={at + 0.46} dur={0.25} stroke={C.fg} strokeWidth={3} seed={1806} />
  </g>
);

const Stopwatch: React.FC<{x: number; y: number; r: number; at: number}> = ({x, y, r, at}) => (
  <g>
    <SketchCircle cx={x} cy={y} r={r} at={at} dur={0.6} stroke={C.green} fill={C.surface} fillStyle="solid" strokeWidth={5} seed={1811} />
    <SketchCircle cx={x} cy={y} r={r - 14} at={at + 0.12} dur={0.5} stroke={C.panel} strokeWidth={3} seed={1812} />
    <SketchRect x={x - 19} y={y - r - 38} w={38} h={22} rx={5} at={at + 0.3} dur={0.25} stroke={C.green} fill={C.well} fillStyle="solid" strokeWidth={4} seed={1813} />
    <SketchLine x1={x} y1={y - r} x2={x} y2={y - r - 16} at={at + 0.35} dur={0.2} stroke={C.green} strokeWidth={5} seed={1815} />
    {[
      [x, y - r + 8, x, y - r + 24],
      [x + r - 8, y, x + r - 24, y],
      [x, y + r - 8, x, y + r - 24],
      [x - r + 8, y, x - r + 24, y],
    ].map(([x1, y1, x2, y2], i) => (
      <SketchLine key={i} x1={x1} y1={y1} x2={x2} y2={y2} at={at + 0.4 + i * 0.04} dur={0.18} stroke={C.green} strokeWidth={4} seed={1820 + i} />
    ))}
    <SketchLine x1={x} y1={y} x2={x + 70} y2={y - 94} at={at + 0.5} dur={0.3} stroke={C.green} strokeWidth={5} seed={1817} />
    <SketchCircle cx={x} cy={y} r={7} at={at + 0.55} dur={0.2} stroke={C.green} fill={C.green} fillStyle="solid" strokeWidth={2} seed={1818} />
    <SvgLabel x={x} y={y + 38} size={66} color={C.green} at={at + 0.5}>2 min</SvgLabel>
    <SvgLabel x={x} y={y + 96} size={28} color={C.muted} at={at + 0.6}>to judge it</SvgLabel>
  </g>
);
