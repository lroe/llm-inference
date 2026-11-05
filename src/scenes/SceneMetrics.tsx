import React from 'react';
import {C} from '../theme';
import {Canvas, SceneShell} from '../components/SceneShell';
import {Label, SketchCircle, SketchEllipse, SketchLine, SketchPath} from '../components/Sketch';
import {SvgLabel, Token} from '../components/Objects';

export const SceneMetrics: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  const plates = [900, 1050, 1200, 1350, 1500];
  return (
    <SceneShell durationInFrames={durationInFrames} ground>
      <Canvas>
        <SketchLine x1={300} y1={420} x2={1620} y2={420} at={0.2} dur={0.7} stroke={C.fg} strokeWidth={5} seed={2601} />
        <SketchCircle cx={300} cy={420} r={11} at={0.3} dur={0.2} stroke={C.cyan} fill={C.cyan} fillStyle="solid" strokeWidth={3} seed={2603} />
        <Token x={300} y={340} text="order" size={32} color={C.cyan} fill={C.surface} at={0.7} dur={0.4} />

        {plates.map((x, i) => (
          <Plate key={x} x={x} y={420} at={i === 0 ? 1.4 : 8.2 + (i - 1) * 0.5} />
        ))}

        <SketchPath d="M 300 486 L 300 510 L 900 510 L 900 486" at={1.7} dur={0.5} stroke={C.cyan} strokeWidth={4} seed={2611} />
        <SvgLabel x={600} y={566} size={42} color={C.cyan} at={1.7}>time to first token</SvgLabel>

        <SketchPath d="M 900 486 L 900 510 L 1500 510 L 1500 486" at={8.4} dur={0.5} stroke={C.green} strokeWidth={4} seed={2613} />
        <SvgLabel x={1200} y={566} size={42} color={C.green} at={8.4}>per output token</SvgLabel>

        {[420, 612, 804, 996, 1188, 1380].map((x, i) => (
          <Table key={x} x={x} y={748} at={14.1 + i * 0.1} />
        ))}
        <SvgLabel x={960} y={676} size={44} color={C.yellow} at={14.1}>throughput</SvgLabel>
        <SvgLabel x={960} y={824} size={40} color={C.muted} at={14.3}>tokens / second, all users</SvgLabel>
      </Canvas>

      <Label x={960} y={210} size={46} color={C.muted} at={0.3}>
        three numbers
      </Label>
    </SceneShell>
  );
};

const Plate: React.FC<{x: number; y: number; at: number}> = ({x, y, at}) => (
  <g>
    <SketchEllipse cx={x} cy={y} rx={46} ry={13} at={at} dur={0.35} stroke={C.fg} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={2631 + x} />
    <SketchEllipse cx={x} cy={y - 2} rx={30} ry={8} at={at + 0.15} dur={0.25} stroke={C.panel} strokeWidth={2.5} seed={2633 + x} />
    <SketchCircle cx={x} cy={y - 8} r={14} at={at + 0.2} dur={0.25} stroke={C.green} fill={C.green} fillStyle="solid" strokeWidth={3} seed={2635 + x} />
    {[0, 1].map((i) => (
      <SketchLine key={i} x1={x - 8 + i * 16} y1={y - 30} x2={x - 10 + i * 16} y2={y - 50} at={at + 0.3} dur={0.25} stroke={C.panel} strokeWidth={3.5} seed={2641 + x + i} />
    ))}
  </g>
);

const Table: React.FC<{x: number; y: number; at: number}> = ({x, y, at}) => (
  <g>
    <SketchLine x1={x - 44} y1={y} x2={x + 44} y2={y} at={at} dur={0.3} stroke={C.fg} strokeWidth={5} seed={2661 + x} />
    <SketchLine x1={x - 32} y1={y} x2={x - 32} y2={y + 36} at={at + 0.1} dur={0.2} stroke={C.fg} strokeWidth={4} seed={2671 + x} />
    <SketchLine x1={x + 32} y1={y} x2={x + 32} y2={y + 36} at={at + 0.1} dur={0.2} stroke={C.fg} strokeWidth={4} seed={2681 + x} />
    <SketchCircle cx={x} cy={y - 22} r={12} at={at + 0.2} dur={0.2} stroke={C.green} fill={C.green} fillStyle="solid" strokeWidth={2.5} seed={2691 + x} />
  </g>
);
