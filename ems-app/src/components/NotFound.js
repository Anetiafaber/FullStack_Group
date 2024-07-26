import React from "react";
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  // navigate to home page
  const handleButtonClick = () => {
    navigate('/');
  };

    return (
      <div className="notFoundContainer">
        <h2>Nothing to see here!</h2>
        <p>
          <button className="btn btn-secondary btn-nav-home" onClick={handleButtonClick}>
            Go to the home page
          </button>
        </p>
      </div>
    );
}

export default NotFound;