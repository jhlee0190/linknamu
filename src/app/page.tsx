import LinkCard from "@/components/LinkCard";
import ProfileHeader from "@/components/ProfileHeader";
import { links, profile } from "@/data/profile";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[440px] flex-col px-6 pb-20 pt-20 sm:pt-28">
      <ProfileHeader profile={profile} />
      <ul className="mt-12 flex flex-col gap-4 sm:gap-5">
        {links.map((link) => (
          <li key={link.id}>
            <LinkCard link={link} />
          </li>
        ))}
      </ul>
    </main>
  );
}
