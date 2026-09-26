import { Workout } from './types';

export const API_URL = 'https://api.api-store.workers.dev/api/fitlog';

export async function getWorkouts(): Promise<Workout[]> {
  const res = await fetch(API_URL, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch workouts');
  return res.json();
}

export async function getWorkout(id: string): Promise<Workout | undefined> {
  const res = await fetch(`${API_URL}/${id}`, { next: { revalidate: 60 } });
  if (res.status === 404) return undefined;
  if (!res.ok) throw new Error('Failed to fetch workout');
  return res.json();
}
