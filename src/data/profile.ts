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
  name: "홍길동",
  bio: "여기에 한 줄 소개가 들어갑니다",
  avatarUrl: "/avatar-placeholder.svg",
};

export const links: Link[] = [
  { id: "github", title: "GitHub", url: "https://github.com" },
  { id: "linkedin", title: "LinkedIn", url: "https://www.linkedin.com" },
  { id: "blog", title: "Blog", url: "https://example.com" },
];
