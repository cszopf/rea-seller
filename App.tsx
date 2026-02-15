
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { TransactionContent } from './components/TransactionSteps';
import SmartOneDashboard from './components/SmartOneDashboard';
import ChatWidget from './components/ChatWidget';
import { TransactionStep, BrandConfig, ExperienceLevel, UserRole } from './types';
import { WCT_BRAND, MOCK_AGENT, REAL_PROPERTY_MOCK } from './constants';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<TransactionStep>(TransactionStep.STARTED);
  const [brand] = useState<BrandConfig>(WCT_BRAND);
  const [inDashboard, setInDashboard] = useState(false);
  
  // Experience Settings (for demo purposes)
  const [expLevel, setExpLevel] = useState<ExperienceLevel>('standard');
  const [role, setRole] = useState<UserRole>('seller');

  const sellerName = "Patrick";

  // Automatic Scroll to Top on Step/Mode Change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep, inDashboard, expLevel, role]);

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

  return (
    <div className="relative">
      <Layout 
        brand={brand} 
        agent={MOCK_AGENT} 
        propertyAddress={REAL_PROPERTY_MOCK.address}
        role={role}
        userName={sellerName}
      >
        {!inDashboard ? (
          <TransactionContent 
            step={currentStep} 
            brand={brand} 
            onNext={handleNext} 
            onBack={handleBack}
          />
        ) : (
          <SmartOneDashboard 
            brand={brand} 
            agent={MOCK_AGENT} 
            level={expLevel}
            role={role}
          />
        )}

        <ChatWidget brand={brand} />
      </Layout>

      {/* Experience Toggle (Demo UI - Bottom Left) */}
      <div className="fixed bottom-6 left-6 z-[100] bg-white p-4 rounded-2xl shadow-2xl border border-slate-200 hidden lg:block">
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Dev Experience Toggle</p>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            {(['seller', 'agent'] as UserRole[]).map(r => (
              <button 
                key={r}
                onClick={() => setRole(r)}
                className={`px-3 py-1 text-[8px] font-black uppercase rounded-lg border transition-all ${role === r ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-400 border-slate-200'}`}
              >
                {r}
              </button>
            ))}
          </div>
          {role === 'seller' && (
            <div className="flex gap-2 border-t border-slate-100 pt-2">
              {(['simple', 'standard', 'thorough'] as ExperienceLevel[]).map(l => (
                <button 
                  key={l}
                  onClick={() => setExpLevel(l)}
                  className={`px-3 py-1 text-[8px] font-black uppercase rounded-lg border transition-all ${expLevel === l ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-400 border-slate-200'}`}
                >
                  {l}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
