import Link from "next/link"
import { cn } from "@/lib/utils"
import Typography from "./typography"
import { type LucideIcon } from "lucide-react"

type Props = {
  title: string
  description: string
  icon: LucideIcon
  href: string
  stat?: string
  className?: string
}

export default function FeatureCard({ title, description, icon: Icon, href, stat, className }: Props) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col items-center gap-3 rounded-xl border-2 border-border bg-card p-6 text-center transition-all hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5",
        className
      )}
    >
      <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
        <Icon className="size-6 text-primary" />
      </div>
      <div>
        <Typography variant="h3">{title}</Typography>
        {stat && (
          <Typography variant="notes" className="text-muted-foreground">
            {stat}
          </Typography>
        )}
      </div>
      <Typography variant="p" className="text-muted-foreground">
        {description}
      </Typography>
    </Link>
  )
}