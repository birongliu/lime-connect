import React, { useState } from 'react';
import { Route, Routes, Link, useLocation } from 'react-router-dom';  // useLocation and Route/Routes import
import './App.css';
// Import components for different pages
import HomePage from './HomePage';
import SecondPage from './SecondPage.tsx';
import limehomebutton from '/LimeHbutton.png';

const App: React.FC = () => {
  const [count, setCount] = useState(0);
  const location = useLocation();

  return (
    <div>
      {/* Routes for different pages */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/second" element={<SecondPage />} />
      </Routes>

      
      {location.pathname !== '/second' && (
         <nav style={{ textAlign: "center", marginTop: "20px" }}>
         <Link to="/second">
           <img 
             src={limehomebutton} 
             alt="Go to Second Interface"
             style={{ width: "250px", height: "auto", cursor: "pointer" }}
           />
         </Link>
       </nav>
      )}
    </div>
  );
}

export default App;
