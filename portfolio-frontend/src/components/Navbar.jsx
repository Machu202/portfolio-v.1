import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1>Minh's Blog</h1>
      <ul className="nav-links">
        <li><Link to="/">Main</Link></li>
        <li><Link to="/project">Project</Link></li>
        <li><Link to="/hobby">Hobby</Link></li>
        <li><Link to="/movie-game">Movie & Game</Link></li>
      </ul>
    </nav>
  );
}