import React from 'react';
import {C} from '../theme';
import {Canvas, SceneShell} from '../components/SceneShell';
import {Label, SketchCircle, SketchLine, SketchPath, SketchRect} from '../components/Sketch';
import {SvgLabel} from '../components/Objects';

export const SceneSpecFormula: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  const pts = [2, 3.3, 4.1, 4.5, 4.7, 4.8];
  const cost = [0.4, 0.9, 1.6, 2.6, 3.9, 5.4];
  const x0 = 460;
  const y0 = 720;
  const dx = 150;
  const sy = 42;
  const line = (vals: number[]) => `M ${x0} ${y0 - vals[0] * sy} ` + vals.map((v, i) => `L ${x0 + (i + 1) * dx} ${y0 - v * sy}`).join(' ');
  return (
    <SceneShell durationInFrames={durationInFrames} ground>
      <Canvas>
        <SvgLabel x={960} y={250} size={46} color={C.fg} at={0.3}>speed = accepted / time per pass</SvgLabel>
        <SketchLine x1={420} y1={390} x2={420} y2={730} at={0.2} dur={0.5} stroke={C.fg} strokeWidth={4} seed={5301} />
        <SketchLine x1={420} y1={730} x2={1520} y2={730} at={0.3} dur={0.5} stroke={C.fg} strokeWidth={4} seed={5303} />
        <SketchPath d={line(pts)} at={2.0} dur={0.7} stroke={C.green} strokeWidth={5} seed={5311} />
        <SketchPath d={line(cost)} at={15.0} dur={0.7} stroke={C.orange} strokeWidth={5} seed={5313} />
        <SketchPath d="M 460 650 L 1360 470" at={8.0} dur={0.6} stroke={C.muted} strokeWidth={3} seed={5315} />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <SvgLabel key={i} x={x0 + (i + 1) * dx} y={758} size={28} color={C.muted} at={2.0}>{i + 1}</SvgLabel>
        ))}
        <SvgLabel x={420} y={366} size={28} color={C.muted} at={0.3}>tokens</SvgLabel>
        <SvgLabel x={960} y={796} size={28} color={C.muted} at={0.3}>guesses ahead (K)</SvgLabel>
        <SvgLabel x={900} y={600} size={32} color={C.green} at={2.0}>accepted</SvgLabel>
        <SvgLabel x={1280} y={690} size={30} color={C.orange} at={15.0}>cost</SvgLabel>

        <g>
          <SketchCircle cx={910} cy={566} r={18} at={18.0} dur={0.3} stroke={C.yellow} strokeWidth={4} seed={5321} />
          <SvgLabel x={910} y={700} size={32} color={C.yellow} at={18.0}>sweet spot</SvgLabel>
        </g>
        <SvgLabel x={1180} y={430} size={32} color={C.muted} at={8.0}>K + 1 ceiling</SvgLabel>
      </Canvas>
    </SceneShell>
  );
};

export const SceneDraftMatch: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  return (
    <SceneShell durationInFrames={durationInFrames} ground>
      <Canvas>
        <SketchRect x={280} y={360} w={520} h={300} rx={12} at={0.2} dur={0.5} stroke={C.cyan} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={5401} />
        <SvgLabel x={540} y={412} size={34} color={C.cyan} at={0.2}>draft must match</SvgLabel>
        <SvgLabel x={420} y={500} size={44} color={C.cyan} at={0.4}>small</SvgLabel>
        <SvgLabel x={660} y={500} size={44} color={C.yellow} at={0.4}>big</SvgLabel>
        <SketchPath d="M 500 540 Q 540 580 580 540" at={2.0} dur={0.4} stroke={C.green} strokeWidth={5} seed={5411} />
        <SvgLabel x={540} y={590} size={30} color={C.green} at={2.2}>same thinking</SvgLabel>

        <SketchRect x={900} y={360} w={700} h={150} rx={12} at={4.0} dur={0.5} stroke={C.yellow} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={5421} />
        <SvgLabel x={1250} y={410} size={32} color={C.yellow} at={4.0}>long prompt</SvgLabel>
        <SketchRect x={940} y={450} w={620} h={34} rx={5} at={4.4} dur={0.4} stroke={C.orange} fill={C.orange} fillStyle="solid" strokeWidth={3} seed={5423} />
        <SvgLabel x={1250} y={550} size={30} color={C.red} at={4.4}>checking costs more</SvgLabel>

        <SketchRect x={1120} y={600} w={460} h={180} rx={12} at={11.0} dur={0.5} stroke={C.purple} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={5431} />
        <SvgLabel x={1350} y={650} size={32} color={C.purple} at={11.0}>relaxed mode</SvgLabel>
        <SvgLabel x={1350} y={710} size={30} color={C.muted} at={11.2}>separate column</SvgLabel>
        <SvgLabel x={1350} y={754} size={28} color={C.muted} at={11.4}>own product</SvgLabel>
      </Canvas>
      <Label x={960} y={230} size={48} color={C.fg} at={0.3}>
        make the draft trustworthy
      </Label>
    </SceneShell>
  );
};
