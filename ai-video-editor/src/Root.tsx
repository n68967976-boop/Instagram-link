import React from 'react';
import {Composition} from 'remotion';
import {TitleCard} from './TitleCard';

export const Root: React.FC = () => (
  <Composition
    id="TitleCard"
    component={TitleCard}
    durationInFrames={90}
    fps={30}
    width={1080}
    height={1920}
    defaultProps={{title: 'AI Video Editor', subtitle: 'Claude Code bilan montaj'}}
  />
);
