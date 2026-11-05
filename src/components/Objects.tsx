import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, FONT, STROKE} from '../theme';
import {
  FadeGroup,
  SketchCircle,
  SketchLine,
  SketchPath,
  SketchRect,
  roundedRect,
} from './Sketch';

const SvgText: React.FC<{
  x: number;
  y: number;
  children: React.ReactNode;
  size?: number;
  color?: string;
  anchor?: 'start' | 'middle' | 'end';
  font?: 'hand' | 'marker';
  weight?: number;
  opacity?: number;
  letterSpacing?: number;
  rotate?: number;
  at?: number;
  dur?: number;
}> = ({x, y, children, size = 38, color = C.fg, anchor = 'middle', font = 'hand', weight = 400, opacity = 1, letterSpacing = 0, rotate = 0, at = 0, dur = 0.45}) => {
  const frame = useCurrentFrame();
  const p = at > 0 ? Math.min(1, Math.max(0, (frame - at * 30) / (dur * 30))) : 1;
  return (
    <g opacity={p} transform={p < 1 ? `translate(0 ${(1 - p) * 10})` : undefined}>
      <text
        x={x}
        y={y}
        fill={color}
        fontFamily={FONT[font]}
        fontSize={size}
        fontWeight={weight}
        textAnchor={anchor}
        dominantBaseline="middle"
        opacity={opacity}
        letterSpacing={letterSpacing}
        transform={rotate ? `rotate(${rotate} ${x} ${y})` : undefined}
        style={{WebkitFontSmoothing: 'antialiased'}}
      >
    {children}
  </text>
  </g>
  );
};

export const Chip: React.FC<{
  x: number;
  y: number;
  size?: number;
  label?: string;
  color?: string;
  at?: number;
  dur?: number;
  active?: boolean;
  sublabel?: string;
  opacity?: number;
}> = ({x, y, size = 220, label = 'GPU', color = C.cyan, at = 0, dur = 0.85, active = false, sublabel, opacity = 1}) => {
  const pins = 9;
  const step = (size * 0.72) / (pins - 1);
  const startX = x + size * 0.14;
  const startY = y + size * 0.14;
  const pinLen = size * 0.07;
  return (
    <FadeGroup at={at} dur={dur * 0.5} opacity={opacity} y={0}>
      <g>
        <SketchRect x={x} y={y} w={size} h={size} rx={size * 0.08} at={at} dur={dur * 0.6} stroke={C.fg} fill={C.surface} fillStyle="solid" strokeWidth={STROKE} seed={121} />
        {Array.from({length: pins}).map((_, i) => {
          const px = startX + i * step;
          return (
            <React.Fragment key={i}>
              <SketchLine x1={px} y1={y} x2={px} y2={y - pinLen} at={at + 0.12} dur={dur * 0.4} stroke={C.muted} strokeWidth={3.5} roughness={0.7} seed={130 + i} />
              <SketchLine x1={px} y1={y + size} x2={px} y2={y + size + pinLen} at={at + 0.12} dur={dur * 0.4} stroke={C.muted} strokeWidth={3.5} roughness={0.7} seed={150 + i} />
              <SketchLine x1={x} y1={startY + i * step} x2={x - pinLen} y2={startY + i * step} at={at + 0.14} dur={dur * 0.4} stroke={C.muted} strokeWidth={3.5} roughness={0.7} seed={170 + i} />
              <SketchLine x1={x + size} y1={startY + i * step} x2={x + size + pinLen} y2={startY + i * step} at={at + 0.14} dur={dur * 0.4} stroke={C.muted} strokeWidth={3.5} roughness={0.7} seed={190 + i} />
            </React.Fragment>
          );
        })}
        <SketchRect x={x + size * 0.22} y={y + size * 0.22} w={size * 0.56} h={size * 0.56} rx={size * 0.04} at={at + 0.22} dur={dur * 0.6} stroke={color} fill={C.well} fillStyle="solid" strokeWidth={STROKE} seed={211} />
        {active ? (
          <>
            <SketchLine x1={x + size * 0.32} y1={y + size * 0.36} x2={x + size * 0.68} y2={y + size * 0.36} at={at + 0.32} dur={dur * 0.4} stroke={color} strokeWidth={4} seed={213} />
            <SketchLine x1={x + size * 0.32} y1={y + size * 0.5} x2={x + size * 0.58} y2={y + size * 0.5} at={at + 0.36} dur={dur * 0.4} stroke={color} strokeWidth={4} seed={215} />
          </>
        ) : null}
        <SvgText x={x + size / 2} y={y + size * 0.62} size={size * 0.19} color={color} weight={400} letterSpacing={2}>
          {label}
        </SvgText>
        {sublabel ? (
          <SvgText x={x + size / 2} y={y + size + pinLen + 34} size={36} color={C.muted}>
            {sublabel}
          </SvgText>
        ) : null}
      </g>
    </FadeGroup>
  );
};

export const MemoryStack: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  at?: number;
  dur?: number;
  label?: string;
  color?: string;
  opacity?: number;
}> = ({x, y, w = 86, h = 230, at = 0, dur = 0.8, label = 'MEMORY', color = C.orange, opacity = 1}) => {
  return (
    <FadeGroup at={at} dur={dur * 0.5} opacity={opacity} y={0}>
      <g>
        <SketchRect x={x} y={y} w={w} h={h} rx={8} at={at} dur={dur * 0.6} stroke={C.fg} fill={C.surface} fillStyle="solid" seed={231} />
        {Array.from({length: 6}).map((_, i) => (
          <SketchRect
            key={i}
            x={x + 12}
            y={y + 20 + i * ((h - 40) / 6)}
            w={w - 24}
            h={(h - 40) / 6 - 8}
            rx={4}
            at={at + 0.16 + i * 0.04}
            dur={dur * 0.35}
            stroke={color}
            fill={C.well}
            fillStyle="solid"
            strokeWidth={3}
            seed={235 + i}
          />
        ))}
        <SvgText x={x + w / 2} y={y + h + 38} size={34} color={C.muted}>
          {label}
        </SvgText>
      </g>
    </FadeGroup>
  );
};

export const Token: React.FC<{
  x: number;
  y: number;
  text: string;
  size?: number;
  color?: string;
  fill?: string;
  at?: number;
  dur?: number;
  scale?: number;
  opacity?: number;
  strike?: boolean;
  glow?: boolean;
}> = ({x, y, text, size = 42, color = C.fg, fill = C.surface, at = 0, dur = 0.55, scale = 1, opacity = 1, strike = false, glow = false}) => {
  const w = Math.max(64, text.length * size * 0.54 + 40);
  const h = size * 1.65;
  return (
    <FadeGroup at={at} dur={dur} opacity={opacity} y={8}>
      <g transform={`translate(${x} ${y}) scale(${scale})`}>
        <SketchRect x={-w / 2} y={-h / 2} w={w} h={h} rx={9} at={at} dur={dur * 0.7} stroke={color} fill={fill} fillStyle="solid" strokeWidth={3.5} seed={251 + text.length} />
        {glow ? (
          <SketchLine x1={-w / 2 + 8} y1={h / 2 - 7} x2={w / 2 - 8} y2={h / 2 - 7} progress={1} stroke={color} strokeWidth={3} seed={253} />
        ) : null}
        <SvgText x={0} y={2} size={size} color={color} anchor="middle">
          {text}
        </SvgText>
        {strike ? (
          <SketchLine x1={-w / 2 + 6} y1={0} x2={w / 2 - 6} y2={0} progress={1} stroke={C.red} strokeWidth={4} seed={255} />
        ) : null}
      </g>
    </FadeGroup>
  );
};

export const TokenRow: React.FC<{
  x: number;
  y: number;
  tokens: string[];
  gap?: number;
  size?: number;
  color?: string;
  at?: number;
  stagger?: number;
  opacity?: number;
  highlight?: number[];
}> = ({x, y, tokens, gap = 14, size = 38, color = C.fg, at = 0, stagger = 0.12, opacity = 1, highlight = []}) => {
  const widths = tokens.map((t) => Math.max(54, t.length * size * 0.54 + 34));
  const total = widths.reduce((a, b) => a + b, 0) + gap * (tokens.length - 1);
  let cursor = x - total / 2;
  return (
    <g opacity={opacity}>
      {tokens.map((t, i) => {
        const w = widths[i];
        const cx = cursor + w / 2;
        cursor += w + gap;
        return (
          <Token
            key={`${t}-${i}`}
            x={cx}
            y={y}
            text={t}
            size={size}
            color={highlight.includes(i) ? C.green : color}
            fill={highlight.includes(i) ? C.panel : C.surface}
            at={at + i * stagger}
            dur={0.35}
          />
        );
      })}
    </g>
  );
};

export const KVGrid: React.FC<{
  x: number;
  y: number;
  cols?: number;
  rows?: number;
  cell?: number;
  gap?: number;
  usedRows?: number;
  activeRow?: number;
  color?: string;
  highlight?: string;
  at?: number;
  dur?: number;
  opacity?: number;
  showLabel?: boolean;
}> = ({x, y, cols = 10, rows = 5, cell = 32, gap = 7, usedRows = 3, activeRow = -1, color = C.cyan, highlight = C.purple, at = 0, dur = 0.8, opacity = 1, showLabel = true}) => {
  const w = cols * cell + (cols - 1) * gap;
  const h = rows * cell + (rows - 1) * gap;
  return (
    <FadeGroup at={at} dur={dur * 0.4} opacity={opacity} y={0}>
      <g>
        <SketchRect x={x - 14} y={y - 14} w={w + 28} h={h + 28} rx={10} at={at} dur={dur * 0.4} stroke={C.fg} fill={C.well} fillStyle="solid" seed={271} />
        {Array.from({length: rows}).map((_, r) =>
          Array.from({length: cols}).map((_, c) => {
            const used = r < usedRows;
            const active = r === activeRow;
            return (
              <rect
                key={`${r}-${c}`}
                x={x + c * (cell + gap)}
                y={y + r * (cell + gap)}
                width={cell}
                height={cell}
                rx={5}
                fill={active ? highlight : used ? color : C.surface}
                fillOpacity={used ? 0.92 : 0.5}
                stroke={C.bg}
                strokeWidth={2}
                opacity={Math.min(1, Math.max(0, (dur - 0.2) * 5))}
              />
            );
          })
        )}
        {showLabel ? (
          <SvgText x={x + w / 2} y={y + h + 40} size={36} color={C.muted}>
            KV cache
          </SvgText>
        ) : null}
      </g>
    </FadeGroup>
  );
};

export const QuantBlock: React.FC<{
  x: number;
  y: number;
  size?: number;
  label: string;
  color?: string;
  at?: number;
  dur?: number;
  opacity?: number;
  dashed?: boolean;
}> = ({x, y, size = 130, label, color = C.cyan, at = 0, dur = 0.6, opacity = 1}) => (
  <FadeGroup at={at} dur={dur} opacity={opacity} y={8}>
    <SketchRect x={x - size / 2} y={y - size / 2} w={size} h={size} rx={12} at={at} dur={dur} stroke={color} fill={C.surface} fillStyle="solid" strokeWidth={STROKE} seed={291 + size} />
    <SvgText x={x} y={y + 2} size={size * 0.42} color={color} weight={400}>
      {label}
    </SvgText>
  </FadeGroup>
);

export const SpeedLines: React.FC<{
  x: number;
  y: number;
  w?: number;
  color?: string;
  at?: number;
  count?: number;
  opacity?: number;
}> = ({x, y, w = 120, color = C.cyan, at = 0, count = 4, opacity = 1}) => (
  <g opacity={opacity}>
    {Array.from({length: count}).map((_, i) => (
      <SketchLine
        key={i}
        x1={x}
        y1={y + (i - (count - 1) / 2) * 18}
        x2={x - w - i * 12}
        y2={y + (i - (count - 1) / 2) * 18}
        at={at + i * 0.03}
        dur={0.4}
        stroke={color}
        strokeWidth={4}
        seed={311 + i}
      />
    ))}
  </g>
);

export const Sparkles: React.FC<{
  x: number;
  y: number;
  r?: number;
  color?: string;
  at?: number;
  count?: number;
}> = ({x, y, r = 70, color = C.yellow, at = 0, count = 5}) => {
  const pts = Array.from({length: count}).map((_, i) => {
    const ang = (Math.PI * 2 * i) / count - Math.PI / 2;
    return {x: x + Math.cos(ang) * r, y: y + Math.sin(ang) * r, s: 10 + (i % 3) * 4};
  });
  return (
    <g>
      {pts.map((p, i) => (
        <React.Fragment key={i}>
          <SketchLine x1={p.x - p.s} y1={p.y} x2={p.x + p.s} y2={p.y} at={at + i * 0.05} dur={0.3} stroke={color} strokeWidth={3.6} seed={331 + i} />
          <SketchLine x1={p.x} y1={p.y - p.s} x2={p.x} y2={p.y + p.s} at={at + i * 0.05} dur={0.3} stroke={color} strokeWidth={3.6} seed={341 + i} />
        </React.Fragment>
      ))}
    </g>
  );
};

export const ServerRack: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  units?: number;
  at?: number;
  color?: string;
  opacity?: number;
  label?: string;
}> = ({x, y, w = 160, h = 300, units = 4, at = 0, color = C.purple, opacity = 1, label}) => (
  <FadeGroup at={at} dur={0.7} opacity={opacity} y={0}>
    <SketchRect x={x} y={y} w={w} h={h} rx={8} at={at} dur={0.7} stroke={C.fg} fill={C.surface} fillStyle="solid" seed={351} />
    {Array.from({length: units}).map((_, i) => {
      const uh = (h - 28) / units - 10;
      const uy = y + 16 + i * ((h - 28) / units);
      return (
        <React.Fragment key={i}>
          <SketchRect x={x + 14} y={uy} w={w - 28} h={uh} rx={4} at={at + 0.12 + i * 0.07} dur={0.4} stroke={C.muted} fill={C.well} fillStyle="solid" strokeWidth={3} seed={355 + i} />
          <circle cx={x + 30} cy={uy + uh / 2} r={4} fill={color} />
          <SketchLine x1={x + 44} y1={uy + uh / 2} x2={x + w - 24} y2={uy + uh / 2} at={at + 0.2 + i * 0.07} dur={0.3} stroke={C.panel} strokeWidth={3} seed={361 + i} />
        </React.Fragment>
      );
    })}
    {label ? <SvgText x={x + w / 2} y={y + h + 36} size={36} color={C.muted}>{label}</SvgText> : null}
  </FadeGroup>
);

export const Laptop: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  at?: number;
  accent?: string;
  opacity?: number;
  children?: React.ReactNode;
}> = ({x, y, w = 320, h = 200, at = 0, accent = C.cyan, opacity = 1, children}) => (
  <FadeGroup at={at} dur={0.7} opacity={opacity} y={10}>
    <SketchRect x={x} y={y} w={w} h={h} rx={10} at={at} dur={0.6} stroke={C.fg} fill={C.well} fillStyle="solid" seed={371} />
    <SketchRect x={x + 14} y={y + 14} w={w - 28} h={h - 28} rx={5} at={at + 0.1} dur={0.5} stroke={accent} fill={C.surface} fillStyle="solid" strokeWidth={3} seed={373} />
    <SketchLine x1={x - 24} y1={y + h + 16} x2={x + w + 24} y2={y + h + 16} at={at + 0.2} dur={0.5} stroke={C.fg} strokeWidth={5} seed={375} />
    {children}
  </FadeGroup>
);

export const ChatBubble: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  at?: number;
  color?: string;
  fill?: string;
  tail?: 'left' | 'right';
  children?: React.ReactNode;
  opacity?: number;
}> = ({x, y, w = 260, h = 84, at = 0, color = C.cyan, fill = C.surface, tail = 'left', children, opacity = 1}) => (
  <FadeGroup at={at} dur={0.45} opacity={opacity} y={8}>
    <SketchPath
      d={
        tail === 'left'
          ? `M ${x + 14} ${y} L ${x + w - 14} ${y} Q ${x + w} ${y} ${x + w} ${y + 14} L ${x + w} ${y + h - 14} Q ${x + w} ${y + h} ${x + w - 14} ${y + h} L ${x + 22} ${y + h} L ${x} ${y + h + 24} L ${x + 6} ${y + h} Q ${x} ${y + h} ${x} ${y + h - 14} L ${x} ${y + 14} Q ${x} ${y} ${x + 14} ${y} Z`
          : `M ${x + 14} ${y} L ${x + w - 14} ${y} Q ${x + w} ${y} ${x + w} ${y + 14} L ${x + w} ${y + h - 14} Q ${x + w} ${y + h} ${x + w - 14} ${y + h} L ${x + 14} ${y + h} Q ${x} ${y + h} ${x} ${y + h - 14} L ${x} ${y + 24} L ${x + w - 18} ${y + h} L ${x + w - 14} ${y + h}`
      }
      at={at}
      dur={0.5}
      stroke={color}
      fill={fill}
      fillStyle="solid"
      seed={391}
    />
    {children}
  </FadeGroup>
);

export const BarChart: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  values?: number[];
  at?: number;
  color?: string;
  highlight?: number;
  opacity?: number;
}> = ({x, y, w = 420, h = 260, values = [0.25, 0.42, 0.65, 0.85], at = 0, color = C.green, highlight = -1, opacity = 1}) => {
  const bw = (w - 30) / values.length;
  return (
    <FadeGroup at={at} dur={0.5} opacity={opacity} y={0}>
      <SketchLine x1={x} y1={y} x2={x} y2={y + h} at={at} dur={0.5} stroke={C.fg} strokeWidth={5} seed={411} />
      <SketchLine x1={x} y1={y + h} x2={x + w} y2={y + h} at={at} dur={0.5} stroke={C.fg} strokeWidth={5} seed={413} />
      {values.map((v, i) => {
        const bh = v * (h - 30);
        return (
          <SketchRect
            key={i}
            x={x + 18 + i * bw}
            y={y + h - bh}
            w={bw - 22}
            h={bh}
            at={at + 0.25 + i * 0.09}
            dur={0.45}
            stroke={i === highlight ? C.yellow : color}
            fill={i === highlight ? C.yellow : color}
            fillStyle="solid"
            strokeWidth={3.5}
            seed={415 + i}
          />
        );
      })}
    </FadeGroup>
  );
};

export const Scale: React.FC<{
  x: number;
  y: number;
  w?: number;
  at?: number;
  left?: number;
  right?: number;
  color?: string;
  opacity?: number;
}> = ({x, y, w = 420, at = 0, left = 0.5, right = 0.5, color = C.fg, opacity = 1}) => {
  const tilt = Math.max(-0.24, Math.min(0.24, (left - right) * 0.5));
  const lx = x - w / 2;
  const rx = x + w / 2;
  const ly = y + Math.tan(tilt) * (w / 2);
  const ry = y - Math.tan(tilt) * (w / 2);
  return (
    <FadeGroup at={at} dur={0.8} opacity={opacity} y={0}>
      <SketchLine x1={x} y1={y} x2={x} y2={y + 300} at={at} dur={0.5} stroke={color} strokeWidth={6} seed={431} />
      <SketchLine x1={x - 90} y1={y + 300} x2={x + 90} y2={y + 300} at={at + 0.2} dur={0.4} stroke={color} strokeWidth={6} seed={433} />
      <SketchLine x1={lx} y1={ly} x2={rx} y2={ry} at={at + 0.3} dur={0.5} stroke={color} strokeWidth={6} seed={435} />
      <SketchCircle cx={x} cy={y} r={10} at={at + 0.25} dur={0.25} stroke={color} strokeWidth={4} seed={437} />
      <SketchLine x1={lx} y1={ly} x2={lx} y2={ly + 80} at={at + 0.42} dur={0.3} stroke={color} strokeWidth={4} seed={439} />
      <SketchLine x1={rx} y1={ry} x2={rx} y2={ry + 80} at={at + 0.42} dur={0.3} stroke={color} strokeWidth={4} seed={441} />
      <SketchEllipsePan cx={lx} cy={ly + 96} at={at + 0.5} color={color} />
      <SketchEllipsePan cx={rx} cy={ry + 96} at={at + 0.5} color={color} />
    </FadeGroup>
  );
};

const SketchEllipsePan: React.FC<{cx: number; cy: number; at: number; color: string}> = ({cx, cy, at, color}) => (
  <SketchPath
    d={`M ${cx - 58} ${cy} Q ${cx} ${cy + 34} ${cx + 58} ${cy} Q ${cx} ${cy + 12} ${cx - 58} ${cy} Z`}
    at={at}
    dur={0.35}
    stroke={color}
    strokeWidth={4}
    seed={451}
  />
);

export const Pill: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  label: string;
  color?: string;
  at?: number;
  opacity?: number;
}> = ({x, y, w = 190, h = 62, label, color = C.cyan, at = 0, opacity = 1}) => (
  <FadeGroup at={at} dur={0.45} opacity={opacity} y={8}>
    <SketchRect x={x - w / 2} y={y - h / 2} w={w} h={h} rx={h / 2} at={at} dur={0.45} stroke={color} fill={C.surface} fillStyle="solid" strokeWidth={3.5} seed={471} />
    <SvgText x={x} y={y + 1} size={40} color={color}>{label}</SvgText>
  </FadeGroup>
);

export const SvgLabel = SvgText;

export const ChipDie: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  cols?: number;
  rows?: number;
  lit?: number[];
  color?: string;
  at?: number;
  opacity?: number;
  pins?: boolean;
  stagger?: number;
}> = ({x, y, w, h, cols = 8, rows = 6, lit = [], color = C.green, at = 0, opacity = 1, pins = true, stagger = 0.45}) => {
  const frame = useCurrentFrame();
  const dieX = x + 60;
  const dieY = y + 50;
  const dieW = w - 120;
  const dieH = h - 100;
  const gap = 9;
  const cell = Math.min((dieW - (cols - 1) * gap) / cols, (dieH - (rows - 1) * gap) / rows, 52);
  const gridW = cols * cell + (cols - 1) * gap;
  const gridH = rows * cell + (rows - 1) * gap;
  const gx = x + w / 2 - gridW / 2;
  const gy = y + h / 2 - gridH / 2;
  const pinCount = 11;
  const pinStep = (w - 120) / (pinCount - 1);
  return (
    <g opacity={opacity}>
      <SketchRect x={x} y={y} w={w} h={h} rx={18} at={at} dur={0.5} stroke={C.fg} fill={C.surface} fillStyle="solid" strokeWidth={4} seed={1901} />
      {pins
        ? Array.from({length: pinCount}).map((_, i) => (
            <React.Fragment key={i}>
              <SketchLine x1={x + 60 + i * pinStep} y1={y} x2={x + 60 + i * pinStep} y2={y - 26} at={at + 0.15} dur={0.25} stroke={C.muted} strokeWidth={3.5} seed={1910 + i} />
              <SketchLine x1={x + 60 + i * pinStep} y1={y + h} x2={x + 60 + i * pinStep} y2={y + h + 26} at={at + 0.15} dur={0.25} stroke={C.muted} strokeWidth={3.5} seed={1930 + i} />
            </React.Fragment>
          ))
        : null}
      <SketchRect x={dieX} y={dieY} w={dieW} h={dieH} rx={10} at={at + 0.15} dur={0.5} stroke={C.cyan} fill={C.well} fillStyle="solid" strokeWidth={4} seed={1951} />
      {Array.from({length: rows}).map((_, r) =>
        Array.from({length: cols}).map((_, c) => {
          const idx = r * cols + c;
          const isLit = lit.includes(idx);
          const p = Math.min(1, Math.max(0, (frame - at * 30 - 0.6 * 30 - idx * stagger) / 7));
          return (
            <rect
              key={idx}
              x={gx + c * (cell + gap)}
              y={gy + r * (cell + gap)}
              width={cell}
              height={cell}
              rx={4}
              fill={isLit ? color : C.surface}
              stroke={isLit ? C.yellow : C.panel}
              strokeWidth={isLit ? 3.5 : 2}
              opacity={p}
            />
          );
        })
      )}
    </g>
  );
};

export const Gauge: React.FC<{
  x: number;
  y: number;
  r?: number;
  value?: number;
  label?: string;
  color?: string;
  at?: number;
  duration?: number;
  opacity?: number;
  size?: number;
}> = ({x, y, r = 160, value = 0.95, label = '95%', color = C.orange, at = 0, duration = 1.4, opacity = 1, size = 36}) => {
  const frame = useCurrentFrame();
  const p = Math.min(1, Math.max(0, (frame / 30 - at) / duration));
  const eased = 1 - Math.pow(1 - p, 3);
  const v = value * eased;
  const start = Math.PI * 0.82;
  const end = Math.PI * 2.18;
  const ang = start + (end - start) * v;
  const nx = x + Math.cos(ang) * r * 0.72;
  const ny = y + Math.sin(ang) * r * 0.72;
  const arcPts = Array.from({length: 31}).map((_, i) => {
    const a = start + ((end - start) * i) / 30;
    return [x + Math.cos(a) * r, y + Math.sin(a) * r];
  });
  return (
    <g opacity={opacity}>
      <FadeGroup at={at} dur={0.4} y={0}>
        <SketchPath
          d={`M ${arcPts[0][0]} ${arcPts[0][1]} ${arcPts.slice(1).map((pt) => `L ${pt[0]} ${pt[1]}`).join(' ')}`}
          at={at}
          dur={0.6}
          stroke={C.muted}
          strokeWidth={5}
          roughness={0.8}
          seed={481}
        />
        <SketchPath
          d={`M ${x + Math.cos(start) * r * 0.86} ${y + Math.sin(start) * r * 0.86} ${arcPts
            .slice(0, Math.max(2, Math.round(30 * v) + 1))
            .map((pt) => `L ${x + (pt[0] - x) * 0.86} ${y + (pt[1] - y) * 0.86}`)
            .join(' ')}`}
          progress={1}
          stroke={color}
          strokeWidth={7}
          roughness={0.6}
          seed={483}
        />
        <SketchLine x1={x} y1={y} x2={nx} y2={ny} progress={eased} stroke={color} strokeWidth={6} roughness={0.5} seed={485} />
        <SketchCircle cx={x} cy={y} r={13} at={at} dur={0.3} stroke={color} fill={color} fillStyle="solid" strokeWidth={4} seed={487} />
        <SvgText x={x} y={y + r * 0.62} size={size} color={color}>{label}</SvgText>
      </FadeGroup>
    </g>
  );
};

export const Hourglass: React.FC<{
  x: number;
  y: number;
  h?: number;
  color?: string;
  at?: number;
  opacity?: number;
}> = ({x, y, h = 200, color = C.orange, at = 0, opacity = 1}) => {
  const w = h * 0.62;
  return (
    <FadeGroup at={at} dur={0.6} opacity={opacity} y={8}>
      <SketchLine x1={x - w / 2} y1={y - h / 2} x2={x + w / 2} y2={y - h / 2} at={at} dur={0.3} stroke={color} strokeWidth={6} seed={491} />
      <SketchLine x1={x - w / 2} y1={y + h / 2} x2={x + w / 2} y2={y + h / 2} at={at} dur={0.3} stroke={color} strokeWidth={6} seed={493} />
      <SketchPath d={`M ${x - w / 2 + 6} ${y - h / 2 + 6} Q ${x - w / 2 + 10} ${y - 8} ${x} ${y} Q ${x + w / 2 - 10} ${y - 8} ${x + w / 2 - 6} ${y - h / 2 + 6}`} at={at + 0.12} dur={0.45} stroke={color} strokeWidth={4.5} seed={495} />
      <SketchPath d={`M ${x - w / 2 + 6} ${y + h / 2 - 6} Q ${x - w / 2 + 10} ${y + 8} ${x} ${y} Q ${x + w / 2 - 10} ${y + 8} ${x + w / 2 - 6} ${y + h / 2 - 6}`} at={at + 0.2} dur={0.45} stroke={color} strokeWidth={4.5} seed={497} />
      <SketchPath d={`M ${x - 12} ${y + h / 2 - 22} Q ${x} ${y + h / 2 - 42} ${x + 12} ${y + h / 2 - 22} Z`} at={at + 0.35} dur={0.3} stroke={color} fill={color} fillStyle="solid" strokeWidth={3} seed={499} />
      <SketchLine x1={x} y1={y - 8} x2={x} y2={y + 8} at={at + 0.4} dur={0.2} stroke={color} strokeWidth={3} opacity={0.75} seed={503} />
    </FadeGroup>
  );
};

