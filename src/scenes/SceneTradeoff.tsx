import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {Canvas, SceneShell} from '../components/SceneShell';
import {Label, SketchRect} from '../components/Sketch';
import {Scale, SvgLabel} from '../components/Objects';

export const SceneTradeoff: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [2.0 * 30, 5.0 * 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <SceneShell durationInFrames={durationInFrames} ground>
      <Canvas>
        <Scale x={960} y={420} w={560} at={0.5} left={0.5 + 0.28 * p} right={0.5 - 0.18 * p} />
        <SketchRect x={610} y={520 - 20 * p} w={180} h={56} rx={8} at={2.1} dur={0.4} stroke={C.green} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={2701} />
        <SvgLabel x={700} y={548 - 20 * p} size={34} color={C.green}>+ users</SvgLabel>
      </Canvas>

      <Label x={960} y={220} size={56} color={C.yellow} at={0.3} font="marker" weight={700}>
        can’t max all three
      </Label>
      <Label x={700} y={632} size={44} color={C.cyan} at={1.2}>
        throughput
      </Label>
      <Label x={1220} y={548} size={44} color={C.orange} at={1.5}>
        waiting
      </Label>
      <Label x={960} y={832} size={48} color={C.green} at={7.2}>
        pick a priority
      </Label>
    </SceneShell>
  );
};
