'use client';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { PlanItem, Workout } from '@/lib/types';

type PlanTab = 'plan' | 'saved';
type Toast = { id:number; message:string };
type Ctx = {
  plan:PlanItem[];
  saved:Workout[];
  activeTab:PlanTab;
  setActiveTab:(tab:PlanTab)=>void;
  addToPlan:(w:Workout)=>void;
  saveForLater:(w:Workout)=>void;
  removeFromPlan:(id:number)=>void;
  removeSaved:(id:number)=>void;
  markDone:(id:number)=>void;
  toast:(message:string)=>void;
};
const Context=createContext<Ctx|null>(null);
const PLAN_KEY='fitlog-plan'; const SAVED_KEY='fitlog-saved'; const TAB_KEY='fitlog-active-tab';

export function AppProvider({children}:{children:React.ReactNode}){
  const [plan,setPlan]=useState<PlanItem[]>([]);
  const [saved,setSaved]=useState<Workout[]>([]);
  const [activeTab,setActiveTabState]=useState<PlanTab>('plan');
  const [toasts,setToasts]=useState<Toast[]>([]);

  useEffect(()=>{
    try{
      setPlan(JSON.parse(localStorage.getItem(PLAN_KEY)||'[]'));
      setSaved(JSON.parse(localStorage.getItem(SAVED_KEY)||'[]'));
      const storedTab=localStorage.getItem(TAB_KEY);
      if(storedTab==='saved' || storedTab==='plan') setActiveTabState(storedTab);
    }catch{}
  },[]);

  useEffect(()=>{localStorage.setItem(PLAN_KEY,JSON.stringify(plan));},[plan]);
  useEffect(()=>{localStorage.setItem(SAVED_KEY,JSON.stringify(saved));},[saved]);

  const setActiveTab=(tab:PlanTab)=>{
    setActiveTabState(tab);
    try{localStorage.setItem(TAB_KEY,tab);}catch{}
  };

  const toast=(message:string)=>{
    const id=Date.now()+Math.random();
    setToasts(t=>[...t,{id,message}]);
    setTimeout(()=>setToasts(t=>t.filter(x=>x.id!==id)),2500);
  };
  const addToPlan=(w:Workout)=>{
    if(plan.length>=5){toast('Today’s plan is full (5 lifts).');return;}
    if(plan.some(x=>x.id===w.id)){toast('Already in today’s plan.');return;}
    setPlan(p=>[...p,{...w,done:false}]);
    toast('Added to today’s plan');
  };
  const saveForLater=(w:Workout)=>{
    if(saved.some(x=>x.id===w.id)){toast('Already saved for later.');return;}
    setSaved(s=>[...s,w]);
    toast('Saved for later');
  };
  const removeFromPlan=(id:number)=>{setPlan(p=>p.filter(x=>x.id!==id));toast('Removed from today’s plan');};
  const removeSaved=(id:number)=>{setSaved(s=>s.filter(x=>x.id!==id));toast('Removed from saved');};
  const markDone=(id:number)=>{setPlan(p=>p.map(x=>x.id===id?{...x,done:true}:x));toast('Workout marked as done');};

  const value=useMemo(()=>({activeTab, setActiveTab, plan,saved,addToPlan,saveForLater,removeFromPlan,removeSaved,markDone,toast}),[activeTab,plan,saved]);
  return <Context.Provider value={value}>{children}<div className="fixed right-4 top-20 z-50 flex w-[min(360px,calc(100%-32px))] flex-col gap-2">{toasts.map(t=><div key={t.id} className="rounded-lg border border-[#3a3d45] bg-[#17191e] px-4 py-3 text-sm font-semibold shadow-2xl">{t.message}</div>)}</div></Context.Provider>;
}
export function useApp(){const c=useContext(Context);if(!c)throw new Error('useApp must be used inside AppProvider');return c;}
