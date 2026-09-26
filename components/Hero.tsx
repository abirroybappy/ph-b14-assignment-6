import Image from 'next/image';
import Link from 'next/link';
import { ArrowDownIcon } from '@heroicons/react/24/outline';

export default function Hero(){
  return <section className="container-fit pt-8 sm:pt-10">
    <div className="noise relative min-h-[390px] overflow-hidden rounded-2xl border border-[#252c34] bg-[#151a20] px-6 py-10 sm:min-h-[500px] sm:px-10 sm:py-14 lg:min-h-[530px] lg:px-12">
      <div className="relative z-10 flex max-w-[650px] flex-col justify-center lg:min-h-[430px]">
        <p className="mb-4 text-[10px] font-black uppercase tracking-[.16em] text-[var(--accent)]">Workout Library</p>
        <h1 className="display max-w-[700px] text-4xl font-bold uppercase leading-[.94] sm:text-6xl lg:text-[64px]">Train with intent. Log every set.</h1>
        <p className="mt-6 max-w-[570px] text-sm leading-6 text-[#aeb4bd] sm:text-base">FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week &apos;s work add up.</p>
        <Link href="#library" className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3.5 text-[12px] font-black uppercase tracking-wide text-black transition hover:brightness-95">
          <span className="text-base leading-none"></span> Browse Workouts <ArrowDownIcon className="h-4 w-4"/>
        </Link>
      </div>

      <div className="pointer-events-none absolute bottom-0 right-0 hidden h-[390px] w-[390px] sm:h-[440px] sm:w-[440px] md:block lg:h-[470px] lg:w-[470px]">
        <Image src="/assets/fitlog-hero.png" alt="Anatomical fitness figure using a gym machine" fill priority sizes="(max-width: 1024px) 440px, 470px" className="object-contain object-bottom" />
      </div>
    </div>
  </section>
}
