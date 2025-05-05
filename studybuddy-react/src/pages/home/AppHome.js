import React, { useState, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import '../../styles/AppHome.css';

import logo from '../../assets/logo.png';
import profile1 from '../../assets/Nesara.jpeg';
import profile2 from '../../assets/Mahathi.jpeg';
import profile3 from '../../assets/Kevin.jpeg';
import profile4 from '../../assets/Luke.jpeg';

// Master list of profiles
const allProfiles = [
  {
    name: 'Nesara',
    image: profile1,
    majorMinor: 'Biomedical Computation & French',
    classYear: 'Class of 2028',
    bio: `Freshman struggling to survive O-Chem and CS 106B with Keith. Looking for a committed chemistry (or pre-med?) study-buddy to meet...`,
    classes: 'CS 278, CHEM 33',
    interests: ['Startups / VC', 'Pre-Med', 'French', 'Social Entrepreneurship']
  },
  {
    name: 'Kevin',
    image: profile3,
    majorMinor: 'Human–Computer Interaction',
    classYear: 'Class of 2025',
    bio: `Usually camped at Green with headphones on. Open to anything from grind-mode to chatty review. If we match...`,
    classes: 'CS 278, CS 377U, PSYC 135',
    interests: ['Economics', 'HCI', 'AI / ML', 'Education']
  },
  {
    name: 'Luke',
    image: profile4,
    majorMinor: 'MS&E and CS',
    classYear: 'Class of 2026',
    bio: `Junior trying to get through the MS&E core and survive CS 221. Looking for a committed study-buddy to hold me accountable.`,
    classes: 'CS 221, MS&E 140, CS 152',
    interests: ['Economics', 'AI', 'Pre-Finance', 'Entrepreneurship']
  },
  {
    name: 'Mahathi',
    image: profile2,
    majorMinor: 'Computer Science & Sustainability',
    classYear: 'Class of 2025',
    bio: `Looking for a consistent buddy to meet weekly — same classes = bonus. I’m in HumBio + Psych, mostly reading-heavy stuff, but I make it fun :)`,
    classes: 'CS 278, CS 103, CS 111',
    interests: ['Neuroscience', 'Pre-Med', 'Social Psychology', 'Psychology']
  }
];

// Shuffle helper
const shuffle = (arr) => {
  return arr.map((a) => ({ sort: Math.random(), value: a }))
            .sort((a, b) => a.sort - b.sort)
            .map((a) => ({ ...a.value, id: crypto.randomUUID() }));
};

function AppHome() {
  const [profileQueue, setProfileQueue] = useState(shuffle(allProfiles));
  const [currentProfile, setCurrentProfile] = useState(profileQueue[0]);

  const handleSwipe = () => {
    setTimeout(() => {
      const nextQueue = [...profileQueue];
      nextQueue.shift();

      if (nextQueue.length === 0) {
        const reshuffled = shuffle(allProfiles);
        setProfileQueue(reshuffled);
        setCurrentProfile(reshuffled[0]);
      } else {
        setProfileQueue(nextQueue);
        setCurrentProfile(nextQueue[0]);
      }
    }, 150);
  };

  return (
    <div className="app-home">
      <div className="home-header">
        <img src={logo} alt="SyncUp Logo" className="logo" />
      </div>

      <div className="card-deck">
        <TinderCard
          key={currentProfile.id}
          className="swipe"
          preventSwipe={['up', 'down']}
          onCardLeftScreen={handleSwipe}
        >
          <div className="profile-card">
            <img src={currentProfile.image} alt="Profile" className="profile-image" />
            <h2>{currentProfile.name}</h2>
            <p className="major-minor">{currentProfile.majorMinor}</p>
            <p className="class-year"><em>{currentProfile.classYear}</em></p>

            <div className="bio-section">
              <strong>About</strong>
              <p className="bio-preview">{currentProfile.bio}</p>
            </div>

            <div className="classes-section">
              <strong>Classes</strong>
              <p>{currentProfile.classes}</p>
            </div>

            <div className="interests-section">
              <strong>Interests</strong>
              <div className="interest-tags">
                {currentProfile.interests.map((tag) => (
                  <span key={tag} className="interest-pill">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </TinderCard>
      </div>

      <nav className="bottom-nav">
        <button onClick={() => alert('TODO: Swipe view')}>🔥</button>
        <button onClick={() => alert('TODO: Chat view')}>💬</button>
        <button onClick={() => alert('TODO: Calendar view')}>📅</button>
        <button onClick={() => alert('TODO: Profile view')}>👤</button>
      </nav>
    </div>
  );
}

export default AppHome;
