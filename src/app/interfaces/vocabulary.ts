export interface Vocabulary {
  id: string; // UUID
  german: string; // e.g. "Haus"
  english: string; // e.g. "house"
  learned: boolean; // whether it’s been marked as learned
}
