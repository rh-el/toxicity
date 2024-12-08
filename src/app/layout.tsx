"use client"
// import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { usePathname } from "next/navigation";


const quickSand = localFont({
  src: "./fonts/Quicksand-VariableFont_wght.ttf",
  variable: "--font-quicksand",
  weight: "100 900",
});

const inter = localFont({
  src: "./fonts/Inter-VariableFont_opsz,wght.ttf",
  variable: "--font-inter",
  weight: "100 900"
})

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  const container = useRef<HTMLBodyElement | null>(null)
  const pathname = usePathname()
  // console.log(pathname)
  const { contextSafe } = useGSAP()
  
  const animateGradient = contextSafe(
      (
        newStyle: string,
      ) => {
        gsap.to(container.current, {
          duration: 2,
          backgroundAttachment: "fixed",
          background: newStyle,
        })
      }
  )

  const backgroundStyle = `
    radial-gradient(circle at 20% 30%, #d7eaff, transparent 60%),
    radial-gradient(circle at 70% 40%, #ff8580, transparent 50%),
    radial-gradient(circle at 40% 70%, #9ba0ff, transparent 70%),
    radial-gradient(circle at 85% 85%, #b2ffd8, transparent 50%),
    linear-gradient(
      to bottom right,
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0)
    ),
    linear-gradient(135deg, #e1f4ff, #ff7741)`

    const newBackgroundStyle = `
      radial-gradient(circle at 80% 70%, #d7eaff, transparent 20%),
      radial-gradient(circle at 20% 90%, #ff8580, transparent 70%),
      radial-gradient(circle at 65% 25%, #9ba0ff, transparent 20%),
      radial-gradient(circle at 20% 45%, #b2ffd8, transparent 50%),
      linear-gradient(to bottom right, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0)),
      linear-gradient(135deg, #e1f4ff, #ff7741)`


    useEffect(() => {
      console.log(container.current)
      if (pathname === "/auth/register") {
        // animateGradient(newBackgroundStyle)
        animateGradient(newBackgroundStyle)
      }
    
      if (pathname === "/auth/login") {
        // animateGradient(backgroundStyle)
        animateGradient(backgroundStyle)
      }

      if (pathname === "/main") {
        // animateGradient(backgroundStyle)
        animateGradient(backgroundStyle)
      }

    })


  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${quickSand.variable} container h-svh antialiased`}
        ref={container}
      >
        {/* <div className="main-div" > */}
          {children}
        {/* </div> */}
      </body>
    </html>
  );
}
