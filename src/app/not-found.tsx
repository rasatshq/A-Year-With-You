import Link from "next/link";
import { Heart } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream-100 flex flex-col items-center justify-center p-6 text-center text-cocoa-800">
      <div className="w-16 h-16 rounded-full bg-blush-200/70 text-rose-500 flex items-center justify-center mb-6">
        <Heart className="w-8 h-8 fill-rose-300" />
      </div>
      <h1 className="font-serif text-4xl sm:text-5xl text-cocoa-900 mb-3">
        Page Not Found
      </h1>
      <p className="font-sans text-base text-brown-500 max-w-sm mb-8">
        This little memory page doesn&apos;t exist, but our story continues right at home.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-full bg-rose-400 text-white font-medium hover:bg-rose-500 transition-colors shadow-sm"
      >
        Return to Our Story
      </Link>
    </div>
  );
}
