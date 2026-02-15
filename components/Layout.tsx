
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
        className="w-full md:w-80 bg-slate-50 border-r border-slate-200 flex flex-col p-8 md:sticky md:top-0 h-auto md:h-screen overflow-y-auto shrink-0 z-20 shadow-sm md:shadow-none"
      >
        <div className="mb-8">
          <h1 
            className="font-header uppercase-tracking-150 text-2xl mb-1" 
            style={{ color: brand.primaryColor }}
          >
            {brand.logoName}
          </h1>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            {role === UserRole.SELLER ? 'Transaction Center' : 'Agent Transparency Portal'}
          </p>
          <p className="text-sm font-bold text-slate-800 mt-3 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {propertyAddress.split('|')[0]}
          </p>
        </div>

        {/* Role Switcher for Demo */}
        <div className="mb-12 bg-slate-200/50 p-1 rounded-xl flex gap-1">
          <button 
            onClick={() => setRole(UserRole.SELLER)}
            className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${role === UserRole.SELLER ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Seller
          </button>
          <button 
            onClick={() => setRole(UserRole.AGENT)}
            className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${role === UserRole.AGENT ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Agent
          </button>
        </div>

        <div className="mt-auto hidden md:block">
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
                <div className="flex items-center gap-1 mt-1">
                   <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-2.5 h-2.5 ${i < Math.round(agent.rating) ? 'fill-current' : 'text-slate-200 fill-current'}`} viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                   </div>
                   <span className="text-[9px] font-black text-slate-900">{agent.rating}</span>
                   <span className="text-[8px] text-slate-400 font-bold uppercase tracking-tight">({agent.reviewCount} {agent.reviewSource})</span>
                </div>
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
      </aside>

      {/* Main Content Area - Scrollable */}
      <main className="flex-1 overflow-y-auto scroll-smooth relative h-full">
        <div className="max-w-4xl mx-auto p-6 md:p-12 lg:p-20 pb-40 md:pb-24">
          {children}
        </div>
      </main>
      
      {/* Mobile Agent Footer (Sticky) with high-contrast styling */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 flex items-center justify-between z-50 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] backdrop-blur-md bg-white/90">
         <div className="flex items-center gap-3">
            <div className="relative">
              <img src={agent.image} className="w-11 h-11 rounded-xl border border-slate-100 shadow-sm" alt={agent.name} />
              {agent.isVerified && (
                <div className="absolute -top-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 border-2 border-white shadow-sm">
                  <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 01.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <p className="font-black text-slate-900 text-sm uppercase tracking-tighter flex items-center gap-1">
                {agent.name}
              </p>
              <div className="flex items-center gap-1">
                 <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-2.5 h-2.5 ${i < Math.round(agent.rating) ? 'fill-current' : 'text-slate-200 fill-current'}`} viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                 </div>
                 <span className="text-[9px] font-black text-slate-900">{agent.rating}</span>
                 <span className="text-[8px] font-black text-slate-400 uppercase tracking-tight">• {agent.reviewSource}</span>
              </div>
            </div>
         </div>
         <div className="flex gap-2">
           <button 
              className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700"
              onClick={() => window.location.href = `tel:${agent.phone}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </button>
           <button 
              className="px-5 py-2 rounded-xl text-white text-[11px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 active:scale-95"
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
