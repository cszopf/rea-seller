
import React, { useState } from 'react';
import { BrandConfig, AgentInfo, ExperienceLevel, UserRole, TransactionStep } from '../types';
import { REAL_PROPERTY_MOCK } from '../constants';
import { downloadClosingInvite } from './TransactionSteps';

interface DashboardProps {
  brand: BrandConfig;
  agent: AgentInfo;
  level: ExperienceLevel;
  role: UserRole;
  currentStep?: TransactionStep;
}

const SmartOneDashboard: React.FC<DashboardProps> = ({ brand, agent, level, role, currentStep = TransactionStep.SUMMARY }) => {
  if (role === 'agent') {
    return <AgentCommandCenter brand={brand} currentStep={currentStep} />;
  }

  switch (level) {
    case 'simple':
      return <SimpleSellerView brand={brand} />;
    case 'thorough':
      return <ThoroughSellerView brand={brand} />;
    default:
      return <StandardSellerView brand={brand} />;
  }
};

const SimpleSellerView: React.FC<{ brand: BrandConfig }> = ({ brand }) => (
  <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-[#64CCC9]/10 border-2 border-[#64CCC9] rounded-[48px] p-12 text-center">
        <div className="w-16 h-16 bg-[#64CCC9] text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#64CCC9]/30">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
        </div>
        <h3 className="text-2xl font-header text-slate-900 tracking-tight mb-2">Everything is Ready</h3>
        <p className="text-slate-500 font-bold text-sm">Your property is cleared for transfer. No actions are required from you at this time.</p>
      </div>
      <div className="bg-[#004EA8] rounded-[48px] p-12 text-center text-white shadow-2xl relative overflow-hidden">
        <p className="text-[#B9D9EB] text-xs font-black uppercase tracking-[0.3em] mb-4">Estimated Net Proceeds</p>
        <h3 className="text-6xl font-header tracking-tighter mb-4">$468,050</h3>
        <span className="bg-[#64CCC9] text-[#004EA8] px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">Fed Ref: #ST1-FED-4920</span>
      </div>
    </div>
  </div>
);

const StandardSellerView: React.FC<{ brand: BrandConfig }> = ({ brand }) => {
  const [newProperty, setNewProperty] = useState('');
  
  const docs = [
    { name: 'Executed Purchase Contract', date: 'Feb 15, 2026', ref: 'WCT-TX-88219-A', hash: 'sha256:7f8e...3b1a', ip: '192.168.1.42' },
    { name: 'Warranty Deed', date: 'Feb 18, 2026', ref: 'WCT-TX-88219-B', hash: 'sha256:4d2c...9e5f', ip: '192.168.1.42' },
    { name: 'Closing Disclosure (Final)', date: 'Feb 18, 2026', ref: 'WCT-TX-88219-C', hash: 'sha256:1a9b...0c4d', ip: '192.168.1.42' },
    { name: 'Seller Authorization', date: 'Feb 16, 2026', ref: 'WCT-TX-88219-D', hash: 'sha256:bc32...8a12', ip: '172.16.254.1' },
    { name: 'Title Commitment', date: 'Feb 15, 2026', ref: 'WCT-TX-88219-E', hash: 'sha256:f3a1...c092', ip: 'Internal Audit' }
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Secured Document Center */}
        <div className="lg:col-span-2 bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-8 border-b border-slate-50 bg-slate-50/30 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#004EA8] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-900/10">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
              </div>
              <div>
                <h3 className="font-black text-slate-900 uppercase tracking-tighter text-lg leading-none">Secured Document Vault</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Audit Trail & Immutable Records</p>
              </div>
            </div>
            <span className="px-4 py-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-100 flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
              Transfer Readiness: Verified
            </span>
          </div>
          
          <div className="p-8 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Digital Instrument</th>
                  <th className="pb-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Date Executed</th>
                  <th className="pb-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Immutable Reference</th>
                  <th className="pb-4 text-right text-[9px] font-black text-slate-400 uppercase tracking-widest">View</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {docs.map((doc, i) => (
                  <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="py-5">
                      <p className="text-sm font-bold text-slate-900 leading-none">{doc.name}</p>
                      <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mt-1.5">ID: {doc.ref}</p>
                    </td>
                    <td className="py-5">
                      <p className="text-xs font-bold text-slate-700">{doc.date}</p>
                      <p className="text-[8px] text-slate-400 font-mono mt-0.5">IP: {doc.ip}</p>
                    </td>
                    <td className="py-5">
                      <div className="flex items-center gap-2">
                        <code className="text-[9px] bg-slate-100 px-2 py-1 rounded text-slate-500 font-mono tracking-tighter">{doc.hash}</code>
                        <svg className="w-3 h-3 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 4.905-3.33 9.04-7.84 10.126L10 17.271l-.16-.038C5.33 16.141 2 12.005 2 7.001c0-.681.056-1.35.166-2.002zM10 4a1 1 0 00-1 1v2.586L7.707 6.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 7.586V5a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
                      </div>
                    </td>
                    <td className="py-5 text-right">
                      <button className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Universal Smart ONE activation Hub */}
        <div className="space-y-8">
          <div className="bg-[#004EA8] rounded-[40px] p-8 text-white shadow-2xl relative overflow-hidden flex flex-col">
            <div className="relative z-10">
              <p className="text-[#B9D9EB] text-[10px] font-black uppercase tracking-[0.3em] mb-4">Final Net to Seller</p>
              <h3 className="font-header text-5xl tracking-tighter">$468,050.00</h3>
              <div className="flex items-center gap-2 mt-6 p-4 bg-white/10 rounded-2xl border border-white/20">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.15em]">Fed Reference Number</p>
                  <p className="text-sm font-mono font-bold tracking-tight text-white mt-0.5">#ST1-FED-4920-8812-7X</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border-2 border-blue-600 rounded-[40px] p-10 shadow-sm flex flex-col relative overflow-hidden group">
            <div className="absolute top-0 right-0 bg-blue-600 text-white px-8 py-2 text-[10px] font-black uppercase tracking-widest rounded-bl-3xl">
              SMART ONE HUB
            </div>
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
            </div>
            <h3 className="font-header text-2xl text-slate-900 mb-2 leading-tight">Protect Your Next Home</h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-8">
              Keep your portfolio safe. Add ownership monitoring to any property, even those not closed via WCT.
            </p>
            
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Universal Asset Address</label>
                <input 
                  type="text"
                  placeholder="Street Address, City, State..."
                  value={newProperty}
                  onChange={(e) => setNewProperty(e.target.value)}
                  className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold focus:border-blue-600 focus:bg-white outline-none transition-all placeholder:text-slate-300"
                />
              </div>
              <button 
                disabled={!newProperty}
                className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all transform active:scale-95 ${
                  newProperty ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/30' : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                Activate Smart ONE
              </button>
            </div>
            <p className="text-[10px] text-center font-black text-blue-400 uppercase tracking-widest mt-8 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
              90-Day Complimentary Trial
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ThoroughSellerView: React.FC<{ brand: BrandConfig }> = ({ brand }) => (
  <div className="space-y-12 animate-in fade-in duration-1000">
    <div className="bg-slate-900 text-white rounded-[40px] p-10 shadow-2xl">
       <div className="flex items-center gap-4 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
          </div>
          <h3 className="font-header text-xl tracking-tight">Property Integrity Audit #ST1-FRK-0492</h3>
       </div>
       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'VESTING', value: 'Verified Clear' },
            { label: 'ENCUMBRANCE', value: 'None Active' },
            { label: 'TAX STATUS', value: 'Current' },
            { label: 'JUDGMENTS', value: 'Cleared' }
          ].map((item, i) => (
            <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
               <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{item.label}</p>
               <p className="text-emerald-400 font-black text-xs uppercase">{item.value}</p>
            </div>
          ))}
       </div>
    </div>
  </div>
);

const AgentCommandCenter: React.FC<{ brand: BrandConfig; currentStep: TransactionStep }> = ({ brand, currentStep }) => {
  const steps = [
    { label: 'Contract Received', responsible: 'AGENT', time: 'Feb 14, 8:00 AM', status: 'complete' },
    { label: 'Lender Confirmed', responsible: 'BUYER', time: 'Feb 14, 8:45 AM', status: 'complete' },
    { label: 'Identity Verified', responsible: 'BUYER', time: 'Feb 14, 9:42 AM', status: 'complete' },
    { label: 'Title Search Ordered', responsible: 'TITLE', time: 'Feb 15, 10:00 AM', status: 'complete' },
    { label: 'Earnest Money Received', responsible: 'BUYER', time: 'Feb 15, 2:10 PM', status: 'complete', sub: 'Awaiting Bank Verification' },
    { label: 'Loan Status: Approved', responsible: 'LENDER', time: 'Feb 17, 11:00 AM', status: 'complete' },
    { label: 'Closing Scheduled', responsible: 'TITLE', time: 'Feb 17, 3:00 PM', status: 'complete' },
    { label: 'Closing Complete', responsible: 'TITLE', time: 'Feb 18, 10:00 AM', status: 'complete' }
  ];

  return (
    <div className="animate-in fade-in duration-700 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <div className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-full border-2 border-white"></div>
            </div>
          </div>
          <h1 className="text-5xl font-header text-slate-900 tracking-tighter uppercase">
            {REAL_PROPERTY_MOCK.sellerName}
          </h1>
          <p className="text-xl font-bold text-slate-400 uppercase tracking-widest">
            {REAL_PROPERTY_MOCK.address}
          </p>
          <div className="flex gap-4 pt-4">
            <div className="bg-orange-50 text-orange-700 px-6 py-3 rounded-2xl border border-orange-100 flex items-center gap-3">
              <div className="w-1.5 h-4 bg-orange-400 rounded-full"></div>
              <span className="text-[10px] font-black uppercase tracking-widest">UNVERIFIED BY SMART</span>
            </div>
            <button className="bg-slate-900 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest leading-tight text-center">
              CLICK TO<br/>BECOME VERIFIED
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
          {[
            { label: 'CONTRACT DATE', value: REAL_PROPERTY_MOCK.contractDate },
            { label: 'EST. CLOSING', value: REAL_PROPERTY_MOCK.closingDate, color: 'text-blue-600' },
            { label: 'ESCROW OFFICER', value: 'Sarah Jenkins' },
            { label: 'SMART CONCIERGE', value: 'Active' }
          ].map((card, i) => (
            <div key={i} className="bg-slate-50 border border-slate-100 p-6 rounded-[32px] min-w-[160px]">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">{card.label}</p>
              <p className={`text-sm font-bold ${card.color || 'text-slate-900'}`}>{card.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Timeline Column */}
        <div className="lg:col-span-7">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3">
              <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
              SMART PROGRESS TIMELINE
            </h3>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">REAL-TIME SYNC: ACTIVE</span>
          </div>

          <div className="relative pl-12 space-y-6">
            <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-slate-100"></div>
            {steps.map((step, i) => (
              <div key={i} className="relative bg-white border border-slate-100 p-8 rounded-[32px] shadow-sm group hover:shadow-md transition-shadow">
                <div className="absolute -left-[31px] top-1/2 -translate-y-1/2 w-4 h-4 bg-emerald-500 rounded-full border-4 border-white shadow-sm z-10"></div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-1">{step.label}</h4>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      RESPONSIBLE: {step.responsible} &nbsp;•&nbsp; {step.time}
                    </p>
                    {step.sub && (
                      <p className="text-[10px] italic text-slate-400 mt-2">{step.sub}</p>
                    )}
                  </div>
                  <span className="bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-100">
                    COMPLETE
                  </span>
                </div>
              </div>
            ))}
            
            <div className="pt-12 flex justify-center">
              <button className="px-12 py-4 rounded-full border-2 border-blue-600 text-blue-600 font-black text-[11px] uppercase tracking-widest hover:bg-blue-50 transition-all active:scale-95 shadow-sm">
                RETURN TO SELLER JOURNEY
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Financial Monitor & Activity Journal */}
        <div className="lg:col-span-5 space-y-12">
          <div>
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3 mb-8">
              <div className="w-1 h-6 bg-slate-900 rounded-full"></div>
              FINANCIAL EVENT MONITOR
            </h3>
            <div className="bg-slate-50 border border-slate-100 rounded-[48px] p-10">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 text-center">LIVE FUNDING STATUS</p>
              <div className="space-y-8">
                {[
                  { label: 'Earnest Money', time: 'Feb 15, 2:10 PM', status: 'CLEARED', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
                  { label: 'Lender Order', time: 'Feb 19, 11:20 AM', status: 'CLEARED', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
                  { label: 'Closing Wire', time: 'Scheduled', status: 'SCHEDULED', color: 'bg-slate-100 text-slate-400 border-slate-200' }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-slate-900">{item.label}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">{item.time}</p>
                    </div>
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${item.color}`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] italic text-blue-600 text-center mt-12 leading-relaxed">
                Financial amounts and account details are<br/>masked for buyer privacy.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3 mb-8">
              <div className="w-1 h-6 bg-slate-900 rounded-full"></div>
              ACTIVITY JOURNAL
            </h3>
            <div className="bg-slate-50 border border-slate-100 rounded-[48px] p-10 space-y-8">
              {[
                { task: 'Lender order received & verified', by: 'LENDER', time: 'Feb 19, 11:20 AM' },
                { task: 'Title commitment issued', by: 'TITLE', time: 'Feb 18, 4:33 PM' },
                { task: 'Earnest money initiated', by: 'BUYER', time: 'Feb 15, 2:10 PM' },
                { task: 'Buyer completed identity verification', by: 'BUYER', time: 'Feb 14, 9:42 AM' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 shrink-0"></div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{item.task}</p>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">
                      {item.by} &nbsp;•&nbsp; {item.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-8">
            <button className="w-full py-5 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all">
              MESSAGE TITLE TEAM
            </button>
            <button className="w-full py-5 bg-white border-2 border-slate-100 text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-slate-200 active:scale-95 transition-all">
              MESSAGE BUYER
            </button>
            <button className="w-full py-5 bg-white border-2 border-slate-100 text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-slate-200 active:scale-95 transition-all">
              DOWNLOAD COMMITMENT
            </button>
            <button className="w-full py-5 bg-white border-2 border-slate-100 text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-slate-200 active:scale-95 transition-all">
              VIEW CLOSING DETAILS
            </button>
            <div className="text-center pt-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">READ-ONLY ACCESS</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">AUDIT LOGGING ENABLED: 2/22/2026</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartOneDashboard;
