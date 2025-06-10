import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { VocabularyState } from '../../state/vocabulary.state';
import { LoadVocabs,  } from '../../state/vocabulary.actions';
import { Vocabulary } from '../../interfaces/vocabulary';

@Component({
  selector: 'app-vocabulary-list',
  templateUrl: './vocabulary-list.component.html',
  styleUrls: ['./vocabulary-list.component.scss'],
})
export class VocabularyListComponent implements OnInit {
  allItems$: Observable<Vocabulary[]> = this.store.select(VocabularyState.allVocabs);
  learnedItems$: Observable<Vocabulary[]> = this.store.select(VocabularyState.learnedVocabs);
  unlearnedItems$: Observable<Vocabulary[]> = this.store.select(VocabularyState.unlearnedVocabs);

  segment: 'all' | 'learned' | 'unlearned' = 'all';

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new LoadVocabs());
  }
}
