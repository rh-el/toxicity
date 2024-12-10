export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <div className="h-[60px]">
      </div>
      <div className="flex items-center flex-col justify-center h-full">
        <h1 className="font-quicksand text-5xl pt-12 top-0 absolute">toxicity</h1>
        <div className="main-container flex flex-col justify-center">{children}</div>
      </div>
    </div>
  );
}
