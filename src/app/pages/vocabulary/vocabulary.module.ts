import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { NgxsModule } from '@ngxs/store';

import { VocabularyPage } from './vocabulary.page';
import { VocabularyPageRoutingModule } from './vocabulary-routing.module';
import { VocabularyListComponent } from '../../components/vocabulary-list/vocabulary-list.component';
import { VocabularyItemComponent } from '../../components/vocabulary-list/vocabulary-item/vocabulary-item.component';
import {
  VocabularyManageDialogComponent
} from '../../components/vocabulary-manage-dialog/vocabulary-manage-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    VocabularyPageRoutingModule,
    TranslatePipe,
    NgxsModule
  ],
  declarations: [
    VocabularyPage,
    VocabularyListComponent,
    VocabularyItemComponent,
    VocabularyManageDialogComponent
  ]
})
export class VocabularyPageModule {}
