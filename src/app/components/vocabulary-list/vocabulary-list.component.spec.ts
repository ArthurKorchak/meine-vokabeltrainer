import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { VocabularyListComponent } from './vocabulary-list.component';

describe('VocabularyListComponent', () => {
  let component: VocabularyListComponent;
  let fixture: ComponentFixture<VocabularyListComponent>;
  let storeMock: { select: jest.Mock, dispatch: jest.Mock };

  beforeEach(async () => {
    storeMock = {
      select: jest.fn().mockImplementation(() => of([])),
      dispatch: jest.fn().mockReturnValue(of(true))
    };

    await TestBed.configureTestingModule({
      declarations: [VocabularyListComponent],
      imports: [IonicModule.forRoot(), TranslateModule.forRoot()],
      providers: [{ provide: Store, useValue: storeMock }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(VocabularyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch LoadVocabs onInit', () => {
    expect(storeMock.dispatch).toHaveBeenCalled();
  });

  it('should render correct list for "all" segment', async () => {
    component.segment = 'all';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const items = compiled.querySelectorAll('ion-list');
    expect(items[0].id).toBe('allList');
  });

  it('should render correct list for "learned" segment', async () => {
    component.segment = 'learned';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const items = compiled.querySelectorAll('ion-list');
    expect(items[0].id).toBe('learnedList');
  });

  it('should render correct list for "unlearned" segment', async () => {
    component.segment = 'unlearned';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const items = compiled.querySelectorAll('ion-list');
    expect(items[0].id).toBe('unlearnedList');
  });
});
