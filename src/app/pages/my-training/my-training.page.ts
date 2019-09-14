import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { DataService } from 'src/app/services/data.service.js';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-my-training',
  templateUrl: './my-training.page.html',
  styleUrls: ['./my-training.page.scss'],
})
export class MyTrainingPage implements OnInit {

  exercise: any;
  ex: any;
  Uid: any;
  UidTraining: any;
  UidPlan: any;

  test = { 'id': '', 'data': '' };

  public training: any;

  constructor(
    private router: Router,
    private storage: Storage,
    private afAuth: AngularFireAuth,
    private dataService: DataService,
    private alertControler: AlertController,

  ) { }

  ngOnInit() {

    this.dataService.watchStorageNo2().subscribe((data: string) => {

      if (data === 'test') {
        this.getTrainingData();
      }
    });

    this.getTrainingData();
  }

  getTrainingData() {
    this.afAuth.authState.subscribe(async user => {
      if (user) {
        this.Uid = user.uid;
        this.UidTraining = this.Uid + '/My-Training';
        await this.storage.get(this.UidTraining).then((val) => {
          if (val != null) {

            this.exercise = val;

            this.exercise = JSON.parse(this.exercise);
          }
        });
      }
    });
  }

  addExercise() {
    this.router.navigateByUrl('add-exercise');
  }

  deleteExercise(ex) {
    this.dataService.deleteTrainingEx(this.UidTraining, ex);
  }
  Save() {
    this.presentAlert();
  }

  async  presentAlert() {
    const alert = await this.alertControler.create({
      header: 'Please enter a name for your training',
      inputs: [
        {
          name: 'training',
          placeholder: 'Your Training Name',
        }
      ],
      buttons: [{ text: 'Cancel', },
      {
        text: 'Ok',
        handler: (inputData) => {
          this.training = inputData.training;

          this.UidPlan = this.Uid + '/Plan';

          this.test.id = this.training;

          this.test.data = this.exercise;

          this.dataService.setData(this.UidPlan, this.test);

          this.UidTraining = this.Uid + '/My-Training';

          this.dataService.deleteTestData(this.UidTraining);

          let navigationExtras: NavigationExtras = {
            queryParams: {
              CustomTraining: this.training
            }
          };
          this.router.navigate(['tabs/home']);
        }
      }],

      backdropDismiss: false,
    });
    return await alert.present();
  }

  abort() {
    this.router.navigateByUrl('tabs/home');
  }

}
