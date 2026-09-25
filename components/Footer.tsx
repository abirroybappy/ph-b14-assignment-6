import Image from 'next/image';
import Link from 'next/link';
export default function Footer(){return <footer className="mt-20 border-t border-[#1d2025] bg-[#08090b]"><div className="container-fit flex min-h-16 items-center justify-between gap-4 py-5 text-[10px] text-[#777c86]"><div className="flex items-center gap-2 font-bold"><span className="grid h-4 w-4 place-items-center rounded-[3px]  text-[9px] font-black text-black"><Link href="/" className="flex shrink-0 items-center gap-2.5">
        <Image src="/assets/fitlog-logo.png" alt="FITLOG logo" width={28} height={28} className="h-4 w-4 object-contain" priority />
        <span className="text-[18px] font-extrabold tracking-[-.03em]"></span>
      </Link></span>FITLOG</div><div>© 2026 FitLog — Workout Library. Train hard, log honest</div></div></footer>}
