import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BegginerStartPage } from './begginer-start.page';

const routes: Routes = [
  {
    path: '',
    component: BegginerStartPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BegginerStartPage]
})
export class BegginerStartPageModule {}
