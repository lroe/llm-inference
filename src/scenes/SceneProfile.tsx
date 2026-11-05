import React from 'react';
import {C} from '../theme';
import {Canvas, SceneShell} from '../components/SceneShell';
import {Label, SketchCircle, SketchLine, SketchRect} from '../components/Sketch';
import {SvgLabel} from '../components/Objects';

export const SceneProfile: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  const rows = [
    {name: 'attention', w: 680, color: C.cyan},
    {name: 'FFN', w: 260, color: C.green},
    {name: 'norm', w: 130, color: C.purple},
    {name: 'wait', w: 100, color: C.orange},
    {name: 'other', w: 50, color: C.panel},
  ];
  return (
    <SceneShell durationInFrames={durationInFrames} ground>
      <Canvas>
        <SketchRect x={260} y={300} w={1080} h={400} rx={14} at={0.2} dur={0.5} stroke={C.fg} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={3901} />
        {rows.map((r, i) => (
          <React.Fragment key={r.name}>
            <SvgLabel x={400} y={358 + i * 60} size={30} color={C.muted} anchor="end" at={0.5 + i * 0.15}>{r.name}</SvgLabel>
            <SketchRect x={430} y={340 + i * 60} w={r.w} h={34} rx={4} at={0.5 + i * 0.15} dur={0.4} stroke={r.color} fill={r.color} fillStyle="solid" strokeWidth={3} seed={3910 + i} />
          </React.Fragment>
        ))}
        <Stopwatch x={1470} y={470} r={82} at={1.4} />

        <g>
          <SketchRect x={680} y={760} w={400} h={84} rx={10} at={13.0} dur={0.4} stroke={C.red} fill={C.surface} fillStyle="solid" strokeWidth={3} seed={3931} />
          <SketchRect x={1160} y={760} w={400} h={84} rx={10} at={16.0} dur={0.4} stroke={C.red} fill={C.surface} fillStyle="solid" strokeWidth={3} seed={3933} />
          <SvgLabel x={880} y={802} size={30} color={C.muted} at={13.0}>big model → memory</SvgLabel>
          <SvgLabel x={1360} y={802} size={30} color={C.muted} at={16.0}>GPUs talk → slow</SvgLabel>
        </g>
      </Canvas>

      <Label x={960} y={240} size={50} color={C.cyan} at={0.3}>
        profile first
      </Label>
    </SceneShell>
  );
};

const Stopwatch: React.FC<{x: number; y: number; r: number; at: number}> = ({x, y, r, at}) => (
  <g>
    <SketchCircle cx={x} cy={y} r={r} at={at} dur={0.5} stroke={C.cyan} fill={C.surface} fillStyle="solid" strokeWidth={5} seed={3951} />
    <SketchCircle cx={x} cy={y - r - 16} r={12} at={at + 0.3} dur={0.2} stroke={C.cyan} strokeWidth={4} seed={3953} />
    <SketchLine x1={x} y1={y} x2={x + 40} y2={y - 44} at={at + 0.5} dur={0.3} stroke={C.cyan} strokeWidth={5} seed={3955} />
    <SvgLabel x={x} y={y + r + 36} size={30} color={C.muted} at={at + 0.4}>where the time goes</SvgLabel>
  </g>
);
