// 더미 데이터입니다. 실제 내용은 나중에 이 파일만 수정하면 됩니다.

export type Profile = {
  name: string;
  bio: string;
  avatarUrl: string;
};

export type Link = {
  id: string;
  title: string;
  url: string;
};

export const profile: Profile = {
  name: "이정훈",
  bio: "시스템엔지니어 | 요즘에는 AI 개발에 관심이 많아요",
  avatarUrl: "/profile.jpg",
};

export const links: Link[] = [
  { id: "github", title: "GitHub", url: "https://github.com/jhlee0190" },
  {
    id: "linkedin",
    title: "LinkedIn",
    url: "https://www.linkedin.com/in/junghoon-lee-6140b5113/",
  },
  { id: "blog", title: "Blog", url: "https://blog.naver.com/leejh0190" },
];
