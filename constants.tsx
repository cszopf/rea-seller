
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
  primaryColor: '#1E293B',
  accentColor: '#F43F5E',
  lightBlue: '#F8FAFC',
  grayBlue: '#64748B',
  headerFont: 'Nunito Sans',
  bodyFont: 'Nunito Sans',
  contactEmail: 'help@premiertitle.com',
  legalName: 'Premier Settlement Services'
};

export const MOCK_AGENT: AgentInfo = {
  name: 'Alex Sterling',
  brokerage: 'Premier Realty Group',
  phone: '(555) 123-4567',
  email: 'alex.sterling@premierrealty.com',
  image: 'https://lh7-rt.googleusercontent.com/docsz/AD_4nXfMigqui5ndpdKN3S6sxojKlE8injrtXtcA5wk_Uv_lEWK3UhqOFbWhsA9urfjEUkS4Nbr81QuQfvtYoCYLKiZUmWb2nm1HGiJejddQC2f0yOr5Z46SG56A_BHUOA19hKY1QGZtroaJxOpjcMlLY5A84P9hZc8?key=kl0MF71HcvaAWt9zvK_MLQ',
  rating: 4.99,
  reviewCount: 482,
  isVerified: true,
  reviewSource: 'Google'
};

export const REAL_PROPERTY_MOCK = {
  address: "1234 HIGH STREET",
  cityStateZip: "COLUMBUS, OH 43215",
  parcelId: "010-123456-00",
  salePrice: 450000,
  mortgagePayoff: 285000,
  estimatedNet: 165000,
  buyerName: "ROBERT SMITH",
  sellerName: "JOHN & JANE DOE",
  lender: "OHIO FIRST BANK",
  closingDate: "03/15/2026",
  contractDate: "Feb 12, 2025"
};
