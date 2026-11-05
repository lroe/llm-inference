import React from 'react';
import {C} from '../theme';
import {Canvas, SceneShell} from '../components/SceneShell';
import {Label, SketchRect} from '../components/Sketch';
import {ChipDie, Gauge} from '../components/Objects';

export const SceneBusyNotFull: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  return (
    <SceneShell durationInFrames={durationInFrames} ground>
      <Canvas>
        <SketchRect x={300} y={300} w={480} h={420} rx={14} at={0.1} dur={0.6} stroke={C.panel} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={2201} />
        <Gauge x={540} y={500} r={156} value={0.95} label="95%" color={C.orange} at={0.5} duration={1.1} size={56} />
        <ChipDie x={1020} y={330} w={650} h={450} lit={[20]} color={C.green} at={3.5} />
      </Canvas>

      <Label x={960} y={230} size={56} color={C.yellow} at={0.4} font="marker" weight={700}>
        busy is not full
      </Label>
      <Label x={540} y={776} size={46} color={C.orange} at={1.4}>
        95% busy
      </Label>
      <Label x={1345} y={832} size={46} color={C.red} at={12.3}>
        2% full
      </Label>
    </SceneShell>
  );
};
