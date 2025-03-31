// HomePage.tsx

// HomePage.tsx
import React, { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import limeLogo from '/lime.svg';
import './App.css';

const HomePage: React.FC = () => {

  return (
    <div>
       <h1 style ={{color: '#84F289' }} >Welcome to Lime Connect</h1>
      <a href="https://www.li.me/" target="_blank">
        <img src={limeLogo} className="logo" alt="Lime logo" />
      </a>
      <p style={{ fontSize: "24px", color: '#F8FFF8' }}>See What's New</p>
      

      <div  className="desc-content">
        <img src={limeLogo} className="logo" alt="Lime logo" />
      <p className ="desc">
        Lime is now available in all NYC Boroughs.
      </p>
      </div>

      <div  className="desc-content">
      <img src={limeLogo} className="logo" alt="Lime logo" />
      <p className ="desc">
        Easily get to know any NYC neighborhood with Lime Routes.
      </p>
      </div>

      <div  className="desc-content">
      <img src={limeLogo} className="logo" alt="Lime logo" />
      <p className ="desc">
        Gain Community- New Group Rides, no destination needed. 
      </p>
      </div>
    </div>
  );
};

export default HomePage;
