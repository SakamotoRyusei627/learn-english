import {WordEntry, WordPair} from "@/types/words";

export type WordCategory =
  | { category: string; items: WordEntry[] }
  | { category: "対義語ペア"; items: WordPair[] }

export const isWordEntry = (x: any): x is WordEntry =>
  x && typeof x.word === "string" && typeof x.meaning === "string"

export const isWordPair = (x: any): x is WordPair =>
  x && Array.isArray(x.pair) && x.pair.length === 2 && typeof x.meaning === "string"

// Fisher–Yates シャッフル
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// public/data 配下の実ファイルに合わせて一覧を定義
// label = タブに出す表示名 / path = public からの相対パス
const SOURCES: { category: string; path: string; kind: "word" | "pair" }[] = [
  { category: "命名/変数",      path: "/data/word/naming.json",   kind: "word" },
  { category: "HTTP/REST",     path: "/data/word/method.json",   kind: "word" },
  { category: "Git/コミット",   path: "/data/word/commit.json",   kind: "word" },
  { category: "エラー",         path: "/data/word/error.json",    kind: "word" },
  { category: "UX/UI",         path: "/data/word/uxui.json",     kind: "word" },
  { category: "バックエンド",   path: "/data/word/backend.json",  kind: "word" },
  { category: "DB/クエリ",      path: "/data/word/query.json",    kind: "word" },
  { category: "クラウド/Infra", path: "/data/word/cloud.json",    kind: "word" },
  { category: "セキュリティ",   path: "/data/word/security.json", kind: "word" },
  { category: "対義語ペア",     path: "/data/pair/pair.json",     kind: "pair" },
]

// 1カテゴリ分をロードしてパース
async function loadOneCategory(
  src: { category: string; path: string; kind: "word" | "pair" }
): Promise<WordCategory> {
  const res = await fetch(src.path, { cache: "no-store" })
  if (!res.ok) {
    throw new Error(`Failed to fetch ${src.path}: ${res.status} ${res.statusText}`)
  }
  const json = await res.json()
  if (!Array.isArray(json)) {
    throw new Error(`Invalid JSON shape at ${src.path}: array expected`)
  }

  if (src.kind === "pair") {
    const items = shuffle(json.filter(isWordPair))
    return { category: "対義語ペア", items }
  } else {
    const items = shuffle(json.filter(isWordEntry))
    return { category: src.category, items }
  }
}

/**
 * public/data 配下の JSON を読み込み、タブ表示用のカテゴリ配列を返す。
 * - クライアントコンポーネントから呼び出してください（SSR で相対パス fetch は不可のため）。
 * - 並び順は SOURCES の順になります。
 */
export async function loadWordData(): Promise<WordCategory[]> {
  const results = await Promise.all(SOURCES.map(loadOneCategory))
  return results
}

// タブの表示名を取りたい場合に使えるヘルパ
export const categoriesForTabs = SOURCES.map(s => s.category)