import React from 'react';
import {Composition} from 'remotion';
import {Film} from './Film';
import {FPS, HEIGHT, WIDTH} from './theme';

export const Root: React.FC = () => {
  return (
    <Composition
      id="InferenceOptimization"
      component={Film}
      durationInFrames={33842}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};
