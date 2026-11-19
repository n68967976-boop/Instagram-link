import React from 'react';
import {Composition} from 'remotion';
import {TitleCard} from './TitleCard';
import {FRANKLIN_FITRAT_FRAMES, FranklinFitrat} from './franklin-fitrat/FranklinFitrat';
import {FPS} from './franklin-fitrat/data';

export const Root: React.FC = () => (
  <>
    <Composition
      id="TitleCard"
      component={TitleCard}
      durationInFrames={90}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{title: 'AI Video Editor', subtitle: 'Claude Code bilan montaj'}}
    />
    <Composition
      id="FranklinFitrat"
      component={FranklinFitrat}
      durationInFrames={FRANKLIN_FITRAT_FRAMES}
      fps={FPS}
      width={1920}
      height={1080}
    />
  </>
);
