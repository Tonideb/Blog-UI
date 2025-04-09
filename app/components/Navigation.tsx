import Link from "next/link";
import { Twitter, Twitch } from "lucide-react";

export default function Navigation() {
  return (
    <header className="flex justify-between items-center mb-16">
      <div className="h-14 w-14 bg-white/80 rounded-full flex items-center justify-center">
        <Link href="/">
          <span className="text-red-700 font-bold text-3xl">B</span>
        </Link>
      </div>
      <div className="flex gap-4">
        <Link href="#" className="text-sky-500">
          <Twitter size={24} />
        </Link>
        <Link href="#" className="text-purple-500">
          <Twitch size={24} />
        </Link>
      </div>
    </header>
  );
}
