import React from 'react';
import {C} from '../theme';
import {Canvas, SceneShell} from '../components/SceneShell';
import {SketchArrow, SketchRect} from '../components/Sketch';
import {SvgLabel} from '../components/Objects';

export const SceneMathBytes: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  return (
    <SceneShell durationInFrames={durationInFrames} ground>
      <Canvas>
        <SketchRect x={320} y={400} w={220} h={160} rx={14} at={0.2} dur={0.6} stroke={C.cyan} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={1101} />
        <SvgLabel x={430} y={478} size={54} color={C.cyan} at={0.2}>2 bytes</SvgLabel>
        <SvgLabel x={430} y={350} size={42} color={C.muted} at={0.2}>one weight</SvgLabel>

        <SketchArrow x1={570} y1={480} x2={820} y2={480} at={1.7} dur={0.5} color={C.muted} strokeWidth={4} />

        <SvgLabel x={850} y={402} size={54} color={C.fg} anchor="start" at={2.0}>N billion weights</SvgLabel>
        <SvgLabel x={850} y={486} size={54} color={C.fg} anchor="start" at={2.0}>× 2 bytes</SvgLabel>
        <SketchRect x={830} y={530} w={620} h={128} rx={12} at={2.0} dur={0.5} stroke={C.panel} fill={C.well} fillStyle="solid" strokeWidth={4} seed={1103} />
        <SvgLabel x={880} y={594} size={64} color={C.orange} anchor="start" at={2.2}>= 2N GB</SvgLabel>
        <SvgLabel x={1240} y={594} size={38} color={C.muted} anchor="start" at={2.2}>per token</SvgLabel>
      </Canvas>
    </SceneShell>
  );
};
