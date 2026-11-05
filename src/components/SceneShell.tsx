import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C, HEIGHT, WIDTH} from '../theme';
import {sceneOpacity} from '../lib/anim';

export const SceneShell: React.FC<{
  durationInFrames: number;
  children: React.ReactNode;
  ground?: boolean;
  groundColor?: string;
  tint?: string;
  style?: React.CSSProperties;
}> = ({durationInFrames, children, tint, style}) => {
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
