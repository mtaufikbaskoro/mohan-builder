import { Button } from "@/components/ui/button";
import Typography from "@/components/shared/typography";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-start justify-center gap-2">
          <Typography variant="h1">Welcome to Mohan Builder!</Typography>
          <Typography variant="h4">This is a simple web app that will help you build your own website in MHWorld!</Typography>
        </div>
        <Button>Click Me !</Button>
      </main>
    </div>
  );
}
