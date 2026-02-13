"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { profile } from "@/content/profile";

type Messages = {
  nav: Record<string, string>;
  hero: Record<string, string>;
  sections: Record<string, string>;
  stats: Record<string, string>;
  skills: Record<string, string>;
  projects: Record<string, string>;
  certifications: Record<string, string>;
  languages: Record<string, string>;
  education: Record<string, string>;
  quickLinks: Record<string, string>;
  common: Record<string, string>;
  contact: Record<string, string>;
};

const navKeys = ["home", "about", "stats", "experience", "skills", "projects", "certifications", "languages", "education", "contact"];

function CurrentYear() {
  return <>{new Date().getFullYear()}</>;
}

function ThemeToggle() {
  const [theme, setTheme] = useState<string>(() => {
    if (typeof window === "undefined") return "dark";
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
  };

  return (
    <button className="btn" onClick={toggle} aria-label="Toggle theme" type="button" suppressHydrationWarning>
      {theme === "dark" ? "☀" : "☾"}
    </button>
  );
}

function LanguageToggle({ locale }: { locale: Locale }) {
  return (
    <Link href={locale === "en" ? "/ar" : "/en"} className="btn" aria-label="Switch language">
      {locale === "en" ? "AR" : "EN"}
    </Link>
  );
}

function ContactForm({ locale, labels }: { locale: Locale; labels: Record<string, string> }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string>("");
  const [captchaReady, setCaptchaReady] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;
    const checkReady = () => {
      const widget = formRef.current?.querySelector("altcha-widget");
      if (!widget) return;
      setCaptchaReady(customElements.get("altcha-widget") !== undefined);
      if (customElements.get("altcha-widget") !== undefined && timer) {
        clearInterval(timer);
      }
    };

    checkReady();
    timer = setInterval(checkReady, 250);

    const form = formRef.current;
    const widget = form?.querySelector("altcha-widget");
    const onStateChange = (event: Event) => {
      const detail = (event as CustomEvent<{ state?: string }>).detail;
      setCaptchaVerified(detail?.state === "verified");
    };
    widget?.addEventListener("statechange", onStateChange);

    return () => {
      if (timer) clearInterval(timer);
      widget?.removeEventListener("statechange", onStateChange);
    };
  }, []);

  async function onSubmit(formData: FormData) {
    setStatus("loading");
    setError("");

    try {
      if (!captchaReady) {
        throw new Error(labels.captcha);
      }

      const altchaPayload = String(formData.get("altcha") || "");
      if (!captchaVerified || !altchaPayload) {
        throw new Error(labels.captcha);
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
          altchaPayload,
          locale
        })
      });

      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error || labels.error);

      setStatus("success");
      setCaptchaVerified(false);
      formRef.current?.reset();
    } catch (submissionError) {
      setStatus("error");
      setError(submissionError instanceof Error ? submissionError.message : labels.error);
    }
  }

  return (
    <form
      ref={formRef}
      className="card form-grid"
      action={(formData) => {
        void onSubmit(formData);
      }}
    >
      <input required name="name" placeholder={labels.name} className="input" maxLength={100} />
      <input required type="email" name="email" placeholder={labels.email} className="input" maxLength={120} />
      <input required name="subject" placeholder={labels.subject} className="input" maxLength={140} />
      <textarea required name="message" placeholder={labels.message} className="input min-h-32" maxLength={2000} />
      {/* @ts-expect-error Custom element provided by ALTCHA script */}
      <altcha-widget challengeurl="/api/altcha/challenge" hidelogo hidefooter />
      <button className="btn btn-primary" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "..." : labels.submit}
      </button>
      {status === "success" ? <p className="success">{labels.success}</p> : null}
      {status === "error" ? <p className="error">{error || labels.error}</p> : null}
    </form>
  );
}

export function PortfolioPage({ locale, messages }: { locale: Locale; messages: Messages }) {
  const [skillFilter, setSkillFilter] = useState<string>(messages.skills.all);
  const [activeExperience, setActiveExperience] = useState<number | null>(0);
  const [certFilter, setCertFilter] = useState<string>(messages.certifications.all);
  const [certSort, setCertSort] = useState<"desc" | "asc">("desc");

  const filteredSkills = useMemo(() => {
    if (skillFilter === messages.skills.all) return profile.skills;
    return { [skillFilter]: profile.skills[skillFilter as keyof typeof profile.skills] };
  }, [skillFilter, messages.skills.all]);

  const filteredCerts = useMemo(() => {
    let certs = profile.certifications;
    if (certFilter === "All") {
      certs = profile.certifications;
    } else if (certFilter === "AWS") {
      certs = profile.certifications.filter(c => c.name.includes("AWS"));
    } else if (certFilter === "Security") {
      certs = profile.certifications.filter(c => c.name.includes("Security") || c.name.includes("ISO") || c.name.includes("PCI"));
    } else if (certFilter === "AI/ML") {
      certs = profile.certifications.filter(c => c.name.includes("AI") || c.name.includes("ML") || c.name.includes("LangChain") || c.name.includes("MongoDB"));
    } else if (certFilter === "Architecture") {
      certs = profile.certifications.filter(c => c.name.includes("Architecture") || c.name.includes("Software"));
    }
    
    // Sort by date (default descending - newest first)
    return [...certs].sort((a, b) => {
      const dateA = a.date || "";
      const dateB = b.date || "";
      if (certSort === "desc") {
        return dateB.localeCompare(dateA);
      } else {
        return dateA.localeCompare(dateB);
      }
    });
  }, [certFilter, certSort]);

  const certFilters = ["All", "AWS", "Security", "AI/ML", "Architecture"];

  return (
    <>
      <script src="https://cdn.jsdelivr.net/npm/altcha/dist/altcha.min.js" type="module" async defer />
      <header className="header">
        <div className="container nav-wrap">
          <a href="#home" className="logo">
            <img src="/icon.png" alt="Vishnuraj" width={40} height={40} />
          </a>
          <nav className="nav-desktop">
            <ul className="nav-list">
              {navKeys.map((key) => (
                <li key={key}>
                  <a href={`#${key}`} className="nav-link">
                    {messages.nav[key]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="nav-mobile">
            <button className="mobile-menu-btn" aria-label="Menu">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
          <div className="actions">
            <LanguageToggle locale={locale} />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container stack">
        <section id="home" className="hero section">
          <div className="hero-left">
            <div className="hero-image"></div>
          </div>
          <div className="hero-right">
            <p className="muted uppercase">{profile.location}</p>
            <h1>{profile.name}</h1>
            <h2>{profile.title}</h2>
            <p className="hero-copy">{profile.headline}</p>
            <div className="cta-row">
              <a href="#projects" className="btn btn-primary">{messages.hero.viewProjects}</a>
              <a href="/resume-vishnuraj.pdf" className="btn" download>{messages.hero.downloadResume}</a>
              <a href="#contact" className="btn">{messages.hero.contact}</a>
            </div>
          </div>
        </section>

        <section className="quick-links-section">
          <div className="quick-links">
            <a href={profile.linkedin} target="_blank" rel="noreferrer">{messages.quickLinks.linkedIn}</a>
            <a href={profile.github} target="_blank" rel="noreferrer">{messages.quickLinks.gitHub}</a>
            <a href={profile.aboutMe} target="_blank" rel="noreferrer">{messages.quickLinks.aboutMe}</a>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <span className="social-badge">{messages.quickLinks.awsCertified}</span>
            <span className="social-badge">{messages.quickLinks.csm}</span>
          </div>
        </section>

        <section id="about" className="section">
          <h3>{messages.sections.about}</h3>
          <p className="about-summary">{profile.summary}</p>
          <div className="chips">{profile.highlights.map((item) => <span className="chip chip-highlight" key={item}>{item}</span>)}</div>
        </section>

        <section id="stats" className="section">
          <h3>{messages.sections.stats}</h3>
          <div className="stats-grid">
            <div className="stat-card card">
              <span className="stat-number">{profile.stats.yearsExperience}</span>
              <span className="stat-label">{messages.stats.yearsExperience}</span>
            </div>
            <div className="stat-card card">
              <span className="stat-number">{profile.stats.certifications}</span>
              <span className="stat-label">{messages.stats.certifications}</span>
            </div>
            <div className="stat-card card">
              <span className="stat-number">{profile.stats.companies}</span>
              <span className="stat-label">{messages.stats.companies}</span>
            </div>
            <div className="stat-card card">
              <span className="stat-number">{profile.projects.length}</span>
              <span className="stat-label">{messages.stats.projectsDelivered}</span>
            </div>
          </div>
        </section>

        <section id="experience" className="section">
          <h3>{messages.sections.experience}</h3>
          <div className="timeline">
            {profile.experiences.map((item, index) => (
              <article key={`${item.company}-${index}`} className="card timeline-card reveal">
                <button className="timeline-head" type="button" onClick={() => setActiveExperience(activeExperience === index ? null : index)}>
                  {item.logo && (
                    <img 
                      src={item.logo} 
                      alt={`${item.company} logo`}
                      className="company-logo"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  )}
                  <div className="timeline-header-content">
                    <div className="timeline-company">{item.company}</div>
                    <h4>{item.role}</h4>
                    <p className="muted timeline-period">{item.period} · {item.location}</p>
                  </div>
                  <span className="timeline-icon">{activeExperience === index ? "−" : "+"}</span>
                </button>
                {activeExperience === index && (
                  <div className="timeline-content">
                    <ul>
                      {item.achievements.map((achievement, i) => <li key={i}>{achievement}</li>)}
                    </ul>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="section">
          <h3>{messages.sections.skills}</h3>
          <div className="chips skill-filters">
            {[messages.skills.all, ...Object.keys(profile.skills)].map((category) => (
              <button key={category} type="button" onClick={() => setSkillFilter(category)} className={`chip ${skillFilter === category ? "chip-active" : ""}`}>
                {category}
              </button>
            ))}
          </div>
          <div className="grid skills-grid">
            {Object.entries(filteredSkills).map(([category, values]) => (
              <article key={category} className="card skill-card">
                <h4 className="skill-category">{category}</h4>
                <div className="chips">{values.map((skill) => <span key={skill} className="chip">{skill}</span>)}</div>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="section">
          <h3>{messages.sections.projects}</h3>
          <div className="grid projects-grid">
            {profile.projects.map((project, index) => (
              <article className="card project-card reveal" key={`${project.title}-${index}`}>
                <div className="project-header">
                  <h4>{project.title}</h4>
                  <span className="project-year">{project.year}</span>
                </div>
                <p className="project-summary">{project.summary}</p>
                <div className="chips project-stack">
                  {project.stack.map((tech) => <span key={tech} className="chip chip-small">{tech}</span>)}
                </div>
                {project.href && (
                  <a href={project.href} target="_blank" rel="noreferrer" className="project-link">
                    {messages.projects.viewProject}
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>

        <section id="certifications" className="section">
          <h3>{messages.sections.certifications}</h3>
          <div className="cert-filters-wrap">
            <div className="cert-filters">
              {certFilters.map((filter) => (
                <button key={filter} type="button" onClick={() => setCertFilter(filter)} className={`chip ${certFilter === filter ? "chip-active" : ""}`}>
                  {messages.certifications[filter.toLowerCase() as keyof typeof messages.certifications] || filter}
                </button>
              ))}
            </div>
            <div className="cert-sort">
              <select 
                value={certSort} 
                onChange={(e) => setCertSort(e.target.value as "desc" | "asc")}
                className="chip sort-select"
              >
                <option value="desc">{messages.certifications.newestFirst}</option>
                <option value="asc">{messages.certifications.oldestFirst}</option>
              </select>
            </div>
          </div>
          <div className="cert-grid">
            {filteredCerts.map((cert, index) => (
              <div key={`${cert.name}-${index}`} className="card cert-card">
                {cert.logo ? (
                  <img 
                    src={cert.logo} 
                    alt={`${cert.authority} logo`}
                    className="cert-logo"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <span className="cert-icon">🏆</span>
                )}
                <div className="cert-text-content">
                  {cert.url ? (
                    <a href={cert.url} target="_blank" rel="noreferrer" className="cert-authority-link">
                      {cert.authority}
                    </a>
                  ) : (
                    <p className="cert-authority-text">{cert.authority}</p>
                  )}
                  <h4 className="cert-name">{cert.name}</h4>
                  {cert.expires && <p className="cert-expires">{messages.certifications.expires} {cert.expires}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="languages" className="section">
          <h3>{messages.sections.languages}</h3>
          <div className="languages-grid">
            {profile.languages.map((lang, index) => (
              <div key={`${lang.name}-${index}`} className="card language-card">
                <div className="language-icon">
                  {lang.name === 'English' ? '🇬🇧' : lang.name === 'Malayalam' ? '🇮🇳' : lang.name === 'Tamil' ? '🇮🇳' : lang.name === 'Hindi' ? '🇮🇳' : '🇪🇸'}
                </div>
                <div className="language-content">
                  <div className="language-name">{lang.name}</div>
                  <div className="language-proficiency">{lang.proficiency}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="education" className="section">
          <h3>{messages.sections.education}</h3>
          <div className="education-grid">
            {profile.education.map((edu, index) => (
              <div key={`${edu.school}-${index}`} className="card education-card">
                <div className="education-icon">🎓</div>
                <div className="education-content">
                  <h4>{edu.school}</h4>
                  <p className="education-degree">{edu.degree} {messages.education.in} {edu.field}</p>
                  <p className="muted">{edu.period}</p>
                  {edu.notes && <p className="education-notes">{edu.notes}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="section">
          <h3>{messages.sections.contact}</h3>
          <div className="contact-grid">
            <div className="contact-bg-image"></div>
            <ContactForm locale={locale} labels={messages.contact} />
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-wrap">
          <p>© <CurrentYear /> {profile.name}</p>
          <div className="chips">
            <a className="chip" href={profile.linkedin} target="_blank" rel="noreferrer">{messages.quickLinks.linkedIn.replace(" ↗", "")}</a>
            <a className="chip" href={profile.github} target="_blank" rel="noreferrer">{messages.quickLinks.gitHub.replace(" ↗", "")}</a>
            <a className="chip" href={`mailto:${profile.email}`}>{messages.contact.email}</a>
            <span className="chip">{profile.location}</span>
          </div>
        </div>
      </footer>
    </>
  );
}
