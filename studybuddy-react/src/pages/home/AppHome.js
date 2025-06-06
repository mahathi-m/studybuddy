import React, { useState } from 'react';
import TinderCard from 'react-tinder-card';
import '../../styles/AppHome.css';

import logo from '../../assets/logo.png';

// Master list of profiles
const allProfiles = [
  {
    name: 'Nesara',
    image: require('../../assets/Nesara.jpeg'),
    majorMinor: 'Biomedical Computation & French',
    classYear: 'Class of 2028',
    bio: `Freshman struggling to survive O-Chem and CS 106B with Keith. Looking for a committed chemistry (or pre-med?) study-buddy to meet...`,
    classes: 'CS 278, CHEM 33',
    interests: ['Startups / VC', 'Pre-Med', 'French', 'Social Entrepreneurship']
  },
  {
    name: 'Kevin',
    image: require('../../assets/Kevin.jpeg'),
    majorMinor: 'Human–Computer Interaction',
    classYear: 'Class of 2025',
    bio: `Usually camped at Green with headphones on. Open to anything from grind-mode to chatty review. If we match...`,
    classes: 'CS 278, CS 377U, PSYC 135',
    interests: ['Economics', 'HCI', 'AI / ML', 'Education']
  },
  {
    name: 'Luke',
    image: require('../../assets/Luke.jpeg'),
    majorMinor: 'MS&E and CS',
    classYear: 'Class of 2026',
    bio: `Junior trying to get through the MS&E core and survive CS 221. Looking for a committed study-buddy to hold me accountable.`,
    classes: 'CS 221, MS&E 140, CS 152',
    interests: ['Economics', 'AI', 'Pre-Finance', 'Entrepreneurship']
  },
  {
    name: 'Mahathi',
    image: require('../../assets/Mahathi.jpeg'),
    majorMinor: 'Computer Science & Sustainability',
    classYear: 'Class of 2025',
    bio: `Looking for a consistent buddy to meet weekly — same classes = bonus. I'm in HumBio + Psych, mostly reading-heavy stuff, but I make it fun :)`,
    classes: 'CS 278, CS 103, CS 111',
    interests: ['Neuroscience', 'Pre-Med', 'Social Psychology', 'Psychology']
  },
  {
    name: 'Anya Bulchandani',
    image: require('../../assets/Anya Bulchandani.jpeg'),
    majorMinor: 'Data Science & Mathematics',
    classYear: 'Class of 2027',
    bio: `Math-turned-data science major. Down to co-work quietly (even if we're doing different subjects) or walk through psets out loud. Preferably someone also in DS 112 or math 158`,
    classes: 'MATH 158, DATASCI 112',
    interests: ['UX / Design Thinking', 'Finance / Quant', 'Research', 'Mathematics']
  },
  {
    name: 'Susie Guo',
    image: require('../../assets/Susie Guo.jpeg'),
    majorMinor: 'Symbolic Systems & Computer Science',
    classYear: 'Class of 2027',
    bio: `Hey! I'm a SymSys major taking 106B, Phil80, Psych 1, and English 66 this quarter (CS+humanities). I study best with my friends, where we can mix silent lock-in times with some conversation. Feel free to reach out!`,
    classes: 'CS 106B, PSYCH 1, PHIL 80',
    interests: ['AI / ML', 'Startups / VC', 'Social Impact / Ethics', 'Computer Science']
  },
  {
    name: 'Anura Bracey',
    image: require('../../assets/Anura Bracey.jpg'),
    majorMinor: 'Linguistics & Public Policy',
    classYear: 'Class of 2028',
    bio: `I have to take Math 20 this quarter to fulfill a pubpol requirement and I'm suffering as a humanities student lol. Down to collab on psets and study for the final this week`,
    classes: 'MATH 20',
    interests: ['Pre-Law', 'Social Impact / Ethics', 'Humanities', 'Foreign languages']
  },
  {
    name: 'Sid Suresh',
    image: require('../../assets/Sid Suresh.JPG'),
    majorMinor: 'Computer Science & Econ',
    classYear: 'Class of 2028',
    bio: `Taking math 51 this quarter and interested in finding a study buddy to prep for the final. Love working in CODA/Green library basement!`,
    classes: 'MATH 51',
    interests: ['AI / ML', 'Social Impact / Ethics', 'Mathematics', 'Computer Science']
  },
  {
    name: 'Disha C',
    image: require('../../assets/Disha C.jpeg'),
    majorMinor: 'Undeclared',
    classYear: 'Class of 2028',
    bio: `Hi! I'm Disha. I love to write—anything from scripts to short-stories—and would love to get feedback on some of my work. I'm also in CS 106B this quarter and am looking for a study group. Don't hesitate to reach out (about either)! :)`,
    classes: 'CS 106B, ENGLISH 161',
    interests: ['Social Impact / Ethics', 'Humanities', 'Computer Science', 'Data Science']
  },
  {
    name: 'Piper Diehn',
    image: require('../../assets/Piper Diehn.png'),
    majorMinor: 'Humbio',
    classYear: 'Class of 2028',
    bio: `I'm a humbio major interested in pre-med/pre-dental. Currently taking math 21 and orgo—brutal combination for the Spring. I usually lock in at Green library on my own while listening to music, so I'm just looking for an accountability buddy/pset partner!`,
    classes: 'MATH 21, CHEM 33',
    interests: ['Health Tech', 'Pre-Med', 'Journalism', 'Computer Science']
  },
  {
    name: 'Dalia Ovadia',
    image: require('../../assets/Dalia Ovadia.webp'),
    majorMinor: 'EE & Computer Science',
    classYear: 'Class of 2028',
    bio: `I'm considering EE as a potential major but also interested in CS and math. If anyone wants to study for the 51 final lmk!!`,
    classes: 'MATH 51, ENGR 21',
    interests: ['AI / ML', 'Research', 'Robotics', 'Computer Science']
  },
  {
    name: 'Jasper Karlson',
    image: require('../../assets/Jasper Karlson.png'),
    majorMinor: 'Mathematics',
    classYear: 'Class of 2028',
    bio: `Math major and dancer! Taking 53 right now (but down to help with any other classes in the 50 series) and CS 106B`,
    classes: 'CS 106B, MATH 53',
    interests: ['AI / ML', 'Studio Art', 'Mathematics', 'Computer Science']
  },
  {
    name: 'Mahi Jarwala',
    image: require('../../assets/Mahi Jarwala.jpeg'),
    majorMinor: 'Computer Science',
    classYear: 'Class of 2028',
    bio: `in cs 106B and math 21 this quarter`,
    classes: 'CS 106B, MATH 21',
    interests: ['AI / ML', 'Startups / VC', 'Research', 'Computer Science']
  },
  {
    name: 'Rohan Karunaratne',
    image: require('../../assets/rohan karunaratne.png'),
    majorMinor: 'EE',
    classYear: 'Class of 2026',
    bio: `EE Major here for the vibes`,
    classes: 'EE42, EE65, MSE140, EE259, FRENCH 3',
    interests: ['Startups / VC', 'Finance / Quant', 'Pre-Law', 'Robotics']
  },
  {
    name: 'Sophia Browder',
    image: require('../../assets/Sophia Browder.jpeg'),
    majorMinor: 'EE',
    classYear: 'Class of 2028',
    bio: `Interested in health startups and precision medicine. In math 51 and starting to study for the final!`,
    classes: 'MATH 51',
    interests: ['AI / ML', 'Health Tech', 'Startups / VC', 'Computer Science']
  },
  {
    name: 'Amari Porter',
    image: require('../../assets/Amari Porter.jpeg'),
    majorMinor: 'Symbolic Systems & Computer Science',
    classYear: 'Class of 2027',
    bio: `Hi! I am majoring in Symbolic Systems with a concentration in Human-Centered Artificial Intelligence. Open to meeting and working with new people!`,
    classes: 'CS 106B, CS 103, PSYCH 1',
    interests: ['AI / ML', 'Social Impact / Ethics', 'Research', 'Computer Science']
  },
  {
    name: 'Luc Giraud',
    image: require('../../assets/Luc Giraud .jpeg'),
    majorMinor: 'International Relations',
    classYear: 'Class of 2024',
    bio: `Hi, I'm Luc and I'm studying economics and energy within IR.`,
    classes: 'PSYCH 70',
    interests: ['AI / ML', 'Startups / VC', 'Sustainability', 'Social Entrepreneurship']
  },
  {
    name: 'Ben O\'Keefe',
    image: require('../../assets/Ben OKeefe.jpeg'),
    majorMinor: 'Computer Science',
    classYear: 'Class of 2026',
    bio: `CS Major trying to get through the quarter. Typically study in quiet locations with earbuds. Happy to review notes and quiz for exams.`,
    classes: 'CS 166, CS 323, CS 199, CS 155, HISTORY 111B',
    interests: ['AI / ML', 'Startups / VC', 'GenAI', 'Computer Science']
  },
  {
    name: 'Megan Chiang',
    image: require('../../assets/Megan Chiang.jpg'),
    majorMinor: 'Computer Science',
    classYear: 'Class of 2027',
    bio: `Pre-med CS major hoping to work on psets with each other together`,
    classes: 'STATS 202, CHEM 143, BIO 86, NBIO 101',
    interests: ['Health Tech', 'Pre-Med', 'Research', 'Neuroscience']
  },
  {
    name: 'Hannah',
    image: require('../../assets/Hannah.png'),
    majorMinor: 'Symsys',
    classYear: 'Class of 2028',
    bio: `Still exploring, open to anything!`,
    classes: 'CS106B, COLLEGE 113, PSYCH1, PHIL2, GOLF(advanced)',
    interests: ['UX / Design Thinking', 'Startups / VC', 'Finance / Quant', 'Sustainability']
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

  // Keep track of which cards have been swiped
  const [swiped, setSwiped] = useState([]);

  const outOfFrame = (name) => {
    console.log(`${name} left the screen!`);
  };

  const handleSwipe = (direction, index) => {
    console.log(`Swiped ${direction} on ${profileQueue[index]?.name || 'profile'}`);    
    setSwiped((prevSwiped) => [...prevSwiped, index]);
    
    // Wait a moment before updating the queue to allow the animation to complete
    setTimeout(() => {
      setProfileQueue((prevQueue) => {
        const newQueue = [...prevQueue];
        newQueue.splice(index, 1); // Remove the swiped card
        return newQueue;
      });
      setSwiped([]); // Reset swiped cards
    }, 300);
  };

  return (
    <div className="app-home">
      <div className="home-header">
        <img src={logo} alt="SyncUp Logo" className="logo" />
      </div>

      <div className="card-deck">
        {profileQueue.length === 0 ? (
          <div className="no-more-profiles">
            <h3>No more profiles</h3>
            <p>You've seen all available study buddies!</p>
            <button 
              className="restart-button"
              onClick={() => setProfileQueue(shuffle(allProfiles))}
            >
              See All Profiles Again
            </button>
          </div>
        ) : (
          profileQueue.slice(0, 3).map((profile, index) => (
          <TinderCard
            key={profile.id || index}
            className={`swipe ${swiped.includes(index) ? 'swiped' : ''}`}
            preventSwipe={['up', 'down']}
            onSwipe={(dir) => handleSwipe(dir, index)}
            onCardLeftScreen={() => outOfFrame(profile.name)}
            swipeRequirementType="position"
            swipeThreshold={80}
          >
            <div className="profile-card" style={{ zIndex: 1000 - index }}>
              <img src={profile.image} alt="Profile" className="profile-image" />
              <h2>{profile.name}</h2>
              <p className="major-minor">{profile.majorMinor}</p>
              <p className="class-year"><em>{profile.classYear}</em></p>

              <div className="bio-section">
                <strong>About</strong>
                <p className="bio-preview">{profile.bio}</p>
              </div>

              <div className="classes-section">
                <strong>Classes</strong>
                <p>{profile.classes}</p>
              </div>

              <div className="interests-section">
                <strong>Interests</strong>
                <div className="interest-tags">
                  {profile.interests.map((tag) => (
                    <span key={tag} className="interest-pill">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </TinderCard>
        )))}
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