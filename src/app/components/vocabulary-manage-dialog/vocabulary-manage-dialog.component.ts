import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';

import { Vocabulary } from '../../interfaces/vocabulary';
import { AddVocab, UpdateVocab } from '../../state/vocabulary.actions';

@Component({
  selector: 'app-vocabulary-manage-dialog',
  templateUrl: './vocabulary-manage-dialog.component.html',
  styleUrls: ['./vocabulary-manage-dialog.component.scss']
})
export class VocabularyManageDialogComponent implements OnInit {
  @Input() item: Vocabulary | undefined = undefined;

  form: FormGroup | undefined = undefined;

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private store: Store
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      de: [this.item?.german || '', [Validators.required, Validators.minLength(2)]],
      en: [this.item?.english || '', [Validators.required, Validators.minLength(2)]]
    })
  }

  save() {
    if (this.item) {
      this.store.dispatch(new UpdateVocab(
        this.item.id,
        {
          ...this.item,
          german: this.form!.value.de,
          english: this.form!.value.en
        }
      ));
    } else {
      this.store.dispatch(new AddVocab(
        {
          german: this.form!.value.de,
          english: this.form!.value.en,
          learned: false
        }
      ));
    }

    this.dismiss();
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
