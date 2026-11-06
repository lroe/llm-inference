import React from 'react';
import {C} from '../theme';
import {Canvas, SceneShell} from '../components/SceneShell';
import {Label, SketchArrow, SketchLine, SketchRect} from '../components/Sketch';
import {SvgLabel} from '../components/Objects';

export const SceneTradeoffs: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  return (
    <SceneShell durationInFrames={durationInFrames} ground>
      <Canvas>
        <SketchRect x={260} y={360} w={560} h={280} rx={12} at={0.5} dur={0.5} stroke={C.cyan} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={4301} />
        <SvgLabel x={540} y={410} size={38} color={C.cyan} at={0.5}>bigger batch</SvgLabel>
        <SketchArrow x1={370} y1={500} x2={450} y2={460} at={2.8} dur={0.35} color={C.green} strokeWidth={4} />
        <SvgLabel x={540} y={470} size={32} color={C.green} at={2.8}>throughput ↑</SvgLabel>
        <SketchArrow x1={370} y1={560} x2={450} y2={600} at={3.8} dur={0.35} color={C.red} strokeWidth={4} />
        <SvgLabel x={550} y={600} size={32} color={C.red} at={3.8}>waiting ↑</SvgLabel>

        <SketchRect x={1100} y={360} w={560} h={280} rx={12} at={6.0} dur={0.5} stroke={C.purple} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={4303} />
        <SvgLabel x={1380} y={410} size={38} color={C.purple} at={6.0}>lower precision</SvgLabel>
        <SketchArrow x1={1210} y1={500} x2={1290} y2={460} at={9.5} dur={0.35} color={C.green} strokeWidth={4} />
        <SvgLabel x={1360} y={470} size={32} color={C.green} at={9.5}>speed ↑</SvgLabel>
        <SvgLabel x={1380} y={590} size={32} color={C.yellow} at={12.8}>accuracy?</SvgLabel>

        <SketchRect x={520} y={700} w={880} h={120} rx={12} at={15.0} dur={0.5} stroke={C.red} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={4311} />
        <SvgLabel x={760} y={740} size={32} color={C.green} at={15.2}>throughput +30%</SvgLabel>
        <SvgLabel x={1120} y={740} size={32} color={C.red} at={15.2}>step time +80%</SvgLabel>
        <SvgLabel x={960} y={792} size={42} color={C.red} at={15.4}>LOSS</SvgLabel>
      </Canvas>
      <Label x={960} y={220} size={50} color={C.fg} at={0.3}>
        3) measure both sides
      </Label>
    </SceneShell>
  );
};

export const SceneLog: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  return (
    <SceneShell durationInFrames={durationInFrames} ground>
      <Canvas>
        <SketchRect x={300} y={320} w={760} h={460} rx={12} at={0.2} dur={0.5} stroke={C.fg} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={4401} />
        <SketchLine x1={680} y1={330} x2={680} y2={770} at={0.5} dur={0.4} stroke={C.panel} strokeWidth={3} seed={4403} />
        {Array.from({length: 6}).map((_, i) => (
          <React.Fragment key={`l${i}`}>
            <SketchLine x1={330} y1={390 + i * 58} x2={630} y2={390 + i * 58} at={0.6 + i * 0.08} dur={0.25} stroke={C.panel} strokeWidth={2.5} seed={4410 + i} />
            <SvgLabel x={360} y={390 + i * 58} size={24} color={i < 2 ? C.green : C.red} at={0.6 + i * 0.08}>{i < 2 ? '✓' : '✕'}</SvgLabel>
          </React.Fragment>
        ))}
        {Array.from({length: 6}).map((_, i) => (
          <React.Fragment key={`r${i}`}>
            <SketchLine x1={710} y1={390 + i * 58} x2={1010} y2={390 + i * 58} at={0.6 + i * 0.08} dur={0.25} stroke={C.panel} strokeWidth={2.5} seed={4430 + i} />
            <SvgLabel x={740} y={390 + i * 58} size={24} color={C.red} at={0.6 + i * 0.08}>✕</SvgLabel>
          </React.Fragment>
        ))}
        <SvgLabel x={960} y={716} size={34} color={C.green} at={4.0}>2 of 12 work</SvgLabel>
        <SvgLabel x={960} y={760} size={28} color={C.muted} at={8.5}>write down why the rest failed</SvgLabel>
      </Canvas>
      <Label x={960} y={230} size={50} color={C.yellow} at={0.3} font="marker" weight={700}>
        4) keep the log
      </Label>
    </SceneShell>
  );
};
