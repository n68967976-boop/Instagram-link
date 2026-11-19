import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Series,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {
  Axis,
  FITRAT_BIO,
  FPS,
  FRANKLIN_BIO,
  SCENES,
  SOURCES,
  Scene,
  Statement,
  totalSeconds,
} from './data';

const C = {
  paper: '#f5efe3',
  ink: '#1c1a17',
  muted: '#6b645a',
  line: '#d9cfbd',
  franklin: '#2c4a7a',
  franklinSoft: '#e3e8f1',
  fitrat: '#17776a',
  fitratSoft: '#dcece8',
  gold: '#b7812a',
};
const SANS = 'Inter, sans-serif';
const SERIF = 'Caladea, "DejaVu Serif", serif';

const sec = (s: number) => Math.round(s * FPS);

// Element appears at `at` seconds: fades and slides up.
const useAppear = (at: number, dur = 0.6) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [sec(at), sec(at + dur)], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  return {opacity: p, transform: `translateY(${(1 - p) * 24}px)`};
};

const SceneFade: React.FC<{seconds: number; children: React.ReactNode}> = ({seconds, children}) => {
  const frame = useCurrentFrame();
  const total = sec(seconds);
  const opacity = interpolate(frame, [0, 15, total - 15, total], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{opacity}}>{children}</AbsoluteFill>;
};

const Heading: React.FC<{title: string; accent?: string; size?: number; at?: number}> = ({
  title,
  accent,
  size = 84,
  at = 0.2,
}) => {
  const a = useAppear(at, 0.8);
  const frame = useCurrentFrame();
  const underline = interpolate(frame, [sec(at + 0.5), sec(at + 1.4)], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });
  return (
    <div style={{...a, textAlign: 'center'}}>
      <div style={{fontFamily: SANS, fontWeight: 700, fontSize: size, color: C.ink, letterSpacing: -1.5, lineHeight: 1.05}}>
        {title}
      </div>
      {accent && (
        <div style={{fontFamily: SERIF, fontStyle: 'italic', fontSize: size * 1.05, color: C.gold, lineHeight: 1.15}}>
          {accent}
        </div>
      )}
      <div
        style={{
          margin: '14px auto 0',
          height: 4,
          width: 260 * underline,
          background: C.gold,
          borderRadius: 2,
        }}
      />
    </div>
  );
};

const Monogram: React.FC<{letters: string; color: string; size?: number}> = ({letters, color, size = 150}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: '50%',
      border: `3px solid ${color}`,
      outline: `2px dashed ${color}55`,
      outlineOffset: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: SERIF,
      fontSize: size * 0.4,
      color,
      background: '#fffaf1',
    }}
  >
    {letters}
  </div>
);

// ---------- Scenes ----------

const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const popL = spring({frame: frame - sec(1.2), fps, config: {damping: 14}});
  const popR = spring({frame: frame - sec(1.6), fps, config: {damping: 14}});
  const sub = useAppear(3);
  const meta = useAppear(5);
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', gap: 50}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 70}}>
        <div style={{transform: `scale(${popL})`}}>
          <Monogram letters="BF" color={C.franklin} size={190} />
        </div>
        <div style={{fontFamily: SERIF, fontStyle: 'italic', fontSize: 70, color: C.gold, opacity: popR}}>va</div>
        <div style={{transform: `scale(${popR})`}}>
          <Monogram letters="AF" color={C.fitrat} size={190} />
        </div>
      </div>
      <Heading title="Ma'rifatparvarlik va" accent="milliy uyg'onish" size={92} at={0.2} />
      <div style={{...sub, fontFamily: SANS, fontSize: 40, color: C.ink, textAlign: 'center'}}>
        <span style={{color: C.franklin, fontWeight: 600}}>Benjamin Franklin</span> va{' '}
        <span style={{color: C.fitrat, fontWeight: 600}}>Abdurauf Fitrat</span> ijodida qiyosiy tahlil
      </div>
      <div style={{...meta, fontFamily: SANS, fontSize: 26, color: C.muted, letterSpacing: 4, textTransform: 'uppercase'}}>
        Qiyosiy adabiyotshunoslik · 10 daqiqa
      </div>
    </AbsoluteFill>
  );
};

const BioCard: React.FC<{bio: typeof FRANKLIN_BIO; color: string; soft: string; letters: string; at: number}> = ({
  bio,
  color,
  soft,
  letters,
  at,
}) => {
  const a = useAppear(at, 0.8);
  return (
    <div
      style={{
        ...a,
        flex: 1,
        background: '#fffaf1',
        border: `2px solid ${C.line}`,
        borderTop: `8px solid ${color}`,
        borderRadius: 18,
        padding: '44px 50px',
        display: 'flex',
        flexDirection: 'column',
        gap: 22,
      }}
    >
      <div style={{display: 'flex', alignItems: 'center', gap: 30}}>
        <Monogram letters={letters} color={color} size={110} />
        <div>
          <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 50, color: C.ink}}>{bio.name}</div>
          <div style={{fontFamily: SERIF, fontStyle: 'italic', fontSize: 38, color}}>{bio.years}</div>
          <div style={{fontFamily: SANS, fontSize: 24, color: C.muted, letterSpacing: 2, textTransform: 'uppercase'}}>
            {bio.place}
          </div>
        </div>
      </div>
      {bio.facts.map((f, i) => (
        <Fact key={f} text={f} color={color} soft={soft} at={at + 2.5 + i * 3.5} />
      ))}
    </div>
  );
};

const Fact: React.FC<{text: string; color: string; soft: string; at: number}> = ({text, color, soft, at}) => {
  const a = useAppear(at);
  return (
    <div style={{...a, display: 'flex', gap: 18, alignItems: 'flex-start'}}>
      <div style={{marginTop: 12, width: 14, height: 14, borderRadius: 7, background: color, flexShrink: 0, boxShadow: `0 0 0 6px ${soft}`}} />
      <div style={{fontFamily: SANS, fontSize: 32, lineHeight: 1.35, color: C.ink}}>{text}</div>
    </div>
  );
};

const BiosScene: React.FC = () => {
  const foot = useAppear(26);
  return (
    <AbsoluteFill style={{padding: '150px 110px 90px', gap: 40}}>
      <Heading title="Ikki davr," accent="ikki qit'a" size={70} />
      <div style={{display: 'flex', gap: 50, flex: 1}}>
        <BioCard bio={FRANKLIN_BIO} color={C.franklin} soft={C.franklinSoft} letters="BF" at={1.5} />
        <BioCard bio={FITRAT_BIO} color={C.fitrat} soft={C.fitratSoft} letters="AF" at={4} />
      </div>
      <div style={{...foot, textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: 36, color: C.muted}}>
        Ular o'rtasida qariyb 180 yil bor – lekin savol bitta: millatni ma'rifat bilan qanday uyg'otish mumkin?
      </div>
    </AbsoluteFill>
  );
};

const StatementScene: React.FC<{s: Statement}> = ({s}) => {
  const eyebrow = useAppear(0);
  const step = (s.seconds - 8) / s.lines.length;
  return (
    <AbsoluteFill style={{padding: '150px 200px 100px', alignItems: 'center', gap: 60}}>
      <div style={{...eyebrow, fontFamily: SANS, fontSize: 26, letterSpacing: 6, textTransform: 'uppercase', color: C.gold, fontWeight: 600}}>
        {s.eyebrow}
      </div>
      <Heading title={s.title} accent={s.accent} size={84} at={0.3} />
      <div style={{display: 'flex', flexDirection: 'column', gap: 30, width: '100%'}}>
        {s.lines.map((l, i) => (
          <NumberedLine key={l} n={i + 1} text={l} at={2.5 + i * step} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

const NumberedLine: React.FC<{n: number; text: string; at: number}> = ({n, text, at}) => {
  const a = useAppear(at, 0.8);
  return (
    <div style={{...a, display: 'flex', gap: 30, alignItems: 'baseline', borderBottom: `1px solid ${C.line}`, paddingBottom: 22}}>
      <div style={{fontFamily: SERIF, fontStyle: 'italic', fontSize: 48, color: C.gold, width: 60}}>{n}</div>
      <div style={{fontFamily: SANS, fontSize: 38, lineHeight: 1.35, color: C.ink}}>{text}</div>
    </div>
  );
};

const Column: React.FC<{name: string; items: string[]; color: string; soft: string; start: number; step: number}> = ({
  name,
  items,
  color,
  soft,
  start,
  step,
}) => {
  const head = useAppear(1.5);
  return (
    <div
      style={{
        flex: 1,
        background: '#fffaf1',
        borderRadius: 18,
        border: `2px solid ${C.line}`,
        borderLeft: `8px solid ${color}`,
        padding: '34px 44px',
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
      }}
    >
      <div style={{...head, fontFamily: SANS, fontWeight: 700, fontSize: 36, color, letterSpacing: 1}}>{name}</div>
      {items.map((t, i) => (
        <Fact key={t} text={t} color={color} soft={soft} at={start + i * step} />
      ))}
    </div>
  );
};

const AxisScene: React.FC<{s: Axis}> = ({s}) => {
  const num = useAppear(0);
  const reasonAt = s.seconds - 16;
  const reason = useAppear(reasonAt, 0.8);
  // Bullets alternate: Franklin 1, Fitrat 1, Franklin 2, ...
  const step = (reasonAt - 4) / (s.franklin.length + s.fitrat.length);
  return (
    <AbsoluteFill style={{padding: '130px 110px 80px', gap: 34}}>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 40}}>
        <div style={{...num, fontFamily: SERIF, fontStyle: 'italic', fontSize: 130, color: C.line, lineHeight: 1}}>{s.num}</div>
        <Heading title={s.title} accent={s.accent} size={64} at={0.3} />
      </div>
      <div style={{display: 'flex', gap: 44, flex: 1}}>
        <Column name="Benjamin Franklin" items={s.franklin} color={C.franklin} soft={C.franklinSoft} start={3} step={step * 2} />
        <Column name="Abdurauf Fitrat" items={s.fitrat} color={C.fitrat} soft={C.fitratSoft} start={3 + step} step={step * 2} />
      </div>
      <div
        style={{
          ...reason,
          alignSelf: 'center',
          background: C.ink,
          color: C.paper,
          borderRadius: 999,
          padding: '20px 46px',
          fontFamily: SANS,
          fontSize: 32,
          display: 'flex',
          gap: 20,
          alignItems: 'center',
        }}
      >
        <span style={{color: C.gold, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', fontSize: 24}}>Farq sababi</span>
        <span>{s.reason}</span>
      </div>
    </AbsoluteFill>
  );
};

const SourcesScene: React.FC = () => (
  <AbsoluteFill style={{padding: '140px 220px 90px', gap: 40}}>
    <Heading title="Asosiy" accent="manbalar" size={64} />
    <div style={{display: 'flex', flexDirection: 'column', gap: 18}}>
      {SOURCES.map((s, i) => (
        <SourceLine key={s} text={s} at={1.5 + i * 1.6} />
      ))}
    </div>
  </AbsoluteFill>
);

const SourceLine: React.FC<{text: string; at: number}> = ({text, at}) => {
  const a = useAppear(at);
  return <div style={{...a, fontFamily: SANS, fontSize: 29, color: C.ink, lineHeight: 1.4}}>{text}</div>;
};

const OutroScene: React.FC = () => {
  const a = useAppear(2);
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', gap: 40}}>
      <Heading title="E'tiboringiz uchun" accent="rahmat" size={96} />
      <div style={{...a, fontFamily: SANS, fontSize: 32, color: C.muted}}>Ilm – millatni uyg'otuvchi kuch.</div>
    </AbsoluteFill>
  );
};

const renderScene = (s: Scene) => {
  switch (s.kind) {
    case 'intro':
      return <IntroScene />;
    case 'bios':
      return <BiosScene />;
    case 'statement':
      return <StatementScene s={s} />;
    case 'axis':
      return <AxisScene s={s} />;
    case 'sources':
      return <SourcesScene />;
    case 'outro':
      return <OutroScene />;
  }
};

const sceneLabel = (s: Scene) =>
  s.kind === 'axis'
    ? `${s.num} — ${s.title} ${s.accent}`
    : s.kind === 'statement'
      ? s.eyebrow
      : s.kind === 'bios'
        ? 'Adiblar'
        : s.kind === 'sources'
          ? 'Manbalar'
          : '';

// Top bar with section label and overall progress.
const Chrome: React.FC = () => {
  const frame = useCurrentFrame();
  const total = sec(totalSeconds);
  let acc = 0;
  let label = '';
  for (const s of SCENES) {
    if (frame < acc + sec(s.seconds)) {
      label = sceneLabel(s);
      break;
    }
    acc += sec(s.seconds);
  }
  return (
    <>
      <div style={{position: 'absolute', top: 0, left: 0, height: 6, width: `${(frame / total) * 100}%`, background: C.gold}} />
      {label && (
        <div
          style={{
            position: 'absolute',
            top: 46,
            left: 110,
            right: 110,
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: SANS,
            fontSize: 22,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: C.muted,
            borderBottom: `1px solid ${C.line}`,
            paddingBottom: 16,
          }}
        >
          <span>{label}</span>
          <span>Franklin · Fitrat</span>
        </div>
      )}
    </>
  );
};

export const FranklinFitrat: React.FC = () => (
  <AbsoluteFill style={{background: C.paper}}>
    <Series>
      {SCENES.map((s, i) => (
        <Series.Sequence key={i} durationInFrames={sec(s.seconds)}>
          <SceneFade seconds={s.seconds}>{renderScene(s)}</SceneFade>
        </Series.Sequence>
      ))}
    </Series>
    <Chrome />
  </AbsoluteFill>
);

export const FRANKLIN_FITRAT_FRAMES = sec(totalSeconds);
