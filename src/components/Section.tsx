import type { ReactNode } from "react";
import "./Section.css";

type Props = { id: string; title: string; children: ReactNode };

// A "markdown cell" heading followed by the section's content.
export default function Section({ id, title, children }: Props) {
  return (
    <section id={id} className="sec" aria-labelledby={`${id}-title`}>
      <div className="sec-row">
        <div className="sec-gut sec-mono" aria-hidden="true">md</div>
        <h2 id={`${id}-title`} className="sec-title">{title}</h2>
      </div>
      {children}
    </section>
  );
}
