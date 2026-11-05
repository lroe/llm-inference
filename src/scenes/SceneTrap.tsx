import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {Canvas, SceneShell} from '../components/SceneShell';
import {Label, SketchArrow, SketchCircle, SketchLine, SketchRect} from '../components/Sketch';
import {Gauge, QuantBlock, SvgLabel} from '../components/Objects';

export const SceneTrap: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  const frame = useCurrentFrame();
  const dim = interpolate(frame, [6.2 * 30, 6.9 * 30], [1, 0.18], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const stopFade = interpolate(frame, [6.5 * 30, 7.0 * 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <SceneShell durationInFrames={durationInFrames} ground>
      <Canvas>
        <g opacity={dim}>
          <Calendar x={400} y={360} at={0.2} />

          <SvgLabel x={950} y={350} size={42} color={C.muted} at={0.5}>compress</SvgLabel>
          <QuantBlock x={820} y={490} size={150} label="16" color={C.orange} at={0.8} dur={0.5} />
          <SketchArrow x1={910} y1={490} x2={1035} y2={490} at={2.0} dur={0.5} color={C.muted} strokeWidth={4} />
          <QuantBlock x={1090} y={490} size={84} label="4" color={C.green} at={2.3} dur={0.45} />

          <Gauge x={1480} y={470} r={150} value={0.15} label="15" color={C.red} at={3.3} duration={1.0} size={54} />
          <SvgLabel x={1480} y={706} size={42} color={C.red} at={3.3}>10× below limit</SvgLabel>
        </g>

        <g opacity={stopFade}>
          <Stopwatch x={960} y={580} r={128} at={6.5} />
        </g>
      </Canvas>
      <div style={{opacity: dim}}>
        <Label x={500} y={296} size={42} color={C.muted} at={0.6}>
          weeks
        </Label>
      </div>
      <div style={{opacity: stopFade}}>
        <Label x={960} y={800} size={54} color={C.green} at={7.0}>
          check first
        </Label>
      </div>
    </SceneShell>
  );
};

const Calendar: React.FC<{x: number; y: number; at: number}> = ({x, y, at}) => (
  <g transform={`translate(${x} ${y})`}>
    <SketchRect x={10} y={-16} w={190} h={228} rx={8} at={at + 0.12} dur={0.4} stroke={C.panel} fill={C.surface} fillStyle="solid" strokeWidth={3} seed={1601} />
    <SketchRect x={0} y={0} w={190} h={228} rx={8} at={at} dur={0.45} stroke={C.fg} fill={C.well} fillStyle="solid" strokeWidth={4} seed={1603} />
    <SketchRect x={0} y={0} w={190} h={54} rx={8} at={at + 0.2} dur={0.3} stroke={C.fg} fill={C.panel} fillStyle="solid" strokeWidth={3} seed={1605} />
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <React.Fragment key={i}>
        <SketchLine x1={18 + (i % 3) * 58} y1={78 + Math.floor(i / 3) * 52} x2={54 + (i % 3) * 58} y2={78 + Math.floor(i / 3) * 52} at={at + 0.3 + i * 0.04} dur={0.2} stroke={C.muted} strokeWidth={3} seed={1610 + i} />
        <SketchLine x1={18 + (i % 3) * 58} y1={94 + Math.floor(i / 3) * 52} x2={42 + (i % 3) * 58} y2={94 + Math.floor(i / 3) * 52} at={at + 0.32 + i * 0.04} dur={0.2} stroke={C.panel} strokeWidth={2.5} seed={1620 + i} />
      </React.Fragment>
    ))}
    <SketchLine x1={40} y1={0} x2={40} y2={-22} at={at + 0.25} dur={0.2} stroke={C.orange} strokeWidth={5} seed={1631} />
    <SketchLine x1={150} y1={0} x2={150} y2={-22} at={at + 0.25} dur={0.2} stroke={C.orange} strokeWidth={5} seed={1633} />
  </g>
);

const Stopwatch: React.FC<{x: number; y: number; r: number; at: number}> = ({x, y, r, at}) => (
  <g>
    <SketchCircle cx={x} cy={y} r={r} at={at} dur={0.6} stroke={C.green} fill={C.surface} fillStyle="solid" strokeWidth={5} seed={1641} />
    <SketchCircle cx={x} cy={y - r - 20} r={18} at={at + 0.3} dur={0.25} stroke={C.green} strokeWidth={4} seed={1643} />
    <SketchLine x1={x} y1={y - r} x2={x} y2={y - r - 18} at={at + 0.35} dur={0.2} stroke={C.green} strokeWidth={5} seed={1645} />
    <SvgLabel x={x} y={y - 10} size={82} color={C.green}>30</SvgLabel>
    <SvgLabel x={x} y={y + 62} size={36} color={C.muted}>seconds</SvgLabel>
  </g>
);
