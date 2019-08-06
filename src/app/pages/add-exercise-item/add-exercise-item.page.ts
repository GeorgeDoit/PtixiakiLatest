import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { DataService } from "src/app/services/data.service.js";


@Component({
  selector: 'app-add-exercise-item',
  templateUrl: './add-exercise-item.page.html',
  styleUrls: ['./add-exercise-item.page.scss'],
})

export class AddExerciseItemPage implements OnInit {

  exercise: any;
  private Uid: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storage: Storage,
    private afAuth: AngularFireAuth,
    private dataService: DataService
  ) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      if (params && params.exercise) {
        this.exercise = JSON.parse(params.exercise);
      }
    });

  }

  AddExercise() {

    this.afAuth.authState.subscribe(user => {

      if (user) {

        this.Uid = user.uid;
        let UidTraining = this.Uid + '/My-Training';

        this.dataService.setData(UidTraining, this.exercise);

        this.router.navigate(['my-training']);
      }
    });
  }

  abort() {
    this.router.navigateByUrl('add-exercise');
  }
}
