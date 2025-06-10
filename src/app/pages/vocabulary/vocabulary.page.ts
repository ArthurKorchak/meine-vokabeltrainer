import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

import {
  VocabularyManageDialogComponent
} from '../../components/vocabulary-manage-dialog/vocabulary-manage-dialog.component';

@Component({
  selector: 'app-vocabulary',
  templateUrl: 'vocabulary.page.html',
  styleUrls: ['vocabulary.page.scss'],
  standalone: false,
})
export class VocabularyPage {

  constructor(private modalCtrl: ModalController) { }

  async openAddItemDialog() {
    const modal = await this.modalCtrl.create({ component: VocabularyManageDialogComponent });
    return await modal.present();
  }
}
