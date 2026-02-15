
export interface BrandConfig {
  logoName: string;
  primaryColor: string;
  accentColor: string;
  lightBlue: string;
  grayBlue: string;
  headerFont: string;
  bodyFont: string;
  contactEmail: string;
  legalName: string;
}

export enum TransactionStep {
  STARTED = 1,
  IDENTITY = 2,
  DOCUMENTS = 3,
  SEARCH = 4,
  CLEARING = 5,
  SCHEDULE = 6,
  SUMMARY = 7,
  CLOSED = 8
}

export type ExperienceLevel = 'simple' | 'standard' | 'thorough';
export type UserRole = 'seller' | 'agent';

export interface AgentInfo {
  name: string;
  brokerage: string;
  phone: string;
  email: string;
  image: string;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  reviewSource: 'Google' | 'Zillow';
}

export interface Document {
  id: string;
  name: string;
  status: 'In Review' | 'Action Needed' | 'Complete';
}

export interface TitleIssue {
  id: string;
  description: string;
  party: string;
  status: 'Pending' | 'Resolved';
}
