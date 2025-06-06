import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

/**
 * Protected route component to control access based on authentication and onboarding status
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render if conditions are met
 * @param {boolean} props.requireAuth - Whether authentication is required
 * @param {boolean} props.requireOnboarding - Whether completed onboarding is required
 * @param {boolean} props.redirectIfOnboardingComplete - Whether to redirect if onboarding is complete
 * @returns {React.ReactNode} Either the protected component or a redirect
 */
const ProtectedRoute = ({ 
  children, 
  requireAuth = true,
  requireOnboarding = false,
  redirectIfOnboardingComplete = false
}) => {
  const { currentUser, loading, onboardingComplete } = useUser();
  
  // Show loading state while auth state is being determined
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  
  // Check authentication requirement
  if (requireAuth && !currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  // Check onboarding status requirements
  if (requireOnboarding && !onboardingComplete) {
    return <Navigate to="/onboarding/name" replace />;
  }
  
  // Redirect if onboarding complete but trying to access onboarding pages
  if (redirectIfOnboardingComplete && onboardingComplete) {
    return <Navigate to="/home" replace />;
  }
  
  // If all checks pass, render the protected content
  return children;
};

export default ProtectedRoute;
