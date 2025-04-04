import type React from "react";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Lime Connect",
  description: "Lime Connect mobile application",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className={cn(inter.className, "bg-[#1A1A1A]")}>
          {children}
      </div>
  );
}
