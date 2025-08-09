'use client'
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import { WordCard } from "./WordCard"
import {Entry} from "@/types/words";

type Props = {
  entries: Entry[]
}
export function WordSwiper({ entries }: Props) {
  const [index, setIndex] = useState(0)

  const next = () => setIndex((prev) => (prev + 1) % entries.length)
  const prev = () => setIndex((prev) => (prev - 1 + entries.length) % entries.length)

  return (
      <div className="flex flex-col items-center gap-10 mt-4 min-h-fit">
        <WordCard entry={entries[index]} />
        <div className="flex justify-between w-full">
          <button onClick={prev} aria-label="previous word" className='ml-4'>
            <ChevronLeft size={32} />
          </button>
          <button onClick={next} aria-label="next word" className='mr-4'>
            <ChevronRight size={32} />
          </button>
        </div>
      </div>
  )
}