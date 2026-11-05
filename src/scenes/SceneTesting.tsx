import React from 'react';
import {C} from '../theme';
import {Canvas, SceneShell} from '../components/SceneShell';
import {Label, SketchArrow, SketchCircle, SketchLine, SketchRect} from '../components/Sketch';
import {ChatBubble, SvgLabel} from '../components/Objects';
import {FadeGroup} from '../components/Sketch';

export const SceneShape: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  const lines = [
    {t: '{', c: C.muted, y: 360},
    {t: '  "answer": "the cat sat",', c: C.fg, y: 414},
    {t: '  "field": null,', c: C.red, y: 468, flag: 'fields', at: 4.5},
    {t: '  "thinking": "let me...",', c: C.red, y: 522, flag: 'leaks', at: 6.6},
    {t: '  "tool_call": { ... }', c: C.red, y: 576, flag: 'tool calls', at: 8.9},
    {t: '}', c: C.muted, y: 630},
  ];
  return (
    <SceneShell durationInFrames={durationInFrames} ground>
      <Canvas>
        <SketchRect x={380} y={310} w={1040} h={390} rx={12} at={0.2} dur={0.5} stroke={C.panel} fill={C.well} fillStyle="solid" strokeWidth={4} seed={6301} />
        {lines.map((l, i) => (
          <text key={i} x={440} y={l.y} fill={l.c} fontFamily="'DejaVu Sans Mono', monospace" fontSize={30} dominantBaseline="middle">
            {l.t}
          </text>
        ))}
        {lines.filter((l) => l.flag).map((l) => (
          <g key={l.flag}>
            <SketchArrow x1={800} y1={l.y} x2={1360} y2={l.y} at={l.at} dur={0.3} color={C.red} strokeWidth={3} head={9} />
            <SvgLabel x={1510} y={l.y} size={28} color={C.red} at={l.at}>{l.flag}</SvgLabel>
          </g>
        ))}
      </Canvas>
      <Label x={960} y={240} size={48} color={C.yellow} at={0.3} font="marker" weight={700}>
        test the shape
      </Label>
    </SceneShell>
  );
};

export const SceneRepeat: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  return (
    <SceneShell durationInFrames={durationInFrames} ground>
      <Canvas>
        <SketchRect x={240} y={330} w={660} h={390} rx={12} at={0.2} dur={0.5} stroke={C.red} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={6401} />
        <SvgLabel x={570} y={382} size={30} color={C.red} at={0.2}>repetition</SvgLabel>
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <SketchRect x={280} y={420 + i * 58} w={580} h={38} rx={5} at={0.6 + i * 0.12} dur={0.25} stroke={C.panel} fill={C.well} fillStyle="solid" strokeWidth={2.5} seed={6410 + i} />
            <SvgLabel x={310} y={439 + i * 58} size={22} color={C.muted} anchor="start" at={0.6 + i * 0.12}>the cat sat on the mat…</SvgLabel>
          </g>
        ))}
        <SvgLabel x={570} y={680} size={40} color={C.red} at={7.5}>×8, then stops</SvgLabel>

        <SketchRect x={1040} y={330} w={640} h={390} rx={12} at={11.0} dur={0.5} stroke={C.yellow} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={6421} />
        <SvgLabel x={1360} y={382} size={30} color={C.yellow} at={11.0}>many turns</SvgLabel>
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <ChatBubble x={1120 + (i % 2) * 220} y={420 + i * 64} w={190} h={50} at={11.4 + i * 0.2} color={i === 0 ? C.red : C.yellow} fill={C.well} tail={i % 2 === 0 ? 'left' : 'right'}>
              <SvgLabel x={1215 + (i % 2) * 220} y={445 + i * 64} size={24} color={i === 0 ? C.red : C.yellow}>turn {i + 1}</SvgLabel>
            </ChatBubble>
            <SvgLabel x={1075} y={445 + i * 64} size={22} color={C.green} at={11.4 + i * 0.2}>shield</SvgLabel>
          </g>
        ))}
        <SvgLabel x={1360} y={690} size={26} color={C.muted} at={20.5}>test whole conversations</SvgLabel>
      </Canvas>
      <Label x={960} y={240} size={48} color={C.fg} at={0.3}>
        two hidden failures
      </Label>
    </SceneShell>
  );
};

export const SceneFlaky: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  const bad = [3, 11, 17];
  return (
    <SceneShell durationInFrames={durationInFrames} ground>
      <Canvas>
        <SketchRect x={250} y={330} w={620} h={400} rx={12} at={0.2} dur={0.5} stroke={C.orange} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={6501} />
        <SvgLabel x={560} y={382} size={30} color={C.orange} at={0.2}>run 20 times</SvgLabel>
        {Array.from({length: 20}).map((_, i) => {
          const col = i % 5;
          const row = Math.floor(i / 5);
          const isBad = bad.includes(i);
          return <SketchCircle key={i} cx={360 + col * 95} cy={450 + row * 62} r={15} at={0.6 + i * 0.05} dur={0.2} stroke={isBad ? C.red : C.green} fill={isBad ? C.red : C.green} fillStyle="solid" strokeWidth={3} seed={6510 + i} />;
        })}
        <SvgLabel x={560} y={680} size={38} color={C.red} at={6.5}>3 / 20 = 15%</SvgLabel>

        <SketchRect x={1070} y={330} w={620} h={400} rx={12} at={10.5} dur={0.5} stroke={C.panel} fill={C.well} fillStyle="solid" strokeWidth={4} seed={6521} />
        <SvgLabel x={1380} y={382} size={30} color={C.cyan} at={10.5}>run_tests.sh</SvgLabel>
        <FadeGroup at={10.5} dur={0.4} y={0}>
          <text x={1120} y={450} fill={C.green} fontFamily="'DejaVu Sans Mono', monospace" fontSize={26}>PASS  structured</text>
          <text x={1120} y={500} fill={C.green} fontFamily="'DejaVu Sans Mono', monospace" fontSize={26}>PASS  tool_call</text>
          <text x={1120} y={550} fill={C.red} fontFamily="'DejaVu Sans Mono', monospace" fontSize={26}>FAIL  fields</text>
        </FadeGroup>
        <SketchLine x1={1110} y1={585} x2={1610} y2={585} at={11.5} dur={0.3} stroke={C.panel} strokeWidth={3} seed={6531} />
        <SvgLabel x={1380} y={646} size={30} color={C.red} at={17.0}>exit 1</SvgLabel>
        <SvgLabel x={1380} y={706} size={26} color={C.muted} at={17.0}>one file, clear fail</SvgLabel>
      </Canvas>
      <Label x={960} y={240} size={48} color={C.fg} at={0.3}>
        flaky failures
      </Label>
    </SceneShell>
  );
};

const five = [
  'work out the memory limit',
  'profile on day one',
  'batch and cache first',
  'find the equation',
  'back speed with accuracy',
];

export const SceneFiveA: React.FC<{durationInFrames: number}> = ({durationInFrames}) => (
  <SceneShell durationInFrames={durationInFrames} ground>
    <Canvas>
      {five.slice(0, 3).map((t, i) => (
        <FiveRow key={t} y={300 + i * 86} n={i + 1} text={t} at={3.2 + i * 7.6} />
      ))}
    </Canvas>
    <Label x={960} y={230} size={46} color={C.muted} at={0.3}>
      if we remember five things
    </Label>
  </SceneShell>
);

export const SceneFiveB: React.FC<{durationInFrames: number}> = ({durationInFrames}) => (
  <SceneShell durationInFrames={durationInFrames} ground>
    <Canvas>
      {five.map((t, i) => (
        <FiveRow key={t} y={300 + i * 86} n={i + 1} text={t} at={i < 3 ? 0.2 : 0.6 + (i - 3) * 7.6} />
      ))}
      <FadeGroup at={17.2} dur={0.4} y={0}>
        <SvgLabel x={960} y={742} size={34} color={C.muted}>a dozen will do nothing</SvgLabel>
      </FadeGroup>
      <FadeGroup at={24.0} dur={0.4} y={0}>
        <SvgLabel x={960} y={796} size={40} color={C.green}>go measure the speed limit</SvgLabel>
      </FadeGroup>
    </Canvas>
    <Label x={960} y={230} size={46} color={C.muted} at={0.3}>
      five things
    </Label>
  </SceneShell>
);

const FiveRow: React.FC<{y: number; n: number; text: string; at: number}> = ({y, n, text, at}) => (
  <g>
    <SketchRect x={430} y={y} w={1040} h={68} rx={10} at={at} dur={0.4} stroke={C.panel} fill={C.surface} fillStyle="solid" strokeWidth={3} seed={6600 + n} />
    <SketchCircle cx={485} cy={y + 34} r={22} at={at + 0.15} dur={0.25} stroke={C.green} fill={C.well} fillStyle="solid" strokeWidth={3} seed={6610 + n} />
    <SvgLabel x={485} y={y + 36} size={28} color={C.green} at={at + 0.15}>{n}</SvgLabel>
    <SvgLabel x={540} y={y + 36} size={36} color={C.fg} anchor="start" at={at + 0.15}>{text}</SvgLabel>
  </g>
);
