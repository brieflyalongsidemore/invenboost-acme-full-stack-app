export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main>
      <div className="min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        {children}
      </div>
    </main>
  );
}
