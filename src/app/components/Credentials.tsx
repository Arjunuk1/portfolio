import { useCallback, useEffect, useRef, useState } from 'react';
import { GraduationCap, Trophy, Github as GithubIcon } from 'lucide-react';
import { ActivityGraph } from './ActivityGraph';
import './Credentials.css';

interface GhStats {
  repos: number;
  followers: number;
  following: number;
  since: string;
}

const GRAPH_URL =
  'https://github-readme-activity-graph.vercel.app/graph?username=Arjunuk1&bg_color=00000000&color=9aa2b6&line=5fd4c0&point=ff8a4c&area=true&area_color=5fd4c0&title_color=edeff4&hide_border=true&hide_title=true';

export function Credentials() {
  const [isVisible, setIsVisible] = useState(false);
  const [gh, setGh] = useState<GhStats | null>(null);
  const [ghError, setGhError] = useState(false);
  const [graphKey, setGraphKey] = useState(0);
  const [useLiveGraph, setUseLiveGraph] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const graphRef = useRef<HTMLDivElement>(null);

  const handleGraphFallback = useCallback(() => {
    setUseLiveGraph(false);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  useEffect(() => {
    const graphObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGraphKey((k) => k + 1);
        }
      },
      { threshold: 0.2 }
    );
    if (graphRef.current) graphObserver.observe(graphRef.current);
    return () => {
      if (graphRef.current) graphObserver.unobserve(graphRef.current);
    };
  }, []);

  useEffect(() => {
    const githubToken = import.meta.env.VITE_GITHUB_TOKEN;
    const headers: Record<string, string> = { Accept: 'application/vnd.github.v3+json' };
    if (githubToken) {
      headers['Authorization'] = `token ${githubToken}`;
    }

    fetch('https://api.github.com/users/Arjunuk1', { headers })
      .then((res) => {
        if (!res.ok) throw new Error('rate limited');
        return res.json();
      })
      .then((data) => {
        setGh({
          repos: data.public_repos,
          followers: data.followers,
          following: data.following,
          since: new Date(data.created_at).getFullYear().toString(),
        });
      })
      .catch(() => setGhError(true));
  }, []);

  return (
    <section id="credentials" className="credentials" ref={sectionRef}>
      <div className="credentials-container">
        <div className="credentials-head">
          <span className={`section-eyebrow ${isVisible ? 'animate-in' : ''}`}>03 // Credentials</span>
          <h2 className={`section-title ${isVisible ? 'animate-in' : ''}`}>
            <span>Where it's verified</span>
          </h2>
          <p className={`section-subtitle ${isVisible ? 'animate-in' : ''}`}>
            Education, practice, and activity — pulled from real profiles
          </p>
        </div>

        <div className="credentials-grid">
          
          <div className={`cred-panel reveal ${isVisible ? 'animate-in' : ''}`} style={{ transitionDelay: '0s' }}>
            <div className="cred-header">
              <GraduationCap size={18} />
              <span>education.log</span>
            </div>
            <div className="cred-row">
              <span className="cred-label">INSTITUTION</span>
              <span className="cred-value">Chitkara University</span>
            </div>
            <div className="cred-row">
              <span className="cred-label">DEGREE</span>
              <span className="cred-value">BE — Computer Science</span>
            </div>
            <div className="cred-row">
              <span className="cred-label">YEAR</span>
              <span className="cred-value">3rd Year</span>
            </div>
            <div className="cred-row">
              <span className="cred-label">CGPA</span>
              <span className="cred-value">8.82 <span className="cred-note">(through 4th sem)</span></span>
            </div>
          </div>

          
          <div className={`cred-panel reveal ${isVisible ? 'animate-in' : ''}`} style={{ transitionDelay: '0.1s' }}>
            <div className="cred-header">
              <Trophy size={18} />
              <span>practice.log</span>
            </div>
            <div className="cred-row">
              <span className="cred-label">PLATFORM</span>
              <span className="cred-value">LeetCode</span>
            </div>
            <div className="cred-row">
              <span className="cred-label">SOLVED</span>
              <span className="cred-value">140+ problems</span>
            </div>
            <div className="cred-row">
              <span className="cred-label">STREAK</span>
              <span className="cred-value">50 Days Badge · 2026</span>
            </div>
            <div className="cred-row">
              <span className="cred-label">FOCUS</span>
              <span className="cred-value">Arrays, Strings, DP</span>
            </div>
            <a
              href="https://leetcode.com/u/Arjuncoder01/"
              target="_blank"
              rel="noopener noreferrer"
              className="cred-link cursor-target"
            >
              View LeetCode profile →
            </a>
          </div>

          
          <div className={`cred-panel reveal ${isVisible ? 'animate-in' : ''}`} style={{ transitionDelay: '0.2s' }}>
            <div className="cred-header">
              <GithubIcon size={18} />
              <span>github.log</span>
              <span className="cred-live" />
            </div>
            {ghError ? (
              <p className="cred-error">GitHub API unavailable right now — try again shortly.</p>
            ) : (
              <>
                <div className="cred-row">
                  <span className="cred-label">REPOSITORIES</span>
                  <span className="cred-value">{gh ? gh.repos : '—'}</span>
                </div>
                <div className="cred-row">
                  <span className="cred-label">FOLLOWERS</span>
                  <span className="cred-value">{gh ? gh.followers : '—'}</span>
                </div>
                <div className="cred-row">
                  <span className="cred-label">FOLLOWING</span>
                  <span className="cred-value">{gh ? gh.following : '—'}</span>
                </div>
                <div className="cred-row">
                  <span className="cred-label">MEMBER SINCE</span>
                  <span className="cred-value">{gh ? gh.since : '—'}</span>
                </div>
              </>
            )}
            <a
              href="https://github.com/Arjunuk1"
              target="_blank"
              rel="noopener noreferrer"
              className="cred-link cursor-target"
            >
              View GitHub profile →
            </a>
          </div>
        </div>

        <div ref={graphRef} className={`cred-graph reveal ${isVisible ? 'animate-in' : ''}`} style={{ transitionDelay: '0.3s' }}>
          <div className="cred-header">
            <GithubIcon size={18} />
            <span>activity.log</span>
            <span className="cred-live" />
          </div>
          <div className="cred-graph-media">
            {useLiveGraph ? (
              <ActivityGraph username="Arjunuk1" replayKey={graphKey} onFallback={handleGraphFallback} />
            ) : (
              <>
                <img
                  src={GRAPH_URL}
                  alt="Arjun's GitHub contribution activity graph"
                  className="cred-graph-img"
                />
                <div className="cred-graph-mask">
                  <div key={graphKey} className="cred-graph-sweep" />
                </div>
              </>
            )}
          </div>
          <a
            href="https://github.com/Arjunuk1"
            target="_blank"
            rel="noopener noreferrer"
            className="cred-link cursor-target"
          >
            View full contribution history →
          </a>
        </div>
      </div>
    </section>
  );
}
