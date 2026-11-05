import React from 'react';
import {C} from '../theme';
import {Canvas, SceneShell} from '../components/SceneShell';
import {Label, SketchArrow, SketchRect} from '../components/Sketch';
import {SvgLabel} from '../components/Objects';

const rows = [
  {w: 360, y: 300, text: '1 real server', color: C.cyan},
  {w: 470, y: 390, text: '2 prefix cache', color: C.green},
  {w: 580, y: 480, text: '3 quantize', color: C.yellow},
  {w: 690, y: 570, text: '4 speculative', color: C.orange},
  {w: 800, y: 660, text: '5 kernels', color: C.purple},
];

export const SceneBuildOrder: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  return (
    <SceneShell durationInFrames={durationInFrames} ground>
      <Canvas>
        {rows.map((r, i) => (
          <React.Fragment key={r.text}>
            <SketchRect x={960 - r.w / 2} y={r.y} w={r.w} h={76} rx={10} at={0.4 + i * 0.3} dur={0.4} stroke={r.color} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={4501 + i} />
            <SvgLabel x={960} y={r.y + 40} size={38} color={r.color} at={0.5 + i * 0.3}>{r.text}</SvgLabel>
          </React.Fragment>
        ))}
        <SketchArrow x1={300} y1={340} x2={300} y2={700} at={2.0} dur={0.5} color={C.green} strokeWidth={4} />
        <SvgLabel x={200} y={320} size={30} color={C.green}>high payoff</SvgLabel>
        <SvgLabel x={200} y={700} size={30} color={C.red}>low payoff</SvgLabel>
      </Canvas>
      <Label x={960} y={220} size={48} color={C.fg} at={0.3}>
        build order
      </Label>
      <Label x={960} y={842} size={38} color={C.yellow} at={6.2}>
        work from the top
      </Label>
    </SceneShell>
  );
};
