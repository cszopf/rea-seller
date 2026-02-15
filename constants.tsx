
import { BrandConfig, AgentInfo } from './types';

export const WCT_BRAND: BrandConfig = {
  logoName: 'WORLD CLASS TITLE',
  primaryColor: '#004EA8',
  accentColor: '#64CCC9',
  lightBlue: '#B9D9EB',
  grayBlue: '#A2B2C8',
  headerFont: 'Nunito Sans',
  bodyFont: 'Nunito Sans',
  contactEmail: 'closings@worldclasstitle.com',
  legalName: 'World Class Title, LLC'
};

export const PARTNER_BRAND: BrandConfig = {
  logoName: 'PREMIER SETTLEMENT',
  primaryColor: '#2D3748',
  accentColor: '#F56565',
  lightBlue: '#E2E8F0',
  grayBlue: '#A0AEC0',
  headerFont: 'Nunito Sans',
  bodyFont: 'Nunito Sans',
  contactEmail: 'help@premiertitle.com',
  legalName: 'Premier Settlement Services'
};

export const MOCK_AGENT: AgentInfo = {
  name: 'Brad Winter',
  brokerage: 'Engel & Völkers',
  phone: '(614) 555-9876',
  email: 'brad.winter@evrealestate.com',
  image: 'https://lh3.googleusercontent.com/p/AF1QipOkrIorXdmXPyQ6FPPlkcHK2asf8FL5hNuYw-hy=s1360-w1360-h1020-rw',
  rating: 4.98,
  reviewCount: 215,
  isVerified: true,
  reviewSource: 'Google'
};

export const REAL_PROPERTY_MOCK = {
  address: "5175 WOODBRIDGE AVENUE",
  cityStateZip: "POWELL, OH 43065",
  parcelId: "2510-078-Woodb",
  salePrice: 1260000,
  mortgagePayoff: 742000,
  estimatedNet: 468000,
  buyerName: "DOUGLAS & CARA O'CONNOR",
  sellerName: "PATRICK T. O'LAUGHLIN, TRUSTEE",
  lender: "LOWER, LLC",
  closingDate: "11/18/2025"
};

export const AGENT_TRANSPARENCY_MOCK = {
  escrowOfficer: {
    name: "Sarah Montgomery",
    email: "s.montgomery@worldclasstitle.com",
    phone: "(614) 221-5000"
  },
  milestones: [
    { label: 'Seller Identity Verified', status: 'Complete', time: 'Nov 02, 10:12 AM' },
    { label: 'Seller Disclosures Completed', status: 'Complete', time: 'Nov 02, 11:30 AM' },
    { label: 'Title Search Ordered', status: 'Complete', time: 'Nov 02, 2:00 PM' },
    { label: 'Title Commitment Issued', status: 'Complete', time: 'Nov 12, 10:30 AM' },
    { label: 'Curative Items Resolved', status: 'Complete', time: 'Nov 14, 4:15 PM' },
    { label: 'Payoff Requested', status: 'Complete', time: 'Nov 14, 4:20 PM' },
    { label: 'Payoff Received', status: 'Complete', time: 'Nov 15, 9:00 AM' },
    { label: 'Closing Scheduled', status: 'Complete', time: 'Nov 15, 1:00 PM' },
    { label: 'Signing Ready', status: 'Complete', time: 'Nov 17, 11:00 AM' },
    { label: 'Closing Complete', status: 'Complete', time: 'Nov 18, 11:20 AM' },
    { label: 'Proceeds Scheduled', status: 'Complete', time: 'Nov 18, 11:45 AM' },
    { label: 'Proceeds Disbursed', status: 'Complete', time: 'Nov 18, 1:45 PM' }
  ],
  activityFeed: [
    { event: "Proceeds disbursed via Federal Wire #WCT-0492", time: "Today, 1:45 PM" },
    { event: "Deed of Record #2025-0000492 confirmed by County", time: "Today, 11:20 AM" },
    { event: "Escrow funds balanced and verified", time: "Today, 10:15 AM" },
    { event: "Signing executed by seller", time: "Today, 9:00 AM" },
    { event: "Final Closing Disclosure approved by lender", time: "Yesterday, 3:45 PM" },
    { event: "Title cleared for transfer", time: "Nov 16, 4:15 PM" }
  ]
};
