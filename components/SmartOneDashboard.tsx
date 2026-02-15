
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
        <span className="bg-[#64CCC9] text-[#004EA8] px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">Fed Ref: #WCT-FED-4920</span>
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
                  <p className="text-sm font-mono font-bold tracking-tight text-white mt-0.5">#WCT-FED-4920-8812-7X</p>
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
          <h3 className="font-header text-xl tracking-tight">Property Integrity Audit #WCT-FRK-0492</h3>
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
    { id: TransactionStep.STARTED, label: 'Started', est: 'Feb 15' },
    { id: TransactionStep.IDENTITY, label: 'Identity', est: 'Feb 15' },
    { id: TransactionStep.DOCUMENTATION, label: 'Docs', est: 'Feb 16' },
    { id: TransactionStep.TITLE_SEARCH, label: 'Search', est: 'Feb 16' },
    { id: TransactionStep.CURATIVE, label: 'Curative', est: 'Feb 17' },
    { id: TransactionStep.SCHEDULING, label: 'Schedule', est: 'Feb 17' },
    { id: TransactionStep.SETTLEMENT, label: 'Settlement', est: 'Feb 18' },
    { id: TransactionStep.SUMMARY, label: 'Summary', est: 'Feb 18' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      {/* Communication Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-slate-100 rounded-[32px] p-6 shadow-sm flex items-center justify-between group hover:border-blue-200 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
            </div>
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Title Partner</p>
              <p className="font-bold text-slate-900">World Class Title</p>
              <p className="text-xs text-slate-500 font-bold">5040 Pine Creek Dr, Westerville</p>
            </div>
          </div>
          <div className="flex gap-2">
            <a href={`mailto:${brand.contactEmail}`} className="p-3 bg-blue-50 text-blue-600 rounded-2xl hover:bg-blue-600 hover:text-white transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            </a>
            <button className="p-3 bg-blue-50 text-blue-600 rounded-2xl hover:bg-blue-600 hover:text-white transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
            </button>
          </div>
        </div>
        <div className="bg-white border border-slate-100 rounded-[32px] p-6 shadow-sm flex items-center justify-between group hover:border-emerald-200 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
            </div>
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Seller (Client)</p>
              <p className="font-bold text-slate-900">Patrick T. O'Laughlin</p>
              <p className="text-xs text-slate-500 font-bold">Verified: Identity Shield Active</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl hover:bg-emerald-600 hover:text-white transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
            </button>
            <button className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl hover:bg-emerald-600 hover:text-white transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Tracker Detail */}
      <div className="bg-white border border-slate-100 rounded-[40px] p-8 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
           <div>
              <h3 className="text-xl font-header tracking-tight text-slate-900">Real-Time Progress Detail</h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Transaction ID: #WCT-FRK-0492</p>
           </div>
           <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Expected In-Person Closing: Feb 18, 2026</p>
              </div>
              <button 
                onClick={() => downloadClosingInvite('Feb 18 @ 10:00 AM')}
                className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline flex items-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                Sync to Calendar
              </button>
           </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6">
          {steps.map((step) => {
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;
            
            return (
              <div key={step.id} className="flex flex-col items-center group">
                <div className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center transition-all duration-500 mb-4 relative ${
                  isCompleted ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 
                  isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 ring-4 ring-blue-50' : 
                  'bg-slate-100 text-slate-400'
                }`}>
                  {isCompleted ? (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  ) : (
                    <span className="text-xs font-black">{step.id}</span>
                  )}
                  {/* Progress Line */}
                  {!isCompleted && !isActive && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-slate-200 rounded-full"></div>
                  )}
                </div>
                <p className={`text-[10px] font-black uppercase tracking-widest text-center mb-1 ${
                  isActive ? 'text-blue-600' : isCompleted ? 'text-emerald-600' : 'text-slate-400'
                }`}>
                  {step.label}
                </p>
                <p className="text-[8px] font-bold text-slate-400 uppercase">{step.est}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Next Steps Card */}
      <div className="bg-slate-900 rounded-[40px] p-10 text-white shadow-xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full -mr-32 -mt-32"></div>
         <div className="relative z-10">
           <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              </div>
              <h3 className="font-header text-xl">Agent Next Steps</h3>
           </div>
           
           <div className="space-y-6">
              {[
                { task: 'Confirm In-Person Attendance at Pine Creek Dr', time: 'Priority High', status: 'Awaiting Confirmation' },
                { task: 'Audit Final Closing Disclosure Figures', time: 'Priority High', status: 'Pending' },
                { task: 'Verify Seller Wire Instructions via Stripe', time: 'Priority Normal', status: 'In Progress' },
                { task: 'Secure Original Notary Credentials', time: 'Target: Feb 18', status: 'Scheduled' }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer">
                   <div className="flex items-center gap-4">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <div>
                        <p className="text-sm font-bold">{item.task}</p>
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{item.time}</p>
                      </div>
                   </div>
                   <span className="px-3 py-1 bg-white/10 rounded-full text-[8px] font-black uppercase tracking-widest">{item.status}</span>
                </div>
              ))}
           </div>
         </div>
      </div>
    </div>
  );
};

export default SmartOneDashboard;
