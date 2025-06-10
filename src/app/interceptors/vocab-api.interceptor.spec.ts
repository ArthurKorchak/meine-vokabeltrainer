import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';

import { VocabApiInterceptor } from './vocab-api.interceptor';
import { VocabularyService } from '../services/vocabulary.service';

describe('VocabApiInterceptor', () => {
  let interceptor: VocabApiInterceptor;
  let vocabularyService: VocabularyService;
  let handler: { handle: jest.Mock };

  beforeEach(() => {
    const vocabServiceMock = {
      getVocabs: jest.fn(),
      addVocab: jest.fn(),
      updateVocab: jest.fn(),
      deleteVocab: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        VocabApiInterceptor,
        { provide: VocabularyService, useValue: vocabServiceMock }
      ]
    });

    interceptor = TestBed.inject(VocabApiInterceptor);
    vocabularyService = TestBed.inject(VocabularyService);
    handler = { handle: jest.fn().mockReturnValue(of(null)) };
  });

  it('passes through requests not targeting /api/vocabs', done => {
    const req = new HttpRequest('GET', '/other/api');
    interceptor.intercept(req, handler).subscribe(() => {
      expect(handler.handle).toHaveBeenCalledWith(req);
      done();
    });
  });

  it('handles GET /api/vocabs', done => {
    const req = new HttpRequest('GET', '/api/vocabs');
    const mockVocabs = [{ id: '1', german: 'Haus', english: 'House', learned: false }];
    vocabularyService.getVocabs = jest.fn().mockReturnValue(mockVocabs);

    interceptor.intercept(req, handler).subscribe(e => {
      const event = e as HttpResponse<any>
      expect(event).toBeInstanceOf(HttpResponse);
      expect(event.status).toBe(200);
      expect(event.body).toEqual(mockVocabs);
      done();
    });
  });

  it('handles POST /api/vocabs', done => {
    const vocab = { german: 'Apfel', english: 'Apple', learned: false };
    const req = new HttpRequest('POST', '/api/vocabs', vocab);
    const createdVocab = { ...vocab, id: '123' };

    vocabularyService.addVocab = jest.fn().mockReturnValue(createdVocab);

    interceptor.intercept(req, handler).subscribe(e => {
      const event = e as HttpResponse<any>
      expect(event).toBeInstanceOf(HttpResponse);
      expect(event.status).toBe(201);
      expect(event.body).toEqual(createdVocab);
      done();
    });
  });

  it('handles PUT /api/vocabs', done => {
    const vocab = { id: '123', german: 'Katze', english: 'Cat', learned: false };
    const req = new HttpRequest('PUT', '/api/vocabs', vocab);

    vocabularyService.updateVocab = jest.fn().mockReturnValue(vocab);

    interceptor.intercept(req, handler).subscribe(e => {
      const event = e as HttpResponse<any>
      expect(event).toBeInstanceOf(HttpResponse);
      expect(event.status).toBe(200);
      expect(event.body).toEqual(vocab);
      done();
    });
  });

  it('handles DELETE /api/vocabs/:id', done => {
    const req = new HttpRequest('DELETE', '/api/vocabs/123');
    vocabularyService.deleteVocab = jest.fn();

    interceptor.intercept(req, handler).subscribe(e => {
      const event = e as HttpResponse<any>
      expect(event).toBeInstanceOf(HttpResponse);
      expect(event.status).toBe(204);
      expect(vocabularyService.deleteVocab).toHaveBeenCalledWith('123');
      done();
    });
  });
});
