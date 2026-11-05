import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {Canvas, SceneShell} from '../components/SceneShell';
import {Label, SketchArrow, SketchLine, SketchPath, SketchPolygon, SketchRect} from '../components/Sketch';
import {SvgLabel} from '../components/Objects';
import {Figure} from '../components/Figure';

const SpeedBar: React.FC<{
  x: number;
  y: number;
  w: number;
  value: number;
  color: string;
  at: number;
  label: string;
  number: string;
}> = ({x, y, w, value, color, at, label, number}) => (
  <g>
    <SvgLabel x={x - 30} y={y + 2} size={42} color={C.muted} anchor="end" at={at}>{label}</SvgLabel>
    <SketchRect x={x} y={y - 22} w={w} h={44} rx={8} at={at} dur={0.5} stroke={C.panel} fill={C.well} fillStyle="solid" strokeWidth={3} seed={1301 + y} />
    <SketchRect x={x} y={y - 22} w={w * value} h={44} rx={8} at={at + 0.2} dur={0.7} stroke={color} fill={color} fillStyle="solid" strokeWidth={3} seed={1302 + y} />
    <SvgLabel x={x + w + 38} y={y + 2} size={46} color={color} anchor="start" at={at + 0.2}>{number}</SvgLabel>
  </g>
);

export const SceneMemoryBound: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  return (
    <SceneShell durationInFrames={durationInFrames} ground>
      <Canvas>
        <SketchRect x={300} y={280} w={1320} h={340} rx={14} at={0.1} dur={0.6} stroke={C.panel} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={1311} />
        <SpeedBar x={560} y={390} w={940} value={1} color={C.muted} at={0.5} label="speed limit" number="100 tok/s" />
        <SpeedBar x={560} y={500} w={940} value={0.8} color={C.orange} at={1.4} label="measured" number="80 tok/s" />

        <SketchPath d="M 1312 552 L 1312 580 L 1500 580 L 1500 552" at={4.1} dur={0.5} stroke={C.yellow} strokeWidth={4} seed={1321} />
        <SvgLabel x={1406} y={650} size={38} color={C.yellow} at={4.1}>the gap</SvgLabel>
      </Canvas>
      <Label x={960} y={758} size={70} color={C.green} at={5.7} font="marker" weight={700}>
        memory bound
      </Label>
      <Label x={960} y={838} size={40} color={C.muted} at={6.2}>
        the road is the delay
      </Label>
      <Label x={960} y={210} size={46} color={C.muted} at={0.35}>
        measured vs limit
      </Label>
    </SceneShell>
  );
};

const ByteStack: React.FC<{at: number; fade: number[]}> = ({at, fade}) => {
  return (
    <g>
      {Array.from({length: 6}).map((_, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        return (
          <g key={i} opacity={fade[i]}>
            <SketchRect
              x={840 + col * 82}
              y={570 + row * 72}
              w={66}
              h={58}
              rx={6}
              at={at + i * 0.06}
              dur={0.3}
              stroke={C.orange}
              fill={C.surface}
              fillStyle="solid"
              strokeWidth={3}
              seed={1331 + i}
            />
            <SvgLabel x={873 + col * 82} y={599 + row * 72} size={30} color={C.orange}>B</SvgLabel>
          </g>
        );
      })}
    </g>
  );
};

export const SceneCarryLess: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  const frame = useCurrentFrame();
  const dim = Math.min(1, Math.max(0, (frame - 4.9 * 30) / (0.5 * 30)));
  const fade = [1, 1, 1, 1, 1, 1].map((_, i) => {
    if (i < 2) return 1;
    return Math.min(1, Math.max(0, 1 - (frame - (4.8 + i * 0.05) * 30) / (0.32 * 30)));
  });
  return (
    <SceneShell durationInFrames={durationInFrames} ground>
      <Canvas>
        <g opacity={1 - 0.65 * dim}>
          <SketchLine x1={380} y1={884} x2={1560} y2={884} at={0.1} dur={0.5} stroke={C.panel} strokeWidth={5} seed={1341} />
          <Figure x={500} y={884} scale={1.02} pose="walk" at={0.3} />
          <ByteStack at={0.6} fade={fade} />
          <SketchArrow x1={1032} y1={650} x2={790} y2={650} at={1.2} dur={0.5} color={C.orange} strokeWidth={4} />
        </g>

        <g opacity={dim}>
          <Knife x={1450} y={650} at={4.8} />
          <SvgLabel x={1450} y={790} size={44} color={C.red}>chopping won’t help</SvgLabel>
        </g>
      </Canvas>

      <Label x={960} y={474} size={54} color={C.green} at={1.5}>
        carry fewer bytes
      </Label>
    </SceneShell>
  );
};

const Knife: React.FC<{x: number; y: number; at: number}> = ({x, y, at}) => (
  <g>
    <SketchPolygon
      points={[[x - 150, y - 28], [x + 60, y - 28], [x + 60, y + 54], [x - 150, y + 18]]}
      at={at}
      dur={0.45}
      stroke={C.fg}
      fill={C.surface}
      fillStyle="solid"
      strokeWidth={4}
      seed={1351}
    />
    <SketchRect x={x + 60} y={y + 6} w={88} h={24} rx={8} at={at + 0.2} dur={0.3} stroke={C.fg} fill={C.panel} fillStyle="solid" strokeWidth={4} seed={1353} />
    {[0, 1, 2].map((i) => (
      <SketchLine key={i} x1={x - 200 - i * 20} y1={y + 10 + i * 18} x2={x - 265 - i * 20} y2={y + 10 + i * 18} at={at + 0.3 + i * 0.05} dur={0.25} stroke={C.cyan} strokeWidth={4} seed={1355 + i} />
    ))}
    <SketchLine x1={x - 70} y1={y - 70} x2={x + 30} y2={y + 80} at={at + 0.45} dur={0.3} stroke={C.red} strokeWidth={7} seed={1361} />
    <SketchLine x1={x + 30} y1={y - 70} x2={x - 70} y2={y + 80} at={at + 0.5} dur={0.3} stroke={C.red} strokeWidth={7} seed={1363} />
  </g>
);
