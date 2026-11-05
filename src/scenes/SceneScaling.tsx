import React from 'react';
import {C} from '../theme';
import {Canvas, SceneShell} from '../components/SceneShell';
import {Label, SketchArrow, SketchLine, SketchRect} from '../components/Sketch';
import {SvgLabel} from '../components/Objects';

export const SceneScaling: React.FC<{durationInFrames: number}> = ({durationInFrames}) => {
  const bars = [
    {x: 500, h: 100, label: '1', add: ''},
    {x: 750, h: 170, label: '2', add: '+70%'},
    {x: 1000, h: 240, label: '4', add: '+40%'},
    {x: 1250, h: 280, label: '8', add: '+20%'},
  ];
  return (
    <SceneShell durationInFrames={durationInFrames} ground>
      <Canvas>
        <SketchLine x1={360} y1={300} x2={360} y2={700} at={0.2} dur={0.6} stroke={C.fg} strokeWidth={5} seed={3801} />
        <SketchLine x1={360} y1={700} x2={1560} y2={700} at={0.3} dur={0.6} stroke={C.fg} strokeWidth={5} seed={3803} />
        {bars.map((b, i) => (
          <React.Fragment key={b.label}>
            <SketchRect x={b.x} y={700 - b.h} w={120} h={b.h} at={0.6 + i * 1.2} dur={0.45} stroke={i === 3 ? C.orange : C.green} fill={i === 3 ? C.orange : C.green} fillStyle="solid" strokeWidth={3.5} seed={3810 + i} />
            <SvgLabel x={b.x + 60} y={742} size={34} color={C.muted} at={0.6 + i * 1.2}>{b.label}</SvgLabel>
            {b.add ? <SvgLabel x={b.x + 60} y={700 - b.h - 34} size={30} color={C.green} at={1.0 + i * 1.2}>{b.add}</SvgLabel> : null}
            {i < 3 ? <SketchArrow x1={b.x + 128} y1={684} x2={bars[i + 1].x - 10} y2={684} at={5.0 + i * 0.2} dur={0.3} color={C.cyan} strokeWidth={3.5} head={9} /> : null}
          </React.Fragment>
        ))}
        <SvgLabel x={430} y={670} size={32} color={C.muted} at={0.3}>speed</SvgLabel>
        <SvgLabel x={1480} y={742} size={32} color={C.muted} at={0.3}>GPUs</SvgLabel>
        <SvgLabel x={960} y={796} size={36} color={C.cyan} at={5.0}>communication eats each addition</SvgLabel>

        <g>
          <SketchLine x1={1250} y1={330} x2={1340} y2={330} at={8.2} dur={0.3} stroke={C.red} strokeWidth={5} seed={3831} />
          <SvgLabel x={1500} y={330} size={34} color={C.red} at={8.2}>not worth it</SvgLabel>
        </g>
      </Canvas>
      <Label x={960} y={220} size={50} color={C.yellow} at={0.3} font="marker" weight={700}>
        more GPUs, diminishing returns
      </Label>
    </SceneShell>
  );
};
