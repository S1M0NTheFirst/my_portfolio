import { Experience, Publication, Project } from '@/types/api';

// Use NEXT_PUBLIC_API_URL if provided (for separate backend), otherwise default to relative /api for unified Vercel deployment
const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export async function getExperience(): Promise<Experience[]> {
  try {
    const res = await fetch(`${API_URL}/api/experience`, { next: { revalidate: 60 } });
    if (!res.ok) {
      throw new Error('Failed to fetch experience data');
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching experience:', error);
    return [];
  }
}

export async function getPublications(): Promise<Publication[]> {
  try {
    const res = await fetch(`${API_URL}/api/publications`, { next: { revalidate: 60 } });
    if (!res.ok) {
      throw new Error('Failed to fetch publications data');
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching publications:', error);
    return [];
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`${API_URL}/api/projects`, { next: { revalidate: 60 } });
    if (!res.ok) {
      throw new Error('Failed to fetch projects data');
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}
