import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {Canvas, SceneShell} from '../components/SceneShell';
import {Label, SketchArrow, SketchCircle, SketchLine, SketchRect} from '../components/Sketch';
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
      <div style={{opacity: stopFade}}>
        <Label x={960} y={806} size={54} color={C.green} at={6.9} font="marker" weight={700}>
          2-minute test
        </Label>
      </div>
      <Label x={960} y={250} size={52} color={C.fg} at={0.3}>
        where is the time?
      </Label>
    </SceneShell>
  );
};

const Magnifier: React.FC<{x: number; y: number; r: number; at: number}> = ({x, y, r, at}) => (
  <g>
    <SketchCircle cx={x} cy={y} r={r} at={at} dur={0.55} stroke={C.yellow} strokeWidth={6} seed={1801} />
    <SketchLine x1={x + r * 0.72} y1={y + r * 0.72} x2={x + r * 1.55} y2={y + r * 1.55} at={at + 0.3} dur={0.35} stroke={C.yellow} strokeWidth={10} seed={1803} />
    <SketchLine x1={x - r * 0.4} y1={y - r * 0.35} x2={x - r * 0.1} y2={y - r * 0.55} at={at + 0.4} dur={0.3} stroke={C.fg} strokeWidth={4} seed={1805} />
  </g>
);

const Stopwatch: React.FC<{x: number; y: number; r: number; at: number}> = ({x, y, r, at}) => (
  <g>
    <SketchCircle cx={x} cy={y} r={r} at={at} dur={0.6} stroke={C.green} fill={C.surface} fillStyle="solid" strokeWidth={5} seed={1811} />
    <SketchCircle cx={x} cy={y - r - 18} r={16} at={at + 0.3} dur={0.25} stroke={C.green} strokeWidth={4} seed={1813} />
    <SketchLine x1={x} y1={y - r} x2={x} y2={y - r - 16} at={at + 0.35} dur={0.2} stroke={C.green} strokeWidth={5} seed={1815} />
    <SvgLabel x={x} y={y - 6} size={70} color={C.green}>2 min</SvgLabel>
    <SvgLabel x={x} y={y + 62} size={34} color={C.muted}>to judge it</SvgLabel>
    <SketchLine x1={x + 10} y1={y - 30} x2={x + 70} y2={y - 94} at={at + 0.5} dur={0.3} stroke={C.green} strokeWidth={5} seed={1817} />
  </g>
);
