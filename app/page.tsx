import { Sword, Shield, Skull, Gem } from "lucide-react"
import { Button } from "@/components/ui/button"
import Typography from "@/components/shared/typography"
import FeatureCard from "@/components/shared/feature-card"
import Navbar from "@/components/common/navbar"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center bg-background">
      <Navbar />
      {/* Hero */}
      <section className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background px-4 pb-24 pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <div className="relative z-10 flex max-w-2xl flex-col items-center gap-4 text-center">
          <Typography variant="h1" className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Mohan Builder
          </Typography>
          <Typography variant="h4" className="max-w-md text-muted-foreground">
            Your Monster Hunter: World build planner companion. Craft the perfect loadout, compare weapons, and master every hunt.
          </Typography>
          <div className="mt-4 flex gap-3">
            <Button>
              <Link href="/weapons">Browse Weapons</Link>
            </Button>
            <Button variant="outline">
              <Link href="/monsters">Explore Monsters</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="w-full max-w-5xl px-4 pb-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            title="Weapons"
            description="14 weapon types, hundreds of upgrade paths"
            icon={Sword}
            href="/weapons"
            stat="14 types"
          />
          <FeatureCard
            title="Armor"
            description="Mix and match sets for optimal skills"
            icon={Shield}
            href="/armor"
            stat="Coming soon"
          />
          <FeatureCard
            title="Monsters"
            description="Weaknesses, rewards, and locations"
            icon={Skull}
            href="/monsters"
            stat="Explore"
          />
          <FeatureCard
            title="Skills"
            description="Decorations, charms, and set bonuses"
            icon={Gem}
            href="/skills"
            stat="Coming soon"
          />
        </div>
      </section>

      {/* Stats Bar */}
      <section className="w-full border-t border-border bg-muted/30 px-4 py-10">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {[
            { label: "Weapons", value: "13,000+" },
            { label: "Armor Pieces", value: "800+" },
            { label: "Monsters", value: "60+" },
            { label: "Skills", value: "130+" },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <Typography variant="h2" className="text-primary">{value}</Typography>
              <Typography variant="notes" className="text-muted-foreground">{label}</Typography>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}