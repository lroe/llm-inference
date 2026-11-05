import React from 'react';
import {C} from '../theme';
import {Canvas, SceneShell} from '../components/SceneShell';
import {Label, SketchArrow} from '../components/Sketch';
import {ChipDie, SvgLabel, Token} from '../components/Objects';

export const ScenePrefill: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  const all = Array.from({length: 48}, (_, i) => i);
  return (
    <SceneShell durationInFrames={durationInFrames} ground>
      <Canvas>
        {['the', 'cat', 'sat', 'on', 'mat'].map((t, i) => (
          <Token key={t} x={400} y={376 + i * 74} text={t} size={34} color={C.muted} fill={C.surface} at={0.7 + i * 0.12} dur={0.35} />
        ))}
        <SketchArrow x1={500} y1={520} x2={872} y2={520} at={2.1} dur={0.6} color={C.cyan} strokeWidth={5} />
        <SvgLabel x={680} y={472} size={40} color={C.yellow}>all at once</SvgLabel>

        <ChipDie x={880} y={320} w={700} h={460} lit={all} color={C.green} at={2.8} stagger={0.25} />
      </Canvas>

      <Label x={960} y={248} size={54} color={C.cyan} at={0.35}>
        prefill
      </Label>
      <Label x={400} y={300} size={42} color={C.muted} at={7.9}>
        5000 tokens
      </Label>
      <Label x={960} y={842} size={54} color={C.green} at={15.6} font="marker" weight={700}>
        compute bound
      </Label>
    </SceneShell>
  );
};
