import Section from "./Section";
import { contact } from "../data/content";

export default function Contact() {
  return (
    <Section id="contact" title="Contact">
      <div className="sec-row">
        <div className="sec-gut sec-gut-card sec-mono" aria-hidden="true">&nbsp;</div>
        <div className="sec-card">
          <p className="sec-text sec-lead">Got a project, a question or an opportunity? Say hello.</p>
          <ul className="sec-contact sec-mono">
            {contact.map((c) => (
              <li key={c.label}>
                <span className="sec-label">{c.label}</span>
                <a
                  className="sec-link"
                  href={c.href}
                  {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {c.value}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
