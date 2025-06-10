import { State, Selector, Action, StateContext } from '@ngxs/store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { AddVocab, LoadVocabs, RemoveVocab, UpdateVocab } from './vocabulary.actions';
import { Vocabulary } from '../interfaces/vocabulary';

export interface VocabularyStateModel {
  vocabs: Vocabulary[];
}

function sortFn(a: Vocabulary, b: Vocabulary): 1 | 0 | -1 {
  const nameA: string = a.german.toUpperCase();
  const nameB: string = b.german.toUpperCase();
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  return 0;
}

@State<VocabularyStateModel>({
  name: 'vocabulary',
  defaults: {
    vocabs: []
  }
})
@Injectable({
  providedIn: 'root'
})
export class VocabularyState {
  constructor(private http: HttpClient) {}

  @Selector()
  static allVocabs(state: VocabularyStateModel): Vocabulary[] {
    return state.vocabs.sort(sortFn);
  }

  @Selector()
  static learnedVocabs(state: VocabularyStateModel): Vocabulary[] {
    return state.vocabs.filter((v: Vocabulary): boolean => v.learned).sort();
  }

  @Selector()
  static unlearnedVocabs(state: VocabularyStateModel): Vocabulary[] {
    return state.vocabs.filter((v: Vocabulary): boolean => !v.learned).sort();
  }

  @Action(LoadVocabs)
  loadVocabs(ctx: StateContext<VocabularyStateModel>): Observable<Vocabulary[]> {
    return this.http.get<Vocabulary[]>('/api/vocabs').pipe(
      tap((vocabs: Vocabulary[]): VocabularyStateModel => ctx.patchState({ vocabs }))
    );
  }

  @Action(AddVocab)
  addVocab(ctx: StateContext<VocabularyStateModel>, action: AddVocab): Observable<Vocabulary[]> {
    const newVocab: Vocabulary = { id: uuidv4(), ...action.payload };
    return this.http.post<Vocabulary[]>('/api/vocabs', newVocab).pipe(
      tap((resultArr: Vocabulary[]): void => {
        ctx.patchState({ vocabs: resultArr });
      })
    );
  }

  @Action(UpdateVocab)
  updateVocab(ctx: StateContext<VocabularyStateModel>, action: UpdateVocab): Observable<Vocabulary[]> {
    return this.http.put<Vocabulary[]>(`/api/vocabs/${action.id}`, action.payload).pipe(
      tap((resultArr: Vocabulary[]): void => {
        ctx.patchState({ vocabs: resultArr });
      })
    );
  }

  @Action(RemoveVocab)
  removeVocab(ctx: StateContext<VocabularyStateModel>, action: RemoveVocab): Observable<Object> {
    return this.http.delete(`/api/vocabs/${action.id}`).pipe(
      tap((): void => {
        const state: VocabularyStateModel = ctx.getState();
        const vocabs: Vocabulary[] = state.vocabs.filter((v: Vocabulary): boolean => v.id !== action.id);
        ctx.patchState({ vocabs });
      })
    );
  }
}
