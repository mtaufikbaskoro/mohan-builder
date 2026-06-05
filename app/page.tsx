import { Button } from "@/components/ui/button";
import Typography from "@/components/shared/typography";
import Navbar from "@/components/common/navbar";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Navbar />
      <main className="flex flex-1 w-full max-w-5xl flex-col items-center justify-between py-32 px-4 dark:bg-black sm:items-start">
        <div className="flex flex-col items-start justify-center gap-2">
          <Typography variant="h1">Welcome to Mohan Builder!</Typography>
          <Typography variant="h4">This is a simple web app that will help you build your own <span className="font-bold">&quot;build&quot;</span> in MHWorld!</Typography>
        </div>
        <Button>Click Me !</Button>
      </main>
    </div>
  );
}
