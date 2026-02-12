"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { profile } from "@/content/profile";


declare global {
  interface Window {
    grecaptcha?: {
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
      ready: (cb: () => void) => void;
    };
  }
}

type Messages = {
  nav: Record<string, string>;
  hero: Record<string, string>;
  sections: Record<string, string>;
  contact: Record<string, string>;
};

const navKeys = ["home", "about", "experience", "skills", "projects", "certifications", "contact"];

function ThemeToggle() {
  const [theme, setTheme] = useState<string>(typeof document !== "undefined" ? document.documentElement.dataset.theme || "light" : "light");

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
  };

  return (
    <button className="btn" onClick={toggle} aria-label="Toggle theme" type="button">
      {theme === "dark" ? "☀️" : "🌙"}
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

  async function getRecaptchaToken() {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!siteKey || !window.grecaptcha) {
      return "missing-recaptcha";
    }

    const grecaptcha = window.grecaptcha;
    if (!grecaptcha) throw new Error(labels.captcha);
    return new Promise<string>((resolve, reject) => {
      grecaptcha.ready(async () => {
        try {
          const token = await grecaptcha.execute(siteKey, { action: "contact" });
          resolve(token);
        } catch {
          reject(new Error(labels.captcha));
        }
      });
    });
  }

  async function onSubmit(formData: FormData) {
    setStatus("loading");
    setError("");

    try {
      const token = await getRecaptchaToken();

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
          recaptchaToken: token,
          locale
        })
      });

      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error || labels.error);

      setStatus("success");
    } catch (submissionError) {
      setStatus("error");
      setError(submissionError instanceof Error ? submissionError.message : labels.error);
    }
  }

  return (
    <form
      className="card form-grid"
      action={(formData) => {
        void onSubmit(formData);
      }}
    >
      <input required name="name" placeholder={labels.name} className="input" maxLength={100} />
      <input required type="email" name="email" placeholder={labels.email} className="input" maxLength={120} />
      <input required name="subject" placeholder={labels.subject} className="input" maxLength={140} />
      <textarea required name="message" placeholder={labels.message} className="input min-h-32" maxLength={2000} />
      <button className="btn btn-primary" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "..." : labels.submit}
      </button>
      {status === "success" ? <p className="success">{labels.success}</p> : null}
      {status === "error" ? <p className="error">{error || labels.error}</p> : null}
    </form>
  );
}

export function PortfolioPage({ locale, messages }: { locale: Locale; messages: Messages }) {
  const [skillFilter, setSkillFilter] = useState<string>("All");
  const [activeExperience, setActiveExperience] = useState<number | null>(0);

  const filteredSkills = useMemo(() => {
    if (skillFilter === "All") return profile.skills;
    return { [skillFilter]: profile.skills[skillFilter as keyof typeof profile.skills] };
  }, [skillFilter]);

  return (
    <>
      <script src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}`} async defer />
      <header className="header">
        <div className="container nav-wrap">
          <a href="#home" className="logo">VR</a>
          <nav>
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
          <div className="actions">
            <LanguageToggle locale={locale} />
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="container stack">
        <section id="home" className="hero">
          <p className="muted">{messages.hero.eyebrow}</p>
          <h1>{profile.name}</h1>
          <h2>{profile.title}</h2>
          <p className="hero-copy">{messages.hero.value}</p>
          <div className="cta-row">
            <a href="#projects" className="btn btn-primary">{messages.hero.viewProjects}</a>
            <a href="/resume-vishnuraj.pdf" className="btn" download>{messages.hero.downloadResume}</a>
            <a href="#contact" className="btn">{messages.hero.contact}</a>
          </div>
        </section>

        <section id="about" className="section">
          <h3>{messages.sections.about}</h3>
          <p>{profile.summary}</p>
          <div className="chips">{profile.highlights.map((item) => <span className="chip" key={item}>{item}</span>)}</div>
        </section>

        <section id="experience" className="section">
          <h3>{messages.sections.experience}</h3>
          <div className="timeline">
            {profile.experiences.map((item, index) => (
              <article key={item.company} className="card reveal">
                <button className="timeline-head" type="button" onClick={() => setActiveExperience(activeExperience === index ? null : index)}>
                  <div>
                    <h4>{item.role} · {item.company}</h4>
                    <p className="muted">{item.period}</p>
                  </div>
                  <span>{activeExperience === index ? "−" : "+"}</span>
                </button>
                {activeExperience === index ? <ul>{item.achievements.map((a) => <li key={a}>{a}</li>)}</ul> : null}
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="section">
          <h3>{messages.sections.skills}</h3>
          <div className="chips">
            {["All", ...Object.keys(profile.skills)].map((category) => (
              <button key={category} type="button" onClick={() => setSkillFilter(category)} className={`chip ${skillFilter === category ? "chip-active" : ""}`}>
                {category}
              </button>
            ))}
          </div>
          <div className="grid">
            {Object.entries(filteredSkills).map(([category, values]) => (
              <article key={category} className="card">
                <h4>{category}</h4>
                <div className="chips">{values.map((skill) => <span key={skill} className="chip">{skill}</span>)}</div>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="section">
          <h3>{messages.sections.projects}</h3>
          <div className="grid">
            {profile.projects.map((project) => (
              <article className="card reveal" key={project.title}>
                <h4>{project.title}</h4>
                <p>{project.summary}</p>
                <div className="chips">{project.stack.map((tech) => <span key={tech} className="chip">{tech}</span>)}</div>
              </article>
            ))}
          </div>
        </section>

        <section id="certifications" className="section">
          <h3>{messages.sections.certifications}</h3>
          <div className="card"><ul>{profile.certifications.map((cert) => <li key={cert}>{cert}</li>)}</ul></div>
        </section>

        <section id="education" className="section">
          <h3>{messages.sections.education}</h3>
          <div className="card"><ul>{profile.education.map((e) => <li key={e}>{e}</li>)}</ul></div>
        </section>

        <section id="contact" className="section">
          <h3>{messages.sections.contact}</h3>
          <ContactForm locale={locale} labels={messages.contact} />
        </section>
      </main>
      <footer className="footer">
        <div className="container footer-wrap">
          <p>© {new Date().getFullYear()} {profile.name}</p>
          <div className="chips">
            <a className="chip" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="chip" href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
            <a className="chip" href={`mailto:${profile.email}`}>{profile.email}</a>
            <span className="chip">{profile.location}</span>
          </div>
        </div>
      </footer>
    </>
  );
}
