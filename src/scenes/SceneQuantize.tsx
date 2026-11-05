import React from 'react';
import {C} from '../theme';
import {Canvas, SceneShell} from '../components/SceneShell';
import {Label, SketchArrow, SketchCircle, SketchLine, SketchRect} from '../components/Sketch';
import {KVGrid, QuantBlock, SvgLabel} from '../components/Objects';

export const SceneQuantize: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  return (
    <SceneShell durationInFrames={durationInFrames} ground>
      <Canvas>
        <QuantBlock x={480} y={380} size={180} label="16" color={C.orange} at={5.5} dur={0.5} />
        <QuantBlock x={960} y={380} size={130} label="8" color={C.yellow} at={6.5} dur={0.5} />
        <QuantBlock x={1440} y={380} size={90} label="4" color={C.green} at={7.5} dur={0.45} />
        <SketchArrow x1={590} y1={380} x2={875} y2={380} at={6.0} dur={0.4} color={C.muted} strokeWidth={4} />
        <SketchArrow x1={1045} y1={380} x2={1375} y2={380} at={7.0} dur={0.4} color={C.muted} strokeWidth={4} />
        <SvgLabel x={480} y={508} size={32} color={C.orange} at={5.5}>16-bit</SvgLabel>
        <SvgLabel x={960} y={508} size={32} color={C.yellow} at={6.5}>8-bit</SvgLabel>
        <SvgLabel x={1440} y={508} size={32} color={C.green} at={7.5}>4-bit</SvgLabel>

        <SketchRect x={360} y={580} w={900} h={44} rx={6} at={3.2} dur={0.4} stroke={C.orange} fill={C.orange} fillStyle="solid" strokeWidth={3} seed={5001} />
        <SketchRect x={360} y={646} w={450} h={44} rx={6} at={4.0} dur={0.4} stroke={C.green} fill={C.green} fillStyle="solid" strokeWidth={3} seed={5003} />
        <SvgLabel x={960} y={558} size={28} color={C.muted} at={3.2}>weights</SvgLabel>
        <SvgLabel x={960} y={626} size={28} color={C.muted} at={4.0}>half the bytes</SvgLabel>

        <SketchRect x={1330} y={580} w={290} h={150} rx={10} at={8.0} dur={0.4} stroke={C.panel} fill={C.surface} fillStyle="solid" strokeWidth={3} seed={5011} />
        <SvgLabel x={1475} y={622} size={32} color={C.yellow} at={8.0}>3.14159</SvgLabel>
        <SketchArrow x1={1475} y1={642} x2={1475} y2={670} at={8.4} dur={0.25} color={C.muted} strokeWidth={3} head={8} />
        <SvgLabel x={1475} y={702} size={36} color={C.green} at={8.4}>3.14</SvgLabel>

        <KVGrid x={1370} y={760} cols={6} rows={2} cell={20} gap={5} usedRows={2} color={C.green} at={11.0} dur={0.6} showLabel={false} />
        <SvgLabel x={1640} y={788} size={26} color={C.green} at={11.0}>more users</SvgLabel>
      </Canvas>
      <Label x={960} y={220} size={50} color={C.fg} at={0.3}>
        reduce the bytes
      </Label>
      <Label x={960} y={292} size={40} color={C.yellow} at={5.5}>
        quantization
      </Label>
    </SceneShell>
  );
};

export const SceneSlowPath: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  return (
    <SceneShell durationInFrames={durationInFrames} ground>
      <Canvas>
        <SketchRect x={280} y={340} w={620} h={340} rx={12} at={0.2} dur={0.5} stroke={C.cyan} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={5101} />
        <SvgLabel x={590} y={400} size={36} color={C.cyan} at={0.2}>supports INT4</SvgLabel>
        <SvgLabel x={590} y={470} size={56} color={C.green} at={0.4}>✓</SvgLabel>
        <Snail x={590} y={560} at={3.4} />
        <SvgLabel x={590} y={650} size={30} color={C.red} at={3.4}>but takes a slow path</SvgLabel>

        <SketchRect x={1040} y={340} w={620} h={340} rx={12} at={0.6} dur={0.5} stroke={C.yellow} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={5111} />
        <SvgLabel x={1350} y={400} size={36} color={C.yellow} at={0.6}>accuracy check</SvgLabel>
        <SvgLabel x={1350} y={470} size={46} color={C.yellow} at={0.8}>?</SvgLabel>
        <SketchLine x1={1120} y1={560} x2={1580} y2={560} at={5.0} dur={0.4} stroke={C.panel} strokeWidth={3} seed={5121} />
        <SvgLabel x={1350} y={642} size={30} color={C.muted} at={5.0}>same answers?</SvgLabel>
      </Canvas>
      <Label x={960} y={220} size={50} color={C.fg} at={0.3}>
        check both
      </Label>
      <Label x={590} y={736} size={34} color={C.orange} at={7.0}>
        measure the speed
      </Label>
      <Label x={1350} y={736} size={34} color={C.yellow} at={7.2}>
        measure the answers
      </Label>
    </SceneShell>
  );
};

const Snail: React.FC<{x: number; y: number; at: number}> = ({x, y, at}) => (
  <g>
    <SketchCircle cx={x} cy={y} r={34} at={at} dur={0.4} stroke={C.orange} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={5131} />
    <SketchLine x1={x} y1={y + 34} x2={x} y2={y + 52} at={at + 0.2} dur={0.25} stroke={C.orange} strokeWidth={4} seed={5133} />
    <SketchLine x1={x - 20} y1={y + 54} x2={x + 20} y2={y + 54} at={at + 0.3} dur={0.25} stroke={C.orange} strokeWidth={4} seed={5135} />
    <SketchLine x1={x - 50} y1={y + 30} x2={x - 86} y2={y + 30} at={at + 0.4} dur={0.3} stroke={C.orange} strokeWidth={4} seed={5137} />
    <SketchLine x1={x - 86} y1={y + 30} x2={x - 96} y2={y + 18} at={at + 0.5} dur={0.2} stroke={C.orange} strokeWidth={3} seed={5139} />
  </g>
);

const SketchCircleLocal: React.FC<{x: number; y: number; at: number}> = ({x, y, at}) => (
  <g>
    <SketchLine x1={x - 16} y1={y - 16} x2={x + 16} y2={y + 16} at={at} dur={0.25} stroke={C.yellow} strokeWidth={5} seed={5141} />
    <SketchLine x1={x + 16} y1={y - 16} x2={x - 16} y2={y + 16} at={at + 0.05} dur={0.25} stroke={C.yellow} strokeWidth={5} seed={5143} />
  </g>
);
