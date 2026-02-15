
import React from 'react';
import { BrandConfig, AgentInfo, UserRole } from '../types';

interface LayoutProps {
  brand: BrandConfig;
  agent: AgentInfo;
  children: React.ReactNode;
  propertyAddress: string;
  role: UserRole;
  setRole: (role: UserRole) => void;
}

const Layout: React.FC<LayoutProps> = ({ brand, agent, children, propertyAddress, role, setRole }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row overflow-hidden h-screen">
      {/* Sidebar - Desktop / Header - Mobile */}
      <aside 
        className="w-full md:w-80 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 flex flex-col p-3 pt-[env(safe-area-inset-top,0.5rem)] md:p-8 md:sticky md:top-0 h-auto md:h-screen shrink-0 z-20 shadow-sm md:shadow-none"
      >
        <div className="mb-2 md:mb-8 text-center md:text-left">
          <h1 
            className="font-header uppercase-tracking-150 text-lg md:text-2xl mb-0" 
            style={{ color: brand.primaryColor }}
          >
            {brand.logoName}
          </h1>
          <p className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            {role === UserRole.SELLER ? 'Transaction Center' : 'Agent Transparency Portal'}
          </p>
          <p className="text-[10px] md:text-sm font-bold text-slate-800 mt-1 md:mt-3 flex items-center justify-center md:justify-start gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate">{propertyAddress.split('|')[0]}</span>
          </p>
        </div>

        {/* Sidebar Middle - Agent Info (Desktop) */}
        <div className="mt-8 hidden md:block">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-600 transition-all group-hover:w-full group-hover:opacity-5"></div>
            <div className="flex justify-between items-start mb-4">
               <h3 className="text-[10px] uppercase tracking-widest font-black text-slate-400">
                 {role === UserRole.SELLER ? 'Your Expert Agent' : 'Listing Agent Profile'}
               </h3>
               {agent.isVerified && (
                 <div className="flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                    <svg className="w-2.5 h-2.5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[8px] font-black text-emerald-600 uppercase tracking-tighter">Smart Verified</span>
                 </div>
               )}
            </div>
            
            <div className="flex items-center gap-4 mb-4">
              <img 
                src={agent.image} 
                alt={agent.name} 
                className="w-12 h-12 rounded-2xl object-cover border border-slate-100 shadow-sm" 
              />
              <div>
                <p className="font-black text-slate-900 text-sm leading-tight">{agent.name}</p>
                <p className="text-[10px] font-bold text-slate-400 mt-0.5">{agent.brokerage}</p>
              </div>
            </div>
            <div className="flex gap-2 relative z-10">
              <button 
                className="flex-1 py-2 text-[10px] font-black rounded-lg border uppercase tracking-widest transition-all hover:bg-slate-50"
                style={{ borderColor: brand.accentColor, color: brand.primaryColor }}
              >
                CALL
              </button>
              <button 
                className="flex-1 py-2 text-[10px] font-black rounded-lg text-white uppercase tracking-widest transition-all shadow-md active:scale-95"
                style={{ backgroundColor: brand.primaryColor }}
              >
                MSG
              </button>
            </div>
          </div>
        </div>

        {/* Role Switcher - Desktop (Bottom of Sidebar) */}
        <div className="mt-auto hidden md:block pb-8 pt-4 border-t border-slate-200">
          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-3">View Perspective</p>
          <div className="bg-slate-200/50 p-1 rounded-full flex gap-1">
              <button 
                onClick={() => setRole(UserRole.SELLER)}
                className={`flex-1 py-1.5 text-[8px] font-black uppercase tracking-widest rounded-full transition-all ${role === UserRole.SELLER ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              >
                Seller
              </button>
              <button 
                onClick={() => setRole(UserRole.AGENT)}
                className={`flex-1 py-1.5 text-[8px] font-black uppercase tracking-widest rounded-full transition-all ${role === UserRole.AGENT ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              >
                Agent
              </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area - Scrollable */}
      <main className="flex-1 overflow-y-auto scroll-smooth relative h-full bg-white md:bg-transparent">
        <div className="max-w-4xl mx-auto p-4 pt-4 md:p-12 lg:p-20 pb-48 md:pb-32">
          {children}
        </div>

        {/* Mobile Role Toggle - Absolute bottom-left corner to be as unobtrusive as possible */}
        <div className="md:hidden fixed bottom-[calc(env(safe-area-inset-bottom,0px)+0.75rem)] left-3 z-[60]">
           <div className="bg-slate-100/80 backdrop-blur-md border border-slate-200 rounded-full p-0.5 flex gap-0.5 shadow-sm opacity-60 hover:opacity-100 transition-opacity">
              <button 
                onClick={() => setRole(UserRole.SELLER)}
                className={`px-3 py-1 text-[6px] font-black uppercase tracking-widest rounded-full transition-all ${role === UserRole.SELLER ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'}`}
              >
                Seller
              </button>
              <button 
                onClick={() => setRole(UserRole.AGENT)}
                className={`px-3 py-1 text-[6px] font-black uppercase tracking-widest rounded-full transition-all ${role === UserRole.AGENT ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'}`}
              >
                Agent
              </button>
           </div>
        </div>
      </main>
      
      {/* Mobile Agent Footer (Sticky) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-2.5 pt-2 pb-[env(safe-area-inset-bottom,0.5rem)] flex items-center justify-between z-50 shadow-[0_-8px_30px_rgba(0,0,0,0.05)] backdrop-blur-md bg-white/95">
         <div className="flex items-center gap-2 pl-12 md:pl-0"> {/* Padding to accommodate role switcher if needed */}
            <div className="relative">
              <img src={agent.image} className="w-8 h-8 rounded-lg border border-slate-100 shadow-sm" alt={agent.name} />
              {agent.isVerified && (
                <div className="absolute -top-0.5 -right-0.5 bg-emerald-500 text-white rounded-full p-0.5 border border-white shadow-sm">
                  <svg className="w-1 h-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <p className="font-black text-slate-900 text-[10px] uppercase tracking-tighter flex items-center gap-0.5">
                {agent.name}
              </p>
              <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest">{agent.brokerage}</span>
            </div>
         </div>
         <div className="flex gap-1">
           <button 
              className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700"
              onClick={() => window.location.href = `tel:${agent.phone}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </button>
           <button 
              className="px-3 py-1.5 rounded-lg text-white text-[8px] font-black uppercase tracking-widest active:scale-95"
              style={{ backgroundColor: brand.primaryColor }}
            >
              MESSAGE
            </button>
         </div>
      </div>
    </div>
  );
};

export default Layout;
