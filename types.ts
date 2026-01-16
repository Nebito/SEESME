
export enum PublicationType {
  JOURNAL = 'Journal Article',
  TECHNICAL_REPORT = 'Technical Report',
  CONFERENCE = 'Conference Proceeding',
  MAP = 'Geological Map'
}

export enum UserRole {
  ADMIN = 'Admin',
  EDITOR = 'Editor',
  MEMBER = 'Member',
  GUEST = 'Guest'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  joinedDate: string;
  lastLogin: string;
}

export interface SEOMetadata {
  page: string;
  title: string;
  description: string;
  keywords: string;
}

export interface Publication {
  id: string;
  title: string;
  author: string;
  date: string;
  abstract: string;
  keywords: string[];
  type: PublicationType;
  doi?: string;
  url: string;
  downloads: number;
}

export interface NewsItem {
  id: string;
  title: string;
  category: 'Event' | 'Achievement' | 'Update';
  date: string;
  excerpt: string;
  content: string;
  imageUrl: string;
}

export interface CareerOpportunity {
  id: string;
  title: string;
  type: 'Call for Papers' | 'Scholarship' | 'Internship' | 'Fellowship' | 'Training';
  deadline: string;
  eligibility: string;
  description: string;
  provider: string;
}

export interface Resource {
  id: string;
  title: string;
  format: 'PDF' | 'Video' | 'Slides' | 'Infographic';
  language: 'English' | 'Tigrigna';
  description: string;
  thumbnailUrl: string;
}
