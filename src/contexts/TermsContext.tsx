import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import TermsModal from '../components/TermsModal';

interface TermsContextType {
  hasAcceptedTerms: boolean;
  acceptTerms: () => void;
  declineTerms: () => void;
}

const TermsContext = createContext<TermsContextType | undefined>(undefined);

export const useTerms = () => {
  const context = useContext(TermsContext);
  if (!context) {
    throw new Error('useTerms must be used within a TermsProvider');
  }
  return context;
};

interface TermsProviderProps {
  children: ReactNode;
}

export const TermsProvider: React.FC<TermsProviderProps> = ({ children }) => {
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState<boolean>(() => {
    const stored = localStorage.getItem('termsAccepted');
    return stored === 'true';
  });
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!hasAcceptedTerms) {
      setShowModal(true);
    }
  }, [hasAcceptedTerms]);

  const acceptTerms = () => {
    localStorage.setItem('termsAccepted', 'true');
    setHasAcceptedTerms(true);
    setShowModal(false);
  };

  const declineTerms = () => {
    navigate('/terms');
  };

  return (
    <TermsContext.Provider value={{ hasAcceptedTerms, acceptTerms, declineTerms }}>
      {children}
      {showModal && !hasAcceptedTerms && (
        <TermsModal onAccept={acceptTerms} onDecline={declineTerms} />
      )}
    </TermsContext.Provider>
  );
};