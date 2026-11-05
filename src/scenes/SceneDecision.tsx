import React from 'react';
import {C} from '../theme';
import {Canvas, SceneShell} from '../components/SceneShell';
import {Label, SketchArrow, SketchRect} from '../components/Sketch';
import {SvgLabel} from '../components/Objects';

const Node: React.FC<{x: number; y: number; w: number; h: number; text: string; color: string; at: number; size?: number}> = ({x, y, w, h, text, color, at, size = 40}) => (
  <g>
    <SketchRect x={x} y={y} w={w} h={h} rx={12} at={at} dur={0.45} stroke={color} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={3501 + x + y} />
    <SvgLabel x={x + w / 2} y={y + h / 2 + 2} size={size} color={color} at={at}>{text}</SvgLabel>
  </g>
);

export const SceneDecision: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  return (
    <SceneShell durationInFrames={durationInFrames} ground>
      <Canvas>
        <Node x={760} y={230} w={400} h={82} text="fits on one GPU?" color={C.yellow} at={0.3} />
        <SketchArrow x1={880} y1={312} x2={470} y2={436} at={1.8} dur={0.5} color={C.green} strokeWidth={4} />
        <SketchArrow x1={1040} y1={312} x2={1410} y2={436} at={3.2} dur={0.5} color={C.red} strokeWidth={4} />
        <SvgLabel x={700} y={390} size={32} color={C.green}>yes</SvgLabel>
        <SvgLabel x={1220} y={390} size={32} color={C.red}>no</SvgLabel>

        <Node x={260} y={440} w={380} h={90} text="one GPU + copies" color={C.green} at={2.0} />
        <Node x={1190} y={440} w={460} h={90} text="fits in one machine?" color={C.yellow} at={3.4} />

        <SketchArrow x1={1330} y1={530} x2={1060} y2={644} at={7.0} dur={0.5} color={C.cyan} strokeWidth={4} />
        <SketchArrow x1={1470} y1={530} x2={1530} y2={644} at={10.2} dur={0.4} color={C.purple} strokeWidth={4} />
        <SvgLabel x={1110} y={560} size={30} color={C.cyan}>yes</SvgLabel>
        <SvgLabel x={1560} y={600} size={30} color={C.purple}>no</SvgLabel>

        <Node x={840} y={650} w={340} h={82} text="tensor parallel" color={C.cyan} at={7.2} />
        <Node x={1310} y={650} w={440} h={82} text="pipeline across machines" color={C.purple} at={10.4} size={30} />

        <Node x={260} y={700} w={380} h={82} text="MoE: expert parallel" color={C.orange} at={17.4} size={34} />
        <SvgLabel x={450} y={666} size={30} color={C.orange}>if MoE</SvgLabel>
      </Canvas>

      <Label x={960} y={180} size={50} color={C.fg} at={0.25}>
        choose a split
      </Label>
    </SceneShell>
  );
};
