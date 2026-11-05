import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {Canvas, SceneShell} from '../components/SceneShell';
import {Label, SketchArrow, SketchLine, SketchRect} from '../components/Sketch';
import {SvgLabel} from '../components/Objects';

export const ScenePipeline: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  const frame = useCurrentFrame();
  const bubbleFade = interpolate(frame, [12.6 * 30, 13.2 * 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const trafficFade = interpolate(frame, [17.8 * 30, 18.4 * 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const singleFade = interpolate(frame, [19.6 * 30, 20.2 * 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const finalFade = interpolate(frame, [22.3 * 30, 22.9 * 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <SceneShell durationInFrames={durationInFrames} ground>
      <Canvas>
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <SketchRect x={240 + i * 460} y={380} w={240} h={260} rx={10} at={0.3 + i * 0.35} dur={0.5} stroke={C.cyan} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={3101 + i} />
            <SvgLabel x={360 + i * 460} y={352} size={32} color={C.muted} at={0.3 + i * 0.35}>GPU {i + 1}</SvgLabel>
            {[0, 1, 2].map((f) => (
              <SketchRect key={f} x={266 + i * 460} y={412 + f * 70} w={188} h={54} rx={6} at={0.5 + i * 0.35 + f * 0.08} dur={0.3} stroke={C.panel} fill={C.well} fillStyle="solid" strokeWidth={3} seed={3120 + i * 3 + f} />
            ))}
            {i < 3 ? <SketchArrow x1={480 + i * 460} y1={510} x2={692 + i * 460} y2={510} at={10.2 + i * 0.15} dur={0.3} color={C.yellow} strokeWidth={4} head={11} /> : null}
          </g>
        ))}
        <SvgLabel x={590} y={690} size={36} color={C.yellow} at={10.2}>small hand-off</SvgLabel>

        <SketchLine x1={240} y1={760} x2={1860} y2={760} at={1.0} dur={0.6} stroke={C.panel} strokeWidth={6} seed={3151} />
        {Array.from({length: 4}).map((_, i) => (
          <g key={i} opacity={1 - trafficFade}>
            <SketchRect x={370 + i * 380} y={728} w={54} h={40} rx={5} at={2.0 + i * 0.3} dur={0.3} stroke={C.green} fill={C.surface} fillStyle="solid" strokeWidth={3} seed={3160 + i} />
          </g>
        ))}

        <g opacity={bubbleFade * (1 - trafficFade)}>
          {[560, 940, 1320, 1700].map((x, i) => (
            <g key={x}>
              <rect x={x} y={728} width={54} height={40} rx={5} fill="none" stroke={C.red} strokeWidth={3} strokeDasharray="8 7" opacity={0.9} />
              <SvgLabel x={x + 27} y={748} size={24} color={C.red}>·</SvgLabel>
            </g>
          ))}
          <SvgLabel x={960} y={844} size={38} color={C.red}>bubbles: a station waits</SvgLabel>
        </g>

        <g opacity={trafficFade * (1 - singleFade)}>
          {Array.from({length: 10}).map((_, i) => (
            <SketchRect key={i} x={300 + i * 150} y={728} w={54} h={40} rx={5} at={17.8 + i * 0.05} dur={0.25} stroke={C.green} fill={C.surface} fillStyle="solid" strokeWidth={3} seed={3180 + i} />
          ))}
          <SvgLabel x={960} y={844} size={38} color={C.green}>heavy traffic hides them</SvgLabel>
        </g>

        <g opacity={singleFade * (1 - finalFade)}>
          <SketchRect x={320} y={728} w={54} h={40} rx={5} at={19.6} dur={0.3} stroke={C.orange} fill={C.surface} fillStyle="solid" strokeWidth={3} seed={3210} />
          {[700, 1080, 1460].map((x) => (
            <rect key={x} x={x} y={728} width={54} height={40} rx={5} fill="none" stroke={C.red} strokeWidth={3} strokeDasharray="8 7" opacity={0.9} />
          ))}
          <SvgLabel x={960} y={844} size={38} color={C.orange}>one request feels every gap</SvgLabel>
        </g>

        <g opacity={finalFade}>
          <SvgLabel x={960} y={850} size={38} color={C.purple}>use this across machines</SvgLabel>
        </g>
      </Canvas>

      <Label x={960} y={252} size={52} color={C.cyan} at={0.3}>
        pipeline parallelism
      </Label>
    </SceneShell>
  );
};
