import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout: React.FC = () => {
  const location = useLocation();
  const [currentSection, setCurrentSection] = useState('default');
  
  useEffect(() => {
    const path = location.pathname;
    
    if (path.includes('/category/tech') || path.includes('/category/ai')) {
      setCurrentSection('tech');
    } else if (path.includes('/category/geopolitics') || path.includes('/category/global-market')) {
      setCurrentSection('geo');
    } else if (path.includes('/category/programming') || path.includes('/category/development')) {
      setCurrentSection('prog');
    } else if (path.includes('/category/games')) {
      setCurrentSection('games');
    } else {
      setCurrentSection('default');
    }
  }, [location]);

  return (
    <div className={`min-h-screen flex flex-col section-${currentSection}`}>
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;