import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {Canvas, SceneShell} from '../components/SceneShell';
import {Figure} from '../components/Figure';
import {Label, SketchCircle, SketchLine, SketchPath, SketchRect} from '../components/Sketch';
import {Hourglass, SvgLabel} from '../components/Objects';

const Kitchen: React.FC<{at: number}> = ({at}) => (
  <g>
    <SketchLine x1={180} y1={884} x2={560} y2={884} at={at} dur={0.5} stroke={C.panel} strokeWidth={4} seed={701} />
    <SketchLine x1={180} y1={330} x2={560} y2={330} at={at} dur={0.5} stroke={C.fg} strokeWidth={4} seed={703} />
    <SketchLine x1={180} y1={330} x2={180} y2={884} at={at + 0.12} dur={0.5} stroke={C.fg} strokeWidth={4} seed={705} />
    <SketchLine x1={560} y1={330} x2={560} y2={620} at={at + 0.2} dur={0.4} stroke={C.fg} strokeWidth={4} seed={707} />

    {/* shelf and jars */}
    <SketchLine x1={214} y1={480} x2={360} y2={480} at={at + 0.2} dur={0.4} stroke={C.muted} strokeWidth={4} seed={711} />
    <SketchRect x={226} y={436} w={44} h={44} rx={6} at={at + 0.3} dur={0.3} stroke={C.orange} fill={C.surface} fillStyle="solid" strokeWidth={3} seed={713} />
    <SketchRect x={288} y={446} w={36} h={34} rx={5} at={at + 0.34} dur={0.3} stroke={C.green} fill={C.surface} fillStyle="solid" strokeWidth={3} seed={715} />

    {/* stove + pot */}
    <SketchRect x={408} y={730} w={114} h={28} rx={5} at={at + 0.2} dur={0.35} stroke={C.fg} fill={C.panel} fillStyle="solid" strokeWidth={4} seed={717} />
    <SketchRect x={430} y={690} w={80} h={44} rx={8} at={at + 0.3} dur={0.35} stroke={C.fg} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={719} />
    <SketchLine x1={430} y1={700} x2={510} y2={700} at={at + 0.34} dur={0.25} stroke={C.fg} strokeWidth={3.5} seed={721} />
    <SketchPath d={`M 450 688 Q 446 664 458 648`} at={at + 0.5} dur={0.5} stroke={C.muted} strokeWidth={4} seed={723} />
    <SketchPath d={`M 472 686 Q 478 660 468 642`} at={at + 0.58} dur={0.5} stroke={C.muted} strokeWidth={4} seed={725} />
    <SketchPath d={`M 494 688 Q 500 666 490 650`} at={at + 0.66} dur={0.5} stroke={C.muted} strokeWidth={4} seed={727} />

    {/* counter is drawn later, over the chef */}
  </g>
);const Storeroom: React.FC<{at: number}> = ({at}) => (
  <g>
    <SketchLine x1={1340} y1={884} x2={1700} y2={884} at={at} dur={0.5} stroke={C.panel} strokeWidth={4} seed={741} />
    <SketchLine x1={1340} y1={300} x2={1700} y2={300} at={at} dur={0.5} stroke={C.fg} strokeWidth={4} seed={743} />
    <SketchLine x1={1340} y1={300} x2={1340} y2={620} at={at + 0.12} dur={0.4} stroke={C.fg} strokeWidth={4} seed={745} />
    <SketchLine x1={1340} y1={620} x2={1362} y2={620} at={at + 0.15} dur={0.2} stroke={C.fg} strokeWidth={4} seed={746} />
    <SketchLine x1={1362} y1={620} x2={1362} y2={884} at={at + 0.16} dur={0.35} stroke={C.fg} strokeWidth={4} seed={748} />
    <SketchLine x1={1362} y1={620} x2={1410} y2={620} at={at + 0.2} dur={0.2} stroke={C.fg} strokeWidth={4} seed={750} />
    <SketchLine x1={1700} y1={300} x2={1700} y2={884} at={at + 0.18} dur={0.5} stroke={C.fg} strokeWidth={4} seed={747} />

    {/* shelves */}
    {[470, 610, 750].map((y, i) => (
      <React.Fragment key={y}>
        <SketchLine x1={1400} y1={y} x2={1666} y2={y} at={at + 0.22 + i * 0.06} dur={0.4} stroke={C.muted} strokeWidth={4} seed={751 + i} />
        <SketchRect x={1418} y={y - 50} w={54} h={50} rx={4} at={at + 0.3 + i * 0.08} dur={0.28} stroke={C.orange} fill={C.surface} fillStyle="solid" strokeWidth={3} seed={755 + i} />
        <SketchRect x={1490} y={y - 40} w={44} h={40} rx={4} at={at + 0.34 + i * 0.08} dur={0.28} stroke={C.green} fill={C.surface} fillStyle="solid" strokeWidth={3} seed={759 + i} />
        <SketchRect x={1552} y={y - 56} w={60} h={56} rx={4} at={at + 0.38 + i * 0.08} dur={0.28} stroke={C.pink} fill={C.surface} fillStyle="solid" strokeWidth={3} seed={763 + i} />
      </React.Fragment>
    ))}

    {/* door knob */}
    <SketchCircle cx={1398} cy={806} r={4} at={at + 0.3} dur={0.2} stroke={C.orange} fill={C.orange} fillStyle="solid" strokeWidth={2} seed={775} />
  </g>
);

const Skyline: React.FC<{at: number}> = ({at}) => {
  const houses = [
    {x: 690, w: 84, h: 76},
    {x: 806, w: 62, h: 118},
    {x: 900, w: 96, h: 58},
    {x: 1028, w: 72, h: 94},
    {x: 1130, w: 88, h: 68},
    {x: 1242, w: 58, h: 110},
  ];
  return (
    <g opacity={0.75}>
      {houses.map((h, i) => (
        <React.Fragment key={i}>
          <SketchLine x1={h.x} y1={884} x2={h.x} y2={884 - h.h} at={at + i * 0.05} dur={0.35} stroke={C.panel} strokeWidth={4} seed={780 + i} />
          <SketchLine x1={h.x + h.w} y1={884} x2={h.x + h.w} y2={884 - h.h + 12} at={at + i * 0.05} dur={0.35} stroke={C.panel} strokeWidth={4} seed={790 + i} />
          <SketchLine x1={h.x} y1={884 - h.h} x2={h.x + h.w} y2={884 - h.h + 12} at={at + i * 0.05 + 0.08} dur={0.35} stroke={C.panel} strokeWidth={4} seed={800 + i} />
          <rect x={h.x + 14} y={884 - h.h + 22} width={12} height={12} fill={C.yellow} opacity={0.55} />
          <rect x={h.x + h.w - 30} y={884 - h.h + 44} width={12} height={12} fill={C.yellow} opacity={0.4} />
        </React.Fragment>
      ))}
    </g>
  );
};

export const SceneChef: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  const frame = useCurrentFrame();
  const walk = interpolate(frame, [2.15 * 30, 5.55 * 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const back = interpolate(frame, [5.9 * 30, 9.15 * 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const x = 300 + walk * 950 - back * 950;
  const moving = (walk > 0 && walk < 1) || (back > 0 && back < 1);
  const bob = moving ? Math.sin(frame * 0.62) * 4 : 0;
  const step = Math.floor(frame / 7) % 2 === 0 ? 'walk' : 'walk2';
  const carry = back > 0.05 && back < 0.98;

  const biteFade = interpolate(frame, [9.5 * 30, 10.0 * 30], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const chopFade = interpolate(frame, [11.5 * 30, 11.85 * 30], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <SceneShell durationInFrames={durationInFrames} ground={false}>
      <Canvas>
        <Skyline at={0.7} />
        <Kitchen at={0.1} />
        <Storeroom at={1.55} />

        {/* road dashes */}
        {Array.from({length: 15}).map((_, i) => (
          <SketchLine
            key={i}
            x1={604 + i * 48}
            y1={884}
            x2={632 + i * 48}
            y2={884}
            at={2.35 + i * 0.035}
            dur={0.22}
            stroke={C.panel}
            strokeWidth={5}
            roughness={0.7}
            seed={821 + i}
          />
        ))}

        <Figure
          x={x}
          y={884 + bob}
          scale={0.95}
          pose={moving ? step : 'stand'}
          hat="chef"
          at={0.3}
          hold={carry ? {x: 0, y: -132, kind: 'box'} : {x: 0, y: 0, kind: 'none'}}
        />

        {/* counter drawn over the chef while he is inside the kitchen */}
        <SketchLine x1={208} y1={778} x2={540} y2={778} at={0.1} dur={0.4} stroke={C.fg} strokeWidth={6} seed={729} />
        <SketchLine x1={226} y1={778} x2={226} y2={884} at={0.16} dur={0.35} stroke={C.fg} strokeWidth={4} seed={731} />
        <SketchLine x1={522} y1={778} x2={522} y2={884} at={0.16} dur={0.35} stroke={C.fg} strokeWidth={4} seed={733} />

        {/* walking highlight on the road */}
        {frame > 9.0 * 30
          ? Array.from({length: 15}).map((_, i) => (
              <SketchLine
                key={`red-${i}`}
                x1={600 + i * 48}
                y1={884}
                x2={632 + i * 48}
                y2={884}
                at={9.05 + i * 0.02}
                dur={0.18}
                stroke={C.red}
                strokeWidth={5}
                roughness={0.7}
                seed={861 + i}
              />
            ))
          : null}

        <Hourglass x={960} y={620} h={96} color={C.red} at={11.9} />
      </Canvas>

      <Label x={370} y={282} size={46} color={C.muted} at={0.35}>
        the kitchen
      </Label>
      <Label x={1520} y={252} size={46} color={C.muted} at={1.7}>
        the storeroom
      </Label>

      <Label x={960} y={730} size={46} color={C.orange} at={6.8} opacity={biteFade}>
        every bite, one lap
      </Label>

      <Label x={960} y={760} size={44} color={C.green} at={9.95} opacity={chopFade}>
        chop: instant
      </Label>
      <Label x={960} y={760} size={46} color={C.red} at={11.9}>
        walking: all day
      </Label>
    </SceneShell>
  );
};

const SketchArrowLocal: React.FC<{at: number}> = () => null;
