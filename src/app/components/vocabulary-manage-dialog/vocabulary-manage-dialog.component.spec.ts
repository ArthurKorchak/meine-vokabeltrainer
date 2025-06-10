import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VocabularyManageDialogComponent } from './vocabulary-manage-dialog.component';

describe('VocabularyManageDialogComponent', () => {
  let component: VocabularyManageDialogComponent;
  let fixture: ComponentFixture<VocabularyManageDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VocabularyManageDialogComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VocabularyManageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
