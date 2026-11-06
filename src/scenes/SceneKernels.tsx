import React from 'react';
import {C} from '../theme';
import {Canvas, SceneShell} from '../components/SceneShell';
import {Label, SketchArrow, SketchCircle, SketchLine, SketchRect} from '../components/Sketch';
import {ChatBubble, ChipDie, SvgLabel} from '../components/Objects';
import {Figure} from '../components/Figure';

export const SceneKernels: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  const kernels = ['mul', 'add', 'norm', 'scale', 'mask', '…'];
  return (
    <SceneShell durationInFrames={durationInFrames} ground>
      <Canvas>
        <ChipDie x={1240} y={360} w={340} h={330} lit={[8, 9, 16, 24]} color={C.cyan} at={0.4} />
        {kernels.map((k, i) => (
          <React.Fragment key={k}>
            <SketchRect x={760} y={340 + i * 52} w={230} h={38} rx={6} at={0.8 + i * 0.15} dur={0.3} stroke={i === 2 ? C.yellow : C.panel} fill={C.surface} fillStyle="solid" strokeWidth={i === 2 ? 4 : 3} seed={5501 + i} />
            <SvgLabel x={875} y={360 + i * 52} size={24} color={i === 2 ? C.yellow : C.muted}>{k}</SvgLabel>
          </React.Fragment>
        ))}
        <SketchArrow x1={1005} y1={500} x2={1210} y2={500} at={12.0} dur={0.5} color={C.cyan} strokeWidth={4} />
        <SvgLabel x={1110} y={462} size={30} color={C.cyan} at={12.0}>kernels</SvgLabel>

        <Figure x={300} y={820} scale={0.75} pose="point" hat="cap" accent={C.orange} at={15.0} dur={0.8} />
        <ChatBubble x={390} y={560} w={220} h={76} at={16.0} color={C.orange} fill={C.surface} tail="left">
          <SvgLabel x={500} y={600} size={30} color={C.orange} at={16.0}>add salt</SvgLabel>
        </ChatBubble>
        <SvgLabel x={300} y={854} size={26} color={C.muted} at={15.2}>CPU manager</SvgLabel>
        <SketchArrow x1={440} y1={690} x2={730} y2={610} at={17.0} dur={0.4} color={C.orange} strokeWidth={4} />

        <SketchLine x1={620} y1={812} x2={1780} y2={812} at={14.0} dur={0.5} stroke={C.panel} strokeWidth={4} seed={5531} />
        {Array.from({length: 12}).map((_, i) => (
          <SketchRect key={i} x={650 + i * 90} y={797} w={48} h={30} rx={4} at={14.4 + i * 0.05} dur={0.2} stroke={i % 4 === 3 ? C.red : C.cyan} fill={C.surface} fillStyle="solid" strokeWidth={2.5} seed={5540 + i} />
        ))}
        <SvgLabel x={1200} y={852} size={30} color={C.red} at={35.0}>gaps = waiting for orders</SvgLabel>
      </Canvas>
      <Label x={960} y={230} size={50} color={C.cyan} at={0.3}>
        5) kernels & graphs
      </Label>
    </SceneShell>
  );
};

export const SceneGraph: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  return (
    <SceneShell durationInFrames={durationInFrames} ground>
      <Canvas>
        <SketchRect x={300} y={350} w={560} h={360} rx={12} at={0.2} dur={0.5} stroke={C.yellow} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={5601} />
        <SvgLabel x={580} y={402} size={34} color={C.yellow} at={0.2}>recipe card</SvgLabel>
        {['chop', 'stir', 'salt'].map((s, i) => (
          <React.Fragment key={s}>
            <SketchRect x={340} y={450 + i * 78} w={480} h={54} rx={6} at={0.6 + i * 0.2} dur={0.3} stroke={C.panel} fill={C.well} fillStyle="solid" strokeWidth={3} seed={5610 + i} />
            <SvgLabel x={580} y={480 + i * 78} size={28} color={C.muted} at={0.6 + i * 0.2}>{s}</SvgLabel>
          </React.Fragment>
        ))}
        <SketchCircle cx={930} cy={430} r={34} at={4.0} dur={0.4} stroke={C.red} fill={C.red} fillStyle="solid" strokeWidth={4} seed={5621} />
        <SvgLabel x={930} y={492} size={26} color={C.red} at={4.0}>record</SvgLabel>
        <SketchArrow x1={900} y1={560} x2={1120} y2={560} at={5.0} dur={0.4} color={C.green} strokeWidth={4} />
        <SvgLabel x={1010} y={522} size={26} color={C.green} at={5.0}>replay</SvgLabel>

        <SketchRect x={1160} y={400} w={460} h={260} rx={12} at={7.0} dur={0.5} stroke={C.panel} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={5631} />
        <SvgLabel x={1390} y={452} size={32} color={C.muted} at={7.0}>server setting</SvgLabel>
        <SketchLine x1={1240} y1={540} x2={1540} y2={540} at={7.6} dur={0.3} stroke={C.panel} strokeWidth={5} seed={5633} />
        <SketchCircle cx={1500} cy={540} r={22} at={8.0} dur={0.3} stroke={C.green} fill={C.green} fillStyle="solid" strokeWidth={4} seed={5635} />
        <SvgLabel x={1330} y={500} size={30} color={C.green} at={8.0}>graph ON</SvgLabel>
      </Canvas>
      <Label x={960} y={230} size={50} color={C.green} at={0.3}>
        graph capture
      </Label>
      <Label x={960} y={800} size={38} color={C.muted} at={9.0}>
        record once, replay for every token
      </Label>
    </SceneShell>
  );
};
