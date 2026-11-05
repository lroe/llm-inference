import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {Canvas, SceneShell} from '../components/SceneShell';
import {Label, SketchLine, SketchPath, SketchRect, SketchCircle} from '../components/Sketch';
import {SvgLabel} from '../components/Objects';

export const SceneOverlap: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  const frame = useCurrentFrame();
  const boilW = interpolate(frame, [5.2 * 30, 6.4 * 30], [300, 180], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const overlap = interpolate(frame, [10.0 * 30, 10.6 * 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <SceneShell durationInFrames={durationInFrames} ground>
      <Canvas>
        <SketchLine x1={420} y1={300} x2={420} y2={600} at={0.2} dur={0.4} stroke={C.panel} strokeWidth={3} seed={4001} />
        <SketchLine x1={420} y1={560} x2={1500} y2={560} at={0.3} dur={0.5} stroke={C.panel} strokeWidth={3} seed={4003} />

        <SvgLabel x={360} y={362} size={34} color={C.muted} anchor="end">boil</SvgLabel>
        <SketchRect x={420} y={342} w={boilW} h={40} rx={6} at={0.8} dur={0.4} stroke={C.orange} fill={C.orange} fillStyle="solid" strokeWidth={3} seed={4011} />

        <SvgLabel x={360} y={472} size={34} color={C.muted} anchor="end">chop</SvgLabel>
        <SketchRect x={420} y={452} w={900} h={40} rx={6} at={1.4} dur={0.5} stroke={C.cyan} fill={C.cyan} fillStyle="solid" strokeWidth={3} seed={4013} />
        <SvgLabel x={880} y={524} size={34} color={C.yellow}>chopping is the wait</SvgLabel>

        <SketchPath d="M 420 590 L 420 612 L 1320 612 L 1320 590" at={2.4} dur={0.5} stroke={C.yellow} strokeWidth={4} seed={4021} />
        <SvgLabel x={870} y={650} size={34} color={C.yellow}>dinner time stays the same</SvgLabel>

        <g opacity={overlap}>
          <SketchRect x={420} y={704} w={520} h={34} rx={5} at={10.0} dur={0.4} stroke={C.purple} fill={C.purple} fillStyle="solid" strokeWidth={3} seed={4031} />
          <SketchRect x={700} y={750} w={520} h={34} rx={5} at={10.3} dur={0.4} stroke={C.green} fill={C.green} fillStyle="solid" strokeWidth={3} seed={4033} />
          <SvgLabel x={455} y={720} size={26} color={C.bg} anchor="start">CPU 60%</SvgLabel>
          <SvgLabel x={735} y={766} size={26} color={C.bg} anchor="start">GPU 60%</SvgLabel>
          <SvgLabel x={960} y={808} size={34} color={C.muted}>60 + 60 = 120%</SvgLabel>
        </g>
        <SvgLabel x={960} y={856} size={38} color={C.purple}>overlap is free</SvgLabel>

        <TwentyMin x={1500} y={754} at={15.6} />
      </Canvas>
      <Label x={960} y={220} size={50} color={C.fg} at={0.3}>
        time that matters
      </Label>
    </SceneShell>
  );
};

const TwentyMin: React.FC<{x: number; y: number; at: number}> = ({x, y, at}) => (
  <g>
    <SketchCircle cx={x} cy={y} r={72} at={at} dur={0.5} stroke={C.yellow} fill={C.surface} fillStyle="solid" strokeWidth={5} seed={4051} />
    <SketchLine x1={x} y1={y} x2={x + 26} y2={y - 34} at={at + 0.4} dur={0.3} stroke={C.yellow} strokeWidth={5} seed={4053} />
    <SvgLabel x={x} y={y + 4} size={36} color={C.yellow}>20 min</SvgLabel>
    <SvgLabel x={x} y={y + 104} size={26} color={C.muted}>to rule out ideas</SvgLabel>
  </g>
);
