// Importerer React og Link komponenten fra React Router DOM for JSX syntaks og deklarativ navigation.
import React from 'react';
import { Link } from 'react-router-dom';

// Definerer Header komponenten for appens header.
function Header() {
  return (
    <header className="app-header">
      <nav className="app-nav">
        <Link className="app-link" to="/">Home</Link>
      </nav>
    </header>
  );
}

// Eksporterer Header for brug i appen.
export default Header;

