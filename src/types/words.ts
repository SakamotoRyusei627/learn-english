// 単語 or 対義語ペアのみ
export type WordEntry = { word: string; meaning: string }
export type WordPair = { pair: [string, string]; meaning: string }

export type Entry = WordEntry | WordPair