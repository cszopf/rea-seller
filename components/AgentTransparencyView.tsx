
import React from 'react';
import { BrandConfig, AgentInfo } from '../types';
import { REAL_PROPERTY_MOCK, AGENT_TRANSPARENCY_MOCK } from '../constants';

interface AgentViewProps {
  brand: BrandConfig;
  agent: AgentInfo;
}

const AgentTransparencyView: React.FC<AgentViewProps> = ({ brand }) => {
  // Group milestones into logical phases for a better tracker experience
  const phases = [
    {
      title: 'Verification & Intake',
      milestones: AGENT_TRANSPARENCY_MOCK.milestones.slice(0, 3)
    },
    {
      title: 'Title & Curative',
      milestones: AGENT_TRANSPARENCY_MOCK.milestones.slice(3, 7)
    },
    {
      title: 'Closing Execution',
      milestones: AGENT_TRANSPARENCY_MOCK.milestones.slice(7, 10)
    },
    {
      title: 'Financial Settlement',
      milestones: AGENT_TRANSPARENCY_MOCK.milestones.slice(10, 12)
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-1000 pb-32 max-w-6xl mx-auto">
      {/* Precision Header Panel */}
      <div className="bg-white border border-slate-200 rounded-[40px] p-8 md:p-10 shadow-sm flex flex-col lg:flex-row justify-between items-center gap-8">
        <div className="flex gap-6 items-center">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-[#004EA8] shadow-inner">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
          </div>
          <div>
            <h2 className="font-header text-2xl text-slate-900 tracking-tight">{REAL_PROPERTY_MOCK.address}</h2>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Listing: {REAL_PROPERTY_MOCK.sellerName}</span>
              <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Under Contract</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 lg:gap-12">
          <div className="text-center lg:text-right">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Target Closing</p>
            <p className="text-sm font-black text-slate-900">{REAL_PROPERTY_MOCK.closingDate}</p>
          </div>
          <div className="hidden lg:block h-10 w-[1px] bg-slate-200"></div>
          <div className="text-center lg:text-right">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Escrow Officer</p>
            <p className="text-sm font-black text-[#004EA8]">{AGENT_TRANSPARENCY_MOCK.escrowOfficer.name}</p>
          </div>
          <button className="px-6 py-3 bg-[#004EA8] text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg hover:shadow-blue-500/20 active:scale-95 transition-all">
            Direct Message
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
        {/* Left Column: Master Timeline Tracker */}
        <div className="xl:col-span-8 space-y-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.3em] flex items-center gap-3">
              <span className="w-8 h-[2px] bg-blue-600"></span>
              Master Transaction Tracker
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-slate-400 uppercase">Auto-Refresh: Active</span>
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          <div className="space-y-12">
            {phases.map((phase, pIdx) => (
              <div key={pIdx} className="relative">
                {/* Phase Label */}
                <div className="flex items-center gap-4 mb-6">
                   <div className="px-4 py-1.5 bg-slate-100 text-slate-500 text-[9px] font-black uppercase tracking-widest rounded-lg border border-slate-200">
                     Phase 0{pIdx + 1}
                   </div>
                   <h4 className="text-sm font-black text-slate-900 uppercase tracking-tighter">{phase.title}</h4>
                   <div className="flex-1 h-[1px] bg-slate-100"></div>
                </div>

                {/* Milestones in Phase */}
                <div className="space-y-0 ml-4 border-l-2 border-slate-100">
                  {phase.milestones.map((m, mIdx) => {
                    const isLast = pIdx === phases.length - 1 && mIdx === phase.milestones.length - 1;
                    const isComplete = m.status === 'Complete';
                    
                    return (
                      <div key={mIdx} className={`relative pl-10 pb-10 last:pb-2 group transition-all`}>
                        {/* Tracker Node */}
                        <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white shadow-sm z-10 transition-colors ${isComplete ? 'bg-emerald-500' : 'bg-slate-200'}`}>
                          {isComplete && (
                            <svg className="w-full h-full text-white p-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 p-5 bg-white border border-slate-100 rounded-[24px] shadow-sm hover:border-blue-200 hover:shadow-md transition-all group-hover:-translate-y-0.5">
                          <div>
                            <p className={`text-sm font-black tracking-tight ${isComplete ? 'text-slate-900' : 'text-slate-400'}`}>
                              {m.label}
                            </p>
                            {isComplete ? (
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mt-0.5">{m.time}</p>
                            ) : (
                              <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mt-0.5 animate-pulse">Pending Backend Audit</p>
                            )}
                          </div>
                          <div className="flex items-center gap-3">
                            {isComplete ? (
                              <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 uppercase tracking-widest">Verified</span>
                            ) : (
                              <span className="text-[9px] font-black text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-100 uppercase tracking-widest">Awaiting</span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: High-Alert & Money Feeds */}
        <div className="xl:col-span-4 space-y-12">
          {/* Money Notification Panel */}
          <div className="bg-[#004EA8] rounded-[48px] p-8 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
            </div>
            <h4 className="text-[10px] font-black text-[#B9D9EB] uppercase tracking-[0.4em] mb-8">Funds Transparency</h4>
            <div className="space-y-6">
              {[
                { label: 'Earnest Money', status: 'Cleared', detail: 'Held in WCT Escrow' },
                { label: 'Seller Payoffs', status: 'Verified', detail: 'Lower, LLC - Verified' },
                { label: 'Seller Proceeds', status: 'Disbursed', detail: '$468,050 Sent via Wire' }
              ].map((item, idx) => (
                <div key={idx} className="bg-white/5 p-5 rounded-3xl border border-white/10">
                   <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-black uppercase text-[#B9D9EB] tracking-widest">{item.label}</span>
                      <span className="text-[10px] font-black text-emerald-400 uppercase">{item.status}</span>
                   </div>
                   <p className="text-sm font-bold text-white tracking-tight">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Logs Side-Feed */}
          <div>
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
              <span className="w-4 h-[1px] bg-slate-300"></span>
              Recent Activity Feed
            </h3>
            <div className="space-y-6 border-l border-slate-100 pl-6 ml-2">
              {AGENT_TRANSPARENCY_MOCK.activityFeed.slice(0, 5).map((log, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[30px] top-1.5 w-2 h-2 rounded-full bg-slate-200"></div>
                  <p className="text-xs font-bold text-slate-800 leading-tight">{log.event}</p>
                  <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">{log.time}</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-4 border-2 border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] rounded-2xl hover:bg-slate-50 transition-all">
              View Full Transaction Audit
            </button>
          </div>

          {/* Title Conditions Summary */}
          <div className="bg-slate-50 border border-slate-200 rounded-[40px] p-8">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Title Readiness Audit</h4>
            <div className="space-y-3">
               {[
                 { label: 'Property Taxes', status: 'Cleared' },
                 { label: 'HOA Status', status: 'Current' },
                 { label: 'Lien Search', status: 'No Issues' }
               ].map((item, i) => (
                 <div key={i} className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-bold">{item.label}</span>
                    <span className="text-slate-900 font-black uppercase text-[9px] tracking-widest">{item.status}</span>
                 </div>
               ))}
            </div>
            <div className="mt-6 pt-6 border-t border-slate-200">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Final Clearance Line</p>
              <p className="text-xs text-slate-800 leading-relaxed font-bold">The property is fully cleared for ownership transfer with no outstanding encumbrances.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentTransparencyView;
