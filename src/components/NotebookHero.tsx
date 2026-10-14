import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import "./NotebookHero.css";

type Status = "idle" | "running" | "done";

const LINE_MS = 170; // delay between code lines appearing
const RUN_MS = 900; // how long the "running" state lasts

// Placeholder copy: edit these lines to match you.
const LINES: ReactNode[] = [
  <>
    <span>keith</span> = <span className="nb-k">Person</span>(
  </>,
  <>
    {"    studying="}
    <span className="nb-s">"computer science"</span>,
  </>,
  <>
    {"    builds=["}
    <span className="nb-s">"web apps"</span>, <span className="nb-s">"ML models"</span>],
  </>,
  <>
    {"    likes="}
    <span className="nb-s">"build things that matter"</span>,
  </>,
  <>)</>,
  <>{" "}</>,
  <>keith.introduce()</>,
];

function usePrefersReducedMotion(): boolean {
  const [reduce, setReduce] = useState<boolean>(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduce(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduce;
}

const TITLE = "Hi, I'm Keith.";
const SUB =
  "I build web apps and ML models, and I'm drawn to the intersection of AI and social good. I'm always learning something new, and I'm looking for opportunities in software engineering and data/ML where I can build things that matter.";
const TYPE_MS = 70; // delay between typed characters in the title
const SUB_MS = 28; // delay between typed characters in the tagline

// Types `text` out one character at a time whenever `run` turns true.
function useTypewriter(text: string, run: boolean, speedMs: number, reduce: boolean, startDelay = 300) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!run) {
      setCount(0);
      return;
    }
    if (reduce) {
      setCount(text.length);
      return;
    }
    setCount(0);
    let i = 0;
    let interval: number | undefined;
    const start = window.setTimeout(() => {
      interval = window.setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length) window.clearInterval(interval);
      }, speedMs);
    }, startDelay);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(interval);
    };
  }, [text, run, speedMs, reduce, startDelay]);

  return { count, done: run && count >= text.length };
}

// Typed characters are visible; the rest stay invisible but keep their space,
// so the text never re-wraps or shifts while it types.
function TypedText({ text, count, caret }: { text: string; count: number; caret: boolean }) {
  return (
    <span aria-hidden="true">
      {text.slice(0, count)}
      {caret && <span className="nb-caret" />}
      <span className="nb-rest">{text.slice(count)}</span>
    </span>
  );
}

export default function NotebookHero() {
  const reduce = usePrefersReducedMotion();
  const [shown, setShown] = useState(0); // how many code lines are visible
  const [status, setStatus] = useState<Status>("idle");
  const [runs, setRuns] = useState(0);
  const runTimer = useRef<number | undefined>(undefined);
  const title = useTypewriter(TITLE, status === "done", TYPE_MS, reduce);
  const sub = useTypewriter(SUB, title.done, SUB_MS, reduce, 200);

  // Reveal the code one line at a time.
  useEffect(() => {
    if (shown >= LINES.length) return;
    const id = window.setTimeout(() => setShown((s) => s + 1), reduce ? 0 : LINE_MS);
    return () => window.clearTimeout(id);
  }, [shown, reduce]);

  const run = useCallback(() => {
    if (status === "running") return;
    setStatus("running");
    runTimer.current = window.setTimeout(
      () => {
        setRuns((r) => r + 1);
        setStatus("done");
      },
      reduce ? 0 : RUN_MS,
    );
  }, [status, reduce]);

  // Run once automatically after the code has appeared.
  useEffect(() => {
    if (shown < LINES.length || runs > 0 || status !== "idle") return;
    const id = window.setTimeout(run, reduce ? 0 : 500);
    return () => window.clearTimeout(id);
  }, [shown, runs, status, run, reduce]);

  useEffect(() => () => window.clearTimeout(runTimer.current), []);

  const inLabel = status === "running" ? "In [*]:" : runs > 0 ? `In [${runs}]:` : "In [ ]:";
  const outLabel = status === "done" ? `Out[${runs}]:` : "";

  return (
    <section aria-labelledby="hero-title">
      <div className="nb-bar nb-mono">
        <span>keith.ipynb</span>
        <button className="nb-run" type="button" onClick={run}>
          <svg width="10" height="12" viewBox="0 0 10 12" aria-hidden="true">
            <path d="M0 0l10 6-10 6z" fill="currentColor" />
          </svg>
          Run
        </button>
      </div>

      <div className="nb-row">
        <div className="nb-gut nb-mono">{inLabel}</div>
        <div
          className={`nb-cell nb-mono${status === "running" ? " nb-running" : ""}`}
          role="img"
          aria-label="Python code: keith = Person(...), then keith.introduce()"
        >
          {LINES.map((line, i) => (
            <span key={i} className={`nb-ln${i < shown ? " nb-on" : ""}`}>
              {line}
            </span>
          ))}
        </div>
      </div>

      <div className="nb-row">
        <div className="nb-gut nb-mono">{outLabel}</div>
        <div className={`nb-out${status === "done" ? " nb-show" : ""}`}>
          <h1 id="hero-title" className="nb-title" aria-label={TITLE}>
            <TypedText text={TITLE} count={title.count} caret={status === "done" && !title.done} />
          </h1>
          <p className="nb-sub">
            <span className="nb-sr">{SUB}</span>
            <TypedText text={SUB} count={sub.count} caret={title.done} />
          </p>
          <div className={`nb-after${sub.done ? " nb-in" : ""}`}>
            <a className="nb-btn" href="#contact">Contact me</a>
          </div>
        </div>
      </div>
    </section>
  );
}
