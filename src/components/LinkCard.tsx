import type { Link } from "@/data/profile";

export default function LinkCard({ link }: { link: Link }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex min-h-14 w-full items-center justify-center rounded-xl border border-zinc-300 bg-white px-4 py-3 font-medium transition hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 dark:border-zinc-700 dark:bg-zinc-900"
    >
      {link.title}
    </a>
  );
}
