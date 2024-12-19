"use client";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const { contextSafe } = useGSAP()

  // const tl = gsap.timeline()
  // useEffect(() => {
  //     tl.to('.title', {opacity: 1, duration: 0.5})
  //     tl.from(".title", {y: -300, duration: 2, ease:"bounce.out"})
  //     tl.to(".main-container", {opacity: 1, duration: 2, ease:"power3.out"})
  // })

  // tl.repeat()

  // tl.pause()
  //   contextSafe(
  //     () => {
  //         gsap.timeline
  // });

  return (
    <div className="">
      {/* <div className="h-[60px]"></div> */}
      <div className="flex items-center flex-col h-full">
        <h1 className="title font-quicksand text-5xl pt-12 pb-8">toxicity</h1>
        <div className="main-container flex flex-col">{children}</div>
      </div>
    </div>
  );
}
