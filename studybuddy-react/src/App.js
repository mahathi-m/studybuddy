import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db, provider } from './firebase';
import './App.css';

import OnboardingName from './pages/onboarding/01_OnboardingName';
import OnboardingGender from './pages/onboarding/02_OnboardingGender';
import OnboardingGradYear from './pages/onboarding/03_OnboardingGradYear';
import OnboardingMajorMinor from './pages/onboarding/04_OnboardingMajorMinor';
import OnboardingInterests from './pages/onboarding/05_OnboardingInterests';
import OnboardingClasses from './pages/onboarding/06_OnboardingClasses';
import OnboardingHelpType from './pages/onboarding/07_OnboardingHelpType';
import OnboardingConnectionType from './pages/onboarding/08_OnboardingConnectionType';
import OnboardingWorkStyle from './pages/onboarding/09_OnboardingWorkStyle';
import OnboardingPhoto from './pages/onboarding/10_OnboardingPhoto';
import OnboardingBio from './pages/onboarding/11_OnboardingBio';
import OnboardingHouseRules from './pages/onboarding/12_OnboardingHouseRules';
import AppHome from './pages/home/AppHome';

function Home() {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    // Skip authentication and directly navigate to home
    console.log('Navigating to home');
    navigate('/home');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Study Buddy 📚</h1>
        <p>Find your perfect study match and stay accountable!</p>
        <button className="App-button" onClick={handleGoogleLogin}>
          Create Profile
        </button>
      </header>
    </div>
  );
}

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/onboarding/name" element={<OnboardingName />} />
        <Route path="/onboarding/gender" element={<OnboardingGender />} />
        <Route path="/onboarding/gradyear" element={<OnboardingGradYear />} />
        <Route path="/onboarding/majorminor" element={<OnboardingMajorMinor />} />
        <Route path="/onboarding/interests" element={<OnboardingInterests />} />
        <Route path="/onboarding/classes" element={<OnboardingClasses />} />
        <Route path="/onboarding/helptype" element={<OnboardingHelpType />} />
        <Route path="/onboarding/connection" element={<OnboardingConnectionType />} />
        <Route path="/onboarding/workstyle" element={<OnboardingWorkStyle />} />
        <Route path="/onboarding/photo" element={<OnboardingPhoto />} />
        <Route path="/onboarding/bio" element={<OnboardingBio />} />
        <Route path="/onboarding/houserules" element={<OnboardingHouseRules />} />
        <Route path="/home" element={<AppHome />} />
      </Routes>
  );
}

export default App;
