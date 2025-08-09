'use client'
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import { WordCard } from "./WordCard"

type WordEntry = { word: string; meaning: string }
type WordPair = { pair: [string, string]; meaning: string }
type Entry = WordEntry | WordPair

type Props = {
  entries: Entry[]
}
export function WordSwiper({ entries }: Props) {
  const [index, setIndex] = useState(0)

  const next = () => setIndex((prev) => (prev + 1) % entries.length)
  const prev = () => setIndex((prev) => (prev - 1 + entries.length) % entries.length)

  return (
      <div className="flex flex-col items-center space-y-4 mt-4">
        <WordCard entry={entries[index]} />
        <div className="flex space-x-6">
          <button onClick={prev} aria-label="previous word">
            <ChevronLeft size={32} />
          </button>
          <button onClick={next} aria-label="next word">
            <ChevronRight size={32} />
          </button>
        </div>
      </div>
  )
}