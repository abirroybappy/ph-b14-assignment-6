import { Suspense } from 'react';
import Hero from '@/components/Hero';
import WorkoutGrid from '@/components/WorkoutGrid';
import LoadingGrid from '@/components/LoadingGrid';
import { getWorkouts } from '@/lib/api';

async function Library(){const workouts=await getWorkouts();return <WorkoutGrid workouts={workouts}/>}
export default function Home(){return <main><Hero/><section id="library" className="container-fit mt-12"><div className="mb-6"><h2 className="display text-3xl font-bold uppercase leading-none">The Library</h2><p className="mt-2 text-xs text-[#777d87]">Twelve lifts covering every major muscle group.</p></div><Suspense fallback={<LoadingGrid/>}><Library/></Suspense></section></main>}
