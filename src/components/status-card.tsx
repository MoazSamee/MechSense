import type { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatusCardProps {
  title: string
  value: string | ReactNode
  icon: ReactNode
  status?: "normal" | "warning" | "critical"
  className?: string
  footer?: ReactNode
}

export function StatusCard({ title, value, icon, status = "normal", className, footer }: StatusCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader
        className={cn(
          "flex flex-row items-center justify-between space-y-0 pb-2",
          status === "normal" && "bg-primary/5",
          status === "warning" && "bg-amber-500/10",
          status === "critical" && "bg-destructive/10",
        )}
      >
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div
          className={cn(
            "rounded-full p-1",
            status === "normal" && "text-primary",
            status === "warning" && "text-amber-500",
            status === "critical" && "text-destructive",
          )}
        >
          {icon}
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="text-2xl font-bold">{value}</div>
        {footer && <div className="mt-2 text-xs text-muted-foreground">{footer}</div>}
      </CardContent>
    </Card>
  )
}

