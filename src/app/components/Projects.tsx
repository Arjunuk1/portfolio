import { useEffect, useRef, useState } from 'react';
import { Github, ExternalLink, Loader2, AlertCircle } from 'lucide-react';
import './Projects.css';

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  topics: string[];
  language: string | null;
  updated_at: string;
  fork: boolean;
  stargazers_count: number;
  languages_url: string;
}

interface ProjectData {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  github: string;
  gradient: string;
  stars: number;
}

export function Projects() {
  const [isVisible, setIsVisible] = useState(false);
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const gradients = [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
    "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)"
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    fetchGitHubProjects();
  }, []);

  const fetchGitHubProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('https://api.github.com/users/Arjunuk1/repos?per_page=100&sort=updated', {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
      });
      
      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('GitHub API rate limit reached. Please wait an hour and try again.');
        } else if (response.status === 404) {
          throw new Error('GitHub user not found. Please check the username.');
        } else {
          throw new Error(`Failed to fetch repositories (Status: ${response.status})`);
        }
      }

      const repos: GitHubRepo[] = await response.json();

      // Filter out forks and sort by updated date, take top 6
      const filteredRepos = repos
        .filter(repo => !repo.fork)
        .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
        .slice(0, 6);

      // If no repos found
      if (filteredRepos.length === 0) {
        throw new Error('No repositories found on your GitHub account.');
      }

      // Fetch languages for each repo
      const projectsWithLanguages = await Promise.all(
        filteredRepos.map(async (repo, index) => {
          let techStack: string[] = [];

          // Try to get languages from the languages API
          try {
            const langResponse = await fetch(repo.languages_url, {
              headers: {
                'Accept': 'application/vnd.github.v3+json',
              },
            });
            if (langResponse.ok) {
              const languages = await langResponse.json();
              techStack = Object.keys(languages).slice(0, 4);
            }
          } catch (e) {
            console.warn('Failed to fetch languages for', repo.name);
          }

          // Fallback to topics if no languages
          if (techStack.length === 0 && repo.topics && repo.topics.length > 0) {
            techStack = repo.topics.slice(0, 4);
          }

          // If still no tech stack, use main language
          if (techStack.length === 0 && repo.language) {
            techStack = [repo.language];
          }

          // Final fallback
          if (techStack.length === 0) {
            techStack = ['Code'];
          }

          return {
            id: repo.id,
            title: repo.name
              .split('-')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ')
              .split('_')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' '),
            description: repo.description || `Repository: ${repo.name}`,
            techStack,
            github: repo.html_url,
            gradient: gradients[index % gradients.length],
            stars: repo.stargazers_count
          };
        })
      );

      setProjects(projectsWithLanguages);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching GitHub projects:', err);
      setError(err instanceof Error ? err.message : 'Failed to load GitHub repositories');
      setLoading(false);
    }
  };

  return (
    <section id="projects" className="projects" ref={sectionRef}>
      <div className="projects-container">
        <h2 className={`section-title ${isVisible ? 'animate-in' : ''}`}>
          Featured Projects
        </h2>
        <p className={`section-subtitle ${isVisible ? 'animate-in' : ''}`}>
          Real-world applications built with modern technologies
        </p>
        
        {loading ? (
          <div className="loading-container">
            <Loader2 className="loading-spinner" size={48} />
            <p>Loading projects from GitHub...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <AlertCircle size={48} />
            <p>{error}</p>
            <button onClick={fetchGitHubProjects} className="retry-button">
              Try Again
            </button>
          </div>
        ) : (
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div 
                key={project.id} 
                className={`project-card ${isVisible ? 'animate-in' : ''}`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div 
                  className="project-gradient"
                  style={{ background: project.gradient }}
                ></div>
                
                <div className="project-content">
                  <div className="project-header">
                    <h3 className="project-title">{project.title}</h3>
                    {project.stars > 0 && (
                      <div className="project-stars">
                        <span>⭐</span>
                        <span>{project.stars}</span>
                      </div>
                    )}
                  </div>
                  <p className="project-description">{project.description}</p>
                  
                  {project.techStack.length > 0 && (
                    <div className="tech-stack">
                      {project.techStack.map((tech, i) => (
                        <span key={i} className="tech-badge">{tech}</span>
                      ))}
                    </div>
                  )}
                  
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <Github size={20} />
                    <span>View on GitHub</span>
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
