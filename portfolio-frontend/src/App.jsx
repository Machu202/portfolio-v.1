import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Project from './pages/Project';
import Hobby from './pages/Hobby';
import MovieGame from './pages/MovieGame';
import './assets/global.css';
// ... keep your other imports ...
import Admin from './pages/Admin';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project" element={<Project />} />
          <Route path="/hobby" element={<Hobby />} />
          <Route path="/movie-game" element={<MovieGame />} />
          {/* Add the new admin route here */}
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;