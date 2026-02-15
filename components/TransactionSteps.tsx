
import React, { useState } from 'react';
import { TransactionStep, BrandConfig, ExperienceLevel } from '../types';
import { REAL_PROPERTY_MOCK } from '../constants';

interface StepProps {
  step: TransactionStep;
  brand: BrandConfig;
  level: ExperienceLevel;
  onNext: () => void;
  onBack?: () => void;
}

const WhatToExpect: React.FC<{ 
  level: ExperienceLevel; 
  simple: string; 
  standard: string; 
  thorough: string; 
  estTime: string;
}> = ({ level, simple, standard, thorough, estTime }) => {
  const description = level === 'simple' ? simple : level === 'thorough' ? thorough : standard;
  return (
    <div className="mt-8 p-6 bg-slate-50 border border-slate-200 rounded-3xl animate-in fade-in slide-in-from-bottom-2">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">What to Expect</h4>
        <div className="flex items-center gap-1.5 px-3 py-1 bg-white rounded-full border border-slate-200">
          <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <span className="text-[9px] font-black text-slate-900 uppercase tracking-widest">Est: {estTime}</span>
        </div>
      </div>
      <p className="text-sm text-slate-600 leading-relaxed font-medium">
        {description}
      </p>
    </div>
  );
};

const StepHeader: React.FC<{ title: string; subtitle: string; brand: BrandConfig; stepNum: number }> = ({ title, subtitle, brand, stepNum }) => (
  <div className="mb-8">
    <div className="flex items-center gap-3 mb-4">
      <span className="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full text-white" style={{ backgroundColor: brand.accentColor }}>Step {stepNum} of 8</span>
    </div>
    <h2 className="font-header text-3xl md:text-4xl mb-4 leading-tight" style={{ color: brand.primaryColor }}>
      {title}
    </h2>
    <p className="font-subheader text-slate-600 text-base md:text-lg leading-relaxed max-w-2xl">
      {subtitle}
    </p>
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

/** Helper to generate and download ICS file */
export const downloadClosingInvite = (dateStr: string) => {
  // Rough parsing of "Monday, Feb 16 @ 10:00 AM"
  // Since we know it's 2026
  const summary = `Property Closing: ${REAL_PROPERTY_MOCK.address}`;
  const location = "5040 Pine Creek Drive, Westerville, OH 43081";
  const description = `Final closing for the property at ${REAL_PROPERTY_MOCK.address} with World Class Title.`;
  
  // Format dates for ICS (YYYYMMDDTHHMMSSZ)
  // For demo, we just use a fixed date structure since we know it's Feb 2026
  const isFeb16 = dateStr.includes('Feb 16');
  const isFeb17 = dateStr.includes('Feb 17');
  const day = isFeb16 ? '16' : isFeb17 ? '17' : '18';
  const hour = dateStr.includes('10:00') ? '10' : dateStr.includes('2:30') ? '14' : '11';
  const min = dateStr.includes('2:30') ? '30' : dateStr.includes('11:15') ? '15' : '00';

  const start = `202602${day}T${hour}${min}00Z`;
  const end = `202602${day}T${parseInt(hour)+1}${min}00Z`;

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${summary}`,
    `LOCATION:${location}`,
    `DESCRIPTION:${description}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'closing-invite.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const TransactionContent: React.FC<StepProps> = ({ 
  step, brand, level, onNext, onBack
}) => {
  const [bankVerified, setBankVerified] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showSmartOne, setShowSmartOne] = useState(false);
  const [newHomeAddress, setNewHomeAddress] = useState('');

  const handleFinalAcknowledge = () => {
    setShowSmartOne(true);
  };

  if (showSmartOne) {
    return (
      <div className="animate-in zoom-in-95 duration-700 text-center max-w-2xl mx-auto pb-20">
         <div className="inline-block p-10 rounded-full bg-emerald-50 text-emerald-500 mb-8 border-4 border-emerald-100">
            <svg className="h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h2 className="font-header text-4xl mb-4 text-[#004EA8]">Transaction Complete</h2>
          <p className="text-slate-600 text-lg mb-12">Proceeds have been successfully authorized for disbursement.</p>

          <div className="bg-white border-[3px] border-blue-600 rounded-[48px] p-10 text-left shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 bg-blue-600 text-white px-8 py-2 text-[10px] font-black uppercase tracking-widest">Smart ONE Exclusive</div>
             <h3 className="font-header text-2xl mb-4 text-slate-900">Moving into a new home?</h3>
             <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                Activate your **90-day complimentary Smart ONE trial** for your next property. We'll provide real-time ownership monitoring and identity protection from day one.
             </p>
             
             <div className="space-y-4 mb-8">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">New Property Address</label>
                <input 
                  type="text"
                  placeholder="Street Address, City, State, Zip"
                  value={newHomeAddress}
                  onChange={(e) => setNewHomeAddress(e.target.value)}
                  className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-600 outline-none transition-all font-bold text-slate-900 shadow-inner"
                />
             </div>

             <Button 
              label="Activate 90-Day Free Trial" 
              onClick={onNext} 
              primary 
              brand={brand} 
              className="w-full"
              disabled={!newHomeAddress} 
             />
             <p className="text-center mt-6 text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:text-slate-600 underline" onClick={onNext}>Skip this offer</p>
          </div>
      </div>
    );
  }

  switch (step) {
    case TransactionStep.STARTED:
      return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <StepHeader stepNum={1} title="Sale Initiated" subtitle={`Managing the transfer for ${REAL_PROPERTY_MOCK.address}.`} brand={brand} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 bg-slate-50 border border-slate-100 rounded-3xl shadow-sm">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Sale Price</p>
              <p className="font-black text-slate-900 text-2xl tracking-tighter">${REAL_PROPERTY_MOCK.salePrice.toLocaleString()}</p>
            </div>
            <div className="p-8 bg-blue-50 border border-blue-100 rounded-3xl shadow-sm">
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">Estimated Net proceeds</p>
              <p className="font-black text-[#004EA8] text-2xl tracking-tighter">${REAL_PROPERTY_MOCK.estimatedNet.toLocaleString()}</p>
            </div>
          </div>
          <WhatToExpect 
            level={level}
            estTime="5 Mins"
            simple="We've launched your transaction. Relax, we'll guide you through the essentials."
            standard="This starts your file. We're correlating your purchase contract with county tax records to prepare your closing package."
            thorough="Formal intake protocol initiated. We are correlating the Executed Purchase Contract with Parcel ID 2510-078-Woodb to establish vesting priority and digital chain of custody."
          />
          <NavActions onNext={onNext} onBack={onBack} brand={brand} showBack={false} nextLabel="Confirm & Continue" />
        </div>
      );

    case TransactionStep.IDENTITY:
      return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <StepHeader stepNum={2} title="Secure Identity Auth" subtitle="Encrypted identification to protect your asset transfer." brand={brand} />
          <div className="p-12 border-2 border-slate-100 bg-slate-50/50 rounded-[48px] text-center">
             <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center mx-auto mb-6 text-[#004EA8]">
                <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
             </div>
             <p className="text-slate-900 font-black text-xl mb-3 tracking-tighter uppercase">Ownership Shield Active</p>
             <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">Mandatory identity verification ensures only you can authorize this transfer.</p>
          </div>
          <WhatToExpect 
            level={level}
            estTime="2 Mins"
            simple="A quick ID scan to keep your property safe from fraud."
            standard="Multi-factor identity verification. We use biometric matching to ensure the true owner authorizes the closing documents."
            thorough="Advanced Cryptographic Identity Attestation. We perform real-time facial feature extraction and match against government biometric records to prevent identity theft and fraudulent conveyance."
          />
          <NavActions onNext={onNext} onBack={onBack} brand={brand} nextLabel="Begin Auth" />
        </div>
      );

    case TransactionStep.DOCUMENTATION:
      return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <StepHeader stepNum={3} title="Documentation" subtitle="Review and complete the legal instruments for your sale." brand={brand} />
          <div className="space-y-4">
            {[
              { name: 'Executed Purchase Contract', type: 'Review/Download' },
              { name: 'Title Commitment', type: 'Review/Download' },
              { name: 'Residential Property Disclosure', type: 'Complete' },
              { name: 'Seller Authorization', type: 'Complete' },
              { name: 'Mortgage Payoff', type: 'Complete' }
            ].map((doc, i) => (
              <div key={i} className="bg-white border border-slate-100 p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                  </div>
                  <p className="font-bold text-slate-900 text-sm">{doc.name}</p>
                </div>
                <div className="flex gap-2">
                  {doc.type === 'Review/Download' ? (
                    <>
                      <button className="px-4 py-2 bg-slate-50 text-[9px] font-black uppercase tracking-widest text-slate-600 rounded-lg border border-slate-200 hover:bg-slate-100">Review</button>
                      <button className="px-4 py-2 bg-slate-900 text-[9px] font-black uppercase tracking-widest text-white rounded-lg">Download</button>
                    </>
                  ) : (
                    <button className="px-6 py-2 bg-blue-600 text-[9px] font-black uppercase tracking-widest text-white rounded-lg shadow-lg shadow-blue-500/20">Complete</button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <WhatToExpect 
            level={level}
            estTime="10 Mins"
            simple="Review and sign your key documents. Most can be handled digitally with ease."
            standard="Legal review phase. You'll sign authorizations and disclosures to prepare the file for title transfer."
            thorough="Critical Instrument Review. Every document here forms the legal basis of your conveyance. Our system ensures all disclosures and mortgage figures comply with local statutes before execution."
          />
          <NavActions onNext={onNext} onBack={onBack} brand={brand} />
        </div>
      );

    case TransactionStep.TITLE_SEARCH:
      return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <StepHeader stepNum={4} title="Title Search" subtitle="Verifying property integrity and ownership chain." brand={brand} />
          
          <div className="bg-emerald-50 border-2 border-emerald-100 rounded-[40px] p-8 mb-8 text-center shadow-sm">
             <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/20">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
             </div>
             <h3 className="text-xl font-header text-emerald-900 mb-2">Title Search & Validation Complete</h3>
             <p className="text-sm text-emerald-700 font-bold max-w-sm mx-auto">Property ownership has been successfully verified through all court and county records.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
             {[
               { icon: '📜', label: 'Vesting Deed', value: '2021 Warranty Deed (Confirmed)' },
               { icon: '🏦', label: 'Exist. Mortgage', value: 'Chase Mortgage - $742k (Verified)' },
               { icon: '⚖️', label: 'Judgments', value: 'No Active Liens Found' }
             ].map((item, i) => (
               <div key={i} className="p-5 bg-white border border-slate-100 rounded-3xl shadow-sm">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{item.label}</p>
                  <p className="text-xs font-bold text-slate-900 mt-1">{item.value}</p>
               </div>
             ))}
          </div>

          <WhatToExpect 
            level={level}
            estTime="Instant"
            simple="We checked the records. Everything is clear and ready for your sale."
            standard="Our automated system scanned all public records to confirm a clean title and verified your existing mortgage status."
            thorough="Multi-Jurisdictional Search Complete. We have verified the chain of title back 40 years, audited the 2021 Warranty Deed, and performed name-based searches for state and federal judgments."
          />
          <NavActions onNext={onNext} onBack={onBack} brand={brand} />
        </div>
      );

    case TransactionStep.CURATIVE:
      return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <StepHeader stepNum={5} title="Curative" subtitle="Proactive resolution of any lingering title encumbrances." brand={brand} />
          <div className="bg-slate-50 border border-slate-100 rounded-[32px] p-8">
             <div className="flex items-start gap-4 p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
                <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </div>
                <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Cured Item Example</p>
                   <p className="text-sm font-bold text-slate-900 mb-1">Unreleased Mortgage (Bank of America, 2004)</p>
                   <p className="text-xs text-slate-500 leading-relaxed">We found an unfiled release from a legacy mortgage. Our team secured the formal release and it is recorded to ensure a perfect transfer.</p>
                </div>
             </div>
          </div>
          <WhatToExpect 
            level={level}
            estTime="Ongoing"
            simple="We're handling the messy details in the background so they don't slow you down."
            standard="If we find old liens or record errors, we fix them proactively. We've already cleared one legacy mortgage from 2004 for you."
            thorough="Active Encumbrance Resolution. We proactively identify and clear defects in the chain of title. Example: Secured a zero-balance release for a 2004 secondary lien that remained unrecorded at the county level."
          />
          <NavActions onNext={onNext} onBack={onBack} brand={brand} />
        </div>
      );

    case TransactionStep.SCHEDULING:
      return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <StepHeader stepNum={6} title="Scheduling" subtitle="Select your preferred time for your in-person closing." brand={brand} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="space-y-3">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">In-Person Slots (Default)</p>
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[8px] font-black uppercase rounded">Recommended</span>
                </div>
                {['Monday, Feb 16 @ 10:00 AM', 'Tuesday, Feb 17 @ 2:30 PM', 'Wednesday, Feb 18 @ 11:15 AM'].map((date) => (
                  <button 
                    key={date} 
                    onClick={() => setSelectedDate(date)}
                    className={`w-full p-6 rounded-2xl border-2 text-left transition-all ${selectedDate === date ? 'border-blue-600 bg-blue-50 shadow-lg' : 'border-slate-100 bg-white hover:border-blue-200'}`}
                  >
                    <p className="font-black text-slate-900 uppercase tracking-tight">{date}</p>
                    <p className="text-[10px] text-slate-400 font-bold mt-1">Ready for {REAL_PROPERTY_MOCK.closingDate}</p>
                  </button>
                ))}
                
                {selectedDate && (
                  <div className="mt-6 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-between animate-in zoom-in-95">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                      <p className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Slot Confirmed</p>
                    </div>
                    <button 
                      onClick={() => downloadClosingInvite(selectedDate)}
                      className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline"
                    >
                      Download Calendar Invite
                    </button>
                  </div>
                )}
             </div>
             <div className="bg-blue-50 border border-blue-100 rounded-[32px] p-8 flex flex-col justify-center text-center shadow-inner">
                <div className="w-12 h-12 bg-white text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <p className="text-sm font-black text-slate-900">Closing Location</p>
                <p className="text-[11px] text-slate-600 font-bold mt-2 mb-6">5040 Pine Creek Drive,<br/>Westerville, OH 43081</p>
                <div className="pt-6 border-t border-blue-100">
                  <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-3">Prefer Virtual?</p>
                  <button className="w-full px-6 py-2 bg-white border border-slate-200 text-[10px] font-black uppercase tracking-widest rounded-lg shadow-sm hover:border-blue-300">Switch to Virtual (RON)</button>
                </div>
             </div>
          </div>
          <WhatToExpect 
            level={level}
            estTime="1 Min"
            simple="Pick a time to come in and sign. We're located in Westerville for your convenience."
            standard="Choose your in-person closing slot at our Pine Creek Drive office. If you'd prefer to sign from home, virtual options are available."
            thorough="Logistical Session Selection. Coordinating the Notary Public and physical signing room at 5040 Pine Creek Dr. In-person sessions typically take 30 minutes."
          />
          <NavActions onNext={onNext} onBack={onBack} brand={brand} disabled={!selectedDate} />
        </div>
      );

    case TransactionStep.SETTLEMENT:
      return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
           <StepHeader stepNum={7} title="Settlement Review" subtitle="Detailed audit of your closing disclosure and funds." brand={brand} />
           <div className="bg-blue-50 border-2 border-blue-100 rounded-[40px] p-10 mb-8 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                 <div>
                    <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-4">Total Sale Credits</p>
                    <h3 className="text-4xl font-header tracking-tighter text-slate-900">$1,260,000.00</h3>
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Total Seller Debits</p>
                    <h3 className="text-4xl font-header tracking-tighter text-red-500">$791,950.00</h3>
                 </div>
              </div>
              <div className="mt-10 pt-10 border-t border-blue-100 flex flex-col sm:flex-row justify-between items-center gap-6">
                 <div className="text-center sm:text-left">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Final Net to Seller</p>
                    <p className="text-4xl font-black text-blue-600">$468,050.00</p>
                 </div>
                 <button className="px-8 py-3 bg-white border border-blue-200 text-blue-700 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-sm hover:bg-blue-50 transition-colors">Download Full CD</button>
              </div>
           </div>
           <WhatToExpect 
            level={level}
            estTime="5 Mins"
            simple="Check your final numbers and confirm the total money coming to you."
            standard="Formal Closing Disclosure (CD). Review credits for sale price and debits for mortgage payoff and closing fees."
            thorough="Comprehensive Financial Audit. Verification of the $99 Smart Seller Settlement Fee, statutory title insurance premiums, and mortgage per diem payoffs."
          />
          <NavActions onNext={onNext} onBack={onBack} brand={brand} />
        </div>
      );

    case TransactionStep.SUMMARY:
      return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl mx-auto pb-20">
          <StepHeader stepNum={8} title="Final Summary" subtitle="Verify disbursement and authorize the closing package." brand={brand} />
          
          <div className="bg-[#004EA8] p-10 rounded-[40px] text-white shadow-xl mb-10 text-center relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
             <p className="text-[#B9D9EB] text-[10px] font-black uppercase tracking-[0.4em] mb-4">Disbursement Target</p>
             <h3 className="font-header text-5xl mb-4 tracking-tighter">$468,050.00</h3>
             
             {bankVerified ? (
               <div className="bg-white/10 p-6 rounded-[32px] border border-white/20 animate-in zoom-in-95 duration-500">
                  <div className="flex items-center justify-center gap-3 text-[#64CCC9] mb-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                    <span className="font-black text-xs uppercase tracking-widest">Account Confirmed</span>
                  </div>
                  <p className="text-white font-bold text-sm">Chase Bank Checking (...4920)</p>
               </div>
             ) : (
               <span className="bg-white/10 text-white/60 px-4 py-1.5 rounded-full font-black text-[9px] uppercase tracking-widest">Awaiting Verification</span>
             )}
          </div>

          {!bankVerified && (
            <div className="mb-10 p-10 bg-white border-2 border-dashed border-[#A2B2C8] rounded-[48px] text-center shadow-sm">
                <p className="text-sm font-bold text-slate-600 mb-8">Connect your bank account to authorize federal wire disbursement of your proceeds.</p>
                <button 
                  onClick={() => setBankVerified(true)} 
                  className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl flex items-center gap-3 mx-auto transition-all hover:scale-105 active:scale-95"
                >
                  <span className="opacity-50 text-[10px]">VERIFY WITH</span>
                  <span className="text-lg font-bold">stripe</span>
                </button>
            </div>
          )}

          <WhatToExpect 
            level={level}
            estTime="3 Mins"
            simple="Review your final total and confirm your bank. We'll wire the funds immediately after closing."
            standard="Final authorization. Review your net proceeds and verify bank details via Stripe to ensure safe, encrypted delivery of your funds."
            thorough="Final Settlement & Disbursement Authorization. Funds are held in a secure escrow account and disbursed via federal wire protocol (Fedwire) once all RON instruments are digitally notarized."
          />

          <NavActions onNext={handleFinalAcknowledge} onBack={onBack} brand={brand} nextLabel="Acknowledge & Finalize" disabled={!bankVerified} />
        </div>
      );

    default:
      return null;
  }
};
