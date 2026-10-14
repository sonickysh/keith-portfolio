import "./styles/base.css";
import NotebookHero from "./components/NotebookHero";
import Projects from "./components/Projects";
import Leadership from "./components/Leadership";
import Contact from "./components/Contact";

export default function App() {
  return (
    <main className="page" id="top">
      <header className="site-header">
        <nav className="site-nav" aria-label="Main">
          <a className="brand" href="#top" aria-label="Keith, back to top">
            <svg className="brand-mark" viewBox="0 0 32 32" width="32" height="32" aria-hidden="true">
              <rect width="32" height="32" rx="3" fill="var(--cell)" />
              <rect width="4" height="32" rx="1.5" fill="var(--yellow)" />
              <path d="M13 8v16M13 16l9-8M15.5 14l6.5 10" stroke="var(--ink)" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </a>
          <div className="site-links">
            <a href="#projects">Projects</a>
            <a href="#leadership">Leadership</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>
      </header>
      <NotebookHero />
      <Projects />
      <Leadership />
      <Contact />
      <p className="foot sec-mono">Keith · built with React + TypeScript</p>
    </main>
  );
}
