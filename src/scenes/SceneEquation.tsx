import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {Canvas, SceneShell} from '../components/SceneShell';
import {Label, SketchCircle, SketchLine, SketchPath, SketchRect} from '../components/Sketch';
import {SvgLabel} from '../components/Objects';

export const SceneEquation: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  const frame = useCurrentFrame();
  const graph = interpolate(frame, [15.5 * 30, 16.3 * 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <SceneShell durationInFrames={durationInFrames} ground>
      <Canvas>
        <SvgLabel x={590} y={300} size={60} color={C.fg} anchor="end" at={0.3}>speed =</SvgLabel>
        <SvgLabel x={760} y={300} size={60} color={C.cyan} at={0.3}>work</SvgLabel>
        <SvgLabel x={910} y={300} size={60} color={C.muted} at={0.3}>/</SvgLabel>
        <SvgLabel x={1050} y={300} size={60} color={C.orange} at={0.3}>time</SvgLabel>
        <SvgLabel x={960} y={372} size={40} color={C.muted} at={0.4}>work per cycle / time per cycle</SvgLabel>

        <SketchRect x={330} y={430} w={800} h={330} rx={12} at={1.0} dur={0.5} stroke={C.panel} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={4101} />
        <SketchLine x1={400} y1={470} x2={400} y2={720} at={1.3} dur={0.4} stroke={C.fg} strokeWidth={4} seed={4103} />
        <SketchLine x1={400} y1={720} x2={1080} y2={720} at={1.4} dur={0.4} stroke={C.fg} strokeWidth={4} seed={4105} />
        <SketchLine x1={500} y1={600} x2={1000} y2={500} at={16.0} dur={0.6} stroke={C.cyan} strokeWidth={4} seed={4111} />
        <SketchCircle cx={500} cy={600} r={9} at={16.2} dur={0.25} stroke={C.cyan} fill={C.cyan} fillStyle="solid" strokeWidth={3} seed={4113} />
        <SketchCircle cx={1000} cy={500} r={9} at={16.3} dur={0.25} stroke={C.cyan} fill={C.cyan} fillStyle="solid" strokeWidth={3} seed={4115} />
        <SketchCircle cx={750} cy={550} r={11} at={18.2} dur={0.3} stroke={C.green} fill={C.green} fillStyle="solid" strokeWidth={3} seed={4117} />
        <SvgLabel x={500} y={746} size={30} color={C.muted} at={16.0}>4</SvgLabel>
        <SvgLabel x={750} y={746} size={30} color={C.green} at={16.0}>6</SvgLabel>
        <SvgLabel x={1000} y={746} size={30} color={C.muted} at={16.0}>8</SvgLabel>
        <SvgLabel x={730} y={670} size={30} color={C.green} at={18.2}>predict 6</SvgLabel>
        <SvgLabel x={860} y={406} size={30} color={C.muted} at={0.4}>speed</SvgLabel>

        <SketchRect x={1230} y={430} w={420} h={260} rx={12} at={12.5} dur={0.5} stroke={C.panel} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={4121} />
        <SvgLabel x={1440} y={470} size={30} color={C.muted} at={12.5}>one setting at a time</SvgLabel>
        <SketchLine x1={1280} y1={530} x2={1580} y2={530} at={13.0} dur={0.3} stroke={C.panel} strokeWidth={5} seed={4123} />
        <SketchCircle cx={1480} cy={530} r={13} at={13.1} dur={0.2} stroke={C.cyan} fill={C.cyan} fillStyle="solid" strokeWidth={3} seed={4125} />
        <SvgLabel x={1250} y={530} size={28} color={C.muted} anchor="end" at={13.0}>batch</SvgLabel>
        <SketchLine x1={1280} y1={610} x2={1580} y2={610} at={13.6} dur={0.3} stroke={C.panel} strokeWidth={5} seed={4127} />
        <SketchCircle cx={1380} cy={610} r={13} at={13.7} dur={0.2} stroke={C.orange} fill={C.orange} fillStyle="solid" strokeWidth={3} seed={4129} />
        <SvgLabel x={1250} y={610} size={28} color={C.muted} anchor="end" at={13.6}>precision</SvgLabel>
      </Canvas>

      <Label x={960} y={210} size={46} color={C.fg} at={0.3}>
        find the equation
      </Label>
    </SceneShell>
  );
};

export const SceneCeiling: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  return (
    <SceneShell durationInFrames={durationInFrames} ground>
      <Canvas>
        <SketchLine x1={420} y1={320} x2={420} y2={720} at={0.2} dur={0.4} stroke={C.fg} strokeWidth={4} seed={4201} />
        <SketchLine x1={420} y1={720} x2={1420} y2={720} at={0.3} dur={0.4} stroke={C.fg} strokeWidth={4} seed={4203} />
        <SketchRect x={560} y={620} w={160} h={100} rx={6} at={0.8} dur={0.4} stroke={C.red} fill={C.red} fillStyle="solid" strokeWidth={3} seed={4211} />
        <SvgLabel x={640} y={580} size={32} color={C.red} at={0.8}>best case 10%</SvgLabel>
        <SketchRect x={980} y={440} w={160} h={280} rx={6} at={1.6} dur={0.5} stroke={C.green} fill={C.green} fillStyle="solid" strokeWidth={3} seed={4213} />
        <SvgLabel x={1060} y={400} size={32} color={C.green} at={1.6}>we need 40%</SvgLabel>
        <SketchLine x1={700} y1={600} x2={980} y2={600} at={2.8} dur={0.4} stroke={C.yellow} strokeWidth={4} seed={4221} />
        <SvgLabel x={840} y={558} size={30} color={C.yellow} at={2.8}>skip it</SvgLabel>

        <SketchCircle cx={1510} cy={480} r={72} at={7.0} dur={0.5} stroke={C.cyan} fill={C.surface} fillStyle="solid" strokeWidth={5} seed={4231} />
        <SketchLine x1={1510} y1={480} x2={1540} y2={440} at={7.4} dur={0.3} stroke={C.cyan} strokeWidth={5} seed={4233} />
        <SvgLabel x={1510} y={486} size={32} color={C.cyan} at={7.0}>5 min</SvgLabel>
        <SvgLabel x={1510} y={590} size={28} color={C.muted} at={7.2}>free check</SvgLabel>
      </Canvas>
      <Label x={960} y={220} size={50} color={C.yellow} at={0.3} font="marker" weight={700}>
        find the ceiling first
      </Label>
    </SceneShell>
  );
};
