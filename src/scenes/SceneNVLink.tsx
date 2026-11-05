import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {Canvas, SceneShell} from '../components/SceneShell';
import {Label, SketchCircle, SketchLine, SketchRect} from '../components/Sketch';
import {SvgLabel} from '../components/Objects';

export const SceneNVLink: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  const frame = useCurrentFrame();
  const keep = interpolate(frame, [7.2 * 30, 8.0 * 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <SceneShell durationInFrames={durationInFrames} ground>
      <Canvas>
        <Chassis x={240} y={380} w={680} h={380} at={0.1} label="one machine" color={C.green} />
        <Chassis x={1000} y={380} w={680} h={380} at={3.4} label="another machine" color={C.red} />

        <SketchLine x1={330} y1={660} x2={820} y2={660} at={1.2} dur={0.6} stroke={C.green} strokeWidth={8} seed={3001} />
        {[0, 1, 2, 3].map((i) => (
          <SketchLine key={i} x1={360 + i * 150} y1={610} x2={360 + i * 150} y2={660} at={1.5 + i * 0.08} dur={0.25} stroke={C.green} strokeWidth={5} seed={3010 + i} />
        ))}
        <SvgLabel x={575} y={710} size={42} color={C.green} at={1.2}>NVLink</SvgLabel>

        <SketchLine x1={920} y1={520} x2={1000} y2={520} at={4.6} dur={0.4} stroke={C.red} strokeWidth={4} seed={3031} />
        <SketchLine x1={938} y1={496} x2={982} y2={544} at={4.9} dur={0.25} stroke={C.red} strokeWidth={6} seed={3033} />
        <SketchLine x1={982} y1={496} x2={938} y2={544} at={4.95} dur={0.25} stroke={C.red} strokeWidth={6} seed={3035} />
        <SvgLabel x={960} y={340} size={34} color={C.red} at={4.6}>slow link</SvgLabel>

        <g opacity={keep}>
          <SketchRect x={220} y={360} w={720} h={420} rx={20} at={7.2} dur={0.5} stroke={C.green} fill="none" fillStyle="solid" strokeWidth={5} seed={3041} />
          <SvgLabel x={580} y={850} size={40} color={C.green} at={7.2}>keep tensor parallel here</SvgLabel>
        </g>
      </Canvas>
      <Label x={960} y={252} size={50} color={C.fg} at={0.4}>
        inside or between machines?
      </Label>
    </SceneShell>
  );
};

const Chassis: React.FC<{x: number; y: number; w: number; h: number; at: number; label: string; color: string}> = ({x, y, w, h, at, label, color}) => (
  <g>
    <SketchRect x={x} y={y} w={w} h={h} rx={16} at={at} dur={0.6} stroke={C.fg} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={3051 + x} />
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <SketchRect x={x + 42 + i * 150} y={y + 86} w={112} h={130} rx={8} at={at + 0.2 + i * 0.06} dur={0.35} stroke={color} fill={C.well} fillStyle="solid" strokeWidth={3.5} seed={3061 + x + i} />
        <SvgLabel x={x + 98 + i * 150} y={y + 152} size={28} color={color} at={at + 0.2}>GPU</SvgLabel>
        <SketchCircle cx={x + 58 + i * 150} cy={y + 196} r={4} at={at + 0.4} dur={0.2} stroke={C.green} fill={C.green} fillStyle="solid" strokeWidth={2} seed={3071 + x + i} />
      </g>
    ))}
    <SvgLabel x={x + w / 2} y={y + h + 36} size={38} color={C.muted} at={at + 0.4}>{label}</SvgLabel>
  </g>
);
