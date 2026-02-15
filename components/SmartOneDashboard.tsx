
import React from 'react';
import { BrandConfig, AgentInfo } from '../types';
import { REAL_PROPERTY_MOCK } from '../constants';

interface DashboardProps {
  brand: BrandConfig;
  agent: AgentInfo;
  daysRemaining: number;
}

const SmartOneDashboard: React.FC<DashboardProps> = ({ brand, agent }) => {
  return (
    <div className="space-y-12 animate-in fade-in duration-1000 pb-32 max-w-5xl mx-auto">
      {/* Header - Institutional Command Center Style */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b-2 border-slate-100 pb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Transaction Command Center</span>
          </div>
          <h2 className="font-header text-3xl tracking-tight text-slate-900">
            {REAL_PROPERTY_MOCK.address}
          </h2>
          <p className="text-slate-500 font-bold text-sm uppercase tracking-tighter mt-1">
            Institutional Transfer Archive | Instrument #2025-0000492
          </p>
        </div>
        <div className="bg-slate-50 px-6 py-3 rounded-2xl border border-slate-200">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 text-right">Vault Status</p>
          <div className="flex items-center gap-2 text-blue-700 font-black text-xs uppercase tracking-tighter">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
            </svg>
            Encrypted Preservation
          </div>
        </div>
      </div>

      {/* Hero Module: Transfer Integrity Verification */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-8 border-b border-slate-50 bg-slate-50/30">
            <div className="flex justify-between items-center">
              <h3 className="font-black text-slate-900 uppercase tracking-tighter text-lg">Transfer Readiness Status</h3>
              <span className="px-4 py-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-100">Verified Cleared</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">Ownership and lien position reviewed for definitive transfer.</p>
          </div>
          <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
            {[
              { label: 'Ownership Confirmed', status: 'Verified' },
              { label: 'Lien Position Audited', status: 'Clear' },
              { label: 'Payoff Requests Satisfied', status: 'Settled' },
              { label: 'Encumbrance Review', status: 'Complete' },
              { label: 'Taxes & Assessments', status: 'Prorated' },
              { label: 'Deed of Record', status: 'Executed' }
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between border-b border-slate-50 pb-3">
                <span className="text-sm font-bold text-slate-700">{item.label}</span>
                <div className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Private Banking Proceeds Card */}
        <div className="bg-[#004EA8] rounded-[40px] p-8 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-5 rounded-full"></div>
          <div>
            <p className="text-[#B9D9EB] text-[10px] font-black uppercase tracking-[0.3em] mb-4">Final Net Proceeds</p>
            <h3 className="font-header text-5xl tracking-tighter mb-2">$468,050.00</h3>
            <p className="text-emerald-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
              Disbursed via Federal Wire
            </p>
          </div>
          
          <div className="mt-8 space-y-3 pt-6 border-t border-white/10">
            <div className="flex justify-between text-xs font-bold text-white/60">
              <span>Sale Gross</span>
              <span>$1,260,000</span>
            </div>
            <div className="flex justify-between text-xs font-bold text-white/60">
              <span>Total Encumbrances</span>
              <span>-$742,000</span>
            </div>
            <div className="flex justify-between text-xs font-bold text-white/60">
              <span>Adjustments</span>
              <span>-$49,950</span>
            </div>
          </div>
        </div>
      </div>

      {/* Execution Log & Document Archive */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Timeline - Clean Execution Log */}
        <div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8 flex items-center gap-3">
            <span className="w-8 h-[2px] bg-slate-200"></span>
            Execution Log
          </h3>
          <div className="space-y-0 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
            {[
              { title: 'Funds Disbursed', time: '1:45 PM', date: 'Nov 18, 2025', detail: 'Federal Wire #WCT-0492 confirmed by recipient bank.', color: 'bg-emerald-500' },
              { title: 'Deed Recorded', time: '11:20 AM', date: 'Nov 18, 2025', detail: 'Instrument #2025-0000492 filed with Franklin County.', color: 'bg-blue-600' },
              { title: 'Signing Executed', time: '9:00 AM', date: 'Nov 18, 2025', detail: 'Wet-signature package verified by on-staff notary.', color: 'bg-blue-600' },
              { title: 'Clear to Close', time: '4:15 PM', date: 'Nov 16, 2025', detail: 'Lender and Title conditions satisfied for transfer.', color: 'bg-blue-600' },
              { title: 'Title Search Complete', time: '10:30 AM', date: 'Nov 12, 2025', detail: '40-year examination verified chain of title integrity.', color: 'bg-blue-600' }
            ].map((log, i) => (
              <div key={i} className="relative pl-10 pb-10 last:pb-0 group">
                <div className={`absolute left-0 top-1 w-6 h-6 rounded-full border-4 border-white shadow-sm flex items-center justify-center ${log.color}`}>
                   <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-black text-slate-900 text-sm uppercase tracking-tight">{log.title}</h4>
                  <p className="text-[10px] font-bold text-slate-400">{log.time} • {log.date}</p>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed group-hover:text-slate-700 transition-colors">{log.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Liability Shield Archive */}
        <div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8 flex items-center gap-3">
            <span className="w-8 h-[2px] bg-slate-200"></span>
            Post-Closing Shield
          </h3>
          <div className="bg-slate-50 rounded-[48px] p-10 border border-slate-200 shadow-inner">
             <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                </div>
                <div>
                   <h4 className="font-black text-slate-900 uppercase tracking-tighter">Documentation Vault</h4>
                   <p className="text-xs text-slate-500">Immutable copies of your transfer liability records.</p>
                </div>
             </div>
             <div className="space-y-4">
                {[
                  { name: 'Recorded General Warranty Deed', size: '2.4 MB' },
                  { name: '1099-S Tax Reporting Form', size: '1.1 MB' },
                  { name: 'Final Settlement Statement (ALTA)', size: '1.8 MB' },
                  { name: 'Mortgage Payoff Verification Letter', size: '0.9 MB' }
                ].map((doc, idx) => (
                  <div key={idx} className="flex justify-between items-center p-5 bg-white rounded-2xl border border-slate-100 hover:border-slate-300 transition-all cursor-pointer shadow-sm group">
                    <div>
                      <span className="text-sm font-bold text-slate-800 block">{doc.name}</span>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{doc.size} • PDF</span>
                    </div>
                    <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest px-4 py-2 bg-blue-50 rounded-xl opacity-0 group-hover:opacity-100 transition-all">Download</button>
                  </div>
                ))}
             </div>
             <div className="mt-10 p-6 bg-white rounded-3xl border border-slate-100 text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Need physical copies?</p>
                <button className="text-[10px] font-black text-slate-900 border-b border-slate-900 pb-0.5 uppercase tracking-widest">Request Courier Delivery</button>
             </div>
          </div>
        </div>
      </div>

      {/* Strategic Transition Bridge */}
      <div className="bg-white border-[3px] border-[#B9D9EB] rounded-[64px] p-12 md:p-16 shadow-2xl relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 bg-[#64CCC9] text-[#004EA8] px-12 py-4 text-[10px] font-black uppercase tracking-[0.3em]">Institutional Stewardship</div>
        
        <div className="max-w-2xl mx-auto">
          <h3 className="font-header text-4xl mb-6 text-[#004EA8] tracking-tight">Preparing for Your Next Property?</h3>
          <p className="text-slate-600 text-lg mb-12 leading-relaxed">
            Your transfer was executed with precision. Continue this professional stewardship of ownership into your next chapter with Smart ONE.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 text-left">
              <p className="text-[#004EA8] font-black text-[10px] uppercase tracking-widest mb-3">Equity Rollover</p>
              <p className="text-xs text-slate-600">Securely roll your proceeds into a protected purchase escrow.</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 text-left">
              <p className="text-[#004EA8] font-black text-[10px] uppercase tracking-widest mb-3">Instant Pre-Verify</p>
              <p className="text-xs text-slate-600">Verify the title condition of any property before you offer.</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 text-left">
              <p className="text-[#004EA8] font-black text-[10px] uppercase tracking-widest mb-3">Transfer Shield</p>
              <p className="text-xs text-slate-600">Activate Smart ONE monitoring for your upcoming address.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <button 
               className="px-12 py-5 rounded-2xl text-white font-black text-xs tracking-[0.2em] uppercase transition-all shadow-xl active:scale-95 bg-[#004EA8]"
             >
               Activate for Next Home
             </button>
             <button 
               className="px-12 py-5 rounded-2xl font-black text-xs tracking-[0.2em] uppercase transition-all border-2 border-[#B9D9EB] text-[#004EA8] hover:bg-slate-50"
             >
               Add New Address
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartOneDashboard;
