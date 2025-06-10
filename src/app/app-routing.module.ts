import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { VocabularyPageModule } from './pages/vocabulary/vocabulary.module';

const routes: Routes = [
  {
    path: 'vocabulary',
    loadChildren: () => import('./pages/vocabulary/vocabulary.module').then(m => m.VocabularyPageModule)
  },
  {
    path: '',
    redirectTo: 'vocabulary',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'vocabulary',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
