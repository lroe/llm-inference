import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {Canvas, SceneShell} from '../components/SceneShell';
import {Label, SketchArrow, SketchCircle, SketchLine, SketchRect} from '../components/Sketch';
import {Chip, MemoryStack, SvgLabel, Token} from '../components/Objects';

export const SceneBatching: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  return (
    <SceneShell durationInFrames={durationInFrames} ground>
      <Canvas>
        <MemoryStack x={250} y={390} w={92} h={250} label="MEMORY" color={C.orange} at={0.2} dur={0.8} />
        <Chip x={740} y={380} size={260} label="GPU" color={C.cyan} at={0.6} dur={0.8} active />
        <SketchArrow x1={372} y1={520} x2={710} y2={520} at={1.4} dur={0.6} color={C.orange} strokeWidth={5} />
        <SvgLabel x={540} y={468} size={40} color={C.orange}>1 read</SvgLabel>
        <SketchArrow x1={1032} y1={520} x2={1220} y2={520} at={4.9} dur={0.55} color={C.green} strokeWidth={5} />
        <SvgLabel x={1125} y={468} size={40} color={C.green}>50 users</SvgLabel>

        <SketchRect x={1240} y={360} w={440} h={340} rx={14} at={3.9} dur={0.5} stroke={C.panel} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={2301} />
        <AvatarGrid at={5.2} />
        <SvgLabel x={1470} y={748} size={56} color={C.yellow}>×50</SvgLabel>
      </Canvas>

      <Label x={960} y={250} size={54} color={C.fg} at={0.4}>
        batching
      </Label>
      <Label x={960} y={840} size={44} color={C.muted} at={8.5}>
        one trip, many orders
      </Label>
    </SceneShell>
  );
};

const AvatarGrid: React.FC<{at: number}> = ({at}) => {
  const frame = useCurrentFrame();
  return (
    <g>
      {Array.from({length: 12}).map((_, i) => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        const x = 1288 + col * 98;
        const y = 398 + row * 96;
        const p = interpolate(frame, [(at + i * 0.08) * 30, (at + i * 0.08 + 0.35) * 30], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const color = i % 3 === 0 ? C.cyan : i % 3 === 1 ? C.purple : C.green;
        return (
          <g key={i} opacity={p} transform={`translate(${x} ${y})`}>
            <SketchRect x={0} y={0} w={78} h={78} rx={8} at={at + i * 0.08} dur={0.3} stroke={color} fill={C.well} fillStyle="solid" strokeWidth={3} seed={2310 + i} />
            <SketchCircle cx={39} cy={30} r={12} at={at + i * 0.08 + 0.1} dur={0.2} stroke={color} strokeWidth={3.2} seed={2330 + i} />
            <SketchPathLocal color={color} at={at + i * 0.08 + 0.2} seed={2350 + i} />
          </g>
        );
      })}
    </g>
  );
};

const SketchPathLocal: React.FC<{color: string; at: number; seed: number}> = ({color, at, seed}) => (
  <SketchLine x1={18} y1={60} x2={60} y2={60} at={at} dur={0.2} stroke={color} strokeWidth={3.2} seed={seed} />
);

export const SceneSingleUser: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  const frame = useCurrentFrame();
  const dim = interpolate(frame, [0, 0.4 * 30], [0.4, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <SceneShell durationInFrames={durationInFrames} ground>
      <Canvas>
        <g opacity={dim}>
          <Token x={420} y={610} text="you" size={44} color={C.cyan} fill={C.surface} at={0.2} dur={0.45} />
          <SketchArrow x1={500} y1={610} x2={860} y2={610} at={0.7} dur={0.45} color={C.cyan} strokeWidth={4} />
          <Chip x={900} y={450} size={260} label="GPU" color={C.cyan} at={0.1} dur={0.7} active />
          <MemoryStack x={1480} y={410} w={90} h={250} label="MEMORY" color={C.orange} at={0.35} dur={0.7} />
          <SketchArrow x1={1450} y1={590} x2={1340} y2={590} at={1.0} dur={0.35} color={C.red} strokeWidth={5} />
          <SketchLine x1={1315} y1={520} x2={1315} y2={660} at={1.4} dur={0.3} stroke={C.red} strokeWidth={7} seed={2401} />
          <SvgLabel x={1378} y={512} size={38} color={C.red}>memory limit</SvgLabel>
        </g>
      </Canvas>
      <Label x={700} y={790} size={54} color={C.red} at={2.8} font="marker" weight={700}>
        nothing to batch
      </Label>
    </SceneShell>
  );
};
