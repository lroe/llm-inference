import React from 'react';
import {C} from '../theme';
import {Canvas, SceneShell} from '../components/SceneShell';
import {Chip, MemoryStack, SvgLabel, Token} from '../components/Objects';
import {Label, SketchArrow} from '../components/Sketch';
export const SceneOneToken: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  return (
    <SceneShell durationInFrames={durationInFrames} ground>
      <Canvas>
        <Chip x={430} y={330} size={300} label="GPU" color={C.cyan} at={0.1} dur={0.9} active />
        <MemoryStack x={1270} y={330} w={120} h={320} label="MEMORY" color={C.orange} at={0.4} dur={0.9} />
        <SketchArrow x1={1245} y1={510} x2={760} y2={510} at={4.0} dur={0.8} color={C.orange} strokeWidth={5} />
        <SvgLabel x={1000} y={462} size={46} color={C.orange}>all weights</SvgLabel>
        <Token x={880} y={790} text="token" size={44} color={C.green} fill={C.surface} at={2.45} dur={0.55} />
      </Canvas>
    </SceneShell>
  );
};
