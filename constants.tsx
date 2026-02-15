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