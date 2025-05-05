// OnboardingHelpType.js
import React, { useState } from 'react';
import '../../styles/OnboardingBase.css';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../../components/ProgressBar';

const helpOptions = [
  "One-time help on an assignment",
  "Low-stakes accountability buddy",
  "A consistent study partner",
  "Just exploring!"
];

function OnboardingHelpType() {
  const [selected, setSelected] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Help type:', selected);
    navigate('/onboarding/connection');
  };

  return (
    <div className="profile-container">
      <div className="exit" onClick={() => navigate(-1)}>←</div>
      <div className="profile-box">
        <ProgressBar currentStep={6} totalSteps={10} />
        <h2><strong>What do you need help with right now?</strong></h2>
        <p className="subtext">You're here for...</p>
        <form onSubmit={handleSubmit}>
          {helpOptions.map((option) => (
            <button
              type="button"
              key={option}
              className={`option-button ${selected === option ? 'selected' : ''}`}
              onClick={() => setSelected(option)}
            >
              {option}
            </button>
          ))}
          <button type="submit" className="continue-btn">CONTINUE</button>
        </form>
      </div>
    </div>
  );
}

export default OnboardingHelpType;