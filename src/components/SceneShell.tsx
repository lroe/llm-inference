import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C, HEIGHT, STROKE, WIDTH} from '../theme';
import {sceneOpacity} from '../lib/anim';
import {SketchLine} from './Sketch';

export const SceneShell: React.FC<{
  durationInFrames: number;
  children: React.ReactNode;
  ground?: boolean;
  groundColor?: string;
  tint?: string;
  style?: React.CSSProperties;
}> = ({durationInFrames, children, ground = true, groundColor = C.panel, tint, style}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{backgroundColor: tint ?? C.bg, overflow: 'hidden'}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: sceneOpacity(frame, durationInFrames),
          ...style,
        }}
      >
        {ground ? (
          <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} style={{position: 'absolute', inset: 0}}>
            <SketchLine x1={120} y1={884} x2={1800} y2={884} at={0.06} dur={0.7} stroke={groundColor} strokeWidth={STROKE} roughness={1.4} seed={501} />
          </svg>
        ) : null}
        {children}
      </div>
    </AbsoluteFill>
  );
};

export const Canvas: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => (
  <svg
    width={WIDTH}
    height={HEIGHT}
    viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
    style={{position: 'absolute', inset: 0, overflow: 'visible', ...style}}
  >
    {children}
  </svg>
);
