export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="items-center h-full">
      <h3 className="header font-quicksand font-bold text-3xl p-3 text-right">
        weett
      </h3>
      <div className="main-container no-scrollbar">{children}</div>
    </div>
  );
}
