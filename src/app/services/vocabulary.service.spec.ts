import { VocabularyService } from './vocabulary.service';
import { Vocabulary } from '../interfaces/vocabulary';

describe('VocabularyService', () => {
  let service: VocabularyService;
  const VOCABS_STORAGE_KEY = 'vocabs';

  beforeEach(() => {
    service = new VocabularyService();
    localStorage.clear();
  });

  it('should return empty array if nothing in localStorage', () => {
    expect(service.getVocabs()).toEqual([]);
  });

  it('should get vocabs from localStorage', () => {
    const vocabs: Vocabulary[] = [
      { id: '1', german: 'Haus', english: 'house', learned: false }
    ];
    localStorage.setItem(VOCABS_STORAGE_KEY, JSON.stringify(vocabs));
    expect(service.getVocabs()).toEqual(vocabs);
  });

  it('should add a vocab', () => {
    const item: Vocabulary = { id: '1', german: 'Haus', english: 'house', learned: false };
    service.addVocab(item);

    const saved = JSON.parse(localStorage.getItem(VOCABS_STORAGE_KEY) || '[]');
    expect(saved).toContainEqual(item);
    expect(service.getVocabs()).toContainEqual(item);
  });

  it('should update a vocab', () => {
    const item1: Vocabulary = { id: '1', german: 'Haus', english: 'house', learned: false };
    const item2: Vocabulary = { id: '1', german: 'Haus', english: 'house', learned: true };
    service.addVocab(item1);
    service.updateVocab(item2);

    const saved = JSON.parse(localStorage.getItem(VOCABS_STORAGE_KEY) || '[]');
    expect(saved.length).toBe(1);
    expect(saved[0].learned).toBe(true);
  });

  it('should delete a vocab', () => {
    const item: Vocabulary = { id: '1', german: 'Haus', english: 'house', learned: false };
    service.addVocab(item);
    service.deleteVocab('1');

    const saved = JSON.parse(localStorage.getItem(VOCABS_STORAGE_KEY) || '[]');
    expect(saved).toEqual([]);
  });
});
