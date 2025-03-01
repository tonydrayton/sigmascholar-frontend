"use client"

import { cn } from "@/lib/utils"
import { GridPattern } from "@/components/magicui/grid-pattern"

export default function GridPatternLinearGradient() {
  return (
    <div className="absolute size-full items-center justify-center overflow-hidden rounded-lg border bg-background p-20 -z-20">
      <GridPattern
        width={35}
        height={35}
        x={-1}
        y={-1}
        className={cn("[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] ")}
      />
    </div>
  )
}

