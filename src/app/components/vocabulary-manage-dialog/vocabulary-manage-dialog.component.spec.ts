import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Store } from '@ngxs/store';

import { VocabularyManageDialogComponent } from './vocabulary-manage-dialog.component';
import { AddVocab, UpdateVocab } from '../../state/vocabulary.actions';
import { Vocabulary } from '../../interfaces/vocabulary';

@Pipe({ name: 'translate' })
class MockTranslatePipe implements PipeTransform {
  transform(value: string): string {
    return value;
  }
}

const mockModalCtrl = {
  dismiss: jest.fn()
};

const mockStore = {
  dispatch: jest.fn().mockReturnValue({ subscribe: jest.fn() })
};

describe('VocabularyManageDialogComponent', () => {
  let component: VocabularyManageDialogComponent;
  let fixture: ComponentFixture<VocabularyManageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VocabularyManageDialogComponent, MockTranslatePipe],
      imports: [ReactiveFormsModule, IonicModule.forRoot()],
      providers: [
        { provide: ModalController, useValue: mockModalCtrl },
        { provide: Store, useValue: mockStore }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VocabularyManageDialogComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create form with empty fields if no item is provided', () => {
    component.item = undefined;
    fixture.detectChanges();
    component.ngOnInit();

    expect(component.form).toBeDefined();
    expect(component.form?.value.de).toBe('');
    expect(component.form?.value.en).toBe('');
  });

  it('should create correct form if item is provided', () => {
    component.item = {
      id: '123',
      german: 'Haus',
      english: 'House',
      learned: false
    };
    component.ngOnInit();

    expect(component.form?.value.de).toBe('Haus');
    expect(component.form?.value.en).toBe('House');
  });

  it('should dispatch UpdateVocab and close modal if editing item', () => {
    const item: Vocabulary = {
      id: '1',
      german: 'Alt',
      english: 'Old',
      learned: false
    };
    component.item = item;
    component.ngOnInit();
    component.form?.setValue({ de: 'Neu', en: 'New' });

    component.save();

    expect(mockStore.dispatch).toHaveBeenCalledWith(new UpdateVocab('1', {
      ...item,
      german: 'Neu',
      english: 'New'
    }));
    expect(mockModalCtrl.dismiss).toHaveBeenCalled();
  });

  it('should dispatch AddVocab and close modal if creating item', () => {
    component.item = undefined;
    component.ngOnInit();
    component.form?.setValue({ de: 'Katze', en: 'Cat' });

    component.save();

    expect(mockStore.dispatch).toHaveBeenCalledWith(new AddVocab({
      german: 'Katze',
      english: 'Cat',
      learned: false
    }));
    expect(mockModalCtrl.dismiss).toHaveBeenCalled();
  });

  it('should disable button when form is invalid', () => {
    component.item = undefined;
    component.ngOnInit();
    component.form?.setValue({ de: '', en: '' });
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('.save-button'));
    expect(button.nativeElement.disabled).toBe(true);
  });
});
