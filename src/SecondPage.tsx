import React from 'react';
import { Link } from 'react-router-dom';

const SecondPage: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Second Page</h1>
      <p>This is the second page of the app.</p>

      {/* Button to navigate back to the home page */}
      <Link to="/">
        <button>Go to Home Page</button>
      </Link>
    </div>
  );
}

export default SecondPage;
