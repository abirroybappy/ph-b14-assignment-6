'use client';
import Link from 'next/link';
import Image from 'next/image';
import { ClockIcon, FireIcon, StarIcon } from '@heroicons/react/24/outline';
import { Workout } from '@/lib/types';
export default function WorkoutCard({workout}:{workout:Workout}){return <Link href={`/workouts/${workout.id}`} className="card group block overflow-hidden transition hover:-translate-y-1 hover:border-[#4a4f58]">
 <div className="relative aspect-[1.85/1] overflow-hidden bg-[#20232a]"><Image src={workout.image} alt={workout.name} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" unoptimized/></div>
 <div className="p-4"><div className="mb-2 flex flex-wrap gap-1.5">{workout.muscleGroups.slice(0,2).map(g=><span key={g} className="rounded-full bg-[var(--accent)] px-2 py-0.5 text-[8px] font-black uppercase text-black">{g}</span>)}</div><h3 className="display text-lg font-bold uppercase leading-none">{workout.name}</h3><p className="mt-1 text-[10px] text-[#888e98]">{workout.equipment}</p><div className="mt-4 flex items-center justify-between text-[9px] text-[#a0a5ad]"><span className="inline-flex items-center gap-1"><ClockIcon className="h-3.5 w-3.5"/>{workout.duration} min</span><span className="inline-flex items-center gap-1"><FireIcon className="h-3.5 w-3.5"/>{workout.caloriesBurned} kcal</span><span className="inline-flex items-center gap-1"><StarIcon className="h-3.5 w-3.5"/>{workout.rating}</span></div></div></Link>}
