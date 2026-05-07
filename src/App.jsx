import { useEffect, useState } from 'react';

function App() {
  const [statusMessage, setStatusMessage] = useState('Checking backend...');
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => {
    async function fetchStatus() {
      try {
        const response = await fetch('http://localhost:3000/api/status');
        const data = await response.json();
        setStatusMessage(`${data.message} (${data.environment})`);
      } catch (error) {
        setStatusMessage('Backend unavailable');
      }
    }

    async function fetchProjects() {
      try {
        const response = await fetch('http://localhost:3000/api/projects');
        const data = await response.json();
        setProjects(Array.isArray(data) ? data : []);
      } catch (error) {
        setProjects([]);
      } finally {
        setLoadingProjects(false);
      }
    }

    fetchStatus();
    fetchProjects();
  }, []);

  return (
    <div className="app-shell">
      <header className="hero-section">
        <div>
          <p className="eyebrow">Hello, I&apos;m</p>
          <h1>Varshini</h1>
          <p className="hero-copy">
            I build clean, modern web experiences using React, Vite, and
            thoughtful design.
          </p>
          <a className="cta-button" href="#projects">
            View Projects
          </a>
        </div>
      </header>

      <main>
        <section className="section-card">
          <h2>Backend Status</h2>
          <p>{statusMessage}</p>
        </section>

        <section id="about" className="section-card">
          <h2>About Me</h2>
          <p>
            I&apos;m a frontend developer focused on building fast, accessible,
            and beautiful interfaces. I enjoy turning ideas into polished web
            products that make life easier for users.
          </p>
        </section>

        <section id="projects" className="section-card">
          <h2>Projects</h2>
          <div className="project-grid">
            {loadingProjects ? (
              <article>
                <h3>Loading projects...</h3>
                <p>The project list is coming from the backend API.</p>
              </article>
            ) : projects.length > 0 ? (
              projects.map((project) => (
                <article key={project.id}>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  {project.techStack?.length ? (
                    <p>
                      <strong>Tech stack:</strong> {project.techStack.join(', ')}
                    </p>
                  ) : null}
                  {project.github ? (
                    <p>
                      <a href={project.github} target="_blank" rel="noreferrer">
                        View code on GitHub
                      </a>
                    </p>
                  ) : null}
                </article>
              ))
            ) : (
              <article>
                <h3>No projects available</h3>
                <p>The portfolio API returned no projects.</p>
              </article>
            )}
          </div>
        </section>

        <section id="contact" className="section-card">
          <h2>Contact</h2>
          <p>
            Want to collaborate or request a project? Send me a message at{' '}
            <a href="mailto:hello@example.com">hello@example.com</a>.
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;
