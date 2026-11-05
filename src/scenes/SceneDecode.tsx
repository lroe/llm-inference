import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {Canvas, SceneShell} from '../components/SceneShell';
import {Label, SketchArrow, SketchRect} from '../components/Sketch';
import {ChipDie, MemoryStack, SvgLabel, Token} from '../components/Objects';

export const SceneDecode: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  const frame = useCurrentFrame();
  const dim = interpolate(frame, [12.0 * 30, 12.6 * 30], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const fork = interpolate(frame, [12.3 * 30, 12.9 * 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const tokens = ['The', 'cat', 'sat', 'on'];
  return (
    <SceneShell durationInFrames={durationInFrames} ground>
      <Canvas>
        <g opacity={dim}>
          <MemoryStack x={250} y={380} w={92} h={250} label="MEMORY" color={C.orange} at={0.2} dur={0.7} />
          <ChipDie x={520} y={330} w={620} h={420} lit={[20]} color={C.red} at={0.2} />
          <SketchArrow x1={370} y1={510} x2={500} y2={510} at={0.9} dur={0.4} color={C.red} strokeWidth={5} />
          <SketchArrow x1={1150} y1={380} x2={1350} y2={380} at={1.1} dur={0.4} color={C.green} strokeWidth={4} />

          {tokens.map((t, i) => (
            <React.Fragment key={t}>
              <Token x={1420} y={382 + i * 82} text={t} size={32} color={C.green} fill={C.surface} at={1.3 + i * 1.0} dur={0.35} />
              {i < tokens.length - 1 ? (
                <SketchArrow x1={1420} y1={412 + i * 82} x2={1420} y2={444 + i * 82} at={5.2 + i * 0.15} dur={0.25} color={C.muted} strokeWidth={3.5} head={10} />
              ) : null}
            </React.Fragment>
          ))}
          <SvgLabel x={1420} y={748} size={38} color={C.muted}>one at a time</SvgLabel>
        </g>

        <g opacity={fork}>
          <SketchRect x={480} y={470} w={330} h={150} rx={12} at={12.3} dur={0.4} stroke={C.cyan} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={2501} />
          <SketchRect x={1110} y={470} w={330} h={150} rx={12} at={12.4} dur={0.4} stroke={C.red} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={2503} />
          <SvgLabel x={645} y={545} size={52} color={C.cyan}>prefill</SvgLabel>
          <SvgLabel x={1275} y={545} size={52} color={C.red}>decode</SvgLabel>
          <Token x={960} y={350} text="new trick" size={36} color={C.yellow} fill={C.surface} at={12.5} dur={0.4} />
          <SketchArrow x1={880} y1={390} x2={680} y2={462} at={13.0} dur={0.35} color={C.muted} strokeWidth={4} />
          <SketchArrow x1={1040} y1={390} x2={1240} y2={462} at={13.0} dur={0.35} color={C.muted} strokeWidth={4} />
          <SvgLabel x={960} y={708} size={58} color={C.yellow}>which one?</SvgLabel>
        </g>
      </Canvas>

      <Label x={960} y={250} size={54} color={C.cyan} at={0.35} opacity={1 - fork}>
        decode
      </Label>
      <Label x={960} y={820} size={54} color={C.red} at={7.2} opacity={1 - fork} font="marker" weight={700}>
        memory bound
      </Label>
    </SceneShell>
  );
};
