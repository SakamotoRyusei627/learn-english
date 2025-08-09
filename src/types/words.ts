// 単語 or 対義語ペアのみ
export type WordEntry = { word: string; meaning: string; reading?: string }
export type WordPair = { pair: [string, string]; meaning: string; reading?: string }

export type Entry = WordEntry | WordPair