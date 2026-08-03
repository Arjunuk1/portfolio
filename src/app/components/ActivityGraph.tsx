import { useEffect, useRef, useState } from 'react';

interface DayPoint {
  date: string;
  count: number;
}

interface ActivityGraphProps {
  username: string;
  replayKey: number;
  onFallback: () => void;
}

const WIDTH = 760;
const HEIGHT = 220;
const PAD_LEFT = 34;
const PAD_RIGHT = 12;
const PAD_TOP = 16;
const PAD_BOTTOM = 34;
const PLOT_W = WIDTH - PAD_LEFT - PAD_RIGHT;
const PLOT_H = HEIGHT - PAD_TOP - PAD_BOTTOM;

function buildPath(points: { x: number; y: number }[]) {
  return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
}

export function ActivityGraph({ username, replayKey, onFallback }: ActivityGraphProps) {
  const [days, setDays] = useState<DayPoint[] | null>(null);
  const [failed, setFailed] = useState(false);
  const fetchedRef = useRef(false);
  const motionRef = useRef<SVGAnimateMotionElement | null>(null);
  const opacityRef = useRef<SVGAnimateElement | null>(null);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const token = import.meta.env.VITE_GITHUB_TOKEN;
    if (!token) {
      setFailed(true);
      onFallback();
      return;
    }

    const to = new Date();
    const from = new Date();
    from.setDate(from.getDate() - 29);

    const query = `
      query($login: String!, $from: DateTime!, $to: DateTime!) {
        user(login: $login) {
          contributionsCollection(from: $from, to: $to) {
            contributionCalendar {
              weeks {
                contributionDays {
                  date
                  contributionCount
                }
              }
            }
          }
        }
      }
    `;

    fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { login: username, from: from.toISOString(), to: to.toISOString() },
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('graphql request failed');
        return res.json();
      })
      .then((json) => {
        const weeks = json?.data?.user?.contributionsCollection?.contributionCalendar?.weeks;
        if (!weeks) throw new Error('no data');
        const flat: DayPoint[] = weeks
          .flatMap((w: { contributionDays: { date: string; contributionCount: number }[] }) => w.contributionDays)
          .map((d: { date: string; contributionCount: number }) => ({ date: d.date, count: d.contributionCount }));
        setDays(flat.slice(-30));
      })
      .catch(() => {
        setFailed(true);
        onFallback();
      });
  }, [username, onFallback]);

  useEffect(() => {
    if (!days) return;
    const motionEl = motionRef.current;
    const opacityEl = opacityRef.current;
    if (motionEl && 'beginElement' in motionEl) {
      (motionEl as unknown as { beginElement: () => void }).beginElement();
    }
    if (opacityEl && 'beginElement' in opacityEl) {
      (opacityEl as unknown as { beginElement: () => void }).beginElement();
    }
  }, [replayKey, days]);

  if (failed || !days) {
    return null;
  }

  const max = Math.max(...days.map((d) => d.count), 1);
  const stepX = PLOT_W / (days.length - 1);

  const points = days.map((d, i) => ({
    x: PAD_LEFT + i * stepX,
    y: PAD_TOP + PLOT_H - (d.count / max) * PLOT_H,
  }));

  const linePath = buildPath(points);
  const areaPath =
    linePath +
    ` L ${points[points.length - 1].x.toFixed(1)} ${(PAD_TOP + PLOT_H).toFixed(1)}` +
    ` L ${points[0].x.toFixed(1)} ${(PAD_TOP + PLOT_H).toFixed(1)} Z`;

  const yTicks = [0, Math.round(max / 2), max];

  return (
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="activity-graph-svg" role="img" aria-label="GitHub contribution activity, last 30 days">
      <defs>
        <linearGradient id="activityAreaFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--structure)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--structure)" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="activityGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#eafff6" stopOpacity="1" />
          <stop offset="55%" stopColor="var(--structure)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--structure)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {yTicks.map((t, i) => {
        const y = PAD_TOP + PLOT_H - (t / max) * PLOT_H;
        return (
          <g key={i}>
            <line x1={PAD_LEFT} y1={y} x2={WIDTH - PAD_RIGHT} y2={y} className="activity-graph-gridline" />
            <text x={PAD_LEFT - 8} y={y + 3} className="activity-graph-tick" textAnchor="end">
              {t}
            </text>
          </g>
        );
      })}

      <path d={areaPath} fill="url(#activityAreaFill)" stroke="none" />
      <path id="activityLinePath" d={linePath} fill="none" stroke="var(--structure)" strokeWidth="2" />

      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3" className="activity-graph-dot" />
      ))}

      {days.map((d, i) => {
        if (i % 3 !== 0) return null;
        return (
          <text
            key={d.date}
            x={points[i].x}
            y={HEIGHT - PAD_BOTTOM + 18}
            className="activity-graph-tick"
            textAnchor="middle"
          >
            {new Date(d.date).getDate()}
          </text>
        );
      })}

      <circle r="6" fill="url(#activityGlow)" className="activity-graph-glow">
        <animateMotion ref={motionRef} dur="1.8s" begin="indefinite" fill="freeze" calcMode="linear">
          <mpath href="#activityLinePath" xlinkHref="#activityLinePath" />
        </animateMotion>
        <animate
          ref={opacityRef}
          attributeName="opacity"
          values="0;1;1;0"
          keyTimes="0;0.08;0.85;1"
          dur="1.8s"
          begin="indefinite"
          fill="freeze"
        />
      </circle>
    </svg>
  );
}
