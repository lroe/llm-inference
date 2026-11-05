import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {Canvas, SceneShell} from '../components/SceneShell';
import {Label, SketchArrow, SketchLine, SketchPath, SketchRect} from '../components/Sketch';
import {SvgLabel, Token} from '../components/Objects';

export const SceneDense: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  const frame = useCurrentFrame();
  const shortcutFade = interpolate(frame, [3.0 * 30, 3.55 * 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const storeFade = interpolate(frame, [4.0 * 30, 4.6 * 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const cols = 8;
  const rows = 6;
  const cell = 46;
  const gap = 10;
  const gridW = cols * cell + (cols - 1) * gap;
  const gridH = rows * cell + (rows - 1) * gap;
  const gx = 960 - gridW / 2;
  const gy = 500 - gridH / 2;

  return (
    <SceneShell durationInFrames={durationInFrames} ground>
      <Canvas>
        <SketchRect x={gx - 34} y={gy - 34} w={gridW + 68} h={gridH + 68} rx={14} at={0.1} dur={0.6} stroke={C.fg} fill={C.well} fillStyle="solid" seed={1001} />

        {Array.from({length: rows}).map((_, r) =>
          Array.from({length: cols}).map((_, c) => {
            const idx = r * cols + c;
            const p = Math.min(1, Math.max(0, (frame - 1.15 * 30 - idx * 0.8) / 7));
            const hot = idx % 9 === 0 || idx % 13 === 0;
            return (
              <rect
                key={idx}
                x={gx + c * (cell + gap)}
                y={gy + r * (cell + gap)}
                width={cell}
                height={cell}
                rx={5}
                fill={hot ? C.panel : C.surface}
                stroke={hot ? C.orange : C.well}
                strokeWidth={2.5}
                opacity={p}
              />
            );
          })
        )}

        <Token x={280} y={470} text="token" size={38} color={C.cyan} fill={C.surface} at={0.55} dur={0.45} />
        <SketchArrow x1={380} y1={470} x2={gx - 45} y2={470} at={0.95} dur={0.5} color={C.cyan} strokeWidth={4.5} />
        <SketchArrow x1={gx + gridW + 34} y1={470} x2={1440} y2={470} at={2.2} dur={0.5} color={C.green} strokeWidth={4.5} />
        <Token x={1536} y={470} text="next" size={38} color={C.green} fill={C.surface} at={2.45} dur={0.45} />

        <g opacity={shortcutFade}>
          <SketchPath d={`M 360 400 Q 420 210 960 210 Q 1500 210 1560 400`} at={3.0} dur={0.7} stroke={C.red} strokeWidth={4} seed={1011} />
          <SketchLine x1={902} y1={180} x2={1018} y2={244} at={3.45} dur={0.35} stroke={C.red} strokeWidth={6} seed={1013} />
          <SketchLine x1={1018} y1={180} x2={902} y2={244} at={3.5} dur={0.35} stroke={C.red} strokeWidth={6} seed={1015} />
          <SvgLabel x={960} y={154} size={42} color={C.red}>no shortcut</SvgLabel>
        </g>

        <g opacity={storeFade}>
          <SketchPath d={`M ${gx} 696 Q 960 726 ${gx + gridW} 696`} at={4.0} dur={0.5} stroke={C.panel} strokeWidth={4} seed={1021} />
          <SvgLabel x={960} y={772} size={46} color={C.yellow}>the whole storeroom</SvgLabel>
        </g>
      </Canvas>
      <Label x={960} y={250} size={50} color={C.fg} at={0.3}>
        dense model
      </Label>
    </SceneShell>
  );
};
