
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { TransactionContent } from './components/TransactionSteps';
import SmartOneDashboard from './components/SmartOneDashboard';
import ChatWidget from './components/ChatWidget';
import { TransactionStep, BrandConfig, ExperienceLevel, UserRole } from './types';
import { WCT_BRAND, MOCK_AGENT, REAL_PROPERTY_MOCK } from './constants';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<TransactionStep>(TransactionStep.MODE_SELECT);
  const [brand] = useState<BrandConfig>(WCT_BRAND);
  const [inDashboard, setInDashboard] = useState(false);
  const [agentViewActive, setAgentViewActive] = useState(false);
  
  const [expLevel, setExpLevel] = useState<ExperienceLevel>('standard');
  const [role, setRole] = useState<UserRole>('seller');

  const sellerName = "Patrick";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep, inDashboard, expLevel, role, agentViewActive]);

  const handleNext = () => {
    if (currentStep === TransactionStep.SUMMARY) {
      setInDashboard(true);
    } else {
      setCurrentStep((prev) => (prev + 1) as TransactionStep);
    }
  };

  const handleBack = () => {
    if (inDashboard) {
      setInDashboard(false);
      setCurrentStep(TransactionStep.SUMMARY);
    } else {
      setCurrentStep((prev) => Math.max(prev - 1, TransactionStep.MODE_SELECT) as TransactionStep);
    }
  };

  const currentRole = agentViewActive ? 'agent' : role;

  return (
    <div className="relative">
      <Layout 
        brand={brand} 
        agent={MOCK_AGENT} 
        propertyAddress={REAL_PROPERTY_MOCK.address}
        role={currentRole}
        userName={sellerName}
        showWelcome={currentStep !== TransactionStep.MODE_SELECT}
        level={expLevel}
      >
        {currentStep === TransactionStep.MODE_SELECT ? (
          <ModeSelectionScreen name={sellerName} onSelect={(level) => { setExpLevel(level); handleNext(); }} />
        ) : !inDashboard && !agentViewActive ? (
          <TransactionContent 
            step={currentStep} 
            brand={brand} 
            level={expLevel}
            onNext={handleNext} 
            onBack={handleBack}
          />
        ) : (
          <SmartOneDashboard 
            brand={brand} 
            agent={MOCK_AGENT} 
            level={expLevel}
            role={currentRole}
            currentStep={currentStep}
          />
        )}

        <ChatWidget brand={brand} />
      </Layout>

      {/* Subtle Agent Tracker View Toggle */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-bottom-2">
        <button 
          onClick={() => setAgentViewActive(!agentViewActive)}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-full shadow-2xl border border-slate-200 transition-all active:scale-95 ${
            agentViewActive ? 'bg-slate-900 text-white' : 'bg-white text-slate-500 hover:text-slate-900'
          }`}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <span className="text-[10px] font-black uppercase tracking-widest">
            {agentViewActive ? 'Return to Seller View' : 'Real-Time Agent Tracker'}
          </span>
        </button>
      </div>
    </div>
  );
};

const ModeSelectionScreen: React.FC<{ name: string; onSelect: (l: ExperienceLevel) => void }> = ({ name, onSelect }) => (
  <div className="max-w-4xl mx-auto py-8 md:py-12 animate-in fade-in slide-in-from-bottom-4 duration-700 px-4">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-header text-slate-900 tracking-tight mb-4">
        Welcome back {name}, select your experience preference to begin.
      </h2>
      <p className="text-slate-500 font-bold text-lg leading-snug">Choose how you want to manage your transaction today.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { id: 'simple', name: 'Calm & Simple', desc: 'Minimal updates, minimal noise. Total confidence.', ideal: 'Busy sellers wanting peace of mind.', color: 'bg-emerald-500' },
        { id: 'standard', name: 'Full Transparency', desc: 'Detailed visibility and frequent proactive alerts.', ideal: 'Professional sellers who value precision.', color: 'bg-blue-600' },
        { id: 'thorough', name: 'Thorough Detail', desc: 'Deep audit logs and technical instrument details.', ideal: 'Institutional or data-driven sellers.', color: 'bg-slate-900' }
      ].map((mode) => (
        <button 
          key={mode.id}
          onClick={() => onSelect(mode.id as ExperienceLevel)}
          className="group text-left p-8 bg-white border-2 border-slate-100 rounded-[40px] transition-all hover:border-blue-600 hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden"
        >
          <div className={`absolute top-0 right-0 w-2 h-full ${mode.color}`}></div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 group-hover:text-blue-600">{mode.name}</p>
          <h3 className="text-xl font-header text-slate-900 mb-4 tracking-tight leading-tight">{mode.desc}</h3>
          <p className="text-[11px] text-slate-500 leading-relaxed italic">Ideal for: {mode.ideal}</p>
        </button>
      ))}
    </div>
  </div>
);

export default App;
