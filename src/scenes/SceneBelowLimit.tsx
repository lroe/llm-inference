import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {Canvas, SceneShell} from '../components/SceneShell';
import {Label, SketchLine, SketchPath, SketchRect} from '../components/Sketch';
import {SvgLabel} from '../components/Objects';

export const SceneBelowLimit: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  const frame = useCurrentFrame();
  const roadFade = interpolate(frame, [2.6 * 30, 3.2 * 30], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const iconsFade = interpolate(frame, [4.6 * 30, 5.2 * 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <SceneShell durationInFrames={durationInFrames} ground>
      <Canvas>
        <SketchRect x={300} y={260} w={1320} h={320} rx={14} at={0.1} dur={0.6} stroke={C.panel} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={1401} />
        <SvgLabel x={530} y={362} size={38} color={C.muted} anchor="end" at={0.4}>limit</SvgLabel>
        <SketchRect x={560} y={340} w={940} h={42} rx={8} at={0.4} dur={0.5} stroke={C.panel} fill={C.well} fillStyle="solid" strokeWidth={3} seed={1403} />
        <SketchRect x={560} y={340} w={940} h={42} rx={8} at={0.6} dur={0.6} stroke={C.muted} fill={C.muted} fillStyle="solid" strokeWidth={3} seed={1405} />
        <SvgLabel x={1540} y={362} size={42} color={C.muted} at={0.6}>100</SvgLabel>

        <SvgLabel x={530} y={456} size={38} color={C.muted} anchor="end" at={1.1}>measured</SvgLabel>
        <SketchRect x={560} y={434} w={940} h={42} rx={8} at={1.1} dur={0.5} stroke={C.panel} fill={C.well} fillStyle="solid" strokeWidth={3} seed={1407} />
        <SketchRect x={560} y={434} w={141} h={42} rx={8} at={1.3} dur={0.6} stroke={C.red} fill={C.red} fillStyle="solid" strokeWidth={3} seed={1409} />
        <SvgLabel x={741} y={456} size={42} color={C.red} at={1.3}>15</SvgLabel>

        <SketchPath d="M 701 508 L 701 532 L 1500 532 L 1500 508" at={2.2} dur={0.5} stroke={C.yellow} strokeWidth={4} seed={1411} />
        <SvgLabel x={1100} y={570} size={42} color={C.yellow} at={2.2}>10× gap</SvgLabel>

        <g opacity={roadFade}>
          <g transform="translate(960 740)">
            <SketchLine x1={-190} y1={-30} x2={190} y2={-30} at={2.75} dur={0.4} stroke={C.panel} strokeWidth={5} seed={1413} />
            <SketchLine x1={-190} y1={30} x2={190} y2={30} at={2.8} dur={0.4} stroke={C.panel} strokeWidth={5} seed={1415} />
            {Array.from({length: 6}).map((_, i) => (
              <SketchLine key={i} x1={-160 + i * 64} y1={0} x2={-126 + i * 64} y2={0} at={2.9 + i * 0.03} dur={0.2} stroke={C.muted} strokeWidth={4} seed={1421 + i} />
            ))}
            <SketchLine x1={-70} y1={-80} x2={70} y2={80} at={3.4} dur={0.35} stroke={C.red} strokeWidth={8} seed={1431} />
            <SketchLine x1={70} y1={-80} x2={-70} y2={80} at={3.45} dur={0.35} stroke={C.red} strokeWidth={8} seed={1433} />
          </g>
        </g>

        <g opacity={iconsFade}>
          <Book x={520} y={770} at={4.7} />
          <TinyDish x={1370} y={790} at={6.5} />
        </g>
      </Canvas>

      <div style={{opacity: roadFade}}>
        <Label x={960} y={830} size={42} color={C.red} at={3.6}>
          not the road
        </Label>
      </div>
      <div style={{opacity: iconsFade}}>
        <Label x={520} y={632} size={40} color={C.yellow} at={4.8}>
          recipe?
        </Label>
        <Label x={1370} y={632} size={40} color={C.yellow} at={6.6}>
          one tiny dish
        </Label>
      </div>
    </SceneShell>
  );
};

const Book: React.FC<{x: number; y: number; at: number}> = ({x, y, at}) => (
  <g transform={`translate(${x} ${y})`}>
    <SketchPath d="M -120 -44 Q -50 -70 0 -30 Q 50 -70 120 -44 L 120 54 Q 50 30 0 70 Q -50 30 -120 54 Z" at={at} dur={0.6} stroke={C.cyan} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={1441} />
    <SketchLine x1={0} y1={-30} x2={0} y2={70} at={at + 0.3} dur={0.4} stroke={C.cyan} strokeWidth={3.5} seed={1443} />
    {[0, 1, 2].map((i) => (
      <React.Fragment key={i}>
        <SketchLine x1={-94} y1={-12 + i * 16} x2={-24} y2={-22 + i * 16} at={at + 0.35} dur={0.25} stroke={C.muted} strokeWidth={3} seed={1445 + i} />
        <SketchLine x1={24} y1={-22 + i * 16} x2={94} y2={-12 + i * 16} at={at + 0.4} dur={0.25} stroke={C.muted} strokeWidth={3} seed={1449 + i} />
      </React.Fragment>
    ))}
  </g>
);

const TinyDish: React.FC<{x: number; y: number; at: number}> = ({x, y, at}) => (
  <g transform={`translate(${x} ${y})`}>
    <SketchRect x={-170} y={-26} w={340} h={46} rx={8} at={at} dur={0.45} stroke={C.fg} fill={C.panel} fillStyle="solid" strokeWidth={4} seed={1451} />
    <SketchRect x={-26} y={-66} w={52} h={36} rx={7} at={at + 0.2} dur={0.35} stroke={C.orange} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={1453} />
    <SketchLine x1={-34} y1={-54} x2={-50} y2={-54} at={at + 0.3} dur={0.2} stroke={C.orange} strokeWidth={4} seed={1455} />
    <SketchLine x1={34} y1={-54} x2={50} y2={-54} at={at + 0.3} dur={0.2} stroke={C.orange} strokeWidth={4} seed={1457} />
    <SketchPath d="M -8 -66 Q -14 -86 0 -98 Q 14 -110 6 -130" at={at + 0.4} dur={0.4} stroke={C.muted} strokeWidth={4} seed={1459} />
  </g>
);
