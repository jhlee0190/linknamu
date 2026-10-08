"use client";

import type { Link } from "@/data/profile";

// 클릭 수 기록은 페이지 이동을 막지 않도록 백그라운드로 보내고, 실패해도 무시합니다.
function recordClick(id: string) {
  const body = JSON.stringify({ id });
  try {
    if (navigator.sendBeacon?.("/api/click", body)) return;
    fetch("/api/click", { method: "POST", body, keepalive: true }).catch(() => {});
  } catch {
    // 기록 실패는 링크 이동에 영향을 주지 않습니다.
  }
}

export default function LinkCard({
  link,
  clickCount,
  onClick,
}: {
  link: Link;
  clickCount: number;
  onClick: () => void;
}) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        recordClick(link.id);
        onClick();
      }}
      className="relative flex min-h-[60px] w-full items-center justify-center rounded-2xl border border-white/70 bg-white/45 px-16 py-4 text-[15px] font-semibold tracking-tight text-[#3a2e28] shadow-[0_6px_24px_-12px_rgba(140,80,40,0.35)] backdrop-blur-md transition duration-300 ease-out hover:-translate-y-0.5 hover:bg-white/65 hover:shadow-[0_10px_28px_-12px_rgba(140,80,40,0.4)] active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c08660] dark:border-white/10 dark:bg-white/[0.06] dark:text-[#f5ebe3] dark:shadow-[0_6px_24px_-12px_rgba(0,0,0,0.6)] dark:hover:bg-white/[0.1]"
    >
      {link.title}
      <span className="absolute right-5 text-xs font-medium tabular-nums text-[#9a8273] dark:text-[#a8968a]">
        {clickCount.toLocaleString("ko-KR")}회
      </span>
    </a>
  );
}
