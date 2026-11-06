import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {Canvas, SceneShell} from '../components/SceneShell';
import {Label, SketchArrow, SketchLine, SketchRect} from '../components/Sketch';
import {ChipDie, SvgLabel} from '../components/Objects';

export const SceneTensor: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  const frame = useCurrentFrame();
  const oneFade = interpolate(frame, [4.6 * 30, 5.4 * 30], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const splitFade = interpolate(frame, [5.0 * 30, 5.8 * 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const colors = [C.cyan, C.green, C.purple, C.orange];
  return (
    <SceneShell durationInFrames={durationInFrames} ground>
      <Canvas>
        <g opacity={oneFade}>
          <SketchRect x={600} y={270} w={720} h={180} rx={12} at={0.2} dur={0.5} stroke={C.red} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={2901} />
          {[0, 1, 2, 3].map((i) => (
            <SketchLine key={i} x1={620} y1={306 + i * 36} x2={1300} y2={306 + i * 36} at={0.35 + i * 0.06} dur={0.3} stroke={C.panel} strokeWidth={3} seed={2903 + i} />
          ))}
          <ChipDie x={800} y={520} w={320} h={280} lit={[]} color={C.red} at={0.5} pins={false} />
          <SketchArrow x1={960} y1={456} x2={960} y2={510} at={1.2} dur={0.35} color={C.red} strokeWidth={5} />
          <SvgLabel x={960} y={230} size={46} color={C.red} at={0.4}>too big for one GPU</SvgLabel>
        </g>

        <g opacity={splitFade}>
          {[0, 1, 2, 3].map((i) => (
            <React.Fragment key={i}>
              <SketchRect x={290 + i * 330} y={300} w={310} h={210} rx={10} at={5.5 + i * 1.0} dur={0.4} stroke={colors[i]} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={2911 + i} />
              {[0, 1, 2].map((f) => (
                <SketchLine key={f} x1={312 + i * 330} y1={356 + f * 44} x2={578 + i * 330} y2={356 + f * 44} at={5.7 + i * 1.0 + f * 0.05} dur={0.3} stroke={C.panel} strokeWidth={3} seed={2920 + i * 3 + f} />
              ))}
              <SvgLabel x={445 + i * 330} y={478} size={28} color={colors[i]} at={5.5 + i * 1.0}>¼ weights</SvgLabel>
              <ChipDie x={290 + i * 330} y={560} w={310} h={200} cols={4} rows={3} lit={[0]} color={colors[i]} at={11.0 + i * 1.0} pins={false} stagger={0.1} />
              <SketchArrow x1={445 + i * 330} y1={514} x2={445 + i * 330} y2={552} at={11.0 + i * 1.0} dur={0.3} color={colors[i]} strokeWidth={4} head={12} />
              <SvgLabel x={445 + i * 330} y={738} size={26} color={colors[i]} at={11.2 + i * 1.0}>GPU</SvgLabel>
            </React.Fragment>
          ))}

          <SketchLine x1={445} y1={812} x2={1435} y2={812} at={22.5} dur={0.6} stroke={C.red} strokeWidth={5} seed={2961} />
          <SketchLine x1={445} y1={812} x2={477} y2={794} at={23.0} dur={0.2} stroke={C.red} strokeWidth={5} seed={2963} />
          <SketchLine x1={445} y1={812} x2={477} y2={830} at={23.05} dur={0.2} stroke={C.red} strokeWidth={5} seed={2965} />
          <SketchLine x1={1435} y1={812} x2={1403} y2={794} at={23.1} dur={0.2} stroke={C.red} strokeWidth={5} seed={2967} />
          <SketchLine x1={1435} y1={812} x2={1403} y2={830} at={23.15} dur={0.2} stroke={C.red} strokeWidth={5} seed={2969} />
          {[445, 775, 1105, 1435].map((x) => (
            <SketchLine key={x} x1={x} y1={760} x2={x} y2={812} at={22.8} dur={0.2} stroke={C.red} strokeWidth={3} seed={2971 + x} />
          ))}
          <SvgLabel x={960} y={854} size={36} color={C.red} at={22.5}>share results, twice per layer</SvgLabel>
        </g>
      </Canvas>

      <Label x={960} y={148} size={50} color={C.cyan} at={6.2}>
        1) tensor parallelism
      </Label>
      <Label x={960} y={260} size={44} color={C.muted} at={6.2} opacity={splitFade}>
        one layer, four slices
      </Label>
    </SceneShell>
  );
};
