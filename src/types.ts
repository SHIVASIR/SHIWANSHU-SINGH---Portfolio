/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Education {
  id: string;
  institution: string;
  degree: string;
  location: string;
  duration: string;
  description?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  duration: string;
  points: string[];
  skills: string[];
}

export interface CaseStudy {
  problemStatement: string;
  techStackDetailed: { name: string; role: string }[];
  challengesFaced: string[];
  resultsAndImpact: string[];
  architecturalHighlights?: string[];
  metrics?: { label: string; value: string }[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  points: string[];
  techStack: string[];
  category: 'ml' | 'cloud' | 'fullstack' | 'data-science';
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  caseStudy?: CaseStudy;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: { name: string; proficiency: number; level: string }[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  link?: string;
}

export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  description: string;
  date: string;
  highlight?: boolean;
}

export interface Article {
  id: string;
  title: string;
  description: string;
  publishDate: string;
  readTime: string;
  category: string;
  tags: string[];
  externalUrl: string;
  platform: 'Medium' | 'Dev.to' | 'Hashnode' | 'LinkedIn' | 'Technical Article';
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  designation: string;
  organization: string;
  relationship: string;
  initials: string;
  rating?: number;
  highlightBadge?: string;
  date?: string;
}

export interface CodingProfile {
  leetcode: {
    solved: number;
    total: number;
    easy: number;
    medium: number;
    hard: number;
    ranking: string;
    contestRating: number;
    streak: number;
    profileUrl: string;
  };
  github: {
    contributionsThisYear: number;
    longestStreak: number;
    topLanguages: { name: string; percentage: number; color: string }[];
    stars: number;
    profileUrl: string;
  };
}
