import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {Canvas, SceneShell} from '../components/SceneShell';
import {Label, SketchArrow, SketchLine, SketchPath, SketchRect} from '../components/Sketch';
import {Chip, MemoryStack, SvgLabel} from '../components/Objects';

export const SceneMathLimit: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  const frame = useCurrentFrame();
  const topDim = interpolate(frame, [9.2 * 30, 9.8 * 30], [1, 0.42], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <SceneShell durationInFrames={durationInFrames} ground>
      <Canvas>
        <g opacity={topDim}>
          <Chip x={300} y={300} size={230} label="GPU" color={C.cyan} at={0.1} dur={0.8} active />
          <MemoryStack x={1480} y={320} w={96} h={250} label="MEMORY" color={C.orange} at={0.35} dur={0.8} />
          <SketchArrow x1={1450} y1={450} x2={560} y2={450} at={1.1} dur={0.8} color={C.orange} strokeWidth={5} />
          {[0, 1, 2].map((i) => (
            <SketchRect key={i} x={860 + i * 120} y={426} w={48} h={48} rx={6} at={2.0 + i * 0.12} dur={0.3} stroke={C.orange} fill={C.surface} fillStyle="solid" strokeWidth={3} seed={1111 + i} />
          ))}
          <SvgLabel x={884} y={450} size={30} color={C.orange}>B</SvgLabel>
          <SvgLabel x={1004} y={450} size={30} color={C.orange}>B</SvgLabel>
          <SvgLabel x={1124} y={450} size={30} color={C.orange}>B</SvgLabel>

          <SketchPath d="M 740 576 L 740 602 L 1180 602 L 1180 576" at={4.0} dur={0.6} stroke={C.cyan} strokeWidth={4} seed={1121} />
          <SvgLabel x={960} y={650} size={82} color={C.cyan}>b</SvgLabel>
          <SvgLabel x={960} y={718} size={38} color={C.muted}>bytes per second</SvgLabel>
        </g>
      </Canvas>
      <Label x={960} y={248} size={50} color={C.fg} at={0.3}>
        memory bandwidth
      </Label>
      <Label x={960} y={800} size={60} color={C.fg} at={9.25}>
        tokens / second ≤ <span style={{color: C.cyan}}>b</span> / <span style={{color: C.orange}}>2N</span>
      </Label>
    </SceneShell>
  );
};
