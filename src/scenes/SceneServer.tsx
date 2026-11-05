import React from 'react';
import {C} from '../theme';
import {Canvas, SceneShell} from '../components/SceneShell';
import {Label, SketchArrow, SketchCircle, SketchLine, SketchPath, SketchRect} from '../components/Sketch';
import {Pill, ServerRack, SvgLabel} from '../components/Objects';

export const SceneServer: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  return (
    <SceneShell durationInFrames={durationInFrames} ground>
      <Canvas>
        <Loop x={430} y={480} at={0.4} />
        <ServerRack x={1250} y={370} w={180} h={330} units={4} at={2.8} color={C.green} label="inference server" />
        <SketchArrow x1={700} y1={520} x2={1210} y2={520} at={2.0} dur={0.6} color={C.green} strokeWidth={5} />
        <Pill x={1170} y={840} w={150} label="vLLM" color={C.cyan} at={6.2} />
        <Pill x={1380} y={840} w={180} label="SGLang" color={C.purple} at={6.6} />
        <SvgLabel x={960} y={782} size={36} color={C.green} at={12.5}>several times faster</SvgLabel>
      </Canvas>
      <Label x={960} y={230} size={50} color={C.cyan} at={0.3}>
        use a real server
      </Label>
      <Label x={430} y={720} size={34} color={C.red} at={9.4}>
        handmade loop
      </Label>
    </SceneShell>
  );
};

const Loop: React.FC<{x: number; y: number; at: number}> = ({x, y, at}) => (
  <g>
    <SketchCircle cx={x} cy={y} r={110} at={at} dur={0.5} stroke={C.red} strokeWidth={4} seed={4601} />
    <SketchPath d={`M ${x - 80} ${y - 50} Q ${x + 30} ${y + 40} ${x - 10} ${y + 90}`} at={at + 0.2} dur={0.4} stroke={C.red} strokeWidth={4} seed={4603} />
    <SketchPath d={`M ${x + 60} ${y - 80} Q ${x - 30} ${y + 20} ${x + 70} ${y + 60}`} at={at + 0.3} dur={0.4} stroke={C.red} strokeWidth={4} seed={4605} />
    <SvgLabel x={x} y={y + 8} size={48} color={C.red} at={at + 0.2}>&lt;/&gt;</SvgLabel>
    <SketchLine x1={x - 70} y1={y - 70} x2={x + 70} y2={y + 70} at={at + 0.7} dur={0.3} stroke={C.red} strokeWidth={6} seed={4607} />
    <SketchLine x1={x + 70} y1={y - 70} x2={x - 70} y2={y + 70} at={at + 0.75} dur={0.3} stroke={C.red} strokeWidth={6} seed={4609} />
  </g>
);

export const SceneContinuous: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  const slots = [0, 1, 2, 3, 4, 5];
  return (
    <SceneShell durationInFrames={durationInFrames} ground>
      <Canvas>
        <SvgLabel x={960} y={300} size={34} color={C.red} at={2.0}>old way: wait for the whole group</SvgLabel>
        {slots.map((i) => (
          <React.Fragment key={`o${i}`}>
            <Slot x={350 + i * 160} y={344} filled={i < 4} at={2.0 + i * 0.08} color={C.muted} />
          </React.Fragment>
        ))}
        <SketchPath d="M 350 440 L 350 462 L 1130 462 L 1130 440" at={3.2} dur={0.5} stroke={C.red} strokeWidth={4} seed={4611} />
        <SvgLabel x={740} y={494} size={30} color={C.red} at={3.2}>one slow request stalls everyone</SvgLabel>

        <SvgLabel x={960} y={584} size={34} color={C.green} at={10.0}>continuous: swap at every step</SvgLabel>
        {slots.map((i) => (
          <Slot x={350 + i * 160} y={628} filled at={10.0 + i * 0.08} color={C.green} />
        ))}
        {[0, 1, 2].map((i) => (
          <SketchArrow key={i} x1={350 + (i + 3) * 160} y1={708} x2={470 + (i + 3) * 160} y2={708} at={12.0 + i * 0.2} dur={0.25} color={C.yellow} strokeWidth={4} head={10} />
        ))}
        <SvgLabel x={960} y={770} size={36} color={C.yellow} at={13.0}>new request in, finished one out</SvgLabel>
        <SvgLabel x={960} y={836} size={38} color={C.green} at={15.0}>biggest single win</SvgLabel>
      </Canvas>
      <Label x={960} y={220} size={50} color={C.cyan} at={0.3}>
        continuous batching
      </Label>
    </SceneShell>
  );
};

const Slot: React.FC<{x: number; y: number; filled: boolean; at: number; color: string}> = ({x, y, filled, at, color}) => (
  <g>
    {filled ? (
      <>
        <SketchRect x={x} y={y} w={100} h={64} rx={8} at={at} dur={0.3} stroke={color} fill={C.surface} fillStyle="solid" strokeWidth={3} seed={4621 + x} />
        <SvgLabel x={x + 50} y={y + 34} size={24} color={color} at={at}>req</SvgLabel>
      </>
    ) : (
      <rect x={x} y={y} width={100} height={64} rx={8} fill="none" stroke={C.red} strokeWidth={3} strokeDasharray="8 7" />
    )}
  </g>
);
