import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { VocabularyService } from '../services/vocabulary.service';

@Injectable()
export class VocabApiInterceptor implements HttpInterceptor {
  constructor(private vocabularyService: VocabularyService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.includes('/api/vocabs')) {
      return next.handle(req);
    }

    // GET /api/vocabs
    if (req.method === 'GET') {
      return of(new HttpResponse({ status: 200, body: this.vocabularyService.getVocabs() }));
    }

    // POST /api/vocabs
    if (req.method === 'POST') {
      return of(new HttpResponse({ status: 201, body: this.vocabularyService.addVocab(req.body) }));
    }

    // PUT /api/vocabs/:id
    if (req.method === 'PUT') {
      return of(new HttpResponse({ status: 200, body: this.vocabularyService.updateVocab(req.body) }));
    }

    // DELETE /api/vocabs/:id
    if (req.method === 'DELETE') {
      this.vocabularyService.deleteVocab(req.urlWithParams.split('/')[3]);
      return of(new HttpResponse({ status: 204 }));
    }

    return next.handle(req);
  }
}
