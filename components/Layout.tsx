
import React from 'react';
import { BrandConfig, AgentInfo, UserRole, ExperienceLevel } from '../types';

interface LayoutProps {
  brand: BrandConfig;
  agent: AgentInfo;
  children: React.ReactNode;
  propertyAddress: string;
  role: UserRole;
  userName: string;
  showWelcome?: boolean;
  level?: ExperienceLevel;
}

const Layout: React.FC<LayoutProps> = ({ brand, agent, children, propertyAddress, role, userName, showWelcome = true, level = 'standard' }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row overflow-y-auto">
      {/* Mobile Agent Header (Visible on Mode Selection) */}
      {!showWelcome && (
        <div className="md:hidden bg-slate-50 border-b border-slate-200 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img src={agent.image} className="w-10 h-10 rounded-xl border border-white shadow-sm" alt={agent.name} />
              <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-0.5 rounded-full border border-white">
                <svg className="w-1.5 h-1.5" fill="currentColor" viewBox="0 0 20 20"><path d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-900 uppercase tracking-tighter">{agent.name}</p>
              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Smart Verified Agent</p>
            </div>
          </div>
          <h1 
            className="font-header uppercase-tracking-150 text-sm" 
            style={{ color: brand.primaryColor }}
          >
            {brand.logoName}
          </h1>
        </div>
      )}

      {/* Sidebar - Desktop */}
      <aside 
        className="w-full md:w-80 bg-slate-50 border-r border-slate-200 flex flex-col p-8 md:h-screen md:sticky md:top-0 shrink-0 z-20 shadow-sm md:shadow-none"
      >
        <div className="mb-12">
          <img 
            src="https://images.squarespace-cdn.com/content/v1/5f4d40b11b4f1e6a11b920b5/1598967776211-2JVFU1R4U8PQM71BWUVE/WorldClassTitle_Logos-RGB-Primary.png?format=1500w" 
            alt={brand.logoName} 
            className="h-12 w-auto mb-2"
          />
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            powered by smart
          </p>
        </div>

        <div className="mt-auto hidden md:block pb-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-600 transition-all group-hover:w-full group-hover:opacity-5"></div>
            <div className="flex justify-between items-start mb-4">
               <h3 className="text-[10px] uppercase tracking-widest font-black text-slate-400">
                 {role === 'agent' ? 'Your Profile' : 'Your Expert Agent'}
               </h3>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <img 
                  src={agent.image} 
                  alt={agent.name} 
                  className="w-14 h-14 rounded-2xl object-cover border border-slate-100 shadow-sm" 
                />
                <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1 rounded-full border-2 border-white shadow-sm">
                   <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20"><path d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                   <p className="font-black text-slate-900 text-sm leading-tight">{agent.name}</p>
                </div>
                <p className="text-[10px] font-bold text-slate-400 mt-0.5">{agent.brokerage}</p>
                <div className="mt-1">
                   <div className="flex items-center gap-1">
                      <span className="text-yellow-500 text-[10px]">★★★★★</span>
                      <span className="text-[9px] font-black text-slate-600">4.9</span>
                   </div>
                   <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter leading-none mt-1">({agent.reviewCount} Google Reviews)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-12 lg:px-16 pt-4 sm:pt-12 pb-40">
          <header className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-1 border-b border-slate-100 pb-[10px]">
              <p className="text-[12px] sm:text-sm font-bold text-slate-800 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {propertyAddress}
              </p>
              <div className="text-right hidden sm:block">
                 <p className="text-[9px] font-black text-emerald-600 uppercase tracking-tighter">Verified Property Status</p>
              </div>
            </div>
            
            {showWelcome && (
              <div className="mt-[10px] animate-in fade-in slide-in-from-top-1 duration-500">
                <h2 className="text-xl sm:text-2xl font-header text-slate-900 tracking-tight">
                  {role === 'agent' ? `Hello, ${agent.name.split(' ')[0]}` : `Welcome back, ${userName}`}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-bold mt-1 leading-tight">
                  {role === 'agent' 
                    ? "Tracking the seller's path in real-time." 
                    : level === 'simple' 
                      ? "Everything is on track. We'll handle the details."
                      : level === 'thorough'
                        ? "Reviewing instrument-level verification and audit logs for your closing."
                        : "Everything is prepared for your successful closing. Review your steps below."}
                </p>
              </div>
            )}
          </header>

          {children}
        </div>
      </main>
      
      {/* Mobile Agent Footer */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-3 flex items-center justify-between z-50 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] backdrop-blur-md bg-white/90">
         <div className="flex items-center gap-2">
            <div className="relative">
              <img src={agent.image} className="w-9 h-9 rounded-lg border border-slate-100" alt={agent.name} />
              <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-0.5 rounded-full border border-white">
                <svg className="w-1.5 h-1.5" fill="currentColor" viewBox="0 0 20 20"><path d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
              </div>
            </div>
            <div className="flex flex-col">
              <p className="font-black text-slate-900 text-[11px] uppercase tracking-tighter">{agent.name}</p>
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-tight">4.9 ⭐ Google Verified</span>
            </div>
         </div>
         <button 
            className="px-4 py-1.5 rounded-lg text-white text-[10px] font-black uppercase tracking-widest active:scale-95"
            style={{ backgroundColor: brand.primaryColor }}
          >
            CONTACT
          </button>
      </div>
    </div>
  );
};

export default Layout;
