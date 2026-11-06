import React from 'react';
import {C} from '../theme';
import {Canvas, SceneShell} from '../components/SceneShell';
import {Label, SketchArrow, SketchLine, SketchRect} from '../components/Sketch';
import {ChatBubble, SvgLabel, Token} from '../components/Objects';

export const ScenePriorities: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  return (
    <SceneShell durationInFrames={durationInFrames} ground>
      <Canvas>
        <SketchRect x={220} y={350} w={430} h={360} rx={14} at={0.5} dur={0.5} stroke={C.cyan} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={2801} />
        <SketchRect x={745} y={350} w={430} h={360} rx={14} at={2.2} dur={0.5} stroke={C.green} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={2803} />
        <SketchRect x={1270} y={350} w={430} h={360} rx={14} at={3.8} dur={0.5} stroke={C.purple} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={2805} />

        {/* chat */}
        <ChatBubble x={300} y={420} w={270} h={92} at={0.7} color={C.cyan} fill={C.well} tail="left">
          <SvgLabel x={435} y={466} size={40} color={C.cyan} at={0.7}>hi</SvgLabel>
        </ChatBubble>
        <SvgLabel x={435} y={608} size={48} color={C.cyan} at={0.5}>chat</SvgLabel>
        <SvgLabel x={435} y={666} size={38} color={C.muted} at={0.9}>fast</SvgLabel>

        {/* batch */}
        <Token x={850} y={445} text="A" size={34} color={C.green} fill={C.well} at={2.4} dur={0.35} />
        <Token x={960} y={445} text="B" size={34} color={C.green} fill={C.well} at={2.55} dur={0.35} />
        <Token x={1070} y={445} text="C" size={34} color={C.green} fill={C.well} at={2.7} dur={0.35} />
        <SvgLabel x={960} y={548} size={64} color={C.green} at={2.6}>$</SvgLabel>
        <SvgLabel x={960} y={608} size={48} color={C.green} at={2.2}>batch</SvgLabel>
        <SvgLabel x={960} y={666} size={38} color={C.muted} at={2.4}>cost</SvgLabel>

        {/* agent */}
        <ChatBubble x={1330} y={370} w={190} h={56} at={4.0} color={C.purple} fill={C.well} tail="left">
          <SvgLabel x={1425} y={398} size={28} color={C.purple} at={4.0}>1</SvgLabel>
        </ChatBubble>
        <ChatBubble x={1330} y={452} w={190} h={56} at={4.2} color={C.purple} fill={C.well} tail="right">
          <SvgLabel x={1425} y={480} size={28} color={C.purple} at={4.2}>2</SvgLabel>
        </ChatBubble>
        <ChatBubble x={1330} y={534} w={190} h={56} at={4.4} color={C.purple} fill={C.well} tail="left">
          <SvgLabel x={1425} y={562} size={28} color={C.purple} at={4.4}>3</SvgLabel>
        </ChatBubble>
        <SketchArrow x1={1425} y1={426} x2={1425} y2={452} at={4.2} dur={0.2} color={C.purple} strokeWidth={5} head={12} />
        <SketchArrow x1={1425} y1={508} x2={1425} y2={534} at={4.4} dur={0.2} color={C.purple} strokeWidth={5} head={12} />
        <SvgLabel x={1490} y={634} size={44} color={C.purple} at={4.4}>agent</SvgLabel>
        <SvgLabel x={1490} y={690} size={36} color={C.muted} at={4.6}>every step</SvgLabel>

        {/* note */}
        <SketchRect x={690} y={760} w={540} h={86} rx={10} at={8.6} dur={0.4} stroke={C.yellow} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={2811} />
        <SvgLabel x={930} y={804} size={42} color={C.yellow} at={8.6}>write it down</SvgLabel>
        <SketchLine x1={1160} y1={790} x2={1178} y2={808} at={9.0} dur={0.2} stroke={C.green} strokeWidth={5} seed={2813} />
        <SketchLine x1={1178} y1={808} x2={1214} y2={766} at={9.1} dur={0.3} stroke={C.green} strokeWidth={6} seed={2815} />
      </Canvas>

      <Label x={960} y={250} size={54} color={C.fg} at={0.35}>
        who is it for?
      </Label>
    </SceneShell>
  );
};
