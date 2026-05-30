import { MotionConfig } from 'framer-motion';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Contact from './components/Contact';

export default function App() {
  return (
    // reducedMotion="user" → Framer Motion checks the OS preference globally
    <MotionConfig reducedMotion="user">
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Achievements />
        <Contact />
      </main>
    </MotionConfig>
  );
}
