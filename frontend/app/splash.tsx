import Image from "next/image";
import logo from "./logo/lime-connect.svg";


export default function SplashScreen() {
  return (
    <div className="max-w-md mx-auto flex flex-col items-center justify-between h-screen bg-[#1A1A1A] text-[#5AE13B] p-6">
      <div className="flex-1"></div>
      <div className="w-32 h-32 relative">
        <Image src={logo} width={178} height={178} alt="logo" />
      </div>
      <div className="flex-1"></div>
      <div className="text-2xl font-light tracking-wide">connect</div>
    </div>
  );
}
