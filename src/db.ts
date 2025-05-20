import Dexie, { type EntityTable } from 'dexie';

interface Question {
  id: number;
  text: string;
  treshold: number;
  result: number;
  date: string;
}

const db = new Dexie('QuestionsDatabase') as Dexie & {
  questions: EntityTable<
    Question,
    'id' // primary key "id" (for the typings only)
  >,
  treshold: EntityTable<
    { id: number; value: number },
    'id'
  >,
}

// Schema declaration:
db.version(1).stores({
  questions: '++id, text, treshold, result, date', // primary key "id" (for the runtime!)
  treshold: 'id, value',
})

export type { Question }
export { db }
