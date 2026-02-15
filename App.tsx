
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { TransactionContent } from './components/TransactionSteps';
import SmartOneDashboard from './components/SmartOneDashboard';
import AgentTransparencyView from './components/AgentTransparencyView';
import ChatWidget from './components/ChatWidget';
import { TransactionStep, BrandConfig, UserRole } from './types';
import { WCT_BRAND, MOCK_AGENT, REAL_PROPERTY_MOCK } from './constants';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<TransactionStep>(TransactionStep.STARTED);
  const [brand] = useState<BrandConfig>(WCT_BRAND);
  const [inDashboard, setInDashboard] = useState(false);
  const [simulatedDays, setSimulatedDays] = useState(90);
  const [role, setRole] = useState<UserRole>(UserRole.SELLER);
  
  // Seller Opt-ins
  const [optInSmartOne, setOptInSmartOne] = useState(false);

  // Automatic Scroll to Top on Step Change or Role Change
  useEffect(() => {
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [currentStep, inDashboard, role]);

  const handleNext = () => {
    if (currentStep === TransactionStep.CLOSED) {
      setInDashboard(true);
    } else {
      setCurrentStep((prev) => Math.min(prev + 1, TransactionStep.CLOSED) as TransactionStep);
    }
  };

  const handleBack = () => {
    if (inDashboard) {
      setInDashboard(false);
      setCurrentStep(TransactionStep.CLOSED);
    } else {
      setCurrentStep((prev) => Math.max(prev - 1, TransactionStep.STARTED) as TransactionStep);
    }
  };

  const renderContent = () => {
    if (role === UserRole.AGENT) {
      return <AgentTransparencyView brand={brand} agent={MOCK_AGENT} />;
    }

    if (!inDashboard) {
      return (
        <TransactionContent 
          step={currentStep} 
          brand={brand} 
          onNext={handleNext} 
          onBack={handleBack}
          optInSmartOne={optInSmartOne}
          setOptInSmartOne={setOptInSmartOne}
        />
      );
    }

    return (
      <SmartOneDashboard 
        brand={brand} 
        agent={MOCK_AGENT} 
        daysRemaining={simulatedDays}
      />
    );
  };

  return (
    <Layout 
      brand={brand} 
      agent={MOCK_AGENT} 
      propertyAddress={`${REAL_PROPERTY_MOCK.address} | ${REAL_PROPERTY_MOCK.cityStateZip}`}
      role={role}
      setRole={setRole}
    >
      {renderContent()}
      <ChatWidget brand={brand} />
    </Layout>
  );
};

export default App;
