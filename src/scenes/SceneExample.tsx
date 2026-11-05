import React from 'react';
import {C} from '../theme';
import {Canvas, SceneShell} from '../components/SceneShell';
import {Label, SketchRect} from '../components/Sketch';
import {FadeGroup} from '../components/Sketch';
import {Gauge, SvgLabel} from '../components/Objects';

export const SceneExample: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  return (
    <SceneShell durationInFrames={durationInFrames} ground>
      <Canvas>
        <SketchRect x={430} y={252} w={780} h={400} rx={14} at={0.1} dur={0.6} stroke={C.panel} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={1201} />

        <SvgLabel x={820} y={326} size={56} color={C.fg} at={0.3}>10B weights</SvgLabel>
        <SvgLabel x={820} y={410} size={56} color={C.orange} at={0.8}>= 20 GB</SvgLabel>
        <SvgLabel x={820} y={496} size={50} color={C.muted} at={1.4}>2000 GB/s ÷ 20 GB</SvgLabel>
        <SketchRect x={470} y={532} w={700} h={92} rx={10} at={5.95} dur={0.4} stroke={C.green} fill={C.well} fillStyle="solid" strokeWidth={4} seed={1203} />
        <SvgLabel x={820} y={580} size={62} color={C.green} at={5.8}>= 100 tokens/s</SvgLabel>

        <Gauge x={1510} y={442} r={144} value={1} label="100" color={C.green} at={8.7} duration={0.8} size={58} />
        <SvgLabel x={1510} y={660} size={38} color={C.muted} at={8.7}>the ceiling</SvgLabel>

        <g transform="rotate(-4 820 770)">
          <SketchRect x={620} y={730} w={400} h={80} rx={10} at={12.1} dur={0.4} stroke={C.red} fill={C.well} fillStyle="solid" strokeWidth={4} seed={1211} />
          <FadeGroup at={12.2} dur={0.4} y={0}>
            <SvgLabel x={820} y={772} size={46} color={C.red}>physical limit</SvgLabel>
          </FadeGroup>
        </g>
      </Canvas>

      <Label x={960} y={188} size={44} color={C.muted} at={0.4}>
        one worked example
      </Label>
    </SceneShell>
  );
};
