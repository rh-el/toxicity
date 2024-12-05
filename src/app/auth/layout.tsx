export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex items-center flex-col justify-center h-full">
      <h1 className="font-quicksand text-5xl pt-12 top-0 absolute">weett</h1>
      <div className="main-container">{children}</div>
    </div>
  );
}
