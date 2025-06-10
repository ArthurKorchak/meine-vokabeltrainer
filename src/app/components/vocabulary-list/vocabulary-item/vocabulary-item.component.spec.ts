import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { Pipe, PipeTransform } from '@angular/core';

import { VocabularyItemComponent } from './vocabulary-item.component';
import { Vocabulary } from '../../../interfaces/vocabulary';
import { UpdateVocab, RemoveVocab } from '../../../state/vocabulary.actions';

@Pipe({
  name: 'translate'
})
class MockTranslatePipe implements PipeTransform {
  transform(value: string): string {
    return value;
  }
}

const mockModal = {
  present: jest.fn(),
};

const mockModalCtrl = {
  create: jest.fn(() => Promise.resolve(mockModal))
};

const mockStore = {
  dispatch: jest.fn()
};

describe('VocabularyItemComponent', () => {
  let component: VocabularyItemComponent;
  let fixture: ComponentFixture<VocabularyItemComponent>;

  const testItem: Vocabulary = {
    id: '1',
    german: 'Hund',
    english: 'Dog',
    learned: false
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VocabularyItemComponent, MockTranslatePipe as any],
      imports: [IonicModule.forRoot(), FormsModule],
      providers: [
        { provide: ModalController, useValue: mockModalCtrl },
        { provide: Store, useValue: mockStore },
        { provide: TranslatePipe, useClass: MockTranslatePipe }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VocabularyItemComponent);
    component = fixture.componentInstance;
    component.item = { ...testItem };
    fixture.detectChanges();

    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch UpdateVocab on changeLearned()', () => {
    component.changeLearned();

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      new UpdateVocab(testItem.id, { ...testItem })
    );
  });

  it('should dispatch RemoveVocab on deleteItem()', () => {
    component.deleteItem();

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      new RemoveVocab(testItem.id)
    );
  });

  it('should open modal on openEditItemDialog()', async () => {
    await component.openEditItemDialog();

    expect(mockModalCtrl.create).toHaveBeenCalledWith({
      component: expect.any(Function),
      componentProps: { item: testItem }
    });

    expect(mockModal.present).toHaveBeenCalled();
  });
});
