import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {Canvas, SceneShell} from '../components/SceneShell';
import {Label, SketchArrow, SketchLine, SketchRect, SketchCircle, SketchPath} from '../components/Sketch';
import {SvgLabel, Token} from '../components/Objects';

const WeightGrid: React.FC<{at: number}> = ({at}) => {
  const frame = useCurrentFrame();
  const cols = 10;
  const rows = 7;
  const cell = 43;
  const gap = 9;
  const x0 = 598;
  const y0 = 344;
  return (
    <g>
      {Array.from({length: rows}).map((_, r) =>
        Array.from({length: cols}).map((_, c) => {
          const idx = r * cols + c;
          const accent = idx === 12 || idx === 35 || idx === 54 || idx === 67;
          const p = Math.min(1, Math.max(0, (frame - at * 30 - idx * 1.1) / 8));
          return (
            <rect
              key={idx}
              x={x0 + c * (cell + gap)}
              y={y0 + r * (cell + gap)}
              width={cell}
              height={cell}
              rx={5}
              fill={accent ? C.panel : C.surface}
              stroke={accent ? C.cyan : C.well}
              strokeWidth={2.5}
              opacity={p}
            />
          );
        })
      )}
    </g>
  );
};

export const SceneWeights: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  const frame = useCurrentFrame();
  const trainFade = interpolate(frame, [2.1 * 30, 2.7 * 30], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const serveFade = interpolate(frame, [5.4 * 30, 6.1 * 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <SceneShell durationInFrames={durationInFrames} ground>
      <Canvas>
        <SketchRect x={480} y={320} w={760} h={400} rx={16} at={0.1} dur={0.7} stroke={C.fg} fill={C.well} fillStyle="solid" strokeWidth={4} seed={901} />
        <WeightGrid at={0.5} />

        <g opacity={trainFade}>
          <SketchArrow x1={250} y1={520} x2={458} y2={520} at={0.15} dur={0.6} color={C.muted} strokeWidth={4} />
          <SvgLabel x={340} y={468} size={38} color={C.muted}>training</SvgLabel>
        </g>

        {/* snowflake */}
        <g>
          <SketchLine x1={1400} y1={350} x2={1400} y2={470} at={2.35} dur={0.4} stroke={C.cyan} strokeWidth={5} seed={911} />
          <SketchLine x1={1348} y1={380} x2={1452} y2={440} at={2.4} dur={0.4} stroke={C.cyan} strokeWidth={5} seed={913} />
          <SketchLine x1={1452} y1={380} x2={1348} y2={440} at={2.45} dur={0.4} stroke={C.cyan} strokeWidth={5} seed={915} />
          <SketchCircle cx={1400} cy={410} r={56} at={2.3} dur={0.5} stroke={C.cyan} strokeWidth={4} seed={917} />
          <SvgLabel x={1400} y={500} size={44} color={C.cyan} at={2.5}>frozen</SvgLabel>
        </g>

        <g opacity={serveFade}>
          <Token x={300} y={784} text="prompt" size={34} color={C.muted} fill={C.surface} at={5.5} dur={0.4} />
          <SketchArrow x1={380} y1={784} x2={478} y2={784} at={5.6} dur={0.35} color={C.muted} strokeWidth={4} />
          <SketchArrow x1={1242} y1={784} x2={1360} y2={784} at={6.1} dur={0.35} color={C.green} strokeWidth={4} />
          <Token x={1460} y={784} text="next" size={34} color={C.green} fill={C.surface} at={6.2} dur={0.4} />
          <SvgLabel x={920} y={840} size={40} color={C.muted}>again and again</SvgLabel>
        </g>
      </Canvas>

      <Label x={860} y={272} size={50} color={C.fg} at={0.35}>
        the weights
      </Label>
    </SceneShell>
  );
};
