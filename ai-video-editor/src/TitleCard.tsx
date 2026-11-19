import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

export const TitleCard: React.FC<{title: string; subtitle: string}> = ({title, subtitle}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pop = spring({frame, fps, config: {damping: 12}});
  const fade = interpolate(frame, [15, 35], [0, 1], {extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{background: '#fff', justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif'}}>
      <div style={{fontSize: 110, fontWeight: 800, color: '#111', transform: `scale(${pop})`}}>{title}</div>
      <div style={{fontSize: 60, color: '#f04e23', opacity: fade, marginTop: 30, fontStyle: 'italic'}}>{subtitle}</div>
    </AbsoluteFill>
  );
};
