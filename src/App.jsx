import React, { useState, useEffect } from 'react';

// Import your page components
import SetupPage from './Components/SetupPage';
import GuidePage from './Components/GuidePage';
import AboutPage from './Components/AboutPage';
import SupportPage from './Components/SupportPage';
import LandingPage from './Components/LandingPage';
import WeatherPage from './Components/WeatherPage';
import ClothingPage from './Components/ClothingPage';
import CalculatorPage from './Components/CalculatorPage';

export default function App() {
  const [currentView, setCurrentView] = useState(() => {
    return localStorage.getItem('view');
  });

  const [hasProfile, setHasProfile] = useState(() => {
    return !!localStorage.getItem('user_profile');
  });

  useEffect(() => {
    const handleStorageChange = () => {
      setCurrentView(localStorage.getItem('view'));
      setHasProfile(!!localStorage.getItem('user_profile'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // The tab title follows the current view: Weather, Calculator, Setup, Guide...
  // The style page keeps its on-screen name (Maison); the landing tab says Safe.
  useEffect(() => {
    if (!hasProfile) {
      document.title = 'Setup';
      return;
    }
    if (!currentView) {
      document.title = 'Safe';
      return;
    }
    const view = currentView.toLowerCase();
    const titles = {
      weather: 'Weather',
      clothing: 'Maison',
      'clothing store': 'Maison',
      calculator: 'Calculator',
      setup: 'Setup',
      guide: 'Guide',
      about: 'About',
      support: 'Support'
    };
    document.title = titles[view] || 'Safe';
  }, [currentView, hasProfile]);

  const changeView = (viewName) => {
    if (viewName) {
      localStorage.setItem('view', viewName);
      setCurrentView(viewName);
    } else {
      localStorage.removeItem('view');
      setCurrentView(null);
    }
  };

  // 1. If no user profile, show setup page
  if (!hasProfile) {
    return <SetupPage onComplete={() => {
      setHasProfile(true);
      changeView('guide');
    }} />;
  }

  // 2. Handle special routes
  if (currentView === 'setup') {
    return <SetupPage onComplete={() => changeView('guide')} />;
  }

  if (currentView === 'guide') {
    return <GuidePage onComplete={() => changeView(null)} />;
  }

  if (currentView === 'about') {
    return <AboutPage onComplete={() => changeView(null)} />;
  }

  if (currentView === 'support') {
    return <SupportPage onComplete={() => changeView(null)} />;
  }

  // 3. If 'view' is NOT set, render the Landing Page
  if (!currentView) {
    return <LandingPage onNavigate={(view) => changeView(view)} />;
  }

  // 4. If 'view' IS set, route to the corresponding page
  const renderSelectedPage = () => {
    switch (currentView.toLowerCase()) {
      case 'weather':
        return <WeatherPage />;
      
      case 'clothing':
      case 'clothing store':
        return <ClothingPage />;
      
      case 'calculator':
        return <CalculatorPage />;
      
      default:
        return (
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>Page Not Found</h2>
            <button 
              onClick={() => changeView(null)}
              style={{ padding: '10px 20px', backgroundColor: '#556B2F', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            >
              Back to Home
            </button>
          </div>
        );
    }
  };

  return (
    <div className="app-container">
      {renderSelectedPage()}
    </div>
  );
}
