import React from 'react';
import '../../styles/OnboardingBase.css';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../../components/ProgressBar';

function OnboardingHouseRules() {
  const navigate = useNavigate();

  const handleAgree = () => {
    console.log('User agreed to house rules');
    navigate('/home'); // or home page
  };

  return (
    <div className="profile-container">
      <div className="exit" onClick={() => navigate(-1)}>←</div>
      <div className="profile-box">
        <ProgressBar currentStep={10} totalSteps={10} />
        <h2><strong>Welcome to Study Buddy.</strong></h2>
        <p className="subtext">Please follow these House Rules.</p>
        <ul className="rules-list">
          <li><strong>✔ Be authentic.</strong><br />Make sure you are genuine with your partner preferences and expectations.</li>
          <li><strong>✔ Stay on topic.</strong><br />Only use this platform for finding a compatible study partner.</li>
          <li><strong>✔ Be respectful.</strong><br />Treat others how you'd like to be treated.</li>
          <li><strong>✔ Respect Privacy.</strong><br />Please respect other users' privacy.</li>
        </ul>
        <button onClick={handleAgree} className="continue-btn">I AGREE</button>
      </div>
    </div>
  );
}

export default OnboardingHouseRules;
