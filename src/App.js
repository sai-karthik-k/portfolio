import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './App.css';
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaBars,
  FaTimes,
  FaEye,
  FaCheckCircle
} from 'react-icons/fa';

// --- ASSET IMPORTS ---
// import resume from "./assets/Resume.pdf";
import profile from "./assets/profile.jpg";
import aws from "./assets/certificate/aws.jpg";
import ml from "./assets/certificate/ml.jpg";
import mern from "./assets/certificate/mern.jpg";
import conservation from "./assets/certificate/Conservation Economics.jpg";
import entrepreneurship from "./assets/certificate/Entrepreneurship.jpg";
import forests from "./assets/certificate/Forests and their Management.jpg";
import wildlife from "./assets/certificate/Wild Life Ecology.jpg";

// --- DATA SOURCE ---
const resumeData = {
  header: {
    name: "SAI KARTHIK KRISHNAM",
    title: "Software Engineer",
    contact: {
      phone: "+91 9618704949",
      email: "saikarthikkrishnam2003@gmail.com",
      linkedin: "https://linkedin.com/in/sai-karthik-k",
      github: "https://github.com/sai-karthik-k"
    }
  },
  about: {
    summary: "I am a dedicated Software Engineer with experience in backend engineering, machine learning, and full-stack development. My work spans microservices using Java + Spring Boot, ML models built with TensorFlow & Scikit-Learn, and user-friendly applications using React and Node.js. With strong foundations in DSA, OOP, OS, and system design, I enjoy building efficient, scalable systems. I’m also an AWS Certified Cloud Practitioner, allowing me to build and deploy cloud-ready solutions. I am driven by problem-solving, clean architecture, and continuous innovation.",
    education: [
      {
        school: "Vellore Institute of Technology, Vellore",
        degree: "B.Tech in Information Technology",
        year: "2021 – 2025",
        score: "CGPA: 8.59"
      },
      {
        school: "Sri Chaitanya Junior Kalasala, Vijayawada",
        degree: "Intermediate Education",
        year: "2019 – 2021",
        score: "Percentage: 95.9"
      },
      {
        school: "Dr. K.K.R's Gowtham School, Gudivada",
        degree: "Secondary School Certificate",
        year: "2018 – 2019",
        score: "GPA: 10"
      }
    ]
  },
  skills: {
    languages: ["Java", "Python", "C++", "C", "SQL", "JavaScript"],
    core: ["Data Structures & Algorithms", "OOP", "OS", "DBMS", "CN"],
    backend: ["Spring Boot (Microservices)", "Node.js", "Express.js", "REST APIs"],
    frontend: ["React", "HTML", "CSS", "Bootstrap"],
    ml_data: ["Pandas", "NumPy", "Scikit-Learn", "TensorFlow", "Plotly"],
    cloud_tools: ["AWS (Cloud Practitioner)", "Git", "GitHub", "VS Code", "StarUML"]
  },
  experience: [
    {
      role: "Software Consultant",
      company: "Encora",
      duration: "Aug 2025 – Present",
      points: [
        "Developed an offline AI solution to generate QA test cases from large product manuals and identify missing coverage by semantically comparing them with existing TestRail test cases. Implemented document cleaning, intelligent chunking, LLM-based generation, and embedding-based semantic comparison to improve test coverage visibility.",
        "Training in Java Full Stack, Spring Boot Microservices, REST APIs, and React.",
        "Implementing scalable backend components following industry best practices.",
        "Experience with version control, CI/CD workflows, and software quality processes."
      ]
    }
  ],
  projects: [
    {
      title: "AI Test Case Generator using RAG",
      tech: "Python | RAG | Llama 3 ",
      details: [
        "Built an AI-powered system to automatically generate structured manual test cases from product documentation and bug reports.",
        "Implemented Retrieval-Augmented Generation (RAG) using vector embeddings and FAISS for semantic document retrieval.",
        "Integrated local LLM (Llama 3 via Ollama) to generate TestRail-compatible test cases including steps, preconditions, and expected results.",
        "Processed PDF manuals, JIRA exports, and existing test cases to improve test coverage and avoid duplicate scenarios."
      ],
      url: "https://github.com/sai-karthik-k/test-case-generator"
    },
    {
      title: "E-Commerce Microservices System",
      tech: "Java | Spring Boot | Microservices",
      details: [
        "Production-grade e-commerce platform using Spring Boot microservices.",
        "Isolated services for products, orders, users, and inventory.",
        "REST APIs with Spring Cloud for service communication and resilient routing.",
        "Optimized JPA/Hibernate data models for consistent performance."
      ],
      url: "https://github.com/sai-karthik-k/ecommerce-microservices"
    },
    {
      title: "TinyLink – URL Shortening & Analytics Platform",
      tech: "Next.js | Prisma | PostgreSQL | TypeScript",
      details: [
        "Production-ready URL shortening platform using Next.js App Router.",
        "Supports custom & auto-generated short codes with secure redirects.",
        "Real-time analytics: click counts, timestamps, and usage tracking.",
        "Admin dashboard for managing links, searching, copying URLs, and monitoring system health."
      ],
      url: "https://tinylink-karthik.vercel.app/"
    },
    {
      title: "Image Forgery Detection System",
      tech: "CNN | Xception | ELA | Python",
      details: [
        "Hybrid deep learning pipeline combining Error Level Analysis (ELA) and Xception CNN.",
        "Optimized preprocessing and fast inference for real-time predictions.",
        "Streamlit interface with interactive ELA visualizations."
      ],
      url: "https://karthik-image-forgery-detection.streamlit.app/"
    },
    {
      title: "Vehicle Rental System",
      tech: "MERN | Node.js | MongoDB",
      details: [
        "Full-stack vehicle rental platform built using the MERN stack.",
        "Secure authentication, vehicle management, bookings, and user dashboards.",
        "REST APIs enabling smooth end-to-end rental workflows."
      ],
      url: "https://karthik-vehicle-rental.netlify.app/"
    },
    {
      title: "Energy Consumption Analysis",
      tech: "Machine Learning | Streamlit | Plotly",
      details: [
        "End-to-end ML system analyzing building-level energy consumption.",
        "Random Forest models for water, electricity, and gas usage.",
        "Feature engineering, anomaly detection, and multi-sheet dataset preprocessing.",
        "Interactive Streamlit dashboards with real-time predictions and Plotly visualizations."
      ],
      url: "https://energy-consumption-analysis-predection.streamlit.app/"
    },
    {
      title: "ToDo List Mobile Application",
      tech: "Flutter | Dart | Material UI",
      details: [
        "Cross-platform mobile ToDo application built using Flutter and Dart.",
        "Implements CRUD operations for task management with real-time UI updates.",
        "Features task completion tracking, search/filter functionality, and clean Material UI design.",
        "Modular architecture with reusable widgets and clear separation of concerns."
      ],
      url: "https://github.com/sai-karthik-k/ToDo_App"
    },
    {
      title: "IPL Score Prediction App",
      tech: "Python | Keras | TensorFlow | Streamlit",
      details: [
        "Predicts IPL match scores based on venue, batting team, and bowling team.",
        "Data preprocessing, label encoding, and feature scaling for model input.",
        "Neural network model trained using Keras with Huber loss for regression.",
        "Interactive web interface built with Streamlit for user-friendly predictions.",
        "Deployed online for real-time IPL score predictions."
      ],
      url: "https://ipl-score-prediction-karthik.streamlit.app/"
    }
  ],
  certifications: [
    { title: "AWS Certified Cloud Practitioner", image: aws },
    { title: "Machine Learning with Python", image: ml },
    { title: "MERN Full Stack (ETHNUS)", image: mern },
    { title: "Conservation Economics", image: conservation },
    { title: "Entrepreneurship", image: entrepreneurship },
    { title: "Forests and their Management", image: forests },
    { title: "Wild Life Ecology", image: wildlife }
  ]
};

// --- ANIMATION WRAPPER COMPONENT ---
const Reveal = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    // FIX: Capture the current value of the ref to a local variable
    const currentElement = ref.current;

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      // FIX: Use the captured 'currentElement' variable in the cleanup
      if (currentElement) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div ref={ref} className={`reveal ${isVisible ? "active" : ""}`}>
      {children}
    </div>
  );
};

// --- COMPONENTS ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Check if user is at the bottom of the page (Fix for Contact)
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
        setActiveSection('contact');
        return;
      }

      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'certifications', 'contact'];
      for (let i = 0; i < sections.length; i++) {
        const sectionId = sections[i];
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= -200 && rect.top <= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getLinkClass = (section) => activeSection === section ? 'active' : '';

  return (
    <nav className="navbar">
      <div className="logo">SK</div>
      <div className="menu-icon" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>
      <ul className={isOpen ? "nav-links active" : "nav-links"}>
        {['home', 'about', 'skills', 'projects', 'experience', 'certifications', 'contact'].map(item => (
          <li key={item}>
            <a href={`#${item}`} className={getLinkClass(item)} onClick={() => handleNavClick(item)}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const Home = () => (
  <section id="home" className="hero-section">
    <div className="hero-container">
      <div className="hero-content">
        <h1 className="animate-hero">{resumeData.header.name}</h1>
        <h2 className="animate-hero delay-100">{resumeData.header.title}</h2>
        <p className="tagline animate-hero delay-200">Java | Python | SpringBoot | AI/ML</p>
        <div className="hero-buttons animate-hero delay-300">
          <a
            href={`${process.env.PUBLIC_URL}/Resume.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn secondary"
          >
            Download CV
          </a>
          <a href="#contact" className="btn primary">Contact Me</a>
          <a href="#projects" className="btn secondary">View Work</a>
        </div>
      </div>
      <div className="hero-image animate-hero delay-200">
        <img src={profile} alt="Sai Karthik Krishnam" />
      </div>
    </div>
  </section>
);

const About = () => (
  <section id="about" className="section-container">
    <Reveal>
      <h2 className="section-title">About Me</h2>
      <div className="about-content">
        <div className="summary-box">
          <h3>Professional Summary</h3>
          <p>{resumeData.about.summary}</p>
        </div>
        <div className="education-box">
          <h3>Education</h3>
          {resumeData.about.education.map((edu, index) => (
            <div key={index} className="edu-item">
              <h4>{edu.school}</h4>
              <p className="highlight">{edu.degree}</p>
              <p className="edu-meta">{edu.year} | {edu.score}</p>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  </section>
);

const Skills = () => (
  <section id="skills" className="section-container">
    <Reveal>
      <h2 className="section-title">Technical Skills</h2>
      <div className="skills-grid">
        {Object.entries(resumeData.skills).map(([category, items]) => (
          <div key={category} className="skill-card">
            <h3 className="capitalize">{category.replace('_', ' / ')}</h3>
            <div className="tags">
              {items.map(skill => <span key={skill} className="tag">{skill}</span>)}
            </div>
          </div>
        ))}
      </div>
    </Reveal>
  </section>
);

const Projects = () => (
  <section id="projects" className="section-container bg-alt">
    <Reveal>
      <h2 className="section-title">Projects</h2>
      <div className="projects-grid">
        {resumeData.projects.map((project, index) => (
          <div key={index} className="project-card">
            <h3>{project.title}</h3>
            <p className="tech-stack"><em>Tech:</em> {project.tech}</p>
            <ul className="project-details">
              {project.details.map((point, i) => <li key={i}>{point}</li>)}
            </ul>
            <a href={project.url} target="_blank" rel="noreferrer" className="btn primary" style={{ marginTop: '1rem', display: 'inline-block' }}>
              Visit Project
            </a>
          </div>
        ))}
      </div>
    </Reveal>
  </section>
);

const Experience = () => (
  <section id="experience" className="section-container">
    <Reveal>
      <h2 className="section-title">Experience</h2>
      <div className="timeline">
        {resumeData.experience.map((exp, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-header">
              <div>
                <h3>{exp.role}</h3>
                <h4>{exp.company}</h4>
              </div>
              <span className="date">{exp.duration}</span>
            </div>
            <ul className="timeline-body">
              {exp.points.map((pt, i) => <li key={i}>{pt}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </Reveal>
  </section>
);

const Certifications = () => (
  <section id="certifications" className="section-container">
    <Reveal>
      <h2 className="section-title">Certifications</h2>
      <div className="cert-grid">
        {resumeData.certifications.map((cert, index) => (
          <div key={index} className="cert-card">
            <div
              className="cert-img-wrapper"
              onClick={() => window.open(cert.image, "_blank")}
              title="Click to view certificate"
            >
              <img src={cert.image} alt={cert.title} className="cert-icon" />
              <div className="cert-overlay">
                <FaEye className="overlay-icon" />
              </div>
            </div>
            <p>{cert.title}</p>
          </div>
        ))}
      </div>
    </Reveal>
  </section>
);

const Contact = () => {
  const formRef = useRef();
  const [showPopup, setShowPopup] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);
    setCurrentTime(new Date().toLocaleString());

    emailjs
      .sendForm(
        "service_i2dy61l",     // Service ID
        "template_i26zlpn",    // Template ID
        formRef.current,
        "IlRUEFEB3HSnLLtU9"    // Public Key
      )
      .then(
        () => {
          setIsSending(false);
          setShowPopup(true);
          e.target.reset();
          setTimeout(() => setShowPopup(false), 4000);
        },
        (error) => {
          setIsSending(false);
          alert("Failed to send message. Please try again.");
          console.error("FAILED...", error);
        }
      );
  };

  return (
    <section id="contact" className="section-container footer-section">
      <h2 className="section-title">Get In Touch</h2>
      <div className="contact-content">
        <div className="contact-left">
          <h3>Let's Connect</h3>
          <p>I am currently open to new opportunities. Feel free to reach out!</p>
          <div className="contact-info-list">
            <a href={`tel:${resumeData.header.contact.phone}`} className="contact-row">
              <FaPhone /> {resumeData.header.contact.phone}
            </a>
            <a href={`mailto:${resumeData.header.contact.email}`} className="contact-row">
              <FaEnvelope /> {resumeData.header.contact.email}
            </a>
            <a href={resumeData.header.contact.linkedin} target="_blank" rel="noreferrer" className="contact-row">
              <FaLinkedin /> LinkedIn Profile
            </a>
            <a href={resumeData.header.contact.github} target="_blank" rel="noreferrer" className="contact-row">
              <FaGithub /> GitHub Profile
            </a>
          </div>
        </div>

        <div className="contact-right">
          <form className="contact-form" ref={formRef} onSubmit={sendEmail}>
            <input type="hidden" name="time" value={currentTime} />
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="email" name="email" placeholder="Your Email" required />
            <textarea name="message" placeholder="Your Message" rows="4" required></textarea>
            <button type="submit" className="btn primary" disabled={isSending}>
              {isSending ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
      <p className="copyright">© 2026 Sai Karthik Krishnam. Built with React.</p>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <FaCheckCircle className="popup-icon" />
            <h3>Success!</h3>
            <p>Your message has been sent successfully.</p>
            <button className="btn primary small" onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </section>
  );
};

function App() {
  return (
    <div className="App">
      <Navbar />
      <Home />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Certifications />
      <Contact />
    </div>
  );
}

export default App;