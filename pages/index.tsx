import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, Download, ArrowDown, BookOpen, Brain, Database } from 'lucide-react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'research', 'awards', 'experience', 'publications', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <Head>
        <title>Sunny Hasija, PhD - Bridging Supply Chain and AI Research</title>
        <meta name="description" content="PhD researcher specializing in AI applications in supply chain management, machine learning, and operations research." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-xl font-bold text-primary-600 hover:text-primary-700 transition-colors"
              >
                Sunny Hasija, PhD
              </button>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {[
                  { id: 'home', label: 'Home' },
                  { id: 'about', label: 'About' },
                  { id: 'research', label: 'Research' },
                  { id: 'awards', label: 'Awards' },
                  { id: 'experience', label: 'Experience' },
                  { id: 'publications', label: 'Publications' },
                  { id: 'contact', label: 'Contact' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeSection === item.id
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-primary-600 focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'research', label: 'Research' },
                { id: 'awards', label: 'Awards' },
                { id: 'experience', label: 'Experience' },
                { id: 'publications', label: 'Publications' },
                { id: 'contact', label: 'Contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors ${
                    activeSection === item.id
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <main>
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
                Sunny Hasija, 
                <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                  {' '}PhD
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Bridging Supply Chain and AI Research
              </p>
              <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
                Specializing in artificial intelligence applications in supply chain management, 
                machine learning decision-making, and operations research innovation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => scrollToSection('about')}
                  className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors"
                >
                  Learn More
                  <ArrowDown className="ml-2 h-4 w-4" />
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="inline-flex items-center px-8 py-3 border border-primary-600 text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50 transition-colors"
                >
                  Get In Touch
                  <Mail className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
              <div className="animate-slide-up">
                {/* Profile Image */}
                <div className="mb-8 lg:hidden">
                  <div className="relative w-48 h-48 mx-auto">
                    <img
                      src="/headshot.jpg"
                      alt="Sunny Hasija, PhD"
                      className="w-full h-full object-cover rounded-full shadow-lg border-4 border-primary-200"
                    />
                  </div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  About Me
                </h2>
                <div className="prose prose-lg text-gray-600 space-y-4">
                  <p>
                    I defended my PhD in Logistics at The Ohio State University's Fisher College of Business (expected December 2025), 
                    where I specialized in the intersection of artificial intelligence and supply chain management.
                  </p>
                  <p>
                    My research focuses on how AI and machine learning can revolutionize decision-making in supply chains, 
                    with particular expertise in trust dynamics, cost optimization, and the application of advanced 
                    analytics to complex operational challenges.
                  </p>
                  <p>
                    I bring both deep academic knowledge and practical technical skills, with experience in developing 
                    sophisticated research frameworks and scalable analytical tools. I'm passionate about bridging 
                    the gap between cutting-edge research and real-world business applications.
                  </p>
                  <p>
                    Currently seeking opportunities where I can apply my expertise in AI, machine learning, and operations 
                    research to drive innovation in both academic and industry settings.
                  </p>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Research Interests</h3>
                  <div className="flex flex-wrap gap-3">
                    {[
                      'Supply Chain Analytics',
                      'Machine Learning',
                      'AI Decision Making',
                      'Operations Research',
                      'Technology Trust',
                      'Cost Optimization',
                      'Automation',
                      'Data Science'
                    ].map((interest) => (
                      <span
                        key={interest}
                        className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-12 lg:mt-0">
                {/* Profile Image - Desktop */}
                <div className="hidden lg:block mb-8">
                  <div className="relative w-64 h-64 mx-auto">
                    <img
                      src="/headshot.jpg"
                      alt="Sunny Hasija, PhD"
                      className="w-full h-full object-cover rounded-full shadow-xl border-4 border-primary-200 hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-6">Education & Expertise</h3>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-3">
                      <Brain className="h-6 w-6 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">PhD in Logistics</h4>
                        <p className="text-primary-100">The Ohio State University</p>
                        <p className="text-sm text-primary-200">Defended 2025, Expected December 2025</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Database className="h-6 w-6 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Technical Skills</h4>
                        <p className="text-primary-100">Python, R, Machine Learning, Data Analytics</p>
                        <p className="text-sm text-primary-200">Advanced Statistical Modeling</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <BookOpen className="h-6 w-6 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Research Focus</h4>
                        <p className="text-primary-100">AI Applications in Supply Chain</p>
                        <p className="text-sm text-primary-200">Technology Trust & Decision Making</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Research Section */}
        <section id="research" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Research Areas
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Exploring the intersection of artificial intelligence and supply chain management 
                to solve complex operational challenges.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "AI in Supply Chain Management",
                  description: "Investigating how artificial intelligence and machine learning can enhance decision-making processes in complex supply chain environments.",
                  icon: <Brain className="h-8 w-8" />
                },
                {
                  title: "Technology Trust Dynamics",
                  description: "Researching the factors that influence trust in automated systems and their impact on adoption and performance in business contexts.",
                  icon: <Database className="h-8 w-8" />
                },
                {
                  title: "Cost Optimization",
                  description: "Developing advanced analytical frameworks for supply chain cost optimization using data-driven approaches and algorithmic solutions.",
                  icon: <BookOpen className="h-8 w-8" />
                }
              ].map((area, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-200"
                >
                  <div className="text-primary-600 mb-4">
                    {area.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {area.title}
                  </h3>
                  <p className="text-gray-600">
                    {area.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Awards & Recognition Section */}
        <section id="awards" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Awards & Recognition
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Recognition for academic excellence and research contributions in supply chain management and AI.
              </p>
            </div>
            
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Fisher AI Conference Award */}
              <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-lg p-8 border border-primary-200 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Best Presentation Competition Finalist
                    </h3>
                    <p className="text-primary-600 font-semibold mb-1">
                      Fisher AI in Business Conference
                    </p>
                    <p className="text-gray-600 mb-3">
                      Doctoral Students Competition • October 2025
                    </p>
                  </div>
                  <div className="ml-4">
                    <span className="inline-flex items-center px-3 py-1 bg-primary-600 text-white rounded-full text-sm font-medium">
                      Finalist
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Selected as one of five finalists for the Best Presentation Competition (Doctoral Students) 
                  after a careful review by a panel of judges in a very competitive pool. Presentation scheduled 
                  for October 2, 2025 at 1:00 PM.
                </p>
                <div className="mt-4">
                  <span className="px-3 py-1 bg-accent-100 text-accent-700 rounded-full text-sm font-medium">
                    Current Achievement
                  </span>
                </div>
              </div>

              {/* Bowersox Doctoral Symposium Scholarship */}
              <div className="bg-white rounded-lg p-8 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Bowersox Doctoral Symposium Scholarship
                    </h3>
                    <p className="text-primary-600 font-semibold mb-1">
                      Council of Supply Chain Management Professionals
                    </p>
                    <p className="text-gray-600 mb-3">
                      Academic Research Symposium • 2018
                    </p>
                  </div>
                  <div className="ml-4">
                    <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                      Scholarship
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Awarded scholarship to participate in the prestigious Bowersox Doctoral Symposium, 
                  recognizing outstanding doctoral research potential in supply chain management and logistics.
                </p>
                <div className="mt-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    Doctoral Excellence
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Professional Experience Section */}
        <section id="experience" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Professional Experience
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Academic teaching and industry experience spanning research, operations, and technology.
              </p>
            </div>
            
            <div className="space-y-8">
              {/* Academic Experience */}
              <div className="bg-white rounded-lg p-8 shadow-md border border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Academic Experience
                    </h3>
                  </div>
                  <div className="ml-4">
                    <span className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                      Teaching
                    </span>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-primary-500 pl-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">
                      Instructor of Record
                    </h4>
                    <p className="text-primary-600 font-medium mb-2">
                      The Ohio State University • Spring 2019, Spring 2020
                    </p>
                    <p className="text-gray-700 mb-3">
                      BUSML 4383: Supply Chain Management
                    </p>
                    <p className="text-gray-600 mb-4">
                      Senior level undergraduate course focused on distinction between logistics and supply chain management; 
                      cross-functional integration of key business processes within the firm and across network of firms. 
                      Introduced concepts salient to the Global Supply Chain Forum model.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        4.2/5 Rating (Spring 2019, 92 students)
                      </span>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        3.8/5 Rating (Spring 2020, 80 students)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Industry Experience */}
              <div className="bg-white rounded-lg p-8 shadow-md border border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Industry Experience
                    </h3>
                  </div>
                  <div className="ml-4">
                    <span className="inline-flex items-center px-3 py-1 bg-accent-100 text-accent-700 rounded-full text-sm font-medium">
                      Professional
                    </span>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-accent-500 pl-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">
                      Research Manager
                    </h4>
                    <p className="text-accent-600 font-medium mb-2">
                      PATH Inc., Columbus, OH • January 2017 - August 2017
                    </p>
                    <p className="text-gray-600">
                      Statistical analysis of qualitative and quantitative marketing research; context and text mining 
                      techniques to generate insights from qualitative data.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-blue-500 pl-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">
                      Student Security Operations Specialist
                    </h4>
                    <p className="text-blue-600 font-medium mb-2">
                      Office of Chief Information Officer, OSU • October 2014 - December 2016
                    </p>
                    <p className="text-gray-600">
                      Statistical analysis and dashboard development for IT security operations; built sentiment analysis 
                      engine for real-time threat detection using machine learning and natural language processing.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-purple-500 pl-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">
                      Web Marketing and IT Manager
                    </h4>
                    <p className="text-purple-600 font-medium mb-2">
                      LS&S, LLC, Buffalo, NY • August 2009 - July 2014
                    </p>
                    <p className="text-gray-600">
                      Managed IT infrastructure and web marketing activities; evaluated and deployed new ERP software; 
                      streamlined warehouse operations achieving significant annual cost savings.
                    </p>
                  </div>
                </div>
              </div>

              {/* Professional Service */}
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-8">
                <div className="flex items-center mb-6">
                  <BookOpen className="h-6 w-6 text-blue-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">
                    Professional Service
                  </h3>
                </div>
                
                <div className="grid md:grid-cols-1 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Ad-Hoc Reviewer
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                      December 2019 - Present
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                        CSCMP ARS 2020, 2021
                      </span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                        DSI 2020, 2021
                      </span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                        Decision Sciences Journal
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Publications Section */}
        <section id="publications" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Publications
              </h2>
              <p className="text-xl text-gray-600">
                Peer-reviewed research contributing to the fields of supply chain management and AI applications.
              </p>
            </div>
            
            <div className="space-y-6">
              {/* First Author Publication */}
              <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      In artificial intelligence (AI) we trust: A qualitative investigation of AI technology acceptance
                    </h3>
                    <p className="text-primary-600 mb-2 font-medium">
                      <strong>Abhinav Hasija</strong>, Terry L. Esper
                    </p>
                    <p className="text-gray-500 mb-3">
                      <em>Journal of Business Logistics</em>, 2022
                    </p>
                  </div>
                  <div className="ml-4">
                    <span className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
                      First Author
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  This study explores organizational factors that influence AI technology acceptance in supply chain management. 
                  Using thematic analysis of vendor marketing materials and interviews with organizational leaders, we investigate 
                  the gap between AI's potential benefits and its actual acceptance and use in supply chain contexts.
                </p>
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    Artificial Intelligence
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    Supply Chain Management
                  </span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                    Technology Acceptance
                  </span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                    Qualitative Research
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a 
                    href="https://onlinelibrary.wiley.com/doi/abs/10.1111/jbl.12301" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors font-medium"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Publication
                  </a>
                  <a 
                    href="https://scholar.google.com/citations?user=Vam6NJgAAAAJ&hl=en&oi=ao" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Google Scholar Profile
                  </a>
                </div>
              </div>

              {/* Conference Abstracts */}
              <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <BookOpen className="h-6 w-6 text-primary-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Conference Abstracts
                  </h3>
                </div>
                <p className="text-gray-600 mb-6">
                  Research presentations at leading supply chain and decision science conferences.
                </p>
                
                <div className="grid gap-4">
                  {/* 2025 Conference */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Algorithm Aversion in Supplier Selection
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Abhinav Hasija</strong>
                    </p>
                    <p className="text-sm text-primary-600 font-medium mb-2">
                      <em>Council of Supply Chain Management Professionals - Academic Research Symposium 2025</em>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs">
                        Algorithm Aversion
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                        Supplier Selection
                      </span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                        Supply Chain Management
                      </span>
                    </div>
                  </div>

                  {/* 2021 Conference */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Algorithm Aversion under Algorithmic Management
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Abhinav Hasija</strong> and Terry Esper
                    </p>
                    <p className="text-sm text-blue-600 font-medium mb-2">
                      <em>Proceedings of Decision Science Institute Conference 2021</em>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                        Algorithmic Management
                      </span>
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs">
                        Algorithm Aversion
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                        Decision Science
                      </span>
                    </div>
                  </div>

                  {/* 2020 Conference */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Exploring Algorithm Aversion in AI Use for SCM Decisions
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Abhinav Hasija</strong> and Terry Esper
                    </p>
                    <p className="text-sm text-primary-600 font-medium mb-2">
                      <em>Proceedings of CSCMP - Academic Research Symposium 2020</em>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                        Artificial Intelligence
                      </span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                        Supply Chain Decisions
                      </span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                        Algorithm Aversion
                      </span>
                    </div>
                  </div>

                  {/* 2020 DSI Conference */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Role of Cognitive Reflection In Algorithm Aversion for SCM Decisions
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Abhinav Hasija</strong> and Terry Esper
                    </p>
                    <p className="text-sm text-blue-600 font-medium mb-2">
                      <em>Proceedings of Decision Science Institute Conference 2020</em>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-pink-100 text-pink-700 rounded text-xs">
                        Cognitive Reflection
                      </span>
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs">
                        Algorithm Aversion
                      </span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                        Supply Chain Management
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Collaborative Publications - Statistical Contributions */}
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Database className="h-6 w-6 text-blue-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Collaborative Research - Statistical Analysis
                  </h3>
                </div>
                <p className="text-gray-600 mb-6">
                  Contributed statistical expertise to interdisciplinary research projects in healthcare and reproductive medicine.
                </p>
                
                <div className="grid gap-4">
                  {/* 2022 Publications */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Factors associated with fertility preservation in a pediatric, adolescent and young adult population
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      MR Sax, G Pettengill, <strong>A Hasija</strong> (Statistician), B Ferrara, O Frias, A Riazzi, E Spitznagel, et al.
                    </p>
                    <p className="text-sm text-blue-600 font-medium mb-2">
                      <em>Journal of Pediatric Hematology/Oncology</em> 44(7), 369-375, 2022
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-pink-100 text-pink-700 rounded text-xs">
                        Pediatric Oncology
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                        Fertility Preservation
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                        Statistical Analysis
                      </span>
                    </div>
                  </div>

                  {/* 2021 Publications */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Young adult males' perspectives of male hormonal contraception
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      MR Sax, EG Hurley, RA Rossi, S Thakore, <strong>A Hasija</strong> (Statistician), J Sroga-Rios
                    </p>
                    <p className="text-sm text-blue-600 font-medium mb-2">
                      <em>South Med J</em> 114, 73-76, 2021
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                        Reproductive Health
                      </span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                        Survey Research
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                        Statistical Analysis
                      </span>
                    </div>
                  </div>

                  {/* 2020 Publications */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Covid-19 Pandemic: A Survey Assessing Clinical Practice Changes in Reproductive Medicine
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      A Starostanko, SD Halassy, <strong>A Hasija</strong> (Statistician), B Gelvin, MA Thomas, JS Rios, et al.
                    </p>
                    <p className="text-sm text-blue-600 font-medium mb-2">
                      <em>Fertility and Sterility</em> 114(3), e178, 2020
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">
                        COVID-19
                      </span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                        Reproductive Medicine
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                        Survey Analysis
                      </span>
                    </div>
                  </div>

                  {/* 2019 Publications */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Current oncology training programs lack adequate education in fertility preservation counseling
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      E Brackett, V Moy, <strong>A Hasija</strong> (Statistician), MA Thomas, JS Rios, S Thakore
                    </p>
                    <p className="text-sm text-blue-600 font-medium mb-2">
                      <em>Fertility and Sterility</em> 112(3), e406, 2019
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs">
                        Medical Education
                      </span>
                      <span className="px-2 py-1 bg-pink-100 text-pink-700 rounded text-xs">
                        Oncology Training
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                        Statistical Analysis
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Research Impact
              </h3>
              <p className="text-gray-600">
                Published in the <strong>Journal of Business Logistics</strong>, a premier venue for supply chain and logistics research, 
                this work contributes to understanding how organizations can successfully adopt AI technologies in their operations.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-gradient-to-br from-primary-600 to-accent-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Let's Connect
              </h2>
              <p className="text-xl text-primary-100 max-w-3xl mx-auto">
                Interested in collaboration, research opportunities, or discussing how AI can transform supply chains? 
                I'd love to hear from you.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <a
                href="mailto:hasija.4@osu.edu"
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-white/20 transition-colors group"
              >
                <Mail className="h-8 w-8 text-white mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
                <p className="text-primary-100">hasija.4@osu.edu</p>
              </a>
              
              <a
                href="https://linkedin.com/in/ahasija"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-white/20 transition-colors group"
              >
                <Linkedin className="h-8 w-8 text-white mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold text-white mb-2">LinkedIn</h3>
                <p className="text-primary-100">Connect with me</p>
              </a>
              
              <a
                href="https://github.com/sunnyhasija"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-white/20 transition-colors group"
              >
                <Github className="h-8 w-8 text-white mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold text-white mb-2">GitHub</h3>
                <p className="text-primary-100">View my code</p>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-secondary-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-secondary-300">
              © 2025 Sunny Hasija, PhD. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}