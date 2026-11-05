import React from 'react';
import {C} from '../theme';
import {Canvas, SceneShell} from '../components/SceneShell';
import {Label, SketchArrow, SketchLine, SketchPath, SketchRect} from '../components/Sketch';
import {KVGrid, SvgLabel} from '../components/Objects';

export const ScenePrefix: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  return (
    <SceneShell durationInFrames={durationInFrames} ground>
      <Canvas>
        {Array.from({length: 10}).map((_, i) => (
          <g key={i}>
            <SketchRect
              x={280}
              y={300 + i * 46}
              w={210}
              h={36}
              rx={6}
              at={0.4 + i * 0.08}
              dur={0.25}
              stroke={i < 9 ? C.cyan : C.yellow}
              fill={i < 9 ? C.surface : C.panel}
              fillStyle="solid"
              strokeWidth={i < 9 ? 3 : 4}
              seed={4701 + i}
            />
            <SvgLabel x={320} y={319 + i * 46} size={24} color={i < 9 ? C.muted : C.yellow}>turn {i + 1}</SvgLabel>
          </g>
        ))}
        <SketchPath d="M 260 300 L 236 300 L 236 748 L 260 748" at={2.0} dur={0.5} stroke={C.cyan} strokeWidth={4} seed={4721} />
        <SvgLabel x={400} y={272} size={30} color={C.cyan}>first 9 turns</SvgLabel>

        <SketchArrow x1={510} y1={524} x2={720} y2={524} at={7.0} dur={0.5} color={C.cyan} strokeWidth={4} />
        <KVGrid x={760} y={430} cols={8} rows={5} cell={30} gap={7} usedRows={4} color={C.green} highlight={C.yellow} at={7.0} dur={0.8} showLabel={false} />
        <SvgLabel x={940} y={380} size={36} color={C.green}>KV cache</SvgLabel>
        <SvgLabel x={940} y={712} size={38} color={C.green} at={15.0}>cache hit</SvgLabel>
      </Canvas>
      <Label x={960} y={220} size={50} color={C.cyan} at={0.3}>
        prefix cache
      </Label>
    </SceneShell>
  );
};

export const ScenePromptOrder: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  return (
    <SceneShell durationInFrames={durationInFrames} ground>
      <Canvas>
        <SketchRect x={420} y={300} w={760} h={460} rx={12} at={0.2} dur={0.5} stroke={C.fg} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={4801} />
        <SketchRect x={460} y={336} w={680} h={76} rx={8} at={0.8} dur={0.4} stroke={C.red} fill={C.well} fillStyle="solid" strokeWidth={3} seed={4803} />
        <SvgLabel x={800} y={374} size={32} color={C.red}>timestamp 10:42</SvgLabel>
        <SketchLine x1={480} y1={352} x2={740} y2={396} at={5.2} dur={0.25} stroke={C.red} strokeWidth={6} seed={4805} />
        <SketchLine x1={740} y1={352} x2={480} y2={396} at={5.25} dur={0.25} stroke={C.red} strokeWidth={6} seed={4807} />

        <SketchRect x={460} y={444} w={680} h={90} rx={8} at={1.4} dur={0.4} stroke={C.green} fill={C.well} fillStyle="solid" strokeWidth={3} seed={4811} />
        <SvgLabel x={800} y={489} size={32} color={C.green}>system prompt</SvgLabel>
        <SketchRect x={460} y={556} w={680} h={80} rx={8} at={2.0} dur={0.4} stroke={C.yellow} fill={C.well} fillStyle="solid" strokeWidth={3} seed={4813} />
        <SvgLabel x={800} y={596} size={30} color={C.yellow}>user turn</SvgLabel>
        <SketchRect x={460} y={658} w={680} h={64} rx={8} at={2.5} dur={0.4} stroke={C.orange} fill={C.well} fillStyle="solid" strokeWidth={3} seed={4815} />
        <SvgLabel x={800} y={690} size={30} color={C.orange}>question</SvgLabel>

        <SketchPath d="M 420 340 L 396 340 L 396 534 L 420 534" at={3.0} dur={0.4} stroke={C.green} strokeWidth={4} seed={4821} />
        <SvgLabel x={340} y={437} size={30} color={C.green} rotate={-90}>stable</SvgLabel>
        <SketchPath d="M 1200 556 L 1224 556 L 1224 722 L 1200 722" at={4.0} dur={0.4} stroke={C.yellow} strokeWidth={4} seed={4823} />
        <SvgLabel x={1270} y={639} size={30} color={C.yellow} rotate={90}>changes</SvgLabel>
      </Canvas>
      <Label x={960} y={220} size={50} color={C.fg} at={0.3}>
        order matters
      </Label>
      <Label x={960} y={838} size={36} color={C.red} at={5.6}>
        timestamp at the top = every request misses
      </Label>
    </SceneShell>
  );
};

export const SceneHitRate: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  return (
    <SceneShell durationInFrames={durationInFrames} ground>
      <Canvas>
        <SketchRect x={300} y={330} w={560} h={330} rx={12} at={0.2} dur={0.5} stroke={C.green} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={4901} />
        <SvgLabel x={580} y={430} size={72} color={C.green} font="marker">98%</SvgLabel>
        <SvgLabel x={580} y={500} size={32} color={C.muted}>cached</SvgLabel>
        <SketchRect x={360} y={560} w={440} h={40} rx={6} at={1.0} dur={0.4} stroke={C.green} fill={C.green} fillStyle="solid" strokeWidth={3} seed={4903} />
        <SketchRect x={800} y={560} w={20} h={40} rx={3} at={1.4} dur={0.3} stroke={C.red} fill={C.red} fillStyle="solid" strokeWidth={2} seed={4905} />
        <SvgLabel x={580} y={628} size={28} color={C.red}>2% uncached</SvgLabel>

        <SketchRect x={1060} y={330} w={560} h={330} rx={12} at={0.6} dur={0.5} stroke={C.green} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={4911} />
        <SvgLabel x={1340} y={430} size={72} color={C.green} font="marker">97%</SvgLabel>
        <SvgLabel x={1340} y={500} size={32} color={C.muted}>cached</SvgLabel>
        <SketchRect x={1120} y={560} w={420} h={40} rx={6} at={2.0} dur={0.4} stroke={C.green} fill={C.green} fillStyle="solid" strokeWidth={3} seed={4913} />
        <SketchRect x={1540} y={560} w={30} h={40} rx={3} at={2.4} dur={0.3} stroke={C.red} fill={C.red} fillStyle="solid" strokeWidth={2} seed={4915} />
        <SvgLabel x={1340} y={628} size={28} color={C.red}>3% uncached</SvgLabel>

        <SketchArrow x1={830} y1={700} x2={1520} y2={700} at={6.0} dur={0.6} color={C.red} strokeWidth={5} />
        <SvgLabel x={1175} y={748} size={36} color={C.red}>50% more uncached work</SvgLabel>
      </Canvas>
      <Label x={960} y={220} size={50} color={C.fg} at={0.3}>
        hit rate is not a dial
      </Label>
      <Label x={960} y={820} size={38} color={C.yellow} at={11.0}>
        watch the uncached work
      </Label>
    </SceneShell>
  );
};
