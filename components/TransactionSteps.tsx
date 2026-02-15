
import React, { useState } from 'react';
import { TransactionStep, BrandConfig, ExplanatoryPreference } from '../types';
import { REAL_PROPERTY_MOCK } from '../constants';

interface StepProps {
  step: TransactionStep;
  brand: BrandConfig;
  preference: ExplanatoryPreference;
  setPreference: (val: ExplanatoryPreference) => void;
  onNext: () => void;
  onBack?: () => void;
  optInSmartOne?: boolean;
  setOptInSmartOne?: (val: boolean) => void;
}

const StepHeader: React.FC<{ 
  title: string; 
  subtitle: string; 
  brand: BrandConfig; 
  stepNum: number;
  preference: ExplanatoryPreference;
}> = ({ title, subtitle, brand, stepNum, preference }) => (
  <div className="mb-6 md:mb-12">
    <div className="flex items-center gap-3 mb-2 md:mb-4">
      <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] px-2.5 md:px-3 py-1 rounded-full text-white" style={{ backgroundColor: brand.accentColor }}>Step {stepNum} of 8</span>
      <span className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">Transaction Portal</span>
    </div>
    <h2 className="font-header text-xl md:text-4xl mb-1 md:mb-4 leading-tight" style={{ color: brand.primaryColor }}>
      {title}
    </h2>
    {preference !== ExplanatoryPreference.SIMPLE && (
      <p className="font-subheader text-slate-600 text-sm md:text-lg leading-relaxed max-w-2xl">
        {subtitle}
      </p>
    )}
  </div>
);

const TransparencyNote: React.FC<{ 
  currentProcess: string; 
  duration: string; 
  brand: BrandConfig;
  behindTheScenes: string;
  preference: ExplanatoryPreference;
}> = ({ currentProcess, duration, brand, behindTheScenes, preference }) => {
  if (preference === ExplanatoryPreference.SIMPLE) {
    return (
      <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Current: {duration}</span>
        <div className="flex items-center gap-2">
           <div className="w-1.5 h-1.5 bg-[#64CCC9] rounded-full animate-pulse"></div>
           <span className="text-[9px] font-black text-[#004EA8] uppercase tracking-widest">{currentProcess.split('.')[0]}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 md:mt-10 p-5 md:p-8 bg-slate-50 rounded-[24px] md:rounded-[32px] border border-slate-200 relative overflow-hidden">
      <div className="absolute top-0 right-0 px-4 md:px-6 py-1 md:py-2 bg-[#B9D9EB] text-[#004EA8] text-[8px] md:text-[9px] font-black uppercase tracking-widest rounded-bl-xl md:rounded-bl-2xl">
        Transparency
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <div>
          <h4 className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 md:mb-3">Current Process</h4>
          <p className="text-xs md:text-sm font-bold text-slate-900 leading-relaxed">{currentProcess}</p>
        </div>
        <div>
          <h4 className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 md:mb-3">Estimated Time</h4>
          <div className="flex items-center gap-2">
            <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#64CCC9]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <p className="text-xs md:text-sm font-black text-[#004EA8]">{duration}</p>
          </div>
        </div>
      </div>
      {preference === ExplanatoryPreference.COMPLETE && (
        <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-slate-200">
          <h4 className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 md:mb-2">Full Audit Trail</h4>
          <p className="text-[10px] md:text-xs text-slate-500 italic">{behindTheScenes}</p>
        </div>
      )}
    </div>
  );
};

const Button: React.FC<{ label: string; onClick: () => void; primary?: boolean; brand: BrandConfig; className?: string; disabled?: boolean }> = ({ label, onClick, primary, brand, className = "", disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-6 md:px-10 py-3 md:py-4 rounded-xl font-black text-[10px] md:text-[11px] tracking-[0.15em] uppercase transition-all shadow-sm active:scale-95 ${disabled ? 'opacity-50 cursor-not-allowed grayscale' : ''} ${className}`}
    style={{
      backgroundColor: primary ? brand.primaryColor : 'transparent',
      color: primary ? 'white' : brand.primaryColor,
      border: primary ? 'none' : `2px solid ${brand.accentColor}`
    }}
  >
    {label}
  </button>
);

const NavActions: React.FC<{ onNext: () => void; onBack?: () => void; brand: BrandConfig; nextLabel?: string; showBack?: boolean; disabled?: boolean }> = ({ onNext, onBack, brand, nextLabel = "Continue", showBack = true, disabled }) => (
  <div className="flex flex-wrap gap-3 mt-6 pb-8 md:pb-16">
    {showBack && onBack && (
      <Button label="Back" onClick={onBack} brand={brand} />
    )}
    <Button label={nextLabel} onClick={onNext} primary brand={brand} disabled={disabled} className="flex-1 md:flex-none" />
  </div>
);

export const TransactionContent: React.FC<StepProps> = ({ 
  step, brand, preference, setPreference, onNext, onBack, 
  optInSmartOne, setOptInSmartOne
}) => {
  const [bankVerified, setBankVerified] = useState(false);
  const [isLinkingBank, setIsLinkingBank] = useState(false);

  const simulateBankLink = () => {
    setIsLinkingBank(true);
    setTimeout(() => {
      setIsLinkingBank(false);
      setBankVerified(true);
    }, 2000);
  };

  switch (step) {
    case TransactionStep.PREFERENCE:
      return (
        <div className="animate-in fade-in zoom-in-95 duration-700 max-w-2xl mx-auto text-center py-4">
          <div className="mb-8">
            <h2 className="font-header text-3xl text-[#004EA8] mb-4">Welcome to Your Transaction Portal</h2>
            <p className="text-slate-600 font-subheader leading-relaxed">How would you like to experience your closing? You can change this at any time.</p>
          </div>
          <div className="grid grid-cols-1 gap-4 mb-10">
            {[
              { 
                id: ExplanatoryPreference.SIMPLE, 
                title: 'Minimalist (Simple)', 
                desc: 'Just the essentials. Minimal reading, fast actions.' 
              },
              { 
                id: ExplanatoryPreference.STANDARD, 
                title: 'Professional (Standard)', 
                desc: 'A balanced overview of every major milestone.' 
              },
              { 
                id: ExplanatoryPreference.COMPLETE, 
                title: 'Institutional (Complete)', 
                desc: 'Full transparency. Deep dives into backend audits and title law.' 
              }
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setPreference(opt.id)}
                className={`p-6 text-left rounded-3xl border-2 transition-all ${preference === opt.id ? 'border-[#004EA8] bg-blue-50/50 shadow-lg' : 'border-slate-100 hover:border-slate-200 bg-white'}`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-black text-slate-900 uppercase tracking-tighter mb-1">{opt.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{opt.desc}</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${preference === opt.id ? 'border-[#004EA8] bg-[#004EA8]' : 'border-slate-200'}`}>
                    {preference === opt.id && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                  </div>
                </div>
              </button>
            ))}
          </div>
          <Button label="Enter Transaction" onClick={onNext} primary brand={brand} className="w-full md:w-auto" />
        </div>
      );

    case TransactionStep.STARTED:
      return (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
          <StepHeader 
            stepNum={1}
            title="Sale Initiated" 
            subtitle={`We are managing the legal transfer for ${REAL_PROPERTY_MOCK.address}.`} 
            brand={brand} 
            preference={preference}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="p-6 md:p-8 bg-slate-50 border border-slate-100 rounded-2xl md:rounded-3xl">
              <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 md:mb-2">Sale Price</p>
              <p className="font-black text-slate-900 text-xl md:text-2xl tracking-tighter">${REAL_PROPERTY_MOCK.salePrice.toLocaleString()}</p>
            </div>
            <div className="p-6 md:p-8 bg-[#B9D9EB]/20 border border-[#B9D9EB] rounded-2xl md:rounded-3xl">
              <p className="text-[9px] md:text-[10px] font-black text-[#004EA8] uppercase tracking-widest mb-1 md:mb-2">Net Proceeds</p>
              <p className="font-black text-[#004EA8] text-xl md:text-2xl tracking-tighter">${REAL_PROPERTY_MOCK.estimatedNet.toLocaleString()}</p>
            </div>
          </div>
          <TransparencyNote 
            brand={brand}
            preference={preference}
            currentProcess="Initial Sale Audit. We are establishing your digital file and correlating your sale agreement."
            duration="1 - 2 Business Hours"
            behindTheScenes="Our opening team is currently ordering the title commitment and verifying the legal property description."
          />
          <NavActions onNext={onNext} onBack={onBack} brand={brand} showBack={false} nextLabel="Confirm Sale Info" />
        </div>
      );

    case TransactionStep.IDENTITY:
      return (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
          <StepHeader 
            stepNum={2}
            title="Biometric Auth" 
            subtitle="Securely verify your identity to prevent fraudulent conveyance." 
            brand={brand} 
            preference={preference}
          />
          <div className="p-8 md:p-12 border-2 border-slate-100 bg-slate-50/50 rounded-[32px] md:rounded-[48px] text-center">
             <div className="w-16 h-16 md:w-24 md:h-24 bg-white rounded-2xl md:rounded-3xl shadow-sm flex items-center justify-center mx-auto mb-6 md:mb-8 text-[#004EA8]">
                <svg className="h-10 w-10 md:h-12 md:w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
             </div>
             <p className="text-slate-900 font-black text-lg md:text-xl mb-2 tracking-tighter">Digital Identity Shield</p>
             <p className="text-[11px] md:text-sm text-slate-500 max-w-xs mx-auto leading-relaxed">Encrypted facial matching against government records.</p>
          </div>
          <TransparencyNote 
            brand={brand}
            preference={preference}
            currentProcess="Secure Biometric Matching. We use AI analysis to cross-reference against DMV databases."
            duration="2 - 5 Minutes"
            behindTheScenes="WCT is running an OFAC check and verifying your signatory authority against the existing deed."
          />
          <NavActions onNext={onNext} onBack={onBack} brand={brand} nextLabel="Begin Auth" />
        </div>
      );

    case TransactionStep.DOCUMENTS:
      return (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
          <StepHeader 
            stepNum={3}
            title="Conveyance Package" 
            subtitle="Review your legal documents and authorize debt clearing." 
            brand={brand} 
            preference={preference}
          />
          <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
             {[
               { name: "General Warranty Deed", type: "SIGNATURE REQUIRED" },
               { name: "Payoff Auth (LOWER, LLC)", type: "ACTION REQUIRED" },
               { name: "Seller Closing Disclosure", type: "REVIEW REQUIRED" }
             ].map((doc, i) => (
               <div key={i} className="p-4 md:p-6 bg-white border border-slate-100 rounded-2xl md:rounded-3xl flex items-center justify-between shadow-sm">
                  <div className="flex gap-4 md:gap-5 items-center min-w-0">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-[#B9D9EB]/20 rounded-xl md:rounded-2xl flex items-center justify-center text-[#004EA8] shrink-0">
                      <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                    </div>
                    <div className="min-w-0">
                      <p className="font-black text-slate-900 text-xs md:text-sm tracking-tighter truncate">{doc.name}</p>
                      <p className="text-[9px] md:text-[10px] text-slate-400 font-black uppercase tracking-widest mt-0.5">{doc.type}</p>
                    </div>
                  </div>
                  <button className="text-[9px] md:text-[10px] font-black text-[#004EA8] bg-[#B9D9EB]/40 px-4 md:px-5 py-2 md:py-2.5 rounded-lg md:rounded-xl uppercase tracking-widest shrink-0">Sign</button>
               </div>
             ))}
          </div>
          <TransparencyNote 
            brand={brand}
            preference={preference}
            currentProcess="Legal Package Execution. Gathering consent to satisfy existing debt."
            duration="10 - 15 Minutes"
            behindTheScenes="WCT is searching for any unrecorded liens or historical easements."
          />
          <NavActions onNext={onNext} onBack={onBack} brand={brand} nextLabel="Authorize Payoffs" />
        </div>
      );

    case TransactionStep.SEARCH:
      return (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
          <StepHeader 
            stepNum={4}
            title="Title Clearance" 
            subtitle="Verifying clear title to terminate your liability successfully." 
            brand={brand} 
            preference={preference}
          />
          <div className="space-y-3 md:space-y-4">
             <div className="p-6 md:p-8 bg-white border border-slate-100 rounded-2xl md:rounded-3xl flex justify-between items-center shadow-sm">
                <span className="font-black text-slate-900 text-xs md:text-sm tracking-tighter uppercase">County Property Taxes</span>
                <span className="text-[9px] md:text-[10px] font-black text-[#64CCC9] bg-[#64CCC9]/10 px-3 md:px-4 py-1.5 rounded-full uppercase tracking-widest border border-[#64CCC9]/20">Current</span>
             </div>
             <div className="p-6 md:p-8 bg-white border border-slate-100 rounded-2xl md:rounded-3xl flex justify-between items-center shadow-sm">
                <span className="font-black text-slate-900 text-xs md:text-sm tracking-tighter uppercase">HOA Clearance</span>
                <span className="text-[9px] md:text-[10px] font-black text-[#004EA8] bg-[#B9D9EB]/40 px-3 md:px-4 py-1.5 rounded-full uppercase tracking-widest">Final Audit</span>
             </div>
          </div>
          <TransparencyNote 
            brand={brand}
            preference={preference}
            currentProcess="40-Year Public Record Audit. Meticulously reviewing the chain of title."
            duration="2 - 4 Business Days"
            behindTheScenes="We are communicating with Lower, LLC and ensuring back-taxes are escrowed."
          />
          <NavActions onNext={onNext} onBack={onBack} brand={brand} nextLabel="Confirm Search" />
        </div>
      );

    case TransactionStep.CLEARING:
      return (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
          <StepHeader 
            stepNum={5}
            title="Curative Phase" 
            subtitle="Finalizing the ledger. Ensuring all encumbrances are settled." 
            brand={brand} 
            preference={preference}
          />
          <div className="p-8 md:p-10 bg-slate-50 border border-slate-200 rounded-[32px] md:rounded-[40px] flex flex-col items-center text-center">
             <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center text-blue-500 mb-4 md:mb-6 shadow-sm">
                <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
             </div>
             <h4 className="font-black text-slate-900 text-base md:text-lg mb-2">Title Shield Protocol</h4>
             <p className="text-[11px] md:text-sm text-slate-600 max-w-xs mx-auto">WCT's digital engine is auditing your file for clean conveyance.</p>
          </div>
          <TransparencyNote 
            brand={brand}
            preference={preference}
            currentProcess="Encumbrance Resolution. Resolving releases and HOA standing."
            duration="1 - 3 Business Days"
            behindTheScenes="Once 'Clear to Close' status is reached, we open the notary dispatch queue."
          />
          <NavActions onNext={onNext} onBack={onBack} brand={brand} />
        </div>
      );

    case TransactionStep.SCHEDULE:
      return (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
          <StepHeader 
            stepNum={6}
            title="Signing Schedule" 
            subtitle={`Target Closing: ${REAL_PROPERTY_MOCK.closingDate}.`} 
            brand={brand} 
            preference={preference}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-10">
             <div className="p-6 md:p-8 bg-blue-50/50 border-2 border-[#004EA8] rounded-2xl md:rounded-[32px] cursor-pointer">
                <p className="font-black text-slate-900 uppercase tracking-tighter mb-1 text-sm md:text-base">In-Office (Westerville)</p>
                <p className="text-[10px] md:text-xs text-slate-600">5040 Pine Creek Drive, Westerville, OH</p>
             </div>
             <div className="p-6 md:p-8 bg-slate-50 border-2 border-slate-100 rounded-2xl md:rounded-[32px] opacity-60">
                <p className="font-black text-slate-900 uppercase tracking-tighter mb-1 text-sm md:text-base">Mobile Notary</p>
                <p className="text-[10px] md:text-xs text-slate-500">Scheduled on lender arrival.</p>
             </div>
          </div>
          <TransparencyNote 
            brand={brand}
            preference={preference}
            currentProcess="Signing Coordination. Matching your schedule with our notary pool."
            duration="Instant Selection"
            behindTheScenes="WCT is currently balancing the ledger for penny-accuracy."
          />
          <NavActions onNext={onNext} onBack={onBack} brand={brand} nextLabel="Schedule Time" />
        </div>
      );

    case TransactionStep.SUMMARY:
      return (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-700 max-w-4xl mx-auto pb-10">
          <div className="flex justify-between items-center mb-6 md:mb-10 border-b-2 md:border-b-4 border-[#004EA8] pb-4 md:pb-6">
             <h2 className="font-header text-xl md:text-4xl text-slate-900">Sale Disclosure</h2>
             <div className="text-right">
                <p className="text-[8px] md:text-[10px] font-black uppercase text-slate-400 tracking-widest">Final Audit</p>
                <p className="text-xs md:text-sm font-black text-slate-900 tracking-tighter">{REAL_PROPERTY_MOCK.parcelId}</p>
             </div>
          </div>

          <div className="bg-[#004EA8] p-8 md:p-12 rounded-[32px] md:rounded-[48px] text-white shadow-2xl mb-8 md:mb-12 relative overflow-hidden text-center">
             <p className="text-[#B9D9EB] text-[10px] md:text-xs font-black uppercase tracking-[0.3em] mb-2 md:mb-4 relative z-10">Final Net Proceeds</p>
             <h3 className="font-header text-4xl md:text-6xl mb-3 md:mb-4 relative z-10 tracking-tighter">$468,050.00</h3>
             <div className="inline-flex items-center gap-2 bg-[#64CCC9] text-[#004EA8] px-3 md:px-4 py-1 md:py-1.5 rounded-full relative z-10 font-black text-[8px] md:text-[9px] uppercase tracking-widest shadow-lg">
               $50 Digital Path Credit Applied
             </div>
             {bankVerified && (
                <div className="mt-4 flex items-center justify-center gap-2 bg-[#64CCC9]/20 text-[#64CCC9] px-4 md:px-6 py-2 rounded-full relative z-10 border border-[#64CCC9]/30 mx-auto">
                  <span className="w-2 w-2 bg-[#64CCC9] rounded-full animate-pulse"></span>
                  <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest">Disbursing to Chase •••• 4902</p>
                </div>
             )}
          </div>

          {!bankVerified && (
            <div className="mb-8 md:mb-10 p-6 md:p-10 bg-slate-50 border-2 border-dashed border-[#A2B2C8] rounded-[32px] md:rounded-[48px] text-center">
                <h4 className="font-header text-lg md:text-xl text-slate-900 mb-1">Proceeds Link Required</h4>
                <button 
                  onClick={simulateBankLink}
                  className="mt-4 md:mt-6 bg-slate-900 text-white px-6 md:px-8 py-3 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest shadow-xl flex items-center gap-3 mx-auto"
                >
                  <span className="opacity-50 text-[8px]">LOG IN WITH</span>
                  <span className="text-base md:text-lg font-bold">stripe</span>
                </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-10">
             <div className="p-6 md:p-8 border border-slate-100 bg-white rounded-2xl md:rounded-[32px] shadow-sm">
                <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 md:mb-6">Debits & Credits</p>
                <div className="space-y-3 md:space-y-4">
                  <div className="flex justify-between text-xs md:text-sm">
                    <span className="text-slate-500 font-medium">Commissions</span>
                    <span className="font-black text-slate-900">$69,300.00</span>
                  </div>
                  <div className="flex justify-between text-xs md:text-sm">
                    <span className="text-slate-500 font-medium">Taxes</span>
                    <span className="font-black text-slate-900">$5,040.00</span>
                  </div>
                  <div className="flex justify-between text-[10px] md:text-[10px] pt-3 md:pt-4 border-t border-slate-50 items-center">
                    <span className="text-[#64CCC9] font-black uppercase tracking-widest">Efficiency Credit</span>
                    <span className="font-black text-[#64CCC9]">-$50.00</span>
                  </div>
                </div>
             </div>
             <div className="p-6 md:p-8 border border-slate-100 bg-white rounded-2xl md:rounded-[32px] shadow-sm text-center">
                <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Payoff</p>
                <p className="text-xs md:text-sm font-black text-slate-900 mb-1">LOWER, LLC</p>
                <p className="font-header text-2xl md:text-3xl text-red-500 tracking-tighter">$742,000.00</p>
             </div>
          </div>

          <TransparencyNote 
            brand={brand}
            preference={preference}
            currentProcess="Ledger Balancing. Confirming exact net proceed figure."
            duration="1 - 2 Business Hours"
            behindTheScenes="WCT will confirm authorization and initiate the Federal Wire."
          />

          <div className="flex justify-center gap-4 mt-8 md:mt-12">
             <Button label="Print" onClick={() => window.print()} brand={brand} className="hidden md:block" />
             <Button label="Acknowledge & Close" onClick={onNext} primary brand={brand} disabled={!bankVerified} className="flex-1 md:flex-none" />
          </div>
        </div>
      );

    case TransactionStep.CLOSED:
      return (
        <div className="animate-in zoom-in-95 duration-1000 pb-10 text-center">
           <div className="inline-block p-8 md:p-12 rounded-[48px] md:rounded-[64px] bg-[#64CCC9]/10 text-[#64CCC9] mb-6 md:mb-10 shadow-inner border border-[#64CCC9]/20">
              <svg className="h-20 w-20 md:h-28 md:w-28" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h2 className="font-header text-4xl md:text-7xl mb-4 md:mb-6 text-[#004EA8]">Sale Closed</h2>
            <p className="text-slate-600 text-lg md:text-2xl max-w-xl mx-auto mb-10 md:mb-20 leading-relaxed font-subheader px-4">
               Funds were initiated to Chase Bank at 1:45 PM.
            </p>

            <div className="bg-white border-2 md:border-4 border-[#B9D9EB] rounded-[32px] md:rounded-[72px] p-8 md:p-16 shadow-xl text-left relative overflow-hidden">
               <div className="absolute top-0 right-0 bg-[#64CCC9] text-[#004EA8] px-6 md:px-12 py-2 md:py-4 text-[9px] md:text-xs font-black uppercase tracking-widest">ACTIVATED</div>
               <div className="relative z-10">
                  <h3 className="font-header text-2xl md:text-4xl mb-6 md:mb-8 text-[#004EA8]">WHAT'S NEXT?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                    <div className="p-6 md:p-8 bg-slate-50 rounded-2xl md:rounded-[32px] border border-slate-100 transition-all">
                      <p className="text-[#004EA8] font-black text-[10px] md:text-sm mb-2 md:mb-3 uppercase tracking-widest">Wire Receipt</p>
                      <p className="text-xs md:text-sm text-slate-600 leading-relaxed">Funds should land within 2-4 hours. Ref <span className="font-bold text-slate-900">#WCT-0492</span>.</p>
                    </div>
                    <div className="p-6 md:p-8 bg-slate-50 rounded-2xl md:rounded-[32px] border border-slate-100 transition-all">
                      <p className="text-[#004EA8] font-black text-[10px] md:text-sm mb-2 md:mb-3 uppercase tracking-widest">Smart ONE 90</p>
                      <p className="text-xs md:text-sm text-slate-600 leading-relaxed">90 days of equity protection starts today. Activate monitoring in the vault.</p>
                    </div>
                  </div>
                  <NavActions onNext={onNext} onBack={onBack} brand={brand} nextLabel="Open Seller Vault" />
               </div>
            </div>
        </div>
      );

    default:
      return null;
  }
};
