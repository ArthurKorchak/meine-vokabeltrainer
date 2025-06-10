import { Injectable } from '@angular/core';

import { VOCABS_STORAGE_KEY } from '../../constants';
import { Vocabulary } from '../interfaces/vocabulary';

@Injectable({
  providedIn: 'root'
})
export class VocabularyService {

  constructor() { }

  getVocabs(): Vocabulary[] {
    return JSON.parse(localStorage.getItem(VOCABS_STORAGE_KEY) || 'null') || [];
  }

  private setVocabs(items: Vocabulary[]): void {
    localStorage.setItem(VOCABS_STORAGE_KEY, JSON.stringify(items));
  }

  addVocab(item: Vocabulary): Vocabulary[] {
    const vocabs: Vocabulary[] = this.getVocabs();
    vocabs.push(item);
    this.setVocabs(vocabs);
    return vocabs;
  }

  updateVocab(item: Vocabulary): Vocabulary[] {
    const vocabs: Vocabulary[] = this.getVocabs().filter((vocab: Vocabulary): boolean => vocab.id !== item.id);
    vocabs.push(item);
    this.setVocabs(vocabs);
    return vocabs;
  }

  deleteVocab(item: Vocabulary): void {
    const vocabs: Vocabulary[] = this.getVocabs().filter((vocab: Vocabulary): boolean => vocab.id !== item.id);
    this.setVocabs(vocabs);
  }
}
