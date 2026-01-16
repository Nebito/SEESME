
import { Publication, NewsItem, CareerOpportunity, Resource, User, UserRole, SEOMetadata } from '../types';

const API_BASE_URL = '/api';

export const apiService = {
  // Publications
  async getPublications(): Promise<Publication[]> {
    const res = await fetch(`${API_BASE_URL}/publications`);
    return res.json();
  },
  async createPublication(pub: Omit<Publication, 'id' | 'downloads'>): Promise<Publication> {
    const res = await fetch(`${API_BASE_URL}/publications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...pub, downloads: 0 }),
    });
    return res.json();
  },
  async trackDownload(pubId: string): Promise<void> {
    await fetch(`${API_BASE_URL}/publications/${pubId}/download`, {
      method: 'POST',
    });
  },

  // Users & Permissions
  async getUsers(): Promise<User[]> {
    const res = await fetch(`${API_BASE_URL}/users`);
    return res.json();
  },
  async updateUserRole(userId: string, role: UserRole): Promise<void> {
    await fetch(`${API_BASE_URL}/users/${userId}/role`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role }),
    });
  },

  // SEO
  async getSEOSettings(): Promise<SEOMetadata[]> {
    const res = await fetch(`${API_BASE_URL}/seo`);
    return res.json();
  },
  async updateSEOSetting(page: string, data: Partial<SEOMetadata>): Promise<void> {
    await fetch(`${API_BASE_URL}/seo/${page}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  },

  // News
  async getNews(): Promise<NewsItem[]> {
    const res = await fetch(`${API_BASE_URL}/news`);
    return res.json();
  },
  async createNews(news: Omit<NewsItem, 'id'>): Promise<NewsItem> {
    const res = await fetch(`${API_BASE_URL}/news`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(news),
    });
    return res.json();
  },

  // Careers
  async getCareers(): Promise<CareerOpportunity[]> {
    const res = await fetch(`${API_BASE_URL}/careers`);
    return res.json();
  }
};
