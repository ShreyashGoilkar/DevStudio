import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import ProjectDeck from '@/components/ProjectDeck';
import DevTools from '@/components/DevTools';
import ProjectManager from '@/components/ProjectManager';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import NotFound from '@/components/NotFound';

function App() {
  return (
    <BrowserRouter basename="/DevStudio">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Hero />} />
          <Route path="/projects" element={<ProjectDeck />} />
          <Route path="/tools" element={<DevTools />} />
          <Route path="/manager" element={<ProjectManager />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
