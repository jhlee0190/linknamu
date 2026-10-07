import type { Link } from "@/data/profile";

export default function LinkCard({ link }: { link: Link }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex min-h-[60px] w-full items-center justify-center rounded-2xl border border-white/70 bg-white/45 px-6 py-4 text-[15px] font-semibold tracking-tight text-[#3a2e28] shadow-[0_6px_24px_-12px_rgba(140,80,40,0.35)] backdrop-blur-md transition duration-300 ease-out hover:-translate-y-0.5 hover:bg-white/65 hover:shadow-[0_10px_28px_-12px_rgba(140,80,40,0.4)] active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c08660] dark:border-white/10 dark:bg-white/[0.06] dark:text-[#f5ebe3] dark:shadow-[0_6px_24px_-12px_rgba(0,0,0,0.6)] dark:hover:bg-white/[0.1]"
    >
      {link.title}
    </a>
  );
}
