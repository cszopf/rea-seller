
import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
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

      {/* Agent Access Portal - Vertical Timeline Style */}
      <div className={`fixed top-0 right-0 h-full w-96 bg-white border-l border-slate-200 z-[100] shadow-2xl transition-transform duration-500 ease-in-out transform ${agentViewActive ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full flex flex-col">
          <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-900 text-white">
            <div>
              <h3 className="font-header text-xl">Agent Access Portal</h3>
              <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mt-1">Real-Time Transaction Intelligence</p>
            </div>
            <button 
              onClick={() => setAgentViewActive(false)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-8 bg-slate-50/50">
            {/* Property Summary in Portal */}
            <div className="mb-10 p-6 bg-white rounded-3xl border border-slate-200 shadow-sm">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Subject Property</p>
              <h4 className="text-lg font-bold text-slate-900 leading-tight">{REAL_PROPERTY_MOCK.address}</h4>
              <p className="text-xs text-slate-500 font-bold">{REAL_PROPERTY_MOCK.cityStateZip}</p>
              <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Buyer</p>
                  <p className="text-[11px] font-bold text-slate-900">{REAL_PROPERTY_MOCK.buyerName}</p>
                </div>
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Seller</p>
                  <p className="text-[11px] font-bold text-slate-900">{REAL_PROPERTY_MOCK.sellerName}</p>
                </div>
              </div>
            </div>

            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-slate-200"></div>
              
              <div className="space-y-10 relative">
                {[
                  { label: 'Contract Received', time: 'Feb 14, 8:00 AM', status: 'completed', desc: 'Fully signed purchase agreement received.' },
                  { label: 'Lender Confirmed', time: 'Feb 14, 8:45 AM', status: 'completed', desc: 'Buyer financing verified and confirmed.' },
                  { label: 'Identity Verified', time: 'Feb 14, 9:42 AM', status: 'completed', desc: 'Buyer identity verification complete.' },
                  { label: 'Title Search Ordered', time: 'Feb 15, 10:00 AM', status: 'completed', desc: 'Title search initiated by WCT.' },
                  { label: 'Earnest Money Received', time: 'Feb 15, 2:10 PM', status: 'completed', desc: 'Escrow deposit verified and secured.' },
                  { label: 'Loan Status: Approved', time: 'Feb 17, 11:00 AM', status: 'active', desc: 'Underwriting review complete. Loan approved.' },
                  { label: 'Closing Scheduled', time: 'Feb 17, 3:00 PM', status: 'pending', desc: 'Closing date and time confirmed.' },
                  { label: 'Closing Complete', time: 'Feb 18, 10:00 AM', status: 'pending', desc: 'Final disbursement and recording.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <div className={`relative z-10 w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border-4 border-white shadow-md transition-all duration-500 ${
                      item.status === 'completed' ? 'bg-emerald-500 text-white' :
                      item.status === 'active' ? 'bg-blue-600 text-white ring-4 ring-blue-100' :
                      'bg-slate-200 text-slate-400'
                    }`}>
                      {item.status === 'completed' ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                      ) : (
                        <span className="text-xs font-black">{i + 1}</span>
                      )}
                    </div>
                    <div className="pt-1">
                      <p className={`text-sm font-black tracking-tight ${item.status === 'pending' ? 'text-slate-400' : 'text-slate-900'}`}>
                        {item.label}
                      </p>
                      <p className="text-[10px] font-bold text-slate-400 mt-0.5">
                        {item.time}
                      </p>
                      {item.status !== 'pending' && (
                        <p className="text-[11px] text-slate-500 font-medium mt-2 leading-relaxed bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                          {item.desc}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="p-8 border-t border-slate-100 bg-white">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <img src={MOCK_AGENT.image} className="w-12 h-12 rounded-2xl object-cover border border-slate-100 shadow-sm" alt="" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
              </div>
              <div>
                <p className="text-xs font-black text-slate-900 uppercase tracking-tighter">{MOCK_AGENT.name}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Premier Realty Group</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button className="py-3.5 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all">
                Message
              </button>
              <button className="py-3.5 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 active:scale-95 transition-all">
                Call Agent
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Agent Tracker View Toggle - Fixed at bottom */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[90] animate-in slide-in-from-bottom-2">
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
            {agentViewActive ? 'Close Portal' : 'Agent Access Portal'}
          </span>
        </button>
      </div>

      <Analytics />
    </div>
  );
};

const ModeSelectionScreen: React.FC<{ name: string; onSelect: (l: ExperienceLevel) => void }> = ({ name, onSelect }) => (
  <div className="max-w-6xl mx-auto py-8 md:py-12 animate-in fade-in slide-in-from-bottom-4 duration-700 px-4">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-5xl font-header text-slate-900 tracking-tight mb-4">
        Welcome back, select your experience preference to begin.
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
          className="group text-left p-8 bg-white border-2 border-slate-100 rounded-[40px] transition-all hover:border-blue-600 hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden flex flex-col h-full"
        >
          <div className={`absolute top-0 right-0 w-2 h-full ${mode.color}`}></div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 group-hover:text-blue-600">{mode.name}</p>
          <h3 className="text-xl font-header text-slate-900 mb-4 tracking-tight leading-tight">{mode.desc}</h3>
          <div className="mt-auto">
            <p className="text-[11px] text-slate-500 leading-relaxed italic">Ideal for: {mode.ideal}</p>
          </div>
        </button>
      ))}
    </div>
  </div>
);

export default App;
