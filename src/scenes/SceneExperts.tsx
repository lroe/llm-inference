import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {Canvas, SceneShell} from '../components/SceneShell';
import {Label, SketchArrow, SketchLine, SketchRect} from '../components/Sketch';
import {SvgLabel, Token} from '../components/Objects';

export const SceneExperts: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  const frame = useCurrentFrame();
  const bytes = interpolate(frame, [6.0 * 30, 6.8 * 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const traffic = interpolate(frame, [11.8 * 30, 12.6 * 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const uneven = interpolate(frame, [14.2 * 30, 15.0 * 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const gpus = [260, 680, 1100, 1520];
  const selected = [0, 2];
  return (
    <SceneShell durationInFrames={durationInFrames} ground>
      <Canvas>
        <SketchRect x={870} y={366} w={180} h={74} rx={10} at={0.3} dur={0.4} stroke={C.purple} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={3401} />
        <SvgLabel x={960} y={404} size={30} color={C.purple} at={3.0}>MoE router</SvgLabel>
        <Token x={960} y={308} text="token" size={30} color={C.cyan} fill={C.surface} at={0.8} dur={0.35} />

        {gpus.map((x, i) => {
          const hot = selected.includes(i);
          return (
            <React.Fragment key={x}>
              <SketchRect x={x} y={470} w={320} h={200} rx={10} at={0.5 + i * 1.0} dur={0.4} stroke={hot ? C.purple : C.panel} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={3410 + i} />
              <SvgLabel x={x + 160} y={502} size={30} color={hot ? C.purple : C.muted} at={0.5 + i * 1.0}>GPU {i + 1}</SvgLabel>
              {[0, 1].map((e) => {
                const isSel = (i === 0 && e === 0) || (i === 2 && e === 1);
                return (
                  <React.Fragment key={e}>
                    <SketchRect x={x + 40 + e * 140} y={540} w={120} h={80} rx={7} at={0.7 + i * 1.0 + e * 0.05} dur={0.3} stroke={isSel ? C.green : C.panel} fill={isSel ? C.panel : C.well} fillStyle="solid" strokeWidth={3} seed={3430 + i * 2 + e} />
                    <SvgLabel x={x + 100 + e * 140} y={578} size={26} color={isSel ? C.green : C.muted} at={0.7 + i * 1.0 + e * 0.05}>E{e + 1}</SvgLabel>
                  </React.Fragment>
                );
              })}
              <SketchArrow x1={960} y1={442} x2={x + 160} y2={464} at={1.2 + i * 1.0} dur={0.35} color={hot ? C.green : C.panel} strokeWidth={3.5} head={10} />
            </React.Fragment>
          );
        })}

        <g opacity={bytes}>
          <SvgLabel x={420} y={646} size={26} color={C.green}>2 experts used</SvgLabel>
        </g>

        <g opacity={traffic}>
          {[580, 1000, 1420].map((x, i) => (
            <React.Fragment key={x}>
              <SketchArrow x1={x} y1={744} x2={x + 96} y2={744} at={11.9 + i * 0.12} dur={0.3} color={C.red} strokeWidth={4} head={10} />
              <SketchArrow x1={x + 96} y1={770} x2={x} y2={770} at={12.1 + i * 0.12} dur={0.3} color={C.red} strokeWidth={4} head={10} />
            </React.Fragment>
          ))}
          <SvgLabel x={960} y={822} size={40} color={C.red}>extra traffic</SvgLabel>
        </g>

        <g opacity={uneven}>
          <SvgLabel x={420} y={706} size={30} color={C.orange}>uneven work</SvgLabel>
        </g>
      </Canvas>

      <Label x={960} y={232} size={50} color={C.purple} at={0.3}>
        expert parallelism
      </Label>
    </SceneShell>
  );
};
