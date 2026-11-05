import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {Canvas, SceneShell} from '../components/SceneShell';
import {Chip, Gauge, Hourglass, SvgLabel} from '../components/Objects';
import {FadeGroup, Label, SketchCircle, SketchLine, SketchRect} from '../components/Sketch';

export const SceneHook: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  const frame = useCurrentFrame();
  const mainFade = interpolate(frame, [8.8 * 30, 9.3 * 30], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const waitFade = interpolate(frame, [9.25 * 30, 9.7 * 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const chipFade = interpolate(frame, [2.4 * 30, 3.0 * 30], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <SceneShell durationInFrames={durationInFrames} ground>
      <Canvas>
        <g opacity={mainFade * chipFade}>
          <Chip x={420} y={258} size={300} label="GPU" color={C.cyan} at={0.15} dur={1.1} active />

          <g transform="rotate(7 760 620)">
            <SketchRect x={640} y={600} w={236} h={112} rx={12} at={1.1} dur={0.5} stroke={C.orange} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={601} />
            <SketchCircle cx={674} cy={646} r={9} at={1.2} dur={0.3} stroke={C.orange} strokeWidth={3.5} seed={602} />
            <SvgLabel x={790} y={656} size={54} color={C.orange} at={1.2}>$ 899</SvgLabel>
          </g>
        </g>

        <g opacity={mainFade}>
          <SketchRect x={1110} y={268} w={620} h={510} rx={14} at={2.75} dur={0.65} stroke={C.panel} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={605} />
          <Gauge x={1420} y={470} r={168} value={0.95} label="95%" color={C.orange} at={3.05} duration={1.3} size={62} />
          <SketchLine x1={1180} y1={690} x2={1660} y2={690} at={3.5} dur={0.5} stroke={C.panel} strokeWidth={4} seed={607} />
          <SvgLabel x={1420} y={736} size={42} color={C.muted} at={3.4}>reported busy</SvgLabel>
        </g>

        <g opacity={waitFade}>
          <Hourglass x={960} y={430} h={310} color={C.orange} at={9.2} />
        </g>
      </Canvas>

      <div style={{opacity: mainFade}}>
        <Label x={1420} y={835} size={54} color={C.yellow} at={6.0} font="marker" weight={700}>
          still slow
        </Label>
      </div>

      <div style={{opacity: waitFade}}>
        <Label x={960} y={700} size={78} color={C.orange} at={9.35} font="marker" weight={700}>
          waiting, not working
        </Label>
      </div>
    </SceneShell>
  );
};
