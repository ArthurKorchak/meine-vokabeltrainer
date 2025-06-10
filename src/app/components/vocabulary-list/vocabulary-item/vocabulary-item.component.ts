import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngxs/store';

import { Vocabulary } from '../../../interfaces/vocabulary';
import { VocabularyManageDialogComponent } from '../../vocabulary-manage-dialog/vocabulary-manage-dialog.component';
import { RemoveVocab, UpdateVocab } from '../../../state/vocabulary.actions';

@Component({
  selector: 'app-vocabulary-item',
  templateUrl: './vocabulary-item.component.html',
  styleUrls: ['./vocabulary-item.component.scss'],
})
export class VocabularyItemComponent {
  @Input() item!: Vocabulary;

  constructor(private modalCtrl: ModalController, private store: Store) { }

  async openEditItemDialog() {
    const modal = await this.modalCtrl.create({
      component: VocabularyManageDialogComponent,
      componentProps: { item: this.item }
    });
    return await modal.present();
  }

  changeLearned() {
    this.store.dispatch(new UpdateVocab(this.item.id, { ...this.item }));
  }

  deleteItem() {
    this.store.dispatch(new RemoveVocab(this.item.id));
  }
}
