import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ShowUsersTrainingPage } from './show-users-training.page';

const routes: Routes = [
  {
    path: '',
    component: ShowUsersTrainingPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ShowUsersTrainingPage]
})
export class ShowUsersTrainingPageModule {}
