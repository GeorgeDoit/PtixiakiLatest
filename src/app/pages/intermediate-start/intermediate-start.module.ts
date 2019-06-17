import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { IntermediateStartPage } from './intermediate-start.page';

const routes: Routes = [
  {
    path: '',
    component: IntermediateStartPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [IntermediateStartPage]
})
export class IntermediateStartPageModule {}
