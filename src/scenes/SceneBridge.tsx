import React from 'react';
import {C} from '../theme';
import {Canvas, SceneShell} from '../components/SceneShell';
import {Label, SketchLine, SketchRect} from '../components/Sketch';
import {Chip, SvgLabel, Token} from '../components/Objects';
import {Figure} from '../components/Figure';

export const SceneBridge: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  return (
    <SceneShell durationInFrames={durationInFrames} ground={false}>
      <Canvas>
        {/* compact kitchen */}
        <SketchLine x1={240} y1={430} x2={620} y2={430} at={0.1} dur={0.45} stroke={C.fg} strokeWidth={4} seed={1701} />
        <SketchLine x1={240} y1={430} x2={240} y2={800} at={0.16} dur={0.45} stroke={C.fg} strokeWidth={4} seed={1703} />
        <SketchLine x1={620} y1={430} x2={620} y2={800} at={0.2} dur={0.45} stroke={C.fg} strokeWidth={4} seed={1705} />
        <SketchLine x1={240} y1={800} x2={620} y2={800} at={0.25} dur={0.45} stroke={C.panel} strokeWidth={4} seed={1707} />
        <SketchLine x1={276} y1={548} x2={408} y2={548} at={0.3} dur={0.35} stroke={C.muted} strokeWidth={4} seed={1709} />
        <SketchRect x={290} y={510} w={38} h={38} rx={5} at={0.4} dur={0.3} stroke={C.orange} fill={C.surface} fillStyle="solid" strokeWidth={3} seed={1711} />
        <SketchRect x={344} y={518} w={32} h={30} rx={5} at={0.44} dur={0.3} stroke={C.green} fill={C.surface} fillStyle="solid" strokeWidth={3} seed={1713} />
        <SketchRect x={448} y={712} w={76} h={44} rx={8} at={0.5} dur={0.35} stroke={C.fg} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={1715} />
        <SketchLine x1={448} y1={724} x2={524} y2={724} at={0.54} dur={0.25} stroke={C.fg} strokeWidth={3.5} seed={1717} />
        <SketchLine x1={430} y1={760} x2={546} y2={760} at={0.4} dur={0.35} stroke={C.fg} strokeWidth={5} seed={1719} />
        <Figure x={380} y={800} scale={0.62} pose="stand" hat="chef" at={0.55} dur={0.7} />

        {/* chip */}
        <Chip x={1280} y={460} size={260} label="GPU" color={C.cyan} at={1.2} dur={0.8} active />
        <SketchLine x1={1550} y1={590} x2={1618} y2={590} at={2.0} dur={0.3} stroke={C.green} strokeWidth={4} seed={1721} />
        <Token x={1682} y={590} text="word" size={34} color={C.green} fill={C.surface} at={2.15} dur={0.4} />

        {/* equals + road */}
        <SvgLabel x={960} y={590} size={104} color={C.yellow} at={2.7}>=</SvgLabel>
        {Array.from({length: 9}).map((_, i) => (
          <SketchLine key={i} x1={640 + i * 70} y1={800} x2={670 + i * 70} y2={800} at={2.4 + i * 0.04} dur={0.2} stroke={C.panel} strokeWidth={5} seed={1731 + i} />
        ))}
      </Canvas>

      <Label x={430} y={382} size={40} color={C.muted} at={0.5}>
        the kitchen
      </Label>
      <Label x={960} y={738} size={46} color={C.yellow} at={2.7}>
        same story
      </Label>
    </SceneShell>
  );
};
