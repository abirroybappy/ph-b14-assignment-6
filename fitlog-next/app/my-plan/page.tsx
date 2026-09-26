'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useApp } from '@/components/AppProvider';
import PlanCard from '@/components/PlanCard';

type SortKey = 'duration' | 'calories' | 'rating';
type SortOption = { value: SortKey; label: string };

const SORT_OPTIONS: SortOption[] = [
  { value: 'duration', label: 'Duration' },
  { value: 'calories', label: 'Calories' },
  { value: 'rating', label: 'Rating' },
];

export default function MyPlan() {
  const { plan, saved, activeTab: tab, setActiveTab } = useApp();
  const [sortBy, setSortBy] = useState<SortKey>('duration');
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const active = tab === 'plan' ? plan : saved;
  const metrics = useMemo(
    () =>
      active.reduce(
        (a, w) => ({
          minutes: a.minutes + w.duration,
          calories: a.calories + w.caloriesBurned,
        }),
        { minutes: 0, calories: 0 },
      ),
    [active],
  );

  const sortedActive = useMemo(() => {
    return [...active].sort((a, b) => {
      if (sortBy === 'calories') return b.caloriesBurned - a.caloriesBurned;
      if (sortBy === 'rating') return b.rating - a.rating;
      return a.duration - b.duration;
    });
  }, [active, sortBy]);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setSortOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, []);

  const selectedSort = SORT_OPTIONS.find((option) => option.value === sortBy) ?? SORT_OPTIONS[0];

  const chooseSort = (value: SortKey) => {
    setSortBy(value);
    setSortOpen(false);
  };

  return (
    <main className="container-fit py-10">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="display text-5xl font-bold uppercase leading-none">My Plan</h1>
          <p className="mt-2 text-xs text-[#777d87]">Cap of five lifts for today. Finish them, then load more.</p>
        </div>
      </div>

      <div className="mt-7 grid gap-3 sm:grid-cols-3">
        {[
          ['Exercises', active.length],
          ['Minutes', metrics.minutes],
          ['Calories', metrics.calories],
        ].map(([label, value]) => (
          <div key={String(label)} className="card p-4">
            <p className="text-[9px] font-black uppercase tracking-wider text-[#777d87]">{label}</p>
            <p className="display mt-1 text-3xl font-bold">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex border-b border-[#282b31]">
          <button
            onClick={() => setActiveTab('plan')}
            className={`px-4 py-3 text-[10px] font-black uppercase ${
              tab === 'plan'
                ? 'border-b-2 border-[var(--accent)] text-[var(--accent)]'
                : 'text-[#777d87]'
            }`}
          >
            Today&apos;s Plan ({plan.length})
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-3 text-[10px] font-black uppercase ${
              tab === 'saved'
                ? 'border-b-2 border-[var(--accent)] text-[var(--accent)]'
                : 'text-[#777d87]'
            }`}
          >
            Saved ({saved.length})
          </button>
        </div>

        <div ref={sortRef} className="relative w-full sm:w-[410px]">
          <label className="mb-1 block text-sm font-semibold text-[#d7d9de]" htmlFor="sort-workouts">
            Sort By
          </label>
          <button
            id="sort-workouts"
            type="button"
            aria-haspopup="listbox"
            aria-expanded={sortOpen}
            onClick={() => setSortOpen((open) => !open)}
            className={`flex h-14 w-full items-center justify-between rounded-[18px] border bg-[#111318] px-4 text-left text-sm font-medium text-[#e7e8eb] shadow-[0_0_0_1px_rgba(255,255,255,0.08)] transition ${
              sortOpen ? 'border-[#aeb1b7]' : 'border-[#3c3f46] hover:border-[#656970]'
            }`}
          >
            <span>{selectedSort.label}</span>
            <ChevronDownIcon
              className={`h-4 w-4 transition-transform ${sortOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {sortOpen && (
            <div
              role="listbox"
              aria-label="Sort workouts"
              className="absolute right-0 top-[78px] z-30 w-full overflow-hidden rounded-[14px] border border-[#1d2026] bg-[#0e1014] p-2 shadow-[0_20px_45px_rgba(0,0,0,0.45)]"
            >
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={sortBy === option.value}
                  onClick={() => chooseSort(option.value)}
                  className={`flex w-full items-center gap-2 rounded-[12px] px-3 py-3 text-left text-sm transition ${
                    sortBy === option.value
                      ? 'text-white'
                      : 'text-[#d1d3d8] hover:bg-[#202329]'
                  }`}
                >
                  <span className="w-4 text-center text-base text-white">
                    {sortBy === option.value ? '✓' : ''}
                  </span>
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {sortedActive.length ? (
          sortedActive.map((w) => (
            <PlanCard key={w.id} workout={w} saved={tab === 'saved'} />
          ))
        ) : (
          <div className="card py-16 text-center">
            <h2 className="display text-2xl font-bold uppercase">Nothing here yet</h2>
            <p className="mt-2 text-xs text-[#777d87]">Browse the library and add a lift to get today moving.</p>
            <Link
              href="/#library"
              className="mt-5 inline-flex rounded-md bg-[var(--accent)] px-4 py-3 text-[10px] font-black uppercase text-black"
            >
              Go to workouts
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
