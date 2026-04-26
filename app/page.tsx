"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Heart,
  Camera,
  UtensilsCrossed,
  Palette,
  Snowflake,
  Moon,
  Coffee,
  Flame,
  Waves,
  Mountain,
  ChevronDown,
  X,
  Sparkles,
  CalendarDays,
  Pencil,
  Aperture,
  MapPin,
} from "lucide-react";

const memories = [
  { id: 1,  src: "/images/photo1.jpg",  caption: "스키장 리프트에서",   rotate: "-2deg"   },
  { id: 2,  src: "/images/photo2.jpg",  caption: "눈 속 커플 셀카",     rotate: "1.5deg"  },
  { id: 3,  src: "/images/photo3.jpg",  caption: "눈밭에서 신남",       rotate: "-1deg"   },
  { id: 4,  src: "/images/photo4.jpg",  caption: "함박눈 속 거울 셀카", rotate: "2deg"    },
  { id: 5,  src: "/images/photo5.jpg",  caption: "공연장 거울 셀카",    rotate: "-1.5deg" },
  { id: 6,  src: "/images/photo6.jpg",  caption: "빨간 선글라스",       rotate: "1deg"    },
  { id: 7,  src: "/images/photo7.jpg",  caption: "카페에서 디저트",     rotate: "-2.5deg" },
  { id: 8,  src: "/images/photo8.jpg",  caption: "조개껍데기 거울",     rotate: "1.5deg"  },
  { id: 9,  src: "/images/photo9.jpg",  caption: "온천 수영장에서",     rotate: "-1deg"   },
  { id: 10, src: "/images/photo10.jpg", caption: "블루 미러룸",         rotate: "2deg"    },
  { id: 11, src: "/images/photo11.jpg", caption: "야경 산책",           rotate: "-1.5deg" },
  { id: 12, src: "/images/photo12.jpg", caption: "한국식 BBQ",          rotate: "1deg"    },
  { id: 13, src: "/images/photo13.jpg", caption: "서점 카페에서",       rotate: "-2deg"   },
  { id: 14, src: "/images/photo14.jpg", caption: "독특한 아트 전시",    rotate: "1.5deg"  },
  { id: 15, src: "/images/photo15.jpg", caption: "Chapter #3 전시",     rotate: "-1deg"   },
  { id: 16, src: "/images/photo16.jpg", caption: "드로잉 스튜디오",     rotate: "2.5deg"  },
  { id: 17, src: "/images/photo17.jpg", caption: "인체 드로잉 클래스",  rotate: "-1.5deg" },
  { id: 18, src: "/images/photo18.jpg", caption: "볼록거울 커플 셀카",  rotate: "1deg"    },
  { id: 19, src: "/images/photo19.jpg", caption: "전시 거울에서 또",    rotate: "-2deg"   },
  { id: 20, src: "/images/photo20.jpg", caption: "XYMB 쇼핑 셀카",     rotate: "1.5deg"  },
  { id: 21, src: "/images/photo21.jpg", caption: "함께한 맛있는 라멘",  rotate: "-1deg"   },
];

function Counter() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const timer = setInterval(() => {
      start += 200 / (2000 / 16);
      if (start >= 200) { setCount(200); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, []);
  return <span>{count}</span>;
}

function PhotoCard({
  memory, index, onOpen,
}: {
  memory: typeof memories[0];
  index: number;
  onOpen: (src: string, caption: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTimeout(() => setVisible(true), index * 50); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.6s ease ${index * 0.04}s, transform 0.6s ease ${index * 0.04}s`,
      }}
    >
      <div
        className="polaroid cursor-pointer"
        style={{ transform: `rotate(${memory.rotate})` }}
        onClick={() => onOpen(memory.src, memory.caption)}
      >
        <div className="relative w-full aspect-square overflow-hidden bg-stone-100">
          {!imgError ? (
            <Image
              src={memory.src}
              alt={memory.caption}
              fill
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
              className="object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-stone-200">
              <Camera size={32} strokeWidth={1} />
            </div>
          )}
        </div>
        <div className="pt-2 pb-0 text-center">
          <p className="text-[11px] text-stone-400 tracking-wide uppercase px-1 leading-tight font-medium">
            {memory.caption}
          </p>
        </div>
      </div>
    </div>
  );
}

function Modal({ src, caption, onClose }: { src: string; caption: string; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(10,10,10,0.9)" }}
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl w-full bg-white rounded-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full" style={{ aspectRatio: "4/5" }}>
          <Image src={src} alt={caption} fill className="object-contain" sizes="100vw" />
        </div>
        <div className="px-6 py-4 border-t border-stone-100 flex items-center justify-between">
          <p className="text-stone-500 text-sm tracking-widest uppercase">{caption}</p>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-700 transition-colors">
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}

// Inline SVG icon for the hero floating element
function HeartIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
      className="text-rose-300">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [modal, setModal] = useState<{ src: string; caption: string } | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(160deg, #fdf8f5 0%, #fdf2f8 60%, #fdf8f5 100%)" }}>
      {modal && <Modal src={modal.src} caption={modal.caption} onClose={() => setModal(null)} />}

      {/* Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(253,248,245,0.9)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(0,0,0,0.04)" : "none",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Heart size={14} strokeWidth={1.5} className="text-rose-400" />
            <span className="text-stone-600 text-sm tracking-widest uppercase font-medium">200 Days</span>
          </div>
          <div className="flex gap-8 text-xs text-stone-400 tracking-widest uppercase">
            <a href="#memories" className="hover:text-stone-700 transition-colors">추억</a>
            <a href="#gallery" className="hover:text-stone-700 transition-colors">갤러리</a>
            <a href="#letter" className="hover:text-stone-700 transition-colors">편지</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
        <div className="absolute top-24 left-12 w-40 h-40 rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, #fca5a5 0%, transparent 70%)" }} />
        <div className="absolute bottom-24 right-12 w-56 h-56 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #f9a8d4 0%, transparent 70%)" }} />

        <div className="animate-float mb-8">
          <HeartIcon />
        </div>

        <h1 className="text-[9rem] md:text-[14rem] font-black mb-2 leading-none tracking-tighter">
          <span className="shimmer-text"><Counter /></span>
          <span className="shimmer-text">일</span>
        </h1>

        <p className="text-sm md:text-base font-light text-stone-400 mb-2 tracking-[0.4em] uppercase">
          Days Together
        </p>

        <div className="w-12 h-px bg-rose-200 mx-auto my-8" />

        <p className="text-base md:text-lg text-stone-500 max-w-sm leading-loose">
          처음 만난 그날부터 오늘까지,<br />
          <span className="text-rose-400 font-semibold">200번의 하루</span>를 함께했어
        </p>

        {/* Hip icon row */}
        <div className="mt-14 flex items-center gap-6">
          {[
            { Icon: UtensilsCrossed, delay: "0.1s" },
            { Icon: Palette,         delay: "0.2s" },
            { Icon: Mountain,        delay: "0.3s" },
            { Icon: Moon,            delay: "0.4s" },
            { Icon: Coffee,          delay: "0.5s" },
          ].map(({ Icon, delay }, i) => (
            <div key={i} className="animate-fade-in text-stone-300" style={{ animationDelay: delay }}>
              <Icon size={20} strokeWidth={1} />
            </div>
          ))}
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-stone-300">
          <ChevronDown size={22} strokeWidth={1} />
        </div>
      </section>

      {/* Stats */}
      <section id="memories" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-px bg-stone-300" />
              <Sparkles size={14} strokeWidth={1.5} className="text-rose-300" />
              <div className="w-8 h-px bg-stone-300" />
            </div>
            <h2 className="text-2xl font-bold text-stone-700 tracking-tight">우리가 함께한 것들</h2>
            <p className="text-stone-400 mt-2 text-sm tracking-wide">200일 동안 쌓아온 소중한 추억들</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { Icon: UtensilsCrossed, label: "함께한 식사", count: "50+" },
              { Icon: Palette,         label: "전시 & 문화",  count: "10+" },
              { Icon: Camera,          label: "추억 사진",   count: "1000+" },
              { Icon: MapPin,          label: "특별한 여행", count: "5+" },
            ].map(({ Icon, label, count }) => (
              <div
                key={label}
                className="text-center p-7 rounded-2xl group hover:scale-[1.02] transition-transform duration-300"
                style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)", boxShadow: "0 2px 20px rgba(0,0,0,0.05)" }}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(251,113,133,0.08)" }}>
                    <Icon size={18} strokeWidth={1.5} className="text-rose-400" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-stone-700 tracking-tight">{count}</div>
                <div className="text-xs text-stone-400 mt-1 tracking-wide">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-px bg-stone-300" />
              <Aperture size={14} strokeWidth={1.5} className="text-rose-300" />
              <div className="w-8 h-px bg-stone-300" />
            </div>
            <h2 className="text-2xl font-bold text-stone-700 tracking-tight">우리의 순간들</h2>
            <p className="text-stone-400 mt-2 text-sm tracking-wide">함께했던 모든 날들이 소중해</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {memories.map((memory, index) => (
              <PhotoCard
                key={memory.id}
                memory={memory}
                index={index}
                onOpen={(src, caption) => setModal({ src, caption })}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-px bg-stone-300" />
              <CalendarDays size={14} strokeWidth={1.5} className="text-rose-300" />
              <div className="w-8 h-px bg-stone-300" />
            </div>
            <h2 className="text-2xl font-bold text-stone-700 tracking-tight">특별했던 순간들</h2>
          </div>

          <div className="space-y-5">
            {[
              { Icon: UtensilsCrossed, title: "라멘 데이트",       desc: "토마토 베이스 라멘, 차슈에 새우까지 — 맛도 분위기도 완벽했어" },
              { Icon: Palette,         title: "전시 투어",         desc: "Chapter #3부터 드로잉 스튜디오까지 — 같이 보고 느끼는 게 좋았어" },
              { Icon: Pencil,          title: "쇼핑하며 거울 셀카", desc: "빨간 선글라스 너무 잘 어울리지 않아? 살 뻔했잖아" },
              { Icon: Flame,           title: "한국식 BBQ",        desc: "직접 구우면서 먹는 게 이렇게 재밌을 줄이야" },
              { Icon: Waves,           title: "온천 리조트",       desc: "따뜻한 물 속에서 찍은 셀카가 제일 귀여워" },
              { Icon: Snowflake,       title: "스키장 어드벤처",   desc: "폭설 속 눈싸움부터 리프트 위 셀카까지 — 최고의 겨울이었어" },
            ].map(({ Icon, title, desc }, i) => (
              <div
                key={i}
                className="flex gap-5 items-start px-6 py-5 rounded-2xl hover:scale-[1.01] transition-transform duration-300"
                style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(10px)", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
              >
                <div className="mt-0.5 flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(251,113,133,0.08)" }}>
                  <Icon size={16} strokeWidth={1.5} className="text-rose-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-stone-700 text-sm tracking-wide mb-1">{title}</h3>
                  <p className="text-stone-400 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Letter */}
      <section id="letter" className="py-28 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="animate-heartbeat inline-block mb-6">
            <Heart size={36} strokeWidth={1} className="text-rose-400" fill="rgba(251,113,133,0.15)" />
          </div>
          <h2 className="text-2xl font-bold text-stone-700 mb-10 tracking-tight">200일 기념으로</h2>

          <div
            className="p-10 md:p-14 rounded-3xl text-left leading-loose space-y-5"
            style={{
              background: "rgba(255,255,255,0.75)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 10px 50px rgba(201,113,110,0.08)",
              border: "1px solid rgba(249,168,168,0.2)",
            }}
          >
            <p className="text-stone-500 text-base">우리가 처음 만난 그날부터 오늘까지,</p>
            <p className="text-stone-500 text-base">
              200일이라는 시간 동안 함께한 모든 순간들이<br />
              내 인생에서 가장 빛나는 기억이 됐어.
            </p>
            <p className="text-stone-500 text-base">
              맛있는 거 먹으러 다니고, 전시도 보고,<br />
              눈밭에서 뛰어놀고, 스키도 타고...<br />
              너랑 함께라면 뭐든지 특별해.
            </p>
            <p className="text-stone-500 text-base">
              앞으로도 이런 순간들을 더 많이 만들어가자.<br />
              300일, 500일, 1000일...
            </p>
            <div className="pt-4 flex items-center gap-3">
              <Heart size={14} strokeWidth={1.5} className="text-rose-400" />
              <p className="text-rose-400 font-semibold text-base tracking-wide">200일 기념일 축하해</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-14 text-center border-t border-stone-100">
        <div className="flex justify-center mb-4">
          <Heart size={20} strokeWidth={1} className="text-stone-300" />
        </div>
        <p className="text-stone-300 text-xs tracking-widest uppercase">
          우리의 200일을 기념하며 · 2025
        </p>
      </footer>
    </div>
  );
}
