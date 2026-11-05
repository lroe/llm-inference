import React from 'react';
import {C} from '../theme';
import {Canvas, SceneShell} from '../components/SceneShell';
import {Label, SketchArrow, SketchCircle, SketchLine, SketchRect} from '../components/Sketch';
import {SvgLabel} from '../components/Objects';

export const SceneWarnings: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  return (
    <SceneShell durationInFrames={durationInFrames} ground>
      <Canvas>
        <SketchRect x={280} y={340} w={620} h={420} rx={12} at={0.2} dur={0.5} stroke={C.red} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={5701} />
        <SvgLabel x={590} y={392} size={34} color={C.red} at={0.2}>fix crash</SvgLabel>
        <SketchLine x1={440} y1={470} x2={740} y2={470} at={0.8} dur={0.3} stroke={C.panel} strokeWidth={6} seed={5703} />
        <SketchCircle cx={700} cy={470} r={22} at={1.0} dur={0.25} stroke={C.red} fill={C.red} fillStyle="solid" strokeWidth={4} seed={5705} />
        <SketchArrow x1={590} y1={510} x2={590} y2={560} at={1.5} dur={0.3} color={C.red} strokeWidth={4} />
        {[0, 1, 2, 3, 4].map((i) => (
          <SketchRect key={i} x={320 + i * 110} y={580} w={90} h={70} rx={6} at={2.0 + i * 0.08} dur={0.25} stroke={C.panel} fill={C.well} fillStyle="solid" strokeWidth={3} seed={5710 + i} />
        ))}
        <SvgLabel x={590} y={706} size={28} color={C.red} at={3.0}>everything off → 3× slower</SvgLabel>
        <SvgLabel x={590} y={804} size={28} color={C.green} at={7.0}>fix only the broken piece</SvgLabel>

        <SketchRect x={1010} y={340} w={640} h={420} rx={12} at={12.0} dur={0.5} stroke={C.panel} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={5731} />
        <SvgLabel x={1330} y={392} size={34} color={C.cyan} at={12.0}>compiler</SvgLabel>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <SketchRect key={i} x={1060 + i * 92} y={440} w={62} h={46} rx={5} at={12.4 + i * 0.08} dur={0.25} stroke={C.cyan} fill={C.well} fillStyle="solid" strokeWidth={3} seed={5740 + i} />
        ))}
        <SketchArrow x1={1180} y1={506} x2={1180} y2={552} at={15.0} dur={0.3} color={C.muted} strokeWidth={3} />
        <SketchArrow x1={1360} y1={506} x2={1360} y2={552} at={15.1} dur={0.3} color={C.muted} strokeWidth={3} />
        {[0, 1, 2].map((i) => (
          <SketchRect key={i} x={1130 + i * 130} y={562} w={110} h={42} rx={5} at={15.3 + i * 0.08} dur={0.25} stroke={C.green} fill={C.panel} fillStyle="solid" strokeWidth={3} seed={5751 + i} />
        ))}
        <SketchRect x={1060} y={650} w={540} h={34} rx={5} at={16.2} dur={0.3} stroke={C.yellow} fill={C.yellow} fillStyle="solid" strokeWidth={3} seed={5761} />
        <SvgLabel x={1330} y={708} size={28} color={C.yellow} at={16.2}>2% work, 2% win</SvgLabel>
      </Canvas>
      <Label x={960} y={230} size={48} color={C.red} at={0.3}>
        don’t turn it all off
      </Label>
    </SceneShell>
  );
};

export const SceneVersions: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  return (
    <SceneShell durationInFrames={durationInFrames} ground>
      <Canvas>
        <SketchRect x={300} y={380} w={420} h={260} rx={12} at={0.2} dur={0.5} stroke={C.cyan} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={5801} />
        <SvgLabel x={510} y={444} size={40} color={C.cyan} at={0.2}>lib A</SvgLabel>
        <SvgLabel x={510} y={516} size={30} color={C.green} at={0.4}>works alone ✓</SvgLabel>
        <SketchRect x={1200} y={380} w={420} h={260} rx={12} at={0.4} dur={0.5} stroke={C.purple} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={5803} />
        <SvgLabel x={1410} y={444} size={40} color={C.purple} at={0.4}>lib B</SvgLabel>
        <SvgLabel x={1410} y={516} size={30} color={C.green} at={0.6}>works alone ✓</SvgLabel>

        <SketchLine x1={790} y1={500} x2={1120} y2={500} at={2.0} dur={0.4} stroke={C.red} strokeWidth={5} seed={5811} />
        <SketchLine x1={900} y1={460} x2={1010} y2={540} at={2.4} dur={0.3} stroke={C.red} strokeWidth={7} seed={5813} />
        <SketchLine x1={1010} y1={460} x2={900} y2={540} at={2.45} dur={0.3} stroke={C.red} strokeWidth={7} seed={5815} />
        <SvgLabel x={960} y={420} size={28} color={C.red} at={2.4}>clash</SvgLabel>

        <SketchRect x={690} y={700} w={540} h={90} rx={10} at={7.0} dur={0.4} stroke={C.green} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={5821} />
        <SvgLabel x={960} y={744} size={34} color={C.green} at={7.0}>pin both versions</SvgLabel>
        <SvgLabel x={510} y={664} size={28} color={C.muted} at={0.4}>v2.3.1</SvgLabel>
        <SvgLabel x={1410} y={664} size={28} color={C.muted} at={0.6}>v1.9.4</SvgLabel>
      </Canvas>
      <Label x={960} y={300} size={46} color={C.fg} at={0.3}>
        libraries can clash
      </Label>
    </SceneShell>
  );
};
