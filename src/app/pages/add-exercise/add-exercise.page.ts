import { Component, OnInit } from '@angular/core';
import * as lessons from "../../../models/allExercises.json";
import { Router, NavigationExtras } from '@angular/router';
import { ExerciseService } from 'src/app/services/exercise.service.js';


@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.page.html',
  styleUrls: ['./add-exercise.page.scss'],
})

export class AddExercisePage implements OnInit {

  public exersices: any;

  constructor(private router: Router, private exerciseService: ExerciseService) { }

  ngOnInit() {

    this.exersices = lessons.exercises;

  }

  test(exercise) {

    let navigationExtras: NavigationExtras = {
      queryParams: {
        exercise: JSON.stringify(exercise)
      }
    };

    this.router.navigate(['add-exercise-item'], navigationExtras);
  }

  abort() {
    this.router.navigateByUrl('tabs/home');
  }
}
