import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {Canvas, SceneShell} from '../components/SceneShell';
import {Label, SketchPath, SketchRect} from '../components/Sketch';
import {SvgLabel, Token} from '../components/Objects';

const SpaceToken: React.FC<{x: number; y: number; at: number}> = ({x, y, at}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [at * 30, (at + 0.5) * 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <g opacity={p} transform={`translate(0 ${(1 - p) * 8})`}>
      <rect
        x={x - 34}
        y={y - 33}
        width={68}
        height={66}
        rx={8}
        fill={C.surface}
        stroke={C.cyan}
        strokeWidth={3.5}
        strokeDasharray="10 8"
      />
      <SvgLabel x={x} y={y + 2} size={38} color={C.cyan} at={at + 0.2}>␣</SvgLabel>
    </g>
  );
};

export const SceneTokens: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  const frame = useCurrentFrame();
  const spaceFade = interpolate(frame, [3.1 * 30, 3.6 * 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <SceneShell durationInFrames={durationInFrames} ground>
      <Canvas>
        <LabelTokenRow />
        <SpaceToken x={1219} y={420} at={3.1} />
        <g opacity={spaceFade}>
          <SvgLabel x={1219} y={338} size={38} color={C.cyan} at={3.1}>a space</SvgLabel>
        </g>

        {/* bracket under “fast” */}
        <SketchPath
          d="M 1039 492 L 1039 512 L 1169 512 L 1169 492"
          at={5.9}
          dur={0.5}
          stroke={C.yellow}
          strokeWidth={4}
          seed={951}
        />
        <SvgLabel x={1104} y={568} size={52} color={C.yellow} at={5.9}>≈ 4 letters</SvgLabel>

        {/* 3/4 word bar */}
        <g>
          {[0, 1, 2, 3].map((i) => (
            <SketchRect
              key={i}
              x={1160 + i * 50}
              y={690}
              w={40}
              h={34}
              rx={5}
              at={6.3 + i * 0.06}
              dur={0.3}
              stroke={i < 3 ? C.green : C.panel}
              fill={i < 3 ? C.green : C.surface}
              fillStyle="solid"
              strokeWidth={3}
              seed={961 + i}
            />
          ))}
        </g>
        <SvgLabel x={1260} y={762} size={48} color={C.green} at={6.3}>3/4 of a word</SvgLabel>
      </Canvas>

      <Label x={960} y={262} size={52} color={C.fg} at={0.3}>
        pieces of text
      </Label>
    </SceneShell>
  );
};

const LabelTokenRow: React.FC = () => {
  return (
    <g>
      <Token x={709} y={420} text="In" size={42} color={C.fg} fill={C.surface} at={0.7} dur={0.4} />
      <Token x={821.5} y={420} text="fer" size={42} color={C.fg} fill={C.surface} at={0.9} dur={0.4} />
      <Token x={957} y={420} text="ence" size={42} color={C.fg} fill={C.surface} at={1.1} dur={0.4} />
      <Token x={1104} y={420} text="fast" size={42} color={C.green} fill={C.panel} at={1.3} dur={0.4} />
    </g>
  );
};
