import Link from "next/link";
import { Home, BookOpen, Briefcase, Grid, Compass } from "lucide-react";

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 w-full bg-gray-900 text-white flex justify-around py-3">
      <Link href="/" className="flex flex-col items-center">
        <Home size={24} />
        <span className="text-xs">Home</span>
      </Link>
      <Link href="/mcq" className="flex flex-col items-center">
        <BookOpen size={24} />
        <span className="text-xs">MCQ</span>
      </Link>
      <Link href="/jobs" className="flex flex-col items-center">
        <Briefcase size={24} />
        <span className="text-xs">Jobs</span>
      </Link>
      <Link href="/institution" className="flex flex-col items-center">
        <Grid size={24} />
        <span className="text-xs">Institution</span>
      </Link>
      <Link href="/explorer" className="flex flex-col items-center">
        <Compass size={24} />
        <span className="text-xs">Explorer</span>
      </Link>
    </nav>
  );
};

export default BottomNav;
