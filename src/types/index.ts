// Shared types for API integration

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  imageUrl: string;
  repositoryUrl?: string;
  liveDemoUrl?: string;
  technologies: string[];
  createdAt: string;
  updatedAt: string;
  // Optional fields for compatibility
  featured?: boolean;
  status?: "completed" | "in-progress" | "planned";
  githubStats?: {
    stars?: number;
    forks?: number;
    lastUpdated?: string;
  };
}

export interface Skill {
  id: string;
  name: string;
  description?: string;
  category: 'Languages' | 'Frameworks' | 'Databases' | 'DevOps' | 'Tools' | 'Other';
  icon?: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  image?: string;
  description?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Experience {
  id: string;
  companyName: string;
  position: string;
  description: string;
  startDate: string;
  endDate?: string;
  isCurrentlyWorkingHere: boolean;
  location?: string;
  technologies: string[];
  highlights: string[];
}
