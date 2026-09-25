'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ClipboardDocumentListIcon, BookmarkIcon } from '@heroicons/react/24/outline';
import { useApp } from './AppProvider';

export default function Navbar(){
  const path=usePathname();
  const {plan,saved,activeTab,setActiveTab}=useApp();
  const onPlanPage=path==='/my-plan';
  const planActive=onPlanPage && activeTab==='plan';
  const savedActive=onPlanPage && activeTab==='saved';

  return <header className="sticky top-0 z-40 border-b border-[#1e2025] bg-[#090a0c]/95 backdrop-blur">
    <div className="container-fit flex h-16 items-center justify-between gap-4">
      <Link href="/" className="flex shrink-0 items-center gap-2.5">
        <Image src="/assets/fitlog-logo.png" alt="FITLOG logo" width={28} height={28} className="h-7 w-7 object-contain" priority />
        <span className="text-[18px] font-extrabold tracking-[-.03em]">FITLOG</span>
      </Link>

      <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 sm:flex">
        <Link href="/" className={`rounded-full px-4 py-2 text-xs font-bold uppercase ${path==='/'?'bg-[#293400] text-[var(--accent)]':'text-[#9b9fa7] hover:text-white'}`}>Workouts</Link>
        <Link href="/my-plan" className={`rounded-full px-4 py-2 text-xs font-bold uppercase ${onPlanPage?'bg-[#293400] text-[var(--accent)]':'text-[#9b9fa7] hover:text-white'}`}>My Plan</Link>
      </nav>

      <div className="flex items-center gap-2">
        <Link href="/my-plan" onClick={()=>setActiveTab('plan')} aria-current={planActive?'page':undefined}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-extrabold uppercase transition ${planActive?'bg-[var(--accent)] text-black':'border border-[#444851] text-white hover:border-[#737780]'}`}>
          <ClipboardDocumentListIcon className="h-3.5 w-3.5"/>Plan <span>{plan.length}</span>
        </Link>
        <Link href="/my-plan" onClick={()=>setActiveTab('saved')} aria-current={savedActive?'page':undefined}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-extrabold uppercase transition ${savedActive?'bg-[var(--accent)] text-black':'border border-[#444851] text-white hover:border-[#737780]'}`}>
          <BookmarkIcon className="h-3.5 w-3.5"/>Saved <span>{saved.length}</span>
        </Link>
      </div>
    </div>

    <div className="container-fit flex gap-1 pb-2 sm:hidden">
      <Link href="/" className={`flex-1 rounded-md px-3 py-2 text-center text-[10px] font-bold uppercase ${path==='/'?'bg-[#293400] text-[var(--accent)]':'bg-[#121419]'}`}>Workouts</Link>
      <Link href="/my-plan" className={`flex-1 rounded-md px-3 py-2 text-center text-[10px] font-bold uppercase ${onPlanPage?'bg-[#293400] text-[var(--accent)]':'bg-[#121419]'}`}>My Plan</Link>
    </div>
  </header>;
}
