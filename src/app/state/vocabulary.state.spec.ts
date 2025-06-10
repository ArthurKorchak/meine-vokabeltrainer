import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NgxsModule, Store } from '@ngxs/store';

import { VocabularyState } from './vocabulary.state';
import { AddVocab, LoadVocabs, RemoveVocab, UpdateVocab } from './vocabulary.actions';
import { Vocabulary } from '../interfaces/vocabulary';

describe('VocabularyState', () => {
  let store: Store;
  let httpMock: HttpTestingController;

  const mockVocabs: Vocabulary[] = [
    { id: '1', german: 'Hund', english: 'dog', learned: false },
    { id: '2', german: 'Katze', english: 'cat', learned: true }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([VocabularyState]), HttpClientTestingModule]
    });

    store = TestBed.inject(Store);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should load vocabs', () => {
    store.dispatch(new LoadVocabs());

    const req = httpMock.expectOne('/api/vocabs');
    expect(req.request.method).toBe('GET');
    req.flush(mockVocabs);

    const state = store.selectSnapshot(VocabularyState);
    expect(state.vocabs.length).toBe(2);
  });

  it('should add a vocab', () => {
    const payload = { german: 'Buch', english: 'book', learned: false };

    store.dispatch(new AddVocab(payload as Vocabulary));

    const req = httpMock.expectOne('/api/vocabs');
    expect(req.request.method).toBe('POST');
    req.flush([...mockVocabs, { ...payload, id: '3' }]);

    const state = store.selectSnapshot(VocabularyState);
    expect(state.vocabs.length).toBe(3);
  });

  it('should update a vocab', () => {
    store.reset({ vocabulary: { vocabs: mockVocabs } });

    const updated = { german: 'Katze', english: 'cat', learned: false };
    store.dispatch(new UpdateVocab('2', updated));

    const req = httpMock.expectOne('/api/vocabs/2');
    expect(req.request.method).toBe('PUT');
    req.flush([{ ...updated, id: '2' }, mockVocabs[0]]);

    const state = store.selectSnapshot(VocabularyState);
    expect(state.vocabs.find((v: any) => v.id === '2')?.learned).toBe(false);
  });

  it('should remove a vocab', () => {
    store.reset({ vocabulary: { vocabs: mockVocabs } });

    store.dispatch(new RemoveVocab('1'));

    const req = httpMock.expectOne('/api/vocabs/1');
    expect(req.request.method).toBe('DELETE');
    req.flush({});

    const state = store.selectSnapshot(VocabularyState);
    expect(state.vocabs.length).toBe(1);
    expect(state.vocabs.find((v: any) => v.id === '1')).toBeUndefined();
  });

  it('should select learned vocabs', () => {
    store.reset({ vocabulary: { vocabs: mockVocabs } });

    const learned = store.selectSnapshot(VocabularyState.learnedVocabs);
    expect(learned.length).toBe(1);
    expect(learned[0].german).toBe('Katze');
  });

  it('should select unlearned vocabs', () => {
    store.reset({ vocabulary: { vocabs: mockVocabs } });

    const unlearned = store.selectSnapshot(VocabularyState.unlearnedVocabs);
    expect(unlearned.length).toBe(1);
    expect(unlearned[0].german).toBe('Hund');
  });
});
