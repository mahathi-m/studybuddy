import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { getUserData, checkOnboardingStatus } from '../services/userService';

// Create context
const UserContext = createContext();

// Custom hook to use the user context
export const useUser = () => {
  return useContext(UserContext);
};

// Provider component
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        try {
          // Get user data from Firestore
          const result = await getUserData(user.uid);
          if (result.success) {
            setUserData(result.data);
            
            // Check if onboarding is complete
            if (result.data && result.data.onboardingComplete) {
              setOnboardingComplete(true);
            } else {
              setOnboardingComplete(false);
              console.log('Onboarding not complete or not found in user data');
            }
          } else {
            setUserData(null);
            setOnboardingComplete(false);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUserData(null);
          setOnboardingComplete(false);
        }
      } else {
        setUserData(null);
        setOnboardingComplete(false);
      }
      
      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  // Refresh user data
  const refreshUserData = async () => {
    if (currentUser) {
      try {
        const result = await getUserData(currentUser.uid);
        if (result.success) {
          setUserData(result.data);
          return result.data;
        }
      } catch (error) {
        console.error('Error refreshing user data:', error);
      }
    }
    return null;
  };

  // Value object to be provided to consumers
  const value = {
    currentUser,
    userData,
    loading,
    onboardingComplete,
    refreshUserData,
    setUserData
  };
  
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
