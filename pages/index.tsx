import React, { useState, useEffect, useRef, useCallback } from 'react';
import Head from 'next/head';
import { Menu, X, ArrowRight, ArrowUpRight, Mail, Linkedin, Github } from 'lucide-react';

/* =================================================================
   HOOKS
   ================================================================= */

// Scroll reveal for .reveal elements
function useRevealOnScroll() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            const d = el.dataset.delay || '0';
            setTimeout(() => el.classList.add('revealed'), parseFloat(d) * 1000);
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// Word reveal on scroll
function useWordReveal(containerRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const words = container.querySelectorAll('.word-reveal-word');
    if (!words.length) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const windowH = window.innerHeight;
      // progress: 0 when top enters viewport, 1 when bottom leaves
      const start = windowH * 0.85;
      const end = windowH * 0.15;
      const progress = Math.max(0, Math.min(1, (start - rect.top) / (start - end + rect.height * 0.5)));
      const activeCount = Math.floor(progress * words.length);

      words.forEach((w, i) => {
        if (i < activeCount) {
          w.classList.add('active');
        } else {
          w.classList.remove('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [containerRef]);
}

// Nav scroll state
function useNavScroll() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handle, { passive: true });
    handle();
    return () => window.removeEventListener('scroll', handle);
  }, []);
  return scrolled;
}

/* =================================================================
   PAGE
   ================================================================= */
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const scrolled = useNavScroll();
  const wordRevealRef = useRef<HTMLDivElement>(null);

  useRevealOnScroll();
  useWordReveal(wordRevealRef);

  const navLinks = [
    { id: 'about', label: 'About' },
    { id: 'research', label: 'Research' },
    { id: 'experience', label: 'Experience' },
    { id: 'publications', label: 'Publications' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  // Word reveal text
  const revealText =
    'I study how humans interact with AI systems in supply chain contexts, examining the behavioral dynamics of algorithm aversion, trust calibration, and the mechanisms through which organizations adopt and resist intelligent automation.';
  const revealWords = revealText.split(' ');

  // Workflow steps
  const steps = [
    {
      num: '01',
      title: 'Identify',
      desc: 'Surface behavioral friction points where humans resist, misuse, or under-trust AI recommendations in operational decision-making.',
    },
    {
      num: '02',
      title: 'Model',
      desc: 'Design controlled experiments and build LLM-based simulation frameworks to isolate causal mechanisms in human-AI collaboration.',
    },
    {
      num: '03',
      title: 'Validate',
      desc: 'Test interventions through multi-agent simulations, IRB studies, and field applications with real supply chain coordination tasks.',
    },
  ];

  return (
    <>
      <Head>
        <title>Sunny Hasija, PhD</title>
        <meta
          name="description"
          content="PhD researcher at the intersection of AI, supply chain management, and behavioral operations."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#f7f6f2" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Fixed background grid */}
      <div className="bg-grid" />

      {/* ============================================================ */}
      {/* NAVIGATION                                                   */}
      {/* ============================================================ */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-editorial ${
          scrolled
            ? 'bg-canvas/80 backdrop-blur-md border-b border-border'
            : 'pt-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16">
          {/* Brand */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3"
          >
            <span className="brand-bar w-6" />
            <span className="brand-bar w-8" />
            <span className="font-serif text-[20px] text-fg tracking-tight">
              HASIJA
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="mono-label hover:text-fg transition-colors duration-500"
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-fg"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-canvas/95 backdrop-blur-md border-t border-border px-6 py-6 space-y-4">
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="block w-full text-left mono-label text-fg py-2"
              >
                {l.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      <main className="relative z-10">
        {/* ============================================================ */}
        {/* HERO                                                         */}
        {/* ============================================================ */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-20">
          {/* Pulse dot badge */}
          <div className="reveal flex items-center gap-3 mb-10">
            <span className="pulse-dot" />
            <span className="mono-label text-fg">PhD &middot; Ohio State &middot; AI x Supply Chain</span>
          </div>

          {/* H1 */}
          <h1 className="reveal text-center font-serif font-light uppercase leading-[0.92] tracking-tight text-fg" data-delay="0.1">
            <span className="block text-[clamp(2.5rem,9vw,9rem)]">Sunny</span>
            <span className="block text-[clamp(2.5rem,9vw,9rem)]">
              <em className="text-muted font-light">Hasija</em>
            </span>
          </h1>

          <p className="reveal text-center font-sans text-lg md:text-xl text-fg/60 max-w-xl mt-10 leading-relaxed" data-delay="0.2">
            Researcher and builder at the intersection of artificial
            intelligence, supply chain management, and behavioral operations.
          </p>

          {/* CTA */}
          <div className="reveal mt-10 flex flex-col sm:flex-row gap-4" data-delay="0.3">
            <button onClick={() => scrollTo('research')} className="btn-cta">
              <span className="relative z-10">View Research</span>
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="relative inline-flex items-center justify-center px-8 py-3.5 border border-border rounded-editorial font-mono text-[10px] uppercase tracking-cta text-fg hover:tracking-cta-hover hover:border-fg transition-all duration-700 ease-editorial"
            >
              Get in Touch
            </button>
          </div>
        </section>

        {/* ============================================================ */}
        {/* STATS GRID                                                   */}
        {/* ============================================================ */}
        <section className="border-t border-border">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
            {[
              { icon: '◈', value: 'PhD', label: 'Logistics, Ohio State' },
              { icon: '◇', value: '8+', label: 'Publications' },
              { icon: '△', value: '6+', label: 'Conference Presentations' },
            ].map((s, i) => (
              <div key={s.label} className="stat-cell reveal" data-delay={`${i * 0.1}`}>
                <div className="w-12 h-12 border border-border rounded-editorial flex items-center justify-center text-lg text-primary mb-5">
                  {s.icon}
                </div>
                <p className="font-serif text-4xl text-fg mb-2">{s.value}</p>
                <span className="mono-label">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* WORD REVEAL SECTION                                          */}
        {/* ============================================================ */}
        <section className="border-t border-border py-28 md:py-40">
          <div
            ref={wordRevealRef}
            className="max-w-5xl mx-auto px-6 md:px-10 font-serif text-2xl md:text-4xl lg:text-5xl font-light leading-snug tracking-tight text-fg"
          >
            {revealWords.map((word, i) => (
              <span key={i} className="word-reveal-word">
                {word}{' '}
              </span>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* ABOUT                                                        */}
        {/* ============================================================ */}
        <section id="about" className="border-t border-border py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-20">
              {/* Left */}
              <div className="md:col-span-4">
                <div className="md:sticky md:top-28">
                  <span className="mono-label block mb-4">01 / About</span>
                  <h2 className="font-serif text-3xl md:text-5xl font-light tracking-tight text-fg leading-tight">
                    Background
                  </h2>
                </div>
              </div>

              {/* Right */}
              <div className="md:col-span-7 md:col-start-6 space-y-6">
                <div className="reveal">
                  <div className="w-48 md:w-56 aspect-[4/5] rounded-editorial overflow-hidden mb-10 border border-border">
                    <img
                      src="/headshot.jpg"
                      alt="Sunny Hasija"
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-editorial"
                    />
                  </div>
                </div>

                <div className="reveal space-y-5 text-lg font-sans text-fg/70 leading-relaxed" data-delay="0.1">
                  <p>
                    I defended my PhD in Logistics at The Ohio State
                    University's Fisher College of Business, specializing in
                    artificial intelligence and supply chain management.
                  </p>
                  <p>
                    My research examines how AI reshapes operational
                    decision-making, with particular focus on algorithm
                    aversion, trust calibration, and the behavioral dynamics of
                    human-AI collaboration in supply chain contexts.
                  </p>
                  <p>
                    I treat AI as a socio-technical system, not a technical
                    artifact. My work bridges academic research with practical
                    software development, building tools that push the
                    boundaries of applied AI in complex business problems.
                  </p>
                </div>

                <div className="reveal pt-8" data-delay="0.2">
                  <span className="mono-label block mb-3">Technical Stack</span>
                  <p className="font-mono text-xs tracking-wide text-fg/50 leading-loose">
                    Python &middot; TypeScript &middot; R &middot; Next.js &middot;
                    React &middot; LLM Integration &middot; RAG Systems &middot;
                    PostgreSQL &middot; Docker &middot; Ollama
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* RESEARCH (Interactive Workflow)                               */}
        {/* ============================================================ */}
        <section id="research" className="border-t border-border py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="mb-16">
              <span className="mono-label block mb-4">02 / Research</span>
              <h2 className="font-serif text-3xl md:text-5xl font-light tracking-tight text-fg leading-tight max-w-2xl">
                Research Areas
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-20">
              {/* Left: workflow steps */}
              <div className="md:col-span-5 space-y-8">
                {steps.map((step, i) => (
                  <button
                    key={step.num}
                    onClick={() => setActiveStep(i)}
                    className={`workflow-step block w-full text-left ${
                      activeStep !== i ? 'inactive' : ''
                    }`}
                  >
                    <span className="font-mono text-xs tracking-wide text-primary block mb-2">
                      {step.num}
                    </span>
                    <h3 className="font-serif text-2xl text-fg mb-2">{step.title}</h3>
                    {activeStep === i && (
                      <p className="font-sans text-fg/60 text-base leading-relaxed mt-3">
                        {step.desc}
                      </p>
                    )}
                  </button>
                ))}
              </div>

              {/* Right: sticky card */}
              <div className="md:col-span-6 md:col-start-7">
                <div className="md:sticky md:top-28 border border-border rounded-editorial overflow-hidden bg-canvas">
                  {/* Abstract network visualization */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#f0efeb]">
                    <svg
                      viewBox="0 0 400 300"
                      className="w-full h-full"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Grid lines */}
                      {Array.from({ length: 10 }).map((_, i) => (
                        <line
                          key={`h${i}`}
                          x1="0" y1={i * 30} x2="400" y2={i * 30}
                          stroke="#e5e4de" strokeWidth="0.5"
                        />
                      ))}
                      {Array.from({ length: 14 }).map((_, i) => (
                        <line
                          key={`v${i}`}
                          x1={i * 30} y1="0" x2={i * 30} y2="300"
                          stroke="#e5e4de" strokeWidth="0.5"
                        />
                      ))}
                      {/* Network edges */}
                      <g stroke="#3d7068" strokeWidth="1" opacity="0.25">
                        <line x1="80" y1="60" x2="200" y2="90" />
                        <line x1="200" y1="90" x2="320" y2="70" />
                        <line x1="200" y1="90" x2="160" y2="180" />
                        <line x1="160" y1="180" x2="280" y2="200" />
                        <line x1="320" y1="70" x2="280" y2="200" />
                        <line x1="80" y1="60" x2="60" y2="180" />
                        <line x1="60" y1="180" x2="160" y2="180" />
                        <line x1="280" y1="200" x2="340" y2="240" />
                        <line x1="160" y1="180" x2="100" y2="250" />
                        <line x1="200" y1="90" x2="260" y2="140" />
                        <line x1="260" y1="140" x2="280" y2="200" />
                      </g>
                      {/* Nodes */}
                      {[
                        { cx: 80, cy: 60, r: 4 },
                        { cx: 200, cy: 90, r: 6 },
                        { cx: 320, cy: 70, r: 4 },
                        { cx: 160, cy: 180, r: 5 },
                        { cx: 280, cy: 200, r: 5 },
                        { cx: 60, cy: 180, r: 3 },
                        { cx: 340, cy: 240, r: 3 },
                        { cx: 100, cy: 250, r: 3 },
                        { cx: 260, cy: 140, r: 4 },
                      ].map((n, i) => (
                        <circle
                          key={i}
                          cx={n.cx} cy={n.cy} r={n.r}
                          fill={i === 1 ? '#3d7068' : '#1c1c1c'}
                          opacity={i === 1 ? 0.8 : 0.2}
                        />
                      ))}
                      {/* Active node pulse */}
                      <circle cx="200" cy="90" r="12" fill="none" stroke="#3d7068" strokeWidth="1" opacity="0.2">
                        <animate attributeName="r" from="8" to="20" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" from="0.3" to="0" dur="2s" repeatCount="indefinite" />
                      </circle>
                      {/* Step label */}
                      <text x="200" y="40" textAnchor="middle" fontFamily="Space Mono" fontSize="9" letterSpacing="0.3em" fill="#B4B4B4">
                        STEP {steps[activeStep].num}
                      </text>
                    </svg>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <span className="mono-label text-fg/60">Current Focus</span>
                      <p className="font-serif text-xl text-fg mt-2">
                        {steps[activeStep].title}
                      </p>
                    </div>
                  </div>
                  {/* Scan line */}
                  <div className="scan-line-container">
                    <div className="scan-line-bar" />
                  </div>
                  {/* Details */}
                  <div className="p-6">
                    <p className="font-sans text-fg/60 text-sm leading-relaxed mb-6">
                      {steps[activeStep].desc}
                    </p>
                    <span className="mono-label">Step {steps[activeStep].num} of 03</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Research areas as text blocks */}
            <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-16">
              {[
                {
                  label: 'AI in Supply Chain',
                  text: 'Algorithm aversion and appreciation in supply chain decision-making. Trust calibration in AI systems over time. AI-augmented decision-making vs. replacement in operational contexts.',
                },
                {
                  label: 'LLM Applications',
                  text: 'SCM-Arena (scm-arena.com): a behavioral benchmark evaluating how LLMs make decisions in multi-tier supply chain environments. 144 conditions per model, 5 replications, 52 rounds per episode, over 11 million total decisions. Measures cost ratio, bullwhip effect, entropy, and behavioral complexity across open-weight and frontier models.',
                },
                {
                  label: 'Behavioral Operations',
                  text: 'Human decision-making biases in operational settings. Trust dynamics in buyer-supplier relationships. Risk perception and mitigation. Dissertation: algorithm aversion and trust in AI systems.',
                },
                {
                  label: 'Technology Adoption',
                  text: 'TAM, UTAUT, and DOI frameworks applied to organizational AI adoption. Digital transformation in supply chains. Bridging the gap between AI potential and actual acceptance.',
                },
              ].map((area, i) => (
                <div key={area.label} className="reveal" data-delay={`${i * 0.08}`}>
                  <span className="mono-label block mb-3">{area.label}</span>
                  <p className="font-sans text-fg/70 text-base leading-relaxed">
                    {area.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* AWARDS                                                       */}
        {/* ============================================================ */}
        <section className="border-t border-border py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-20">
              <div className="md:col-span-4">
                <div className="md:sticky md:top-28">
                  <span className="mono-label block mb-4">03 / Recognition</span>
                  <h2 className="font-serif text-3xl md:text-5xl font-light tracking-tight text-fg leading-tight">
                    Awards
                  </h2>
                </div>
              </div>

              <div className="md:col-span-7 md:col-start-6 space-y-12">
                <div className="reveal border-b border-border pb-10">
                  <span className="font-mono text-xs tracking-wide text-primary block mb-3">
                    2025
                  </span>
                  <h3 className="font-serif text-2xl text-fg mb-2">
                    Best PhD Student Paper Award Finalist
                  </h3>
                  <span className="mono-label block mb-4">
                    AI in Business Conference &middot; The Ohio State University
                  </span>
                  <p className="font-sans text-fg/70 text-base leading-relaxed">
                    Paper "Algorithm Aversion in Supplier Selection" selected as
                    a finalist for the Best PhD Student Paper Award.
                  </p>
                </div>

                <div className="reveal border-b border-border pb-10" data-delay="0.1">
                  <span className="font-mono text-xs tracking-wide text-primary block mb-3">
                    2018
                  </span>
                  <h3 className="font-serif text-2xl text-fg mb-2">
                    Bowersox Doctoral Symposium Scholarship
                  </h3>
                  <span className="mono-label block mb-4">
                    Council of Supply Chain Management Professionals
                  </span>
                  <p className="font-sans text-fg/70 text-base leading-relaxed">
                    Scholarship recognizing outstanding doctoral research
                    potential in supply chain management and logistics.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* EXPERIENCE                                                   */}
        {/* ============================================================ */}
        <section id="experience" className="border-t border-border py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-20">
              <div className="md:col-span-4">
                <div className="md:sticky md:top-28">
                  <span className="mono-label block mb-4">04 / Career</span>
                  <h2 className="font-serif text-3xl md:text-5xl font-light tracking-tight text-fg leading-tight">
                    Experience
                  </h2>
                </div>
              </div>

              <div className="md:col-span-7 md:col-start-6 space-y-14">
                {/* Teaching */}
                <div className="reveal border-b border-border pb-10">
                  <span className="font-mono text-xs tracking-wide text-primary block mb-3">
                    Teaching
                  </span>

                  <div className="mb-8">
                    <h3 className="font-serif text-2xl text-fg mb-1">
                      Instructor of Record
                    </h3>
                    <span className="mono-label block mb-4">
                      Grand Valley State University &middot; 2025 &ndash; Present
                    </span>
                    <p className="font-sans text-fg/70 text-base leading-relaxed">
                      MGT 495: Administrative Policy. Senior capstone course
                      integrating strategic management concepts across
                      functional business areas.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-serif text-xl text-fg mb-1">
                      Instructor of Record
                    </h3>
                    <span className="mono-label block mb-4">
                      The Ohio State University &middot; 2019, 2020
                    </span>
                    <p className="font-sans text-fg/70 text-base leading-relaxed mb-3">
                      BUSML 4383: Supply Chain Management. Senior-level course on
                      cross-functional integration of business processes across
                      network firms.
                    </p>
                  </div>
                </div>

                {/* Industry roles */}
                {[
                  {
                    tag: 'Research',
                    title: 'Research Manager',
                    org: 'PATH Inc., Columbus, OH &middot; 2017',
                    desc: 'Statistical analysis of qualitative and quantitative marketing research; text mining techniques for generating insights from qualitative data.',
                  },
                  {
                    tag: 'Security',
                    title: 'Security Operations Specialist',
                    org: 'Office of the CIO, Ohio State &middot; 2014\u20132016',
                    desc: 'Dashboard development for IT security operations; sentiment analysis engine for real-time threat detection using ML and NLP.',
                  },
                  {
                    tag: 'IT & Marketing',
                    title: 'Web Marketing & IT Manager',
                    org: 'LS&S, LLC, Buffalo, NY &middot; 2009\u20132014',
                    desc: 'Managed IT infrastructure and web marketing; ERP deployment; warehouse operations optimization for cost savings.',
                  },
                ].map((role, i) => (
                  <div
                    key={role.title}
                    className="reveal border-b border-border pb-10"
                    data-delay={`${(i + 1) * 0.08}`}
                  >
                    <span className="font-mono text-xs tracking-wide text-primary block mb-3">
                      {role.tag}
                    </span>
                    <h3 className="font-serif text-xl text-fg mb-1">
                      {role.title}
                    </h3>
                    <span
                      className="mono-label block mb-4"
                      dangerouslySetInnerHTML={{ __html: role.org }}
                    />
                    <p className="font-sans text-fg/70 text-base leading-relaxed">
                      {role.desc}
                    </p>
                  </div>
                ))}

                {/* Service */}
                <div className="reveal" data-delay="0.3">
                  <span className="font-mono text-xs tracking-wide text-primary block mb-3">
                    Service
                  </span>
                  <h3 className="font-serif text-xl text-fg mb-1">
                    Ad-Hoc Reviewer
                  </h3>
                  <span className="mono-label block mb-4">2019 &ndash; Present</span>
                  <p className="font-mono text-xs tracking-wide text-fg/50 leading-loose">
                    CSCMP ARS &middot; DSI Conference &middot; Decision Sciences Journal
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* PUBLICATIONS                                                 */}
        {/* ============================================================ */}
        <section id="publications" className="border-t border-border py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-20">
              <div className="md:col-span-4">
                <div className="md:sticky md:top-28">
                  <span className="mono-label block mb-4">05 / Work</span>
                  <h2 className="font-serif text-3xl md:text-5xl font-light tracking-tight text-fg leading-tight">
                    Publications
                  </h2>
                </div>
              </div>

              <div className="md:col-span-7 md:col-start-6 space-y-14">
                {/* Working Paper */}
                <div className="reveal border-b border-border pb-10">
                  <span className="font-mono text-xs tracking-wide text-primary block mb-3">
                    Working Paper &middot; 2025
                  </span>
                  <h3 className="font-serif text-xl md:text-2xl text-fg mb-2 leading-snug">
                    When Anchors Sink Suppliers: Role-Based Asymmetry Bias in
                    AI-Automated Buyer-Supplier Negotiations
                  </h3>
                  <span className="mono-label block mb-4">
                    Sunny Hasija, Vincent E. Castillo &middot; SSRN
                  </span>
                  <p className="font-sans text-fg/70 text-base leading-relaxed mb-6">
                    Examines how AI automation in buyer-supplier negotiations
                    creates asymmetric biases that systematically disadvantage
                    suppliers, with implications for fairness and trust in
                    AI-mediated business relationships.
                  </p>
                  <a
                    href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5522018"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-[10px] tracking-wide uppercase text-primary border-b border-primary/30 pb-1 hover:border-primary transition-colors duration-500"
                  >
                    View on SSRN <ArrowUpRight size={12} />
                  </a>
                </div>

                {/* JBL */}
                <div className="reveal border-b border-border pb-10" data-delay="0.1">
                  <span className="font-mono text-xs tracking-wide text-primary block mb-3">
                    Journal of Business Logistics &middot; 2022
                  </span>
                  <h3 className="font-serif text-xl md:text-2xl text-fg mb-2 leading-snug">
                    In Artificial Intelligence (AI) We Trust: A Qualitative
                    Investigation of AI Technology Acceptance
                  </h3>
                  <span className="mono-label block mb-4">
                    Abhinav Hasija, Terry L. Esper
                  </span>
                  <p className="font-sans text-fg/70 text-base leading-relaxed mb-6">
                    Explores organizational factors influencing AI technology
                    acceptance in supply chain management using thematic analysis
                    of vendor materials and interviews with organizational
                    leaders.
                  </p>
                  <div className="flex flex-wrap gap-6">
                    <a
                      href="https://onlinelibrary.wiley.com/doi/abs/10.1111/jbl.12301"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-[10px] tracking-wide uppercase text-primary border-b border-primary/30 pb-1 hover:border-primary transition-colors duration-500"
                    >
                      View Publication <ArrowUpRight size={12} />
                    </a>
                    <a
                      href="https://scholar.google.com/citations?user=Vam6NJgAAAAJ&hl=en&oi=ao"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-[10px] tracking-wide uppercase text-primary border-b border-primary/30 pb-1 hover:border-primary transition-colors duration-500"
                    >
                      Google Scholar <ArrowUpRight size={12} />
                    </a>
                  </div>
                </div>

                {/* Conferences */}
                <div className="reveal" data-delay="0.2">
                  <span className="mono-label block mb-4">Conference Presentations</span>
                  <div className="space-y-6">
                    {[
                      {
                        title: 'Algorithm Aversion in Supplier Selection',
                        venue: 'CSCMP ARS 2025 / AI in Business Conference 2025',
                        author: 'Abhinav Hasija',
                      },
                      {
                        title: 'Algorithm Aversion under Algorithmic Management',
                        venue: 'Decision Sciences Institute 2021',
                        author: 'Abhinav Hasija, Terry Esper',
                      },
                      {
                        title: 'Exploring Algorithm Aversion in AI Use for SCM Decisions',
                        venue: 'CSCMP ARS 2020',
                        author: 'Abhinav Hasija, Terry Esper',
                      },
                      {
                        title: 'Role of Cognitive Reflection in Algorithm Aversion',
                        venue: 'Decision Sciences Institute 2020',
                        author: 'Abhinav Hasija, Terry Esper',
                      },
                    ].map((c) => (
                      <div key={c.title} className="border-b border-border pb-5">
                        <h4 className="font-sans text-fg text-base font-medium mb-1">
                          {c.title}
                        </h4>
                        <p className="font-mono text-[10px] tracking-wide text-fg/40">
                          {c.author} &middot; {c.venue}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Collaborative */}
                <div className="reveal" data-delay="0.3">
                  <span className="mono-label block mb-2">
                    Collaborative Research
                  </span>
                  <p className="font-sans text-fg/50 text-sm mb-6">
                    Statistical contributions to healthcare and reproductive
                    medicine research.
                  </p>
                  <div className="space-y-5">
                    {[
                      {
                        title:
                          'Factors associated with fertility preservation in a pediatric, adolescent and young adult population',
                        journal: 'J. Pediatric Hematology/Oncology, 2022',
                      },
                      {
                        title:
                          "Young adult males' perspectives of male hormonal contraception",
                        journal: 'South Med J, 2021',
                      },
                      {
                        title:
                          'Covid-19 Pandemic: A survey assessing clinical practice changes in reproductive medicine',
                        journal: 'Fertility and Sterility, 2020',
                      },
                      {
                        title:
                          'Current oncology training programs lack adequate education in fertility preservation counseling',
                        journal: 'Fertility and Sterility, 2019',
                      },
                    ].map((p) => (
                      <div key={p.title} className="border-b border-border pb-4">
                        <h4 className="font-sans text-fg/70 text-sm font-medium mb-1">
                          {p.title}
                        </h4>
                        <p className="font-mono text-[10px] tracking-wide text-fg/40">
                          {p.journal}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* CONTACT                                                      */}
        {/* ============================================================ */}
        <section id="contact" className="border-t border-border py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {/* Left: heading */}
              <div className="reveal">
                <span className="mono-label block mb-4">06 / Connect</span>
                <h2 className="font-serif text-4xl md:text-6xl font-light tracking-tight text-fg leading-tight">
                  Request
                  <br />
                  <em className="text-muted">Access</em>
                </h2>
                <p className="font-sans text-fg/60 text-base leading-relaxed mt-6 max-w-sm">
                  Interested in collaboration, research opportunities, or
                  discussing how AI can transform supply chains.
                </p>

                <div className="mt-10 space-y-4">
                  <a
                    href="mailto:hasijaa@gvsu.edu"
                    className="flex items-center gap-3 font-mono text-xs tracking-wide text-fg/60 hover:text-primary transition-colors duration-500"
                  >
                    <Mail size={14} />
                    hasijaa@gvsu.edu
                  </a>
                  <a
                    href="mailto:abhinav.hasija@gmail.com"
                    className="flex items-center gap-3 font-mono text-xs tracking-wide text-fg/60 hover:text-primary transition-colors duration-500"
                  >
                    <Mail size={14} />
                    abhinav.hasija@gmail.com
                  </a>
                  <a
                    href="https://linkedin.com/in/ahasija"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 font-mono text-xs tracking-wide text-fg/60 hover:text-primary transition-colors duration-500"
                  >
                    <Linkedin size={14} />
                    linkedin.com/in/ahasija
                  </a>
                  <a
                    href="https://github.com/sunnyhasija"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 font-mono text-xs tracking-wide text-fg/60 hover:text-primary transition-colors duration-500"
                  >
                    <Github size={14} />
                    github.com/sunnyhasija
                  </a>
                </div>
              </div>

              {/* Right: form-style contact */}
              <div className="reveal" data-delay="0.15">
                <div className="space-y-8">
                  <div>
                    <label className="mono-label block mb-3">Name</label>
                    <input
                      type="text"
                      className="input-editorial"
                      placeholder="Your name"
                      readOnly
                      onClick={() => window.location.href = 'mailto:hasijaa@gvsu.edu'}
                    />
                  </div>
                  <div>
                    <label className="mono-label block mb-3">Email</label>
                    <input
                      type="email"
                      className="input-editorial"
                      placeholder="Your email address"
                      readOnly
                      onClick={() => window.location.href = 'mailto:hasijaa@gvsu.edu'}
                    />
                  </div>
                  <div>
                    <label className="mono-label block mb-3">Subject</label>
                    <input
                      type="text"
                      className="input-editorial"
                      placeholder="Research / Collaboration / Opportunity"
                      readOnly
                      onClick={() => window.location.href = 'mailto:hasijaa@gvsu.edu'}
                    />
                  </div>
                  <a
                    href="mailto:hasijaa@gvsu.edu"
                    className="btn-cta w-full text-center block"
                    style={{ boxShadow: '0 4px 20px rgba(61, 112, 104, 0.3)' }}
                  >
                    <span className="relative z-10">Send Message</span>
                  </a>
                  <p className="font-mono text-[10px] tracking-wide text-fg/30 text-center">
                    Opens your default email client
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ============================================================ */}
      {/* FOOTER                                                       */}
      {/* ============================================================ */}
      <footer className="relative z-10 border-t border-border py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <span className="font-serif text-lg text-fg tracking-tight">
              HASIJA
            </span>
            <div className="flex items-center gap-8">
              {[
                { label: 'LinkedIn', href: 'https://linkedin.com/in/ahasija' },
                { label: 'GitHub', href: 'https://github.com/sunnyhasija' },
                { label: 'Scholar', href: 'https://scholar.google.com/citations?user=Vam6NJgAAAAJ&hl=en&oi=ao' },
                { label: 'Email', href: 'mailto:hasijaa@gvsu.edu' },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono-label hover:text-fg transition-colors duration-500"
                >
                  {l.label}
                </a>
              ))}
            </div>
            <span className="font-mono text-[10px] tracking-wide text-fg/30">
              &copy; {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
