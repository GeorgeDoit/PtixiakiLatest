import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddExerciseItemPage } from './add-exercise-item.page';

const routes: Routes = [
  {
    path: '',
    component: AddExerciseItemPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddExerciseItemPage]
})
export class AddExerciseItemPageModule {}
