'use client'
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import {Entry} from "@/types/words";


type Props = {
  entry: Entry
}

export function WordCard({ entry }: Props) {
  const displayText =
      "pair" in entry ? `${entry.pair[0]} ⇆ ${entry.pair[1]}` : entry.word

  return (
      <Card className="w-full max-w-md mx-auto text-center p-6 shadow-md">
        <CardContent>
          <div className="text-3xl font-bold mb-2 break-words">{displayText}</div>
          <div className="text-muted-foreground text-base">{entry.meaning}</div>
        </CardContent>
      </Card>
  )
}