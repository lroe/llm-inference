import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {Canvas, SceneShell} from '../components/SceneShell';
import {Label, SketchArrow, SketchLine, SketchRect} from '../components/Sketch';
import {SvgLabel, Token} from '../components/Objects';
import {Figure} from '../components/Figure';

export const SceneSpeculative: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  const frame = useCurrentFrame();
  const verdict = interpolate(frame, [16.6 * 30, 17.2 * 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const words = ['the', 'cat', 'sat', 'on', 'mat'];
  return (
    <SceneShell durationInFrames={durationInFrames} ground>
      <Canvas>
        {words.map((w, i) => (
          <Token
            key={w}
            x={960 + (i - 2) * 118}
            y={430}
            text={w}
            size={32}
            color={i < 3 ? C.green : i === 3 ? C.red : C.muted}
            fill={i < 3 ? C.panel : C.surface}
            at={2.8 + i * 0.35}
            dur={0.35}
            strike={i >= 3 && verdict > 0.5}
          />
        ))}
        <SketchPathLocal at={16.8} />
        <SvgLabel x={960} y={330} size={34} color={C.green} at={16.6}>accepted</SvgLabel>
        <SvgLabel x={1240} y={330} size={30} color={C.red} at={16.6}>rejected</SvgLabel>

        <Figure x={280} y={820} scale={0.62} pose="stand" hat="chef" at={9.0} dur={0.7} />
        <Figure x={1640} y={820} scale={0.8} pose="stand" hat="chef" at={12.6} dur={0.7} />
        <SketchArrow x1={370} y1={660} x2={760} y2={500} at={10.2} dur={0.5} color={C.cyan} strokeWidth={4} />
        <SketchArrow x1={1540} y1={660} x2={1200} y2={500} at={13.6} dur={0.5} color={C.yellow} strokeWidth={4} />
        <SvgLabel x={470} y={600} size={32} color={C.cyan}>draft</SvgLabel>
        <SvgLabel x={1450} y={600} size={32} color={C.yellow}>verify</SvgLabel>
        <SvgLabel x={280} y={858} size={28} color={C.muted}>prep cook</SvgLabel>
        <SvgLabel x={1640} y={858} size={28} color={C.muted}>head chef</SvgLabel>
      </Canvas>
      <Label x={960} y={230} size={50} color={C.cyan} at={0.3}>
        speculative decoding
      </Label>
    </SceneShell>
  );
};

const SketchPathLocal: React.FC<{at: number}> = ({at}) => (
  <g opacity={0.8}>
    <SketchLine x1={760} y1={480} x2={1280} y2={480} at={at} dur={0.4} stroke={C.yellow} strokeWidth={3} seed={5201} />
    <SvgLabel x={1020} y={510} size={26} color={C.yellow}>one pass</SvgLabel>
  </g>
);
