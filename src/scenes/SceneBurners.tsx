import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {Canvas, SceneShell} from '../components/SceneShell';
import {Label, SketchCircle, SketchLine, SketchRect} from '../components/Sketch';
import {SvgLabel} from '../components/Objects';
export const SceneBurners: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  const frame = useCurrentFrame();
  const dim = interpolate(frame, [15.0 * 30, 15.8 * 30], [1, 0.28], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const lit = 2 * 8 + 3;
  return (
    <SceneShell durationInFrames={durationInFrames} ground>
      <Canvas>
        <SketchRect x={420} y={300} w={1080} h={500} rx={16} at={0.1} dur={0.6} stroke={C.fg} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={2001} />
        <g opacity={dim}>
          {Array.from({length: 48}).map((_, i) => {
            const col = i % 8;
            const row = Math.floor(i / 8);
            const cx = 510 + col * 128;
            const cy = 380 + row * 80;
            const isLit = i === lit;
            return (
              <SketchCircle
                key={i}
                cx={cx}
                cy={cy}
                r={25}
                at={0.3 + i * 0.015}
                dur={0.3}
                stroke={isLit ? C.orange : C.panel}
                fill={isLit ? C.panel : C.well}
                fillStyle="solid"
                strokeWidth={isLit ? 5 : 3}
                seed={2010 + i}
              />
            );
          })}
        </g>

        <g opacity={1}>
          <Pot x={894} y={520} at={10.2} />
        </g>
      </Canvas>

      <Label x={960} y={250} size={54} color={C.orange} at={5.8}>
        2000 burners
      </Label>
      <Label x={960} y={840} size={54} color={C.yellow} at={14.8} font="marker" weight={700}>
        mostly idle
      </Label>
    </SceneShell>
  );
};

const Pot: React.FC<{x: number; y: number; at: number}> = ({x, y, at}) => (
  <g>
    <SketchRect x={x - 42} y={y} w={84} h={50} rx={8} at={at} dur={0.4} stroke={C.orange} fill={C.well} fillStyle="solid" strokeWidth={4} seed={2111} />
    <SketchLine x1={x - 40} y1={y + 10} x2={x + 40} y2={y + 10} at={at + 0.2} dur={0.2} stroke={C.orange} strokeWidth={4} seed={2113} />
    <SketchLine x1={x - 50} y1={y + 20} x2={x - 66} y2={y + 20} at={at + 0.3} dur={0.2} stroke={C.orange} strokeWidth={4} seed={2115} />
    <SketchLine x1={x + 50} y1={y + 20} x2={x + 66} y2={y + 20} at={at + 0.3} dur={0.2} stroke={C.orange} strokeWidth={4} seed={2117} />
    <SketchLine x1={x - 20} y1={y - 6} x2={x - 16} y2={y - 30} at={at + 0.4} dur={0.3} stroke={C.muted} strokeWidth={3.5} seed={2119} />
    <SketchLine x1={x + 8} y1={y - 6} x2={x + 14} y2={y - 34} at={at + 0.45} dur={0.3} stroke={C.muted} strokeWidth={3.5} seed={2121} />
  </g>
);
