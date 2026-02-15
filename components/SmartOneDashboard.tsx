
import React from 'react';
import { BrandConfig, AgentInfo, ExperienceLevel, UserRole } from '../types';
import { REAL_PROPERTY_MOCK } from '../constants';

interface DashboardProps {
  brand: BrandConfig;
  agent: AgentInfo;
  level: ExperienceLevel;
  role: UserRole;
}

const SmartOneDashboard: React.FC<DashboardProps> = ({ brand, agent, level, role }) => {
  // If Agent Role, show Agent Command Center
  if (role === 'agent') {
    return <AgentCommandCenter brand={brand} />;
  }

  // Seller Experience levels
  switch (level) {
    case 'simple':
      return <SimpleSellerView brand={brand} />;
    case 'thorough':
      return <ThoroughSellerView brand={brand} />;
    default:
      return <StandardSellerView brand={brand} />;
  }
};

/** 
 * SIMPLE EXPERIENCE
 * Ultra-minimalist, low text, focus on high-level certainty.
 */
const SimpleSellerView: React.FC<{ brand: BrandConfig }> = ({ brand }) => (
  <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-[#64CCC9]/10 border-2 border-[#64CCC9] rounded-[48px] p-12 text-center">
        <div className="w-20 h-20 bg-[#64CCC9] text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#64CCC9]/30">
          <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
        </div>
        <h3 className="text-3xl font-header text-slate-900 tracking-tight mb-2">Sale Ready</h3>
        <p className="text-slate-600 font-bold">Ownership verified and cleared for transfer.</p>
      </div>

      <div className="bg-[#004EA8] rounded-[48px] p-12 text-center text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
        <p className="text-[#B9D9EB] text-xs font-black uppercase tracking-[0.3em] mb-4">You Receive</p>
        <h3 className="text-6xl font-header tracking-tighter mb-4">$468,050</h3>
        <span className="bg-[#64CCC9] text-[#004EA8] px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">Sent via Federal Wire</span>
      </div>
    </div>

    <div className="bg-slate-50 rounded-[48px] p-12 text-center border border-slate-200">
       <h4 className="font-header text-2xl text-slate-900 mb-6">Need your documents?</h4>
       <button className="bg-white px-10 py-5 rounded-2xl border border-slate-200 font-black text-xs uppercase tracking-widest shadow-sm hover:bg-slate-50 transition-all">Download Full Archive (PDF)</button>
    </div>
  </div>
);

/** 
 * STANDARD EXPERIENCE
 * The balanced institutional "Command Center" previously defined.
 */
const StandardSellerView: React.FC<{ brand: BrandConfig }> = ({ brand }) => (
  <div className="space-y-12 animate-in fade-in duration-1000">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
        <div className="p-8 border-b border-slate-50 bg-slate-50/30">
          <div className="flex justify-between items-center">
            <h3 className="font-black text-slate-900 uppercase tracking-tighter text-lg">Transfer Readiness Status</h3>
            <span className="px-4 py-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-100">Verified Cleared</span>
          </div>
        </div>
        <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
          {['Ownership Confirmed', 'Lien Position Audited', 'Payoff Requests Settled', 'Encumbrance Review Complete'].map((item, i) => (
            <div key={i} className="flex items-center justify-between border-b border-slate-50 pb-3">
              <span className="text-sm font-bold text-slate-700">{item}</span>
              <svg className="w-3.5 h-3.5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-[#004EA8] rounded-[40px] p-8 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between">
        <p className="text-[#B9D9EB] text-[10px] font-black uppercase tracking-[0.3em] mb-4">Final Net Proceeds</p>
        <h3 className="font-header text-5xl tracking-tighter">$468,050.00</h3>
        <p className="text-emerald-400 text-[10px] font-black uppercase tracking-widest mt-4">Disbursed via Federal Wire</p>
      </div>
    </div>
  </div>
);

/** 
 * THOROUGH EXPERIENCE
 * Deep legal details, expanded audit logs, and technical definitions.
 */
const ThoroughSellerView: React.FC<{ brand: BrandConfig }> = ({ brand }) => (
  <div className="space-y-12 animate-in fade-in duration-1000">
    <div className="bg-slate-900 text-white rounded-[40px] p-10 relative overflow-hidden">
       <div className="flex items-center gap-4 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
          </div>
          <div>
            <h3 className="font-header text-xl tracking-tight">Instrument Level Verification</h3>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Property Integrity Audit #WCT-FRK-0492</p>
          </div>
       </div>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'VESTING', value: 'Verified Clear', detail: 'Trustee Authority Confirmed' },
            { label: 'ENCUMBRANCE', value: 'Resolved', detail: 'Payoff Bonded and Settled' },
            { label: 'LIEN SEARCH', value: 'No Cloud', detail: '40-Year Chain Reconciled' },
            { label: 'TAX/ASSESS', value: 'Prorated', detail: '2025 Liabilities Escrowed' }
          ].map((item, i) => (
            <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-2xl">
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">{item.label}</p>
               <p className="text-emerald-400 font-black text-sm">{item.value}</p>
               <p className="text-[10px] text-slate-400 mt-1">{item.detail}</p>
            </div>
          ))}
       </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div className="lg:col-span-2 space-y-8">
         <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Detailed Transaction Ledger</h4>
         <div className="bg-white rounded-[32px] border border-slate-100 p-8">
            {[
              { label: 'Contract Sale Price', value: '$1,260,000.00', color: 'text-slate-900' },
              { label: 'Existing Mortgage Payoff (Lower, LLC)', value: '-$742,000.00', color: 'text-red-600' },
              { label: 'County Transfer Tax & Fees', value: '-$12,650.00', color: 'text-slate-600' },
              { label: 'Brokerage Commissions (6%)', value: '-$37,800.00', color: 'text-slate-600' },
              { label: 'Prorated Property Taxes', value: '-$4,500.00', color: 'text-slate-600' },
              { label: 'Smart ONE Digital Efficiency Credit', value: '+$50.00', color: 'text-emerald-600' }
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center py-4 border-b border-slate-50 last:border-0">
                <span className="text-sm font-bold text-slate-500">{item.label}</span>
                <span className={`text-sm font-black ${item.color}`}>{item.value}</span>
              </div>
            ))}
            <div className="mt-6 pt-6 border-t-2 border-slate-100 flex justify-between items-center">
              <span className="font-header text-lg text-slate-900">Total Net to Seller</span>
              <span className="font-header text-2xl text-[#004EA8]">$468,050.00</span>
            </div>
         </div>
      </div>
      <div>
         <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8">Liability Shield Definition</h4>
         <div className="p-8 bg-blue-50 border border-blue-100 rounded-[32px]">
            <p className="text-xs text-blue-900 font-bold leading-relaxed">
              Upon recording of Instrument #2025-0000492, all beneficial ownership and corresponding liabilities are legally transferred to Douglas & Cara O'Connor. World Class Title has executed a formal Title Policy to protect the new owners while documenting your clean exit from the chain of title.
            </p>
         </div>
      </div>
    </div>
  </div>
);

/** 
 * AGENT COMMAND CENTER
 * Read-only view for the real estate agent to track seller progress.
 */
const AgentCommandCenter: React.FC<{ brand: BrandConfig }> = ({ brand }) => (
  <div className="space-y-12 animate-in fade-in duration-700">
    {/* Agent Summary Bar */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
       <div className="p-8 bg-white border border-slate-100 rounded-[32px] shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Client Experience</p>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-emerald-600">Highly Engaged</span>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          </div>
          <p className="text-[10px] text-slate-500 mt-1">Last activity: 4 mins ago</p>
       </div>
       <div className="p-8 bg-white border border-slate-100 rounded-[32px] shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Document Status</p>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-slate-900">100% Complete</span>
          </div>
          <p className="text-[10px] text-emerald-600 font-bold uppercase mt-1">Verified & Archived</p>
       </div>
       <div className="p-8 bg-white border border-slate-100 rounded-[32px] shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Transaction Health</p>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-blue-600">Perfect Cleared</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1">Zero title clouds identified</p>
       </div>
    </div>

    {/* Real-time Tracking Mirror */}
    <div className="bg-slate-50 rounded-[48px] p-12 border border-slate-200">
       <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <h3 className="text-xl font-header tracking-tight text-slate-900">What your client sees</h3>
          <div className="flex gap-4">
             <button className="px-6 py-2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">Nudge for Signing</button>
             <button className="px-6 py-2 bg-white border border-slate-200 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-full">Share Live Link</button>
          </div>
       </div>
       
       <div className="opacity-60 grayscale pointer-events-none scale-[0.98] transition-all">
          <StandardSellerView brand={brand} />
       </div>
       
       <div className="mt-12 p-8 bg-white rounded-3xl border border-slate-100 text-center relative z-10 -mt-10 shadow-2xl">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Milestone Notifications</p>
          <div className="flex flex-wrap justify-center gap-3">
             {['Funds Disbursed', 'Deed Recorded', 'Search Verified', 'Identity Confirmed'].map((badge, i) => (
               <span key={i} className="px-4 py-1.5 bg-emerald-50 text-emerald-700 text-[9px] font-black uppercase tracking-widest rounded-full border border-emerald-100">● {badge}</span>
             ))}
          </div>
       </div>
    </div>
  </div>
);

export default SmartOneDashboard;
