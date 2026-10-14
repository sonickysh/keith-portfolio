import Section from "./Section";
import { roles } from "../data/content";

export default function Leadership() {
  return (
    <Section id="leadership" title="Leadership">
      {roles.map((r, i) => (
        <article key={r.id} className="sec-row">
          <div className="sec-gut sec-gut-card sec-mono" aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </div>
          <div className="sec-card">
            <h3 className="sec-h3">{r.role}</h3>
            <p className="sec-org sec-mono">{r.org}</p>
            <p className="sec-text">{r.blurb}</p>
          </div>
        </article>
      ))}
    </Section>
  );
}
