import React from 'react';
import {C} from '../theme';
import {Canvas, SceneShell} from '../components/SceneShell';
import {Label, SketchArrow, SketchLine, SketchPath, SketchRect} from '../components/Sketch';
import {KVGrid, SvgLabel} from '../components/Objects';

export const SceneKVBudget: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  return (
    <SceneShell durationInFrames={durationInFrames} ground>
      <Canvas>
        <SketchRect x={300} y={320} w={1320} h={120} rx={12} at={0.2} dur={0.5} stroke={C.fg} fill={C.well} fillStyle="solid" strokeWidth={4} seed={3701} />
        <SketchRect x={312} y={332} w={900} h={96} rx={8} at={0.5} dur={0.6} stroke={C.orange} fill={C.panel} fillStyle="solid" strokeWidth={3} seed={3703} />
        <SketchRect x={1224} y={332} w={384} h={96} rx={8} at={5.0} dur={0.5} stroke={C.green} fill={C.panel} fillStyle="solid" strokeWidth={3} seed={3705} />
        <SvgLabel x={760} y={380} size={42} color={C.orange} at={0.5}>weights</SvgLabel>
        <SvgLabel x={1416} y={380} size={42} color={C.green} at={5.0}>KV budget</SvgLabel>
        <SketchPath d="M 1224 300 L 1224 286 L 1608 286 L 1608 300" at={5.2} dur={0.4} stroke={C.green} strokeWidth={4} seed={3707} />
        <SvgLabel x={1416} y={252} size={36} color={C.green} at={5.2}>what’s left</SvgLabel>

        <KVGrid x={690} y={560} cols={10} rows={5} cell={34} gap={8} usedRows={3} activeRow={1} color={C.cyan} highlight={C.purple} at={8.2} dur={0.8} showLabel={false} />
        <SvgLabel x={960} y={492} size={44} color={C.cyan} at={8.2}>KV cache = working memory</SvgLabel>

        <SketchArrow x1={700} y1={800} x2={440} y2={800} at={14.0} dur={0.4} color={C.purple} strokeWidth={4} />
        <SketchArrow x1={1220} y1={800} x2={1480} y2={800} at={16.0} dur={0.4} color={C.purple} strokeWidth={4} />
        <SvgLabel x={340} y={820} size={38} color={C.purple} at={14.0}>more users</SvgLabel>
        <SvgLabel x={1580} y={820} size={38} color={C.purple} at={16.0}>longer chats</SvgLabel>

        <g>
          <SketchRect x={1330} y={560} w={290} h={150} rx={10} at={20.0} dur={0.4} stroke={C.yellow} fill={C.surface} fillStyle="solid" strokeWidth={3} seed={3711} />
          <SketchRect x={1360} y={636} w={80} h={42} rx={5} at={20.2} dur={0.3} stroke={C.red} fill={C.panel} fillStyle="solid" strokeWidth={3} seed={3713} />
          <SketchRect x={1455} y={606} w={80} h={72} rx={5} at={20.4} dur={0.3} stroke={C.green} fill={C.panel} fillStyle="solid" strokeWidth={3} seed={3715} />
          <SvgLabel x={1475} y={736} size={34} color={C.yellow} at={20.0}>2× room</SvgLabel>
        </g>
      </Canvas>

      <Label x={960} y={210} size={46} color={C.fg} at={0.3}>
        one more number
      </Label>
    </SceneShell>
  );
};
