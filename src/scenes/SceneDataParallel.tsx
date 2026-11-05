import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {Canvas, SceneShell} from '../components/SceneShell';
import {Label, SketchArrow, SketchLine, SketchRect} from '../components/Sketch';
import {SvgLabel, Token} from '../components/Objects';
import {FadeGroup} from '../components/Sketch';

const Copy: React.FC<{x: number; y: number; name: string; at: number; color?: string; zero?: boolean}> = ({x, y, name, at, color = C.cyan, zero = false}) => (
  <g>
    <SketchRect x={x} y={y} w={380} h={300} rx={12} at={at} dur={0.5} stroke={color} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={3301 + x} />
    <SvgLabel x={x + 190} y={y + 38} size={34} color={color} at={at}>copy {name}</SvgLabel>
    {[0, 1, 2].map((i) => (
      <SketchRect key={i} x={x + 36} y={y + 72 + i * 62} w={308} h={48} rx={5} at={at + 0.2 + i * 0.08} dur={0.3} stroke={C.panel} fill={C.well} fillStyle="solid" strokeWidth={3} seed={3310 + x + i} />
    ))}
    {zero ? (
      <g opacity={1}>
        <SvgLabel x={x + 190} y={y + 220} size={44} color={C.red}>?</SvgLabel>
      </g>
    ) : null}
  </g>
);

export const SceneDataParallel: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  const frame = useCurrentFrame();
  const trap = interpolate(frame, [7.6 * 30, 8.3 * 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <SceneShell durationInFrames={durationInFrames} ground>
      <Canvas>
        <g opacity={1 - trap}>
          <Copy x={220} y={430} name="A" at={0.3} />
          <Copy x={770} y={430} name="B" at={0.6} color={C.purple} />
          <Copy x={1320} y={430} name="C" at={0.9} color={C.orange} />
          {[410, 960, 1510].map((x, i) => (
            <React.Fragment key={x}>
              <Token x={x} y={340} text="req" size={30} color={C.green} fill={C.surface} at={4.0 + i * 0.2} dur={0.3} />
              <SketchArrow x1={x} y1={372} x2={x} y2={422} at={4.8 + i * 0.15} dur={0.3} color={C.green} strokeWidth={4} head={11} />
            </React.Fragment>
          ))}
          <FadeGroup at={3.8} dur={0.4} y={0}>
            <SvgLabel x={960} y={286} size={38} color={C.green}>requests spread out</SvgLabel>
          </FadeGroup>
          <FadeGroup at={4.5} dur={0.4} y={0}>
            <SvgLabel x={960} y={790} size={44} color={C.green}>more people, same speed each</SvgLabel>
          </FadeGroup>
        </g>

        <g opacity={trap}>
          <Copy x={220} y={430} name="A" at={0.3} />
          <Copy x={770} y={430} name="B" at={0.6} color={C.purple} zero />
          <Copy x={1320} y={430} name="C" at={0.9} color={C.orange} />
          <Token x={420} y={340} text="turn 1" size={30} color={C.green} fill={C.surface} at={7.8} dur={0.3} />
          <SketchArrow x1={450} y1={372} x2={420} y2={422} at={8.2} dur={0.3} color={C.green} strokeWidth={4} head={11} />
          <Token x={960} y={330} text="turn 2" size={30} color={C.red} fill={C.surface} at={8.6} dur={0.3} />
          <SketchArrow x1={960} y1={362} x2={960} y2={422} at={9.0} dur={0.3} color={C.red} strokeWidth={4} head={11} />
          <FadeGroup at={13.0} dur={0.4} y={0}>
            <SvgLabel x={960} y={790} size={42} color={C.red}>copy B starts at zero</SvgLabel>
          </FadeGroup>
        </g>
      </Canvas>

      <Label x={960} y={222} size={50} color={C.cyan} at={0.3}>
        data parallelism
      </Label>
    </SceneShell>
  );
};

export const SceneStickySession: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  return (
    <SceneShell durationInFrames={durationInFrames} ground>
      <Canvas>
        <Copy x={300} y={430} name="A" at={0.2} />
        <Copy x={1120} y={430} name="B" at={0.35} color={C.purple} />
        <Token x={560} y={330} text="turn 1" size={30} color={C.green} fill={C.surface} at={0.8} dur={0.3} />
        <Token x={820} y={330} text="turn 2" size={30} color={C.green} fill={C.surface} at={1.1} dur={0.3} />
        <SketchArrow x1={560} y1={362} x2={500} y2={422} at={1.5} dur={0.3} color={C.green} strokeWidth={4} head={11} />
        <SketchArrow x1={820} y1={362} x2={560} y2={422} at={1.7} dur={0.35} color={C.green} strokeWidth={4} head={11} />
        <FadeGroup at={2.9} dur={0.4} y={0}>
          <SvgLabel x={960} y={790} size={42} color={C.green}>same conversation, same copy</SvgLabel>
        </FadeGroup>
      </Canvas>
      <Label x={960} y={222} size={48} color={C.green} at={0.3}>
        pin the conversation
      </Label>
    </SceneShell>
  );
};
