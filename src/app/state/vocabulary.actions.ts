import { Vocabulary } from '../interfaces/vocabulary';

export class LoadVocabs {
  static readonly type: string = '[Vocabulary] Load';
}

export class AddVocab {
  static readonly type: string = '[Vocabulary] Add';
  constructor(public payload: Omit<Vocabulary, 'id'>) {}
}

export class UpdateVocab {
  static readonly type: string = '[Vocabulary] Update';
  constructor(public id: string, public payload: Omit<Vocabulary, 'id'>) {}
}

export class RemoveVocab {
  static readonly type: string = '[Vocabulary] Remove';
  constructor(public id: string) {}
}
