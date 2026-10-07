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
          className="flex h-36 w-36 items-center justify-center rounded-full bg-zinc-300 text-5xl font-semibold text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200"
        >
          {profile.name.charAt(0)}
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={profile.avatarUrl}
          alt={`${profile.name} 프로필 사진`}
          onError={() => setImageFailed(true)}
          className="h-36 w-36 rounded-full object-cover"
        />
      )}
      <h1 className="mt-6 text-xl font-bold">{profile.name}</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">{profile.bio}</p>
    </header>
  );
}
