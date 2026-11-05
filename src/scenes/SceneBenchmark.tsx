import React from 'react';
import {C} from '../theme';
import {Canvas, SceneShell} from '../components/SceneShell';
import {Label, SketchArrow, SketchCircle, SketchLine, SketchPath, SketchRect} from '../components/Sketch';
import {ChatBubble, SvgLabel, Token} from '../components/Objects';

export const SceneWorkload: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  return (
    <SceneShell durationInFrames={durationInFrames} ground>
      <Canvas>
        <SketchRect x={220} y={330} w={400} h={300} rx={12} at={0.2} dur={0.5} stroke={C.cyan} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={5901} />
        <SvgLabel x={420} y={382} size={30} color={C.cyan}>unique</SvgLabel>
        <Token x={420} y={470} text="new" size={34} color={C.cyan} fill={C.well} at={1.0} dur={0.35} />
        <SvgLabel x={420} y={570} size={26} color={C.muted}>starts from zero</SvgLabel>

        <SketchRect x={760} y={330} w={400} h={300} rx={12} at={0.5} dur={0.5} stroke={C.green} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={5903} />
        <SvgLabel x={960} y={382} size={30} color={C.green}>shared prefix</SvgLabel>
        <Token x={840} y={470} text="same" size={26} color={C.green} fill={C.well} at={1.4} dur={0.3} />
        <Token x={960} y={470} text="same" size={26} color={C.green} fill={C.well} at={1.5} dur={0.3} />
        <Token x={1080} y={470} text="diff" size={26} color={C.yellow} fill={C.well} at={1.6} dur={0.3} />
        <SvgLabel x={960} y={570} size={26} color={C.muted}>cache absorbs the front</SvgLabel>

        <SketchRect x={1300} y={330} w={400} h={300} rx={12} at={0.8} dur={0.5} stroke={C.red} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={5905} />
        <SvgLabel x={1500} y={382} size={30} color={C.red}>random</SvgLabel>
        <SvgLabel x={1500} y={490} size={64} color={C.red}>?</SvgLabel>
        <SvgLabel x={1500} y={570} size={26} color={C.muted}>traffic nobody has</SvgLabel>

        <SketchRect x={400} y={676} w={1120} h={92} rx={10} at={15.0} dur={0.4} stroke={C.panel} fill={C.surface} fillStyle="solid" strokeWidth={3} seed={5911} />
        <SvgLabel x={640} y={722} size={30} color={C.muted} at={20.0}>replay real sessions</SvgLabel>
        <SketchPath d="M 900 720 Q 980 680 1060 720" at={16.0} dur={0.4} stroke={C.green} strokeWidth={4} seed={5913} />
        <SvgLabel x={980} y={748} size={24} color={C.green} at={21.0}>in order</SvgLabel>
        <SvgLabel x={1240} y={722} size={28} color={C.red} at={26.0}>50 chats → fake hits</SvgLabel>
      </Canvas>
      <Label x={960} y={230} size={48} color={C.fg} at={0.3}>
        what workload?
      </Label>
    </SceneShell>
  );
};

export const SceneLoadHeadline: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  return (
    <SceneShell durationInFrames={durationInFrames} ground>
      <Canvas>
        <SketchRect x={300} y={340} w={620} h={360} rx={12} at={0.2} dur={0.5} stroke={C.panel} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={6001} />
        <SvgLabel x={580} y={392} size={30} color={C.muted}>target vs actual</SvgLabel>
        <SvgLabel x={360} y={460} size={28} color={C.muted} anchor="start">target</SvgLabel>
        <SketchRect x={500} y={440} w={320} h={38} rx={5} at={0.8} dur={0.4} stroke={C.green} fill={C.green} fillStyle="solid" strokeWidth={3} seed={6003} />
        <SvgLabel x={870} y={460} size={28} color={C.green}>2000</SvgLabel>
        <SvgLabel x={360} y={530} size={28} color={C.muted} anchor="start">actual</SvgLabel>
        <SketchRect x={500} y={510} w={176} h={38} rx={5} at={1.4} dur={0.4} stroke={C.orange} fill={C.orange} fillStyle="solid" strokeWidth={3} seed={6005} />
        <SvgLabel x={740} y={530} size={28} color={C.orange}>1100</SvgLabel>
        <SvgLabel x={580} y={620} size={30} color={C.red}>the generator fell behind</SvgLabel>

        <SketchRect x={1050} y={340} w={570} h={360} rx={12} at={7.0} dur={0.5} stroke={C.purple} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={6011} />
        <SketchCircle cx={1335} cy={500} r={96} at={7.4} dur={0.5} stroke={C.green} strokeWidth={22} seed={6013} />
        <SvgLabel x={1335} y={490} size={64} color={C.green}>97%</SvgLabel>
        <SvgLabel x={1335} y={550} size={26} color={C.muted}>input</SvgLabel>
        <SvgLabel x={1335} y={640} size={28} color={C.muted}>mostly cache hits</SvgLabel>
      </Canvas>
      <Label x={960} y={240} size={48} color={C.fg} at={0.3}>
        report both numbers
      </Label>
      <Label x={1335} y={752} size={30} color={C.yellow} at={22.0}>
        say which one you mean
      </Label>
    </SceneShell>
  );
};

export const ScenePercentiles: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  const pts = [520, 500, 540, 480, 560, 520, 620, 490, 580, 520];
  const path = `M 400 600 ` + pts.map((y, i) => `L ${420 + i * 46} ${y}`).join(' ');
  return (
    <SceneShell durationInFrames={durationInFrames} ground>
      <Canvas>
        <SketchRect x={280} y={330} w={620} h={370} rx={12} at={0.2} dur={0.5} stroke={C.panel} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={6101} />
        <SketchLine x1={360} y1={390} x2={360} y2={660} at={0.5} dur={0.4} stroke={C.fg} strokeWidth={4} seed={6103} />
        <SketchLine x1={360} y1={660} x2={840} y2={660} at={0.6} dur={0.4} stroke={C.fg} strokeWidth={4} seed={6105} />
        <SketchPath d={path} at={1.2} dur={0.8} stroke={C.orange} strokeWidth={4} seed={6111} />
        <SketchLine x1={360} y1={500} x2={840} y2={500} at={3.0} dur={0.4} stroke={C.red} strokeWidth={3} seed={6113} />
        <SvgLabel x={820} y={480} size={26} color={C.red} anchor="end" at={3.0}>P99</SvgLabel>
        <SvgLabel x={590} y={716} size={30} color={C.red} at={3.2}>noisy on small samples</SvgLabel>

        <SketchRect x={1030} y={330} w={600} h={370} rx={12} at={4.0} dur={0.5} stroke={C.panel} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={6121} />
        <SvgLabel x={1330} y={382} size={30} color={C.cyan} at={17.0}>one change at a time</SvgLabel>
        <SketchLine x1={1100} y1={470} x2={1560} y2={470} at={5.0} dur={0.3} stroke={C.panel} strokeWidth={5} seed={6123} />
        <SketchCircle cx={1440} cy={470} r={14} at={5.2} dur={0.2} stroke={C.cyan} fill={C.cyan} fillStyle="solid" strokeWidth={3} seed={6125} />
        <SvgLabel x={1100} y={470} size={26} color={C.muted} anchor="end">batch</SvgLabel>
        <SvgLabel x={1330} y={590} size={28} color={C.muted} at={22.0}>warm up · repeat · report spread</SvgLabel>
        <SvgLabel x={1330} y={640} size={28} color={C.muted} at={26.0}>read settings back</SvgLabel>

        <SketchRect x={650} y={736} w={640} h={72} rx={8} at={26.0} dur={0.4} stroke={C.yellow} fill={C.surface} fillStyle="solid" strokeWidth={3} seed={6131} />
        <SvgLabel x={970} y={772} size={28} color={C.yellow} at={26.0}>fastconfig_v3_final</SvgLabel>
        <SketchLine x1={760} y1={752} x2={1180} y2={792} at={28.0} dur={0.3} stroke={C.red} strokeWidth={5} seed={6133} />
        <SvgLabel x={970} y={836} size={26} color={C.green} at={29.0}>ask the server what it is running</SvgLabel>
      </Canvas>
      <Label x={960} y={240} size={48} color={C.fg} at={0.3}>
        control the environment
      </Label>
    </SceneShell>
  );
};

export const SceneAccuracy: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  return (
    <SceneShell durationInFrames={durationInFrames} ground>
      <Canvas>
        <ServerCard x={260} y={330} name="A" at={0.2} />
        <ServerCard x={1260} y={330} name="B" at={0.4} />
        <SketchRect x={760} y={360} w={400} h={160} rx={12} at={5.0} dur={0.4} stroke={C.yellow} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={6201} />
        <SvgLabel x={960} y={405} size={30} color={C.yellow} at={5.0}>same tests</SvgLabel>
        <SvgLabel x={960} y={460} size={30} color={C.yellow} at={5.2}>same day</SvgLabel>
        <SvgLabel x={960} y={500} size={26} color={C.muted} at={5.4}>several skills</SvgLabel>

        <SketchLine x1={500} y1={760} x2={1420} y2={760} at={26.0} dur={0.5} stroke={C.fg} strokeWidth={4} seed={6211} />
        <SketchLine x1={500} y1={760} x2={500} y2={690} at={26.3} dur={0.3} stroke={C.fg} strokeWidth={4} seed={6213} />
        <SketchRect x={680} y={680} w={120} h={80} rx={5} at={27.0} dur={0.3} stroke={C.green} fill={C.green} fillStyle="solid" strokeWidth={3} seed={6215} />
        <SketchRect x={980} y={700} w={120} h={60} rx={5} at={27.4} dur={0.3} stroke={C.green} fill={C.green} fillStyle="solid" strokeWidth={3} seed={6217} />
        <SketchLine x1={740} y1={680} x2={740} y2={630} at={28.0} dur={0.3} stroke={C.yellow} strokeWidth={4} seed={6221} />
        <SketchLine x1={740} y1={630} x2={820} y2={630} at={28.2} dur={0.2} stroke={C.yellow} strokeWidth={4} seed={6223} />
        <SketchLine x1={1040} y1={700} x2={1040} y2={650} at={28.6} dur={0.3} stroke={C.yellow} strokeWidth={4} seed={6225} />
        <SketchLine x1={1040} y1={650} x2={1120} y2={650} at={28.8} dur={0.2} stroke={C.yellow} strokeWidth={4} seed={6227} />
        <SvgLabel x={960} y={820} size={34} color={C.yellow} at={26.0}>error bars overlap zero</SvgLabel>

        <SketchRect x={540} y={545} w={840} h={70} rx={10} at={37.0} dur={0.4} stroke={C.green} fill={C.well} fillStyle="solid" strokeWidth={4} seed={6231} />
        <SvgLabel x={960} y={583} size={34} color={C.green}>no measurable difference</SvgLabel>
      </Canvas>
      <Label x={960} y={240} size={48} color={C.fg} at={0.3}>
        speed + accuracy
      </Label>
    </SceneShell>
  );
};

const ServerCard: React.FC<{x: number; y: number; name: string; at: number}> = ({x, y, name, at}) => (
  <g>
    <SketchRect x={x} y={y} w={400} h={150} rx={10} at={at} dur={0.4} stroke={C.cyan} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={6241 + x} />
    <SvgLabel x={x + 200} y={y + 56} size={32} color={C.cyan} at={at}>{`server ${name}`}</SvgLabel>
    <SvgLabel x={x + 200} y={y + 108} size={26} color={C.muted} at={at + 0.1}>same workload</SvgLabel>
  </g>
);
