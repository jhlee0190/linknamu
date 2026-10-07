"use client";

import { useState } from "react";
import type { Profile } from "@/data/profile";

export default function ProfileHeader({ profile }: { profile: Profile }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <header className="flex flex-col items-center text-center">
      {imageFailed ? (
        // 사진을 불러오지 못하면 이름 첫 글자를 보여줍니다.
        <div
          role="img"
          aria-label={`${profile.name} 프로필 사진`}
          className="flex h-28 w-28 items-center justify-center rounded-full bg-[#f3d5bf] text-4xl font-semibold text-[#8a5a3c] ring-4 ring-white/80 shadow-[0_14px_32px_-12px_rgba(140,80,40,0.45)] dark:bg-[#4a352a] dark:text-[#f3d5bf] dark:ring-white/10 sm:h-32 sm:w-32"
        >
          {profile.name.charAt(0)}
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={profile.avatarUrl}
          alt={`${profile.name} 프로필 사진`}
          onError={() => setImageFailed(true)}
          className="h-28 w-28 rounded-full object-cover ring-4 ring-white/80 shadow-[0_14px_32px_-12px_rgba(140,80,40,0.45)] dark:ring-white/10 dark:shadow-[0_14px_32px_-12px_rgba(0,0,0,0.6)] sm:h-32 sm:w-32"
        />
      )}
      <h1 className="mt-6 text-2xl font-bold tracking-tight">{profile.name}</h1>
      <p className="mt-2 text-balance text-[15px] leading-relaxed text-[#7a675b] dark:text-[#c9b8ab]">{profile.bio}</p>
    </header>
  );
}
