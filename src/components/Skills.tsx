import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Section from "./Section";
import { skillCells, type SkillCellData } from "../data/skills";
import { useRunAll } from "../context/RunAll";
import "./Skills.css";

const STEP_MS = 180; // delay between output lines
const PAUSE_MS = 700; // pause before the next cell runs during "Run all"

// Tiny syntax highlighter: strings, comments and shell commands.
function highlight(line: string): ReactNode[] {
  return line.split(/("[^"]*"|#.*$|^!(?:npm|npx|pip|winget))/).map((part, i) => {
    if (!part) return null;
    if (part.startsWith('"')) return <span key={i} className="sk-s">{part}</span>;
    if (part.startsWith("#")) return <span key={i} className="sk-c">{part}</span>;
    if (part.startsWith("!")) return <span key={i} className="sk-k">{part}</span>;
    return part;
  });
}

type Phase = "idle" | "running" | "done";

type CellProps = {
  cell: SkillCellData;
  index: number;
  delay: number; // how long to wait when started by the hero's "Run all"
  reduce: boolean;
};

function SkillCell({ cell, index, delay, reduce }: CellProps) {
  const { runAllId } = useRunAll();
  const [shown, setShown] = useState(0); // output lines visible
  const [phase, setPhase] = useState<Phase>("idle");
  const [hasRun, setHasRun] = useState(false); // output takes no space until the cell has run
  const timers = useRef<number[]>([]);

  const clear = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }, []);

  const play = useCallback(
    (wait: number) => {
      clear();
      if (reduce) {
        setHasRun(true);
        setShown(cell.output.length);
        setPhase("done");
        return;
      }
      setShown(0);
      setPhase("idle");
      const at = (ms: number, fn: () => void) => {
        timers.current.push(window.setTimeout(fn, ms));
      };
      at(wait + 300, () => {
        setHasRun(true);
        setPhase("running");
      });
      cell.output.forEach((_, i) => at(wait + 700 + i * STEP_MS, () => setShown(i + 1)));
      at(wait + 700 + cell.output.length * STEP_MS, () => setPhase("done"));
    },
    [cell.output, reduce, clear],
  );

  // The hero's "Run all" button starts every cell, one after another.
  useEffect(() => {
    if (runAllId > 0) play(delay);
  }, [runAllId, delay, play]);

  useEffect(() => clear, [clear]);

  const label = phase === "running" ? "In [*]:" : phase === "done" ? `In [${index + 1}]:` : "In [ ]:";

  return (
    <div className="sec-row">
      <div className="sec-gut sec-gut-card sec-mono" aria-hidden="true">{label}</div>
      <div>
        <div className={`sk-cell${phase === "running" ? " sk-running" : ""}`}>
          <button
            type="button"
            className="sk-play"
            aria-label={`Run cell ${index + 1}`}
            onClick={() => play(0)}
          >
            <svg width="12" height="14" viewBox="0 0 10 12" aria-hidden="true">
              <path d="M1 0.5l8.5 5.5-8.5 5.5z" fill="currentColor" />
            </svg>
          </button>
          <div className="sk-body">
            {cell.code.map((line, i) => (
              <span key={i} className="sk-code">{highlight(line)}</span>
            ))}
          </div>
        </div>
        {hasRun && (
          <div className="sk-out">
            {cell.output.map((line, i) => (
              <span
                key={i}
                className={`sk-ln${i < shown ? " sk-on" : ""}${i === cell.output.length - 1 ? " sk-last" : ""}`}
              >
                {line}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Skills() {
  const [reduce] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  // Delay for each cell during "Run all" so they run one after another.
  const delays = skillCells.reduce<number[]>((acc, _cell, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + skillCells[i - 1].output.length * STEP_MS + PAUSE_MS);
    return acc;
  }, []);

  return (
    <Section id="skills" title="Skills">
      {skillCells.map((cell, i) => (
        <SkillCell key={cell.id} cell={cell} index={i} delay={delays[i]} reduce={reduce} />
      ))}
    </Section>
  );
}