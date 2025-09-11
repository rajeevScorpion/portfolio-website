import { Project, Research, Academic } from '@/types';

// Function to fetch projects from API
export async function fetchProjects(): Promise<Project[]> {
  try {
    const response = await fetch('/api/projects');
    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

// Function to fetch research from API
export async function fetchResearch(): Promise<Research[]> {
  try {
    const response = await fetch('/api/research');
    if (!response.ok) {
      throw new Error('Failed to fetch research');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching research:', error);
    return [];
  }
}

// Function to fetch academics from API
export async function fetchAcademics(): Promise<Academic[]> {
  try {
    const response = await fetch('/api/academics');
    if (!response.ok) {
      throw new Error('Failed to fetch academics');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching academics:', error);
    return [];
  }
}