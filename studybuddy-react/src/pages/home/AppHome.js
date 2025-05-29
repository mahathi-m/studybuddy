import React, { useState, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import '../../styles/AppHome.css';
import { useUser } from '../../contexts/UserContext';
import { getPotentialMatches, recordSwipe } from '../../services/userService';
import { auth } from '../../firebase';
import AdminTools from '../../components/AdminTools';

import logo from '../../assets/logo.png';
import defaultProfile from '../../assets/default-profile.png';

// Sample profiles as fallback
const sampleProfiles = [
  {
    name: 'Sample User',
    majorMinor: 'Computer Science & Math',
    gradYear: '2025',
    bio: 'This is a sample profile shown when no other users are available.',
    classes: ['CS 101', 'Math 51'],
    interests: ['Programming', 'Machine Learning', 'Data Science'],
    photoURL: null
  }
];

// Helper to format classes array or string
const formatClasses = (classes) => {
  if (!classes) return '';
  if (Array.isArray(classes)) return classes.join(', ');
  return classes;
};

// Helper to get display name
const getDisplayName = (profile) => {
  return profile.name || profile.displayName || 'Student';
};

// Helper to format major/minor
const formatMajorMinor = (profile) => {
  let result = '';
  
  if (profile.major) {
    if (Array.isArray(profile.major)) {
      result += profile.major.join(', ');
    } else {
      result += profile.major;
    }
  }
  
  if (profile.minor) {
    if (Array.isArray(profile.minor)) {
      result += ' & ' + profile.minor.join(', ');
    } else {
      result += ' & ' + profile.minor;
    }
  }
  
  return result || 'Student';
};

function AppHome() {
  // Instead of destructuring which is causing the error, use the hook directly
  const userContext = useUser();
  const [loading, setLoading] = useState(true);
  const [profileQueue, setProfileQueue] = useState([]);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [matchAlert, setMatchAlert] = useState(null);

  // Debug current user
  useEffect(() => {
    console.log('Current auth state:', auth.currentUser ? 'Logged in' : 'Not logged in');
  }, []);

  // Fetch potential matches on component mount
  useEffect(() => {
    const fetchProfiles = async () => {
      console.log('Starting profile fetch...');
      // Use auth.currentUser since it's more reliable during initial render
      if (!auth.currentUser) {
        console.log('No authenticated user yet, loading sample profiles as fallback');
        // Use sample profiles if no auth
        setProfileQueue(sampleProfiles);
        setCurrentProfile(sampleProfiles[0]);
        setLoading(false);
        return;
      }

      setLoading(true);
      
      try {
        // Set fallback profiles immediately to avoid blank screen while loading
        setProfileQueue(sampleProfiles);
        setCurrentProfile(sampleProfiles[0]);
        
        const result = await getPotentialMatches(auth.currentUser.uid);
        console.log('Fetched profiles result:', result);
        
        if (result.success && result.users && result.users.length > 0) {
          console.log('Found profiles:', result.users.length);
          // Shuffle the profiles for variety
          const shuffledProfiles = result.users
            .map(user => ({
              sort: Math.random(),
              value: user
            }))
            .sort((a, b) => a.sort - b.sort)
            .map(item => item.value);
          
          console.log('Setting first profile:', shuffledProfiles[0]);
          setProfileQueue(shuffledProfiles);
          setCurrentProfile(shuffledProfiles[0]);
        } else {
          // Use sample profiles if no real users are found
          console.log('No potential matches found, using sample profiles');
          setProfileQueue(sampleProfiles);
          setCurrentProfile(sampleProfiles[0]);
        }
      } catch (error) {
        console.error('Error fetching profiles:', error);
        setProfileQueue(sampleProfiles);
        setCurrentProfile(sampleProfiles[0]);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const handleSwipe = (direction) => {
    if (!currentProfile) return;
    
    const isLike = direction === 'right';
    
    // Record the swipe in Firebase if it's a real profile (has an ID)
    if (currentProfile.id && auth.currentUser) {
      recordSwipe(auth.currentUser.uid, currentProfile.id, isLike)
        .then(result => {
          if (result.success && result.match) {
            // Show match notification
            setMatchAlert({
              name: getDisplayName(currentProfile),
              id: currentProfile.id
            });
            
            setTimeout(() => {
              setMatchAlert(null);
            }, 3000);
          }
        })
        .catch(error => console.error('Error recording swipe:', error));
    }
    
    // Move to next profile
    setTimeout(() => {
      const nextQueue = [...profileQueue];
      const swipedProfile = nextQueue.shift(); // Remove the first profile (the one just swiped)

      if (nextQueue.length === 0) {
        // If we're out of profiles, fetch them again or reuse the ones we've already seen
        console.log('Refetching profiles for infinite looping...');
        
        // First try to fetch fresh profiles
        if (auth.currentUser) {
          getPotentialMatches(auth.currentUser.uid)
            .then(result => {
              if (result.success && result.users.length > 0) {
                // Shuffle the profiles
                const shuffledProfiles = result.users
                  .map(user => ({
                    sort: Math.random(),
                    value: user
                  }))
                  .sort((a, b) => a.sort - b.sort)
                  .map(item => item.value);
                
                setProfileQueue(shuffledProfiles);
                setCurrentProfile(shuffledProfiles[0]);
              } else {
                // If no profiles, add the swiped profile back to the end for infinite looping
                if (swipedProfile) {
                  const recycledQueue = [swipedProfile];
                  setProfileQueue(recycledQueue);
                  setCurrentProfile(recycledQueue[0]);
                } else {
                  // Last resort - use sample profiles
                  setProfileQueue(sampleProfiles);
                  setCurrentProfile(sampleProfiles[0]);
                }
              }
            })
            .catch(error => {
              console.error('Error refetching profiles:', error);
              // Recycle the swiped profile as a fallback
              if (swipedProfile) {
                const recycledQueue = [swipedProfile];
                setProfileQueue(recycledQueue);
                setCurrentProfile(recycledQueue[0]);
              } else {
                setProfileQueue(sampleProfiles);
                setCurrentProfile(sampleProfiles[0]);
              }
            });
        } else {
          // If no auth, use sample profiles
          setProfileQueue(sampleProfiles);
          setCurrentProfile(sampleProfiles[0]);
        }
      } else {
        // Still have profiles in the queue
        setProfileQueue(nextQueue);
        setCurrentProfile(nextQueue[0]);
      }
    }, 150);
  };

  return (
    <div className="app-home">
      {/* Match Alert Notification */}
      {matchAlert && (
        <div className="match-alert">
          <h3>It's a Match!</h3>
          <p>You and {matchAlert.name} can now message each other</p>
          <button onClick={() => setMatchAlert(null)}>Continue Swiping</button>
        </div>
      )}
      
      <div className="home-header">
        <img src={logo} alt="StudyBuddy Logo" className="logo" />
      </div>

      {loading ? (
        <div className="loading">
          <p>Loading potential study buddies...</p>
        </div>
      ) : currentProfile ? (
        <div className="card-deck">
          {/* Force the TinderCard component to unmount and remount when the profile changes */}
          <TinderCard
            key={currentProfile.id || currentProfile.name || 'sample-' + Math.random()}
            className="swipe"
            preventSwipe={['up', 'down']}
            onSwipe={handleSwipe}
          >
            <div className="profile-card">
              <img 
                src={currentProfile.photoURL || defaultProfile} 
                alt={`${getDisplayName(currentProfile)}'s profile`} 
                className="profile-image" 
              />
              <h2>{getDisplayName(currentProfile)}</h2>
              <p className="major-minor">{formatMajorMinor(currentProfile)}</p>
              <p className="class-year"><em>Class of {currentProfile.gradYear || '2025'}</em></p>

              <div className="bio-section">
                <strong>About</strong>
                <p className="bio-preview">{currentProfile.bio || 'No bio provided'}</p>
              </div>

              <div className="classes-section">
                <strong>Classes</strong>
                <p>{formatClasses(currentProfile.classes)}</p>
              </div>

              <div className="interests-section">
                <strong>Interests</strong>
                <div className="interest-tags">
                  {(currentProfile.interests && Array.isArray(currentProfile.interests)) ? 
                    currentProfile.interests.map((tag) => (
                      <span key={tag} className="interest-pill">{tag}</span>
                    )) : 
                    <span className="interest-pill">No interests listed</span>
                  }
                </div>
              </div>
              
              <div className="swipe-instructions">
                <div className="swipe-left">← Swipe left to pass</div>
                <div className="swipe-right">Swipe right to match →</div>
              </div>
            </div>
          </TinderCard>
        </div>
      ) : (
        <div className="no-profiles">
          <p>No more profiles available. Check back later!</p>
        </div>
      )}

      <nav className="bottom-nav">
        <button className="active" title="Find Study Buddies">🔥</button>
        <button onClick={() => alert('Chat feature coming soon!')} title="Messages">💬</button>
        <button onClick={() => alert('Calendar feature coming soon!')} title="Study Sessions">📅</button>
        <button onClick={() => alert('Profile view coming soon!')} title="Your Profile">👤</button>
      </nav>
      
      {/* Debug Info - Remove in production */}
      <div className="debug-info" style={{ padding: '10px', margin: '10px', backgroundColor: '#f8f9fa', borderRadius: '5px', fontSize: '12px' }}>
        <p><strong>Debug:</strong> {loading ? 'Loading...' : (currentProfile ? 'Profile loaded' : 'No profile loaded')}</p>
        <p>Auth state: {auth.currentUser ? 'Logged in' : 'Not logged in'}</p>
        <p>Profiles in queue: {profileQueue.length}</p>
        {currentProfile && <p>Current profile: {getDisplayName(currentProfile)}</p>}
      </div>
      
      {/* Admin Tools Section */}
      {auth.currentUser && <AdminTools />}
    </div>
  );
}

export default AppHome;
