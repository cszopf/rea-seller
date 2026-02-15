
import React, { useState } from 'react';
import { TransactionStep, BrandConfig } from '../types';
import { REAL_PROPERTY_MOCK } from '../constants';

interface StepProps {
  step: TransactionStep;
  brand: BrandConfig;
  onNext: () => void;
  onBack?: () => void;
  optInSmartOne?: boolean;
  setOptInSmartOne?: (val: boolean) => void;
}

const StepHeader: React.FC<{ title: string; subtitle: string; brand: BrandConfig; stepNum: number }> = ({ title, subtitle, brand, stepNum }) => (
  <div className="mb-12">
    <div className="flex items-center gap-3 mb-4">
      <span className="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full text-white" style={{ backgroundColor: brand.accentColor }}>Step {stepNum} of 8</span>
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Seller Transaction Portal</span>
    </div>
    <h2 className="font-header text-4xl mb-4 leading-tight" style={{ color: brand.primaryColor }}>
      {title}
    </h2>
    <p className="font-subheader text-slate-600 text-lg leading-relaxed max-w-2xl">
      {subtitle}
    </p>
  </div>
);

const TransparencyNote: React.FC<{ 
  currentProcess: string; 
  duration: string; 
  brand: BrandConfig;
  behindTheScenes: string;
}> = ({ currentProcess, duration, brand, behindTheScenes }) => (
  <div className="mt-10 p-8 bg-slate-50 rounded-[32px] border border-slate-200 relative overflow-hidden">
    <div className="absolute top-0 right-0 px-6 py-2 bg-[#B9D9EB] text-[#004EA8] text-[9px] font-black uppercase tracking-widest rounded-bl-2xl">
      Radical Transparency
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Current Process</h4>
        <p className="text-sm font-bold text-slate-900 leading-relaxed">{currentProcess}</p>
      </div>
      <div>
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Estimated Time</h4>
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-[#64CCC9]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <p className="text-sm font-black text-[#004EA8]">{duration}</p>
        </div>
      </div>
    </div>
    <div className="mt-6 pt-6 border-t border-slate-200">
      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">WCT Backend Progress</h4>
      <p className="text-xs text-slate-500 italic">{behindTheScenes}</p>
    </div>
  </div>
);

const Button: React.FC<{ label: string; onClick: () => void; primary?: boolean; brand: BrandConfig; className?: string; disabled?: boolean }> = ({ label, onClick, primary, brand, className = "", disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-10 py-4 rounded-xl font-black text-[11px] tracking-[0.15em] uppercase transition-all shadow-sm active:scale-95 ${disabled ? 'opacity-50 cursor-not-allowed grayscale' : ''} ${className}`}
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
  <div className="flex flex-wrap gap-4 mt-8 pb-16">
    {showBack && onBack && (
      <Button label="Back" onClick={onBack} brand={brand} />
    )}
    <Button label={nextLabel} onClick={onNext} primary brand={brand} disabled={disabled} />
  </div>
);

export const TransactionContent: React.FC<StepProps> = ({ 
  step, brand, onNext, onBack, 
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
    case TransactionStep.STARTED:
      return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <StepHeader 
            stepNum={1}
            title="Sale Initiated" 
            subtitle={`We are managing the legal transfer for your property at ${REAL_PROPERTY_MOCK.address}. Let's secure your proceeds.`} 
            brand={brand} 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 bg-slate-50 border border-slate-100 rounded-3xl">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Sale Price</p>
              <p className="font-black text-slate-900 text-2xl tracking-tighter">${REAL_PROPERTY_MOCK.salePrice.toLocaleString()}</p>
            </div>
            <div className="p-8 bg-[#B9D9EB]/20 border border-[#B9D9EB] rounded-3xl">
              <p className="text-[10px] font-black text-[#004EA8] uppercase tracking-widest mb-2">Target Net Proceeds</p>
              <p className="font-black text-[#004EA8] text-2xl tracking-tighter">${REAL_PROPERTY_MOCK.estimatedNet.toLocaleString()}</p>
            </div>
          </div>
          <TransparencyNote 
            brand={brand}
            currentProcess="Initial Sale Audit. We are establishing your digital file and correlating your sale agreement with public land records."
            duration="1 - 2 Business Hours"
            behindTheScenes="Our opening team is currently ordering the title commitment from the state underwriter and verifying the legal property description."
          />
          <NavActions onNext={onNext} onBack={onBack} brand={brand} showBack={false} nextLabel="Confirm Sale Info" />
        </div>
      );

    case TransactionStep.IDENTITY:
      return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <StepHeader 
            stepNum={2}
            title="Biometric Authentication" 
            subtitle="Securely verify your identity as the property owner. This prevents unauthorized wire changes and fraudulent conveyance." 
            brand={brand} 
          />
          <div className="p-12 border-2 border-slate-100 bg-slate-50/50 rounded-[48px] text-center">
             <div className="w-24 h-24 bg-white rounded-3xl shadow-sm flex items-center justify-center mx-auto mb-8 text-[#004EA8]">
                <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
             </div>
             <p className="text-slate-900 font-black text-xl mb-3 tracking-tighter">Digital Identity Shield</p>
             <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">Encrypted facial matching against government-issued records for World Class Title compliance.</p>
          </div>
          <TransparencyNote 
            brand={brand}
            currentProcess="Secure Biometric Matching. We use AI-powered facial analysis to cross-reference your live capture against DMV or Passport databases."
            duration="2 - 5 Minutes"
            behindTheScenes="WCT is running a Multi-State OFAC check and verifying your signatory authority against the existing deed of record."
          />
          <NavActions onNext={onNext} onBack={onBack} brand={brand} nextLabel="Begin Auth" />
        </div>
      );

    case TransactionStep.DOCUMENTS:
      return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <StepHeader 
            stepNum={3}
            title="Conveyance Package" 
            subtitle="Review your legal documents. We require signature authorization to clear your existing mortgage lien." 
            brand={brand} 
          />
          <div className="space-y-4 mb-8">
             {[
               { name: "General Warranty Deed", type: "SIGNATURE REQUIRED" },
               { name: "Payoff Authorization (LOWER, LLC)", type: "ACTION REQUIRED" },
               { name: "Seller Closing Disclosure", type: "REVIEW REQUIRED" }
             ].map((doc, i) => (
               <div key={i} className="p-6 bg-white border border-slate-100 rounded-3xl flex items-center justify-between shadow-sm">
                  <div className="flex gap-5 items-center">
                    <div className="w-12 h-12 bg-[#B9D9EB]/20 rounded-2xl flex items-center justify-center text-[#004EA8]">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                    </div>
                    <div>
                      <p className="font-black text-slate-900 text-sm tracking-tighter">{doc.name}</p>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-0.5">{doc.type}</p>
                    </div>
                  </div>
                  <button className="text-[10px] font-black text-[#004EA8] bg-[#B9D9EB]/40 px-5 py-2.5 rounded-xl uppercase tracking-widest">Sign</button>
               </div>
             ))}
          </div>
          <TransparencyNote 
            brand={brand}
            currentProcess="Legal Package Execution. We are gathering your digital consent to satisfy your existing debt and prepare the property for transfer."
            duration="10 - 15 Minutes"
            behindTheScenes="WCT is searching for any unrecorded liens, tax assessments, or historical easements that may affect the transfer of the bundle of rights."
          />
          <NavActions onNext={onNext} onBack={onBack} brand={brand} nextLabel="Authorize Payoffs" />
        </div>
      );

    case TransactionStep.SEARCH:
      return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <StepHeader 
            stepNum={4}
            title="Title Clearance" 
            subtitle="Our examiners are verifying clear title to ensure your liability terminates successfully upon transfer." 
            brand={brand} 
          />
          <div className="space-y-4">
             <div className="p-8 bg-white border border-slate-100 rounded-3xl flex justify-between items-center shadow-sm">
                <span className="font-black text-slate-900 text-sm tracking-tighter uppercase">Franklin Co. Property Taxes</span>
                <span className="text-[10px] font-black text-[#64CCC9] bg-[#64CCC9]/10 px-4 py-1.5 rounded-full uppercase tracking-widest border border-[#64CCC9]/20">Current</span>
             </div>
             <div className="p-8 bg-white border border-slate-100 rounded-3xl flex justify-between items-center shadow-sm">
                <span className="font-black text-slate-900 text-sm tracking-tighter uppercase">HOA Clearance (Wedgewood)</span>
                <span className="text-[10px] font-black text-[#004EA8] bg-[#B9D9EB]/40 px-4 py-1.5 rounded-full uppercase tracking-widest">Final Audit</span>
             </div>
          </div>
          <TransparencyNote 
            brand={brand}
            currentProcess="40-Year Public Record Audit. Our examiners are meticulously reviewing the chain of title to identify any encumbrances that must be cleared."
            duration="2 - 4 Business Days"
            behindTheScenes="We are communicating with Lower, LLC to obtain a formal payoff demand and ensuring all back-taxes are escrowed correctly."
          />
          <NavActions onNext={onNext} onBack={onBack} brand={brand} nextLabel="Confirm Search" />
        </div>
      );

    case TransactionStep.CLEARING:
      return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <StepHeader 
            stepNum={5}
            title="Curative Phase" 
            subtitle="Finalizing the ledger. We ensure all existing encumbrances are settled prior to disbursement." 
            brand={brand} 
          />
          <div className="p-10 bg-slate-50 border border-slate-200 rounded-[40px] flex flex-col items-center text-center">
             <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-blue-500 mb-6 shadow-sm">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
             </div>
             <h4 className="font-black text-slate-900 text-lg mb-2">Title Shield Protocol</h4>
             <p className="text-sm text-slate-600 max-w-sm">WCT's digital curative engine is auditing your file to guarantee a clean conveyance for the buyer family.</p>
          </div>
          <TransparencyNote 
            brand={brand}
            currentProcess="Encumbrance Resolution. Our curative specialists are obtaining formal releases for all identified liens and verifying HOA standing."
            duration="1 - 3 Business Days"
            behindTheScenes="Once we reach 'Clear to Close' status from the buyer's lender, our system opens the mobile notary dispatch queue."
          />
          <NavActions onNext={onNext} onBack={onBack} brand={brand} />
        </div>
      );

    case TransactionStep.SCHEDULE:
      return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <StepHeader 
            stepNum={6}
            title="Signing Schedule" 
            subtitle={`Target Closing: ${REAL_PROPERTY_MOCK.closingDate}. Select your preference for document execution.`} 
            brand={brand} 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
             <div className="p-8 bg-blue-50/50 border-2 border-[#004EA8] rounded-[32px] cursor-pointer group">
                <p className="font-black text-slate-900 uppercase tracking-tighter mb-1">In-Office (Westerville)</p>
                <p className="text-xs text-slate-600">5040 Pine Creek Drive, Westerville, OH 43081</p>
             </div>
             <div className="p-8 bg-slate-50 border-2 border-slate-100 rounded-[32px] opacity-60">
                <p className="font-black text-slate-900 uppercase tracking-tighter mb-1">Mobile Notary</p>
                <p className="text-xs text-slate-500">Scheduled upon lender package arrival.</p>
             </div>
          </div>
          <TransparencyNote 
            brand={brand}
            currentProcess="Signing Logistics Coordination. We are matching your schedule with our qualified notary pool to ensure a seamless execution."
            duration="Instant Selection"
            behindTheScenes="WCT is currently balancing the ledger with the buyer agent and the buyer's mortgage lender to ensure penny-accuracy."
          />
          <NavActions onNext={onNext} onBack={onBack} brand={brand} nextLabel="Schedule Time" />
        </div>
      );

    case TransactionStep.SUMMARY:
      return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl mx-auto pb-20">
          <div className="flex justify-between items-center mb-10 border-b-4 border-[#004EA8] pb-6">
             <h2 className="font-header text-4xl text-slate-900">Sale Disclosure</h2>
             <div className="text-right">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Final Audit</p>
                <p className="text-sm font-black text-slate-900 tracking-tighter">{REAL_PROPERTY_MOCK.parcelId}</p>
             </div>
          </div>

          <div className="bg-[#004EA8] p-12 rounded-[48px] text-white shadow-2xl mb-12 relative overflow-hidden text-center">
             <p className="text-[#B9D9EB] text-xs font-black uppercase tracking-[0.4em] mb-4 relative z-10">Final Net Proceeds</p>
             <h3 className="font-header text-6xl mb-4 relative z-10 tracking-tighter">$468,050.00</h3>
             <div className="inline-flex items-center gap-2 bg-[#64CCC9] text-[#004EA8] px-4 py-1.5 rounded-full relative z-10 font-black text-[9px] uppercase tracking-widest shadow-lg">
               $50 Digital Path Credit Applied
             </div>
             {bankVerified && (
                <div className="mt-4 inline-flex items-center gap-3 bg-[#64CCC9]/20 text-[#64CCC9] px-6 py-2 rounded-full relative z-10 border border-[#64CCC9]/30">
                  <span className="w-2.5 h-2.5 bg-[#64CCC9] rounded-full animate-pulse"></span>
                  <p className="text-[10px] font-black uppercase tracking-widest">Disbursing to Chase •••• 4902</p>
                </div>
             )}
          </div>

          {!bankVerified && (
            <div className="mb-10 p-10 bg-slate-50 border-2 border-dashed border-[#A2B2C8] rounded-[48px] text-center">
                <h4 className="font-header text-xl text-slate-900 mb-2">Proceeds Link Required</h4>
                <button 
                  onClick={simulateBankLink}
                  className="mt-6 bg-slate-900 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl flex items-center gap-3 mx-auto"
                >
                  <span className="opacity-50 text-[10px]">LOG IN WITH</span>
                  <span className="text-lg font-bold">stripe</span>
                </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
             <div className="p-8 border border-slate-100 bg-white rounded-[32px] shadow-sm">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Debits & Credits</p>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 font-medium">Commissions</span>
                    <span className="font-black text-slate-900">$69,300.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 font-medium">Taxes</span>
                    <span className="font-black text-slate-900">$5,040.00</span>
                  </div>
                  <div className="flex justify-between text-sm pt-4 border-t border-slate-50">
                    <span className="text-[#64CCC9] font-black uppercase text-[10px] tracking-widest">Digital Efficiency Credit</span>
                    <span className="font-black text-[#64CCC9]">-$50.00</span>
                  </div>
                </div>
             </div>
             <div className="p-8 border border-slate-100 bg-white rounded-[32px] shadow-sm text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Payoff</p>
                <p className="text-sm font-black text-slate-900 mb-2">LOWER, LLC</p>
                <p className="font-header text-3xl text-red-500 tracking-tighter">$742,000.00</p>
             </div>
          </div>

          <TransparencyNote 
            brand={brand}
            currentProcess="Final Ledger Balancing. We are performing the definitive accounting of all credits and debits to confirm your exact net proceed figure."
            duration="1 - 2 Business Hours"
            behindTheScenes="WCT will confirm 'Funding Authorization' with the bank, release the escrowed checks to the agents, and initiate the Federal Wire."
          />

          <div className="flex justify-center gap-8 mt-12">
             <Button label="Print" onClick={() => window.print()} brand={brand} />
             <Button label="Acknowledge & Close" onClick={onNext} primary brand={brand} disabled={!bankVerified} />
          </div>
        </div>
      );

    case TransactionStep.CLOSED:
      return (
        <div className="animate-in zoom-in-95 duration-1000 pb-20 text-center">
           <div className="inline-block p-12 rounded-[64px] bg-[#64CCC9]/10 text-[#64CCC9] mb-10 shadow-inner border border-[#64CCC9]/20">
              <svg className="h-28 w-28" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h2 className="font-header text-7xl mb-6 text-[#004EA8]">Sale Closed</h2>
            <p className="text-slate-600 text-2xl max-w-xl mx-auto mb-20 leading-relaxed font-subheader">
               Funds were initiated to Chase Bank at 1:45 PM. Welcome to your next chapter.
            </p>

            <div className="bg-white border-4 border-[#B9D9EB] rounded-[72px] p-16 shadow-xl text-left relative overflow-hidden">
               <div className="absolute top-0 right-0 bg-[#64CCC9] text-[#004EA8] px-12 py-4 text-xs font-black uppercase tracking-widest">SMART ONE ACTIVATED</div>
               <div className="relative z-10">
                  <h3 className="font-header text-4xl mb-8 text-[#004EA8]">WHAT HAPPENS NOW?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100 transition-all hover:shadow-md">
                      <p className="text-[#004EA8] font-black text-sm mb-3 uppercase tracking-widest">Wire Receipt</p>
                      <p className="text-sm text-slate-600 leading-relaxed">Your funds should land in your Chase account within 2-4 hours. Keep your wire confirmation ref <span className="font-bold text-slate-900">#WCT-0492</span>.</p>
                    </div>
                    <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100 transition-all hover:shadow-md">
                      <p className="text-[#004EA8] font-black text-sm mb-3 uppercase tracking-widest">Smart ONE 90</p>
                      <p className="text-sm text-slate-600 leading-relaxed">Your 90 days of complimentary equity protection for your next home starts today. Enter your new address in the vault to activate monitoring.</p>
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
