// HomePage.tsx

// HomePage.tsx
import React, { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

const HomePage: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <a href="https://www.li.me/" target="_blank">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>
      <h1>Lime Connect</h1>
      <div className="card">
        <button onClick={() => setCount(count + 1)}>
          count is {count}
        </button>
        <p>Welcome to Lime Connect</p>
      </div>
      <p className="read-the-docs">
        Where biking meets business
      </p>
    </div>
  );
};

export default HomePage;
