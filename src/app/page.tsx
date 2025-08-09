'use client'
import { useEffect, useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { WordSwiper } from '@/components/WordSwiper'
import {loadWordData} from "@/data/fetchData";


export default function Page() {
  const [cats, setCats] = useState<Awaited<ReturnType<typeof loadWordData>>>([])
  useEffect(() => {
    loadWordData().then(setCats).catch((e) => console.error(e))
  }, [])

  if (cats.length === 0) return <main className="p-4">読み込み中...</main>

  return (
      <main className="p-4">
        <Tabs defaultValue={cats[0].category} className="w-full">
          <ScrollArea className="w-full">
            <TabsList className="w-max flex gap-1 px-1">
              {cats.map((c) => (
                <TabsTrigger
                  key={c.category}
                  value={c.category}
                  className="shrink-0"
                >
                  {c.category}
                </TabsTrigger>
              ))}
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>

          {cats.map((c) => (
              <TabsContent key={c.category} value={c.category}>
                {/* WordSwiper は Entry[] を受け取れるようにしておく */}
                {/* 対義語ペアも WordCard 内で判定表示 */}
                <WordSwiper entries={c.items as any} />
              </TabsContent>
          ))}
        </Tabs>
      </main>
  )
}