import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { VocabularyPage } from './vocabulary.page';

describe('VocabularyPage', () => {
  let fixture: ComponentFixture<VocabularyPage>;
  let component: VocabularyPage;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VocabularyPage],
      imports: [
        IonicModule.forRoot(),
        TranslateModule.forRoot()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VocabularyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
