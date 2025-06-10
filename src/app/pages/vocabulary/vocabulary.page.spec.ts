import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { Component, Pipe, PipeTransform } from '@angular/core';
import { By } from '@angular/platform-browser';

import { VocabularyPage } from './vocabulary.page';

@Component({
  selector: 'app-vocabulary-list',
  template: ''
})
class MockVocabularyListComponent {}

@Pipe({ name: 'translate' })
class MockTranslatePipe implements PipeTransform {
  transform(value: string): string {
    return value;
  }
}

const mockModal = {
  present: jest.fn()
};

const mockModalController = {
  create: jest.fn().mockResolvedValue(mockModal)
};

describe('VocabularyPage', () => {
  let component: VocabularyPage;
  let fixture: ComponentFixture<VocabularyPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VocabularyPage, MockTranslatePipe, MockVocabularyListComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ModalController, useValue: mockModalController }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VocabularyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create the page', () => {
    expect(component).toBeTruthy();
  });

  it('should open modal when openAddItemDialog is called', async () => {
    await component.openAddItemDialog();

    expect(mockModalController.create).toHaveBeenCalledWith({
      component: expect.any(Function)
    });
    expect(mockModal.present).toHaveBeenCalled();
  });

  it('should call openAddItemDialog when Add Item button is clicked', async () => {
    const spy = jest.spyOn(component, 'openAddItemDialog').mockResolvedValue(undefined);
    const button = fixture.debugElement.query(By.css('ion-button[slot="end"]'));
    expect(button).toBeTruthy();

    button.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });
});
