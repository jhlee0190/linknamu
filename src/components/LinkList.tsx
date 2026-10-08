"use client";

import { useEffect, useState } from "react";
import LinkCard from "@/components/LinkCard";
import type { Link } from "@/data/profile";

type Counts = Record<string, number>;

export default function LinkList({ links }: { links: Link[] }) {
  // 데이터를 받기 전에는 모두 0회로 보여줍니다.
  const [counts, setCounts] = useState<Counts>({});

  // 페이지가 열릴 때 모든 링크의 클릭 수를 한 번에 가져옵니다.
  useEffect(() => {
    let cancelled = false;
    fetch("/api/click", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: Counts) => {
        if (cancelled) return;
        // 응답이 오기 전에 누른 클릭이 있으면 그만큼 더해서 덮어쓰지 않게 합니다.
        setCounts((prev) => {
          const next: Counts = { ...data };
          for (const [id, pending] of Object.entries(prev)) {
            next[id] = (next[id] ?? 0) + pending;
          }
          return next;
        });
      })
      .catch(() => {
        // 불러오지 못하면 0회로 둡니다.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // 카드를 누르면 화면의 숫자도 바로 1 올립니다.
  const increment = (id: string) =>
    setCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));

  return (
    <ul className="mt-12 flex flex-col gap-4 sm:gap-5">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard
            link={link}
            clickCount={counts[link.id] ?? 0}
            onClick={() => increment(link.id)}
          />
        </li>
      ))}
    </ul>
  );
}
