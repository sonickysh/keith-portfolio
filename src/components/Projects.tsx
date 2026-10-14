import Section from "./Section";
import { projects } from "../data/content";

export default function Projects() {
  return (
    <Section id="projects" title="Projects">
      {projects.map((p, i) => (
        <article key={p.id} className="sec-row">
          <div className="sec-gut sec-gut-card sec-mono" aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </div>
          <div className="sec-card">
            <h3 className="sec-h3">{p.title}</h3>
            <p className="sec-text">{p.blurb}</p>
            <ul className="sec-tags sec-mono" aria-label="Tech stack">
              {p.stack.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            {p.href && (
              <a className="sec-link" href={p.href} target="_blank" rel="noopener noreferrer">
                View project
              </a>
            )}
          </div>
        </article>
      ))}
    </Section>
  );
}
