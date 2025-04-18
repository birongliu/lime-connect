import Link from "next/link";
import { BikeIcon as Bicycle } from "lucide-react";


export default function WelcomeScreen() {
  return (
    <div className="max-w-md mx-auto flex flex-col h-screen bg-[#1A1A1A] text-white relative overflow-hidden">
      {/* Main content */}
      <div className="flex-1 px-6 p-28">
        <h1 className="text-4xl font-bold text-[#5AE13B] mb-1">Welcome to</h1>
        <h1 className="text-4xl font-bold text-[#5AE13B] mb-4">Lime Connect</h1>

        <div className="flex items-center mb-8">
          <span className="text-xl">See What&apos;s New</span>
          <div className="w-6 h-6 bg-[#5AE13B] rounded-full ml-2 flex items-center justify-center">
            <span className="text-black font-bold">?</span>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-start">
            <div className="w-6 h-6 bg-[#5AE13B] rounded-full flex-shrink-0 mt-1"></div>
            <span className="ml-4 text-lg">
              Lime is now available in all NYC Boroughs.
            </span>
          </div>

          <div className="flex items-start">
            <div className="w-6 h-6 bg-[#5AE13B] rounded-full flex-shrink-0 mt-1"></div>
            <span className="ml-4 text-lg">
              Easily get to know any NYC neighborhood with Lime Routes.
            </span>
          </div>

          <div className="flex items-start">
            <div className="w-6 h-6 bg-[#5AE13B] rounded-full flex-shrink-0 mt-1"></div>
            <span className="ml-4 text-lg">
              Gain Community- New Group Rides, no destination needed.
            </span>
          </div>
        </div>
      </div>

      {/* Get Started button */}
      <div className="p-6 pb-20">
        <Link href="/map">
          <button
            type="button"
            className="w-full py-4 bg-[#5AE13B] rounded-full text-black font-semibold flex items-center justify-center"
          >
            <Bicycle className="w-5 h-5 mr-2" />
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
}
