import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {Canvas, SceneShell} from '../components/SceneShell';
import {Label, SketchLine, SketchRect} from '../components/Sketch';
import {SvgLabel} from '../components/Objects';

export const SceneIdleChip: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  const frame = useCurrentFrame();
  const dim = interpolate(frame, [5.4 * 30, 6.0 * 30], [1, 0.35], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const fixFade = interpolate(frame, [5.5 * 30, 6.1 * 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  const cols = 8;
  const rows = 6;
  const cell = 42;
  const gap = 9;
  const gx = 960 - (cols * cell + (cols - 1) * gap) / 2;
  const gy = 548 - (rows * cell + (rows - 1) * gap) / 2;

  return (
    <SceneShell durationInFrames={durationInFrames} ground>
      <Canvas>
        <g opacity={dim}>
          <SketchRect x={430} y={280} w={1060} h={520} rx={18} at={0.1} dur={0.6} stroke={C.fg} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={1501} />
          {Array.from({length: 11}).map((_, i) => (
            <React.Fragment key={i}>
              <SketchLine x1={500 + i * 92} y1={280} x2={500 + i * 92} y2={250} at={0.2} dur={0.3} stroke={C.muted} strokeWidth={3.5} seed={1510 + i} />
              <SketchLine x1={500 + i * 92} y1={800} x2={500 + i * 92} y2={830} at={0.2} dur={0.3} stroke={C.muted} strokeWidth={3.5} seed={1530 + i} />
            </React.Fragment>
          ))}
          <SketchRect x={640} y={350} w={640} h={380} rx={10} at={0.35} dur={0.6} stroke={C.cyan} fill={C.well} fillStyle="solid" strokeWidth={4} seed={1551} />

          {Array.from({length: rows}).map((_, r) =>
            Array.from({length: cols}).map((_, c) => {
              const idx = r * cols + c;
              const lit = r === 2 && c === 3;
              const p = Math.min(1, Math.max(0, (frame - 1.0 * 30 - idx * 0.5) / 6));
              return (
                <rect
                  key={idx}
                  x={gx + c * (cell + gap)}
                  y={gy + r * (cell + gap) - 44}
                  width={cell}
                  height={cell}
                  rx={4}
                  fill={lit ? C.orange : C.surface}
                  stroke={lit ? C.yellow : C.panel}
                  strokeWidth={lit ? 3.5 : 2}
                  opacity={p}
                />
              );
            })
          )}

          <SvgLabel x={960} y={312} size={34} color={C.orange} at={1.0}>1 of 48</SvgLabel>
        </g>

        <g opacity={fixFade}>
          <SketchRect x={1540} y={660} w={110} h={110} rx={8} at={5.5} dur={0.4} stroke={C.orange} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={1561} />
          <SketchRect x={1600} y={730} w={54} h={54} rx={5} at={5.7} dur={0.3} stroke={C.orange} fill={C.panel} fillStyle="solid" strokeWidth={3} seed={1563} />
          <SvgLabel x={1595} y={715} size={30} color={C.orange} at={5.5}>16</SvgLabel>
          <SvgLabel x={1627} y={757} size={22} color={C.orange} at={5.7}>4</SvgLabel>
          <SketchLine x1={1500} y1={650} x2={1690} y2={800} at={6.0} dur={0.3} stroke={C.red} strokeWidth={7} seed={1565} />
          <SketchLine x1={1690} y1={650} x2={1500} y2={800} at={6.05} dur={0.3} stroke={C.red} strokeWidth={7} seed={1567} />
          <SvgLabel x={1595} y={840} size={36} color={C.red} at={6.0}>not the fix</SvgLabel>
        </g>
      </Canvas>

      <Label x={960} y={212} size={56} color={C.yellow} at={0.5} font="marker" weight={700}>
        mostly idle
      </Label>
      <Label x={960} y={852} size={38} color={C.muted} at={1.2}>
        work too small to fill it
      </Label>
    </SceneShell>
  );
};
