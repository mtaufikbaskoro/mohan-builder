import Navbar from "@/components/common/navbar";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Navbar />
      <main className="flex flex-1 w-full max-w-5xl flex-col items-center justify-between py-32 px-4 dark:bg-black sm:items-start">
        {children}
      </main>
    </div>
  );
}