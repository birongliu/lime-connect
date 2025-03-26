import React, { useState } from 'react';
import { Route, Routes, Link, useLocation } from 'react-router-dom';  // useLocation and Route/Routes import
import './App.css';
// Import components for different pages
import HomePage from './HomePage';
import SecondPage from './SecondPage.tsx';

const App: React.FC = () => {
  const [count, setCount] = useState(0);
  const location = useLocation(); // useLocation to get current path

  return (
    <div>
      {/* Navigation Bar: Only show this button if not on the second page */}
      {location.pathname !== '/second' && (
        <nav>
          <Link to="/second">
            <button>Go to Second Interface</button>
          </Link>
        </nav>
      )}

      {/* Routes for different pages */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/second" element={<SecondPage />} />
      </Routes>
    </div>
  );
}

export default App;
