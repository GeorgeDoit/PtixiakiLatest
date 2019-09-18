import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service.js';
import { AngularFireAuth } from '@angular/fire/auth';
import { formatDate } from "@angular/common";

@Component({
  selector: 'app-show-users-training',
  templateUrl: './show-users-training.page.html',
  styleUrls: ['./show-users-training.page.scss'],
})
export class ShowUsersTrainingPage implements OnInit {

  private Uid: string;
  private UidAdvanced: string;

  public plan: any;
  public burned = 0;
  public noOfItem: any;
  public lessonId: any;

  today = new Date();
  jstoday = "";

  constructor(
    private route: ActivatedRoute,
    public alertController: AlertController,
    private navCtrl: NavController,
    private router: Router,
    public dataService: DataService,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      if (params && params.exercise) {
        this.plan = JSON.parse(params.exercise);
      }
    });

    this.afAuth.authState.subscribe(user => {

      if (user) {

        this.Uid = user.uid;
        this.UidAdvanced = this.Uid + '/advanced';

      }
    });

    this.lessonId = this.plan.id;
    this.noOfItem = 1;
    this.jstoday = formatDate(this.today, "dd-MM", "en-US", "+0530");

  }

  async Quit() {
    const alert = await this.alertController.create({
      header: "DONT QUIT! FEELING TIRED MEANS ITS WORKING!",
      buttons: [
        {
          text: "Quit",
          handler: () => {
            this.navCtrl.navigateBack("tabs/home");
          }
        },
        {
          text: "Continue",
          handler: () => {
            console.log("Confirm Continue");
          }
        }
      ]
    });

    await alert.present();
  }

  async Finish() {

    const alert = await this.alertController.create({
      header: "Congrats.You finished your boxing lesson!",
      buttons: [
        {
          text: "Continue",
          handler: () => {

            let PlanId = 'show-users-training-end/' + this.plan.id;
            this.router.navigateByUrl(PlanId);

          }
        }
      ],
      backdropDismiss: false,
      cssClass: "my-custom-class"
    });

    await alert.present();
  }

  async abort() {
    this.Quit();
  }

  async done(calories) {

    var x = +calories;

    this.burned += x;

    if (this.noOfItem < this.plan.data.length) {

      this.noOfItem += 1;

    } else {

      const ChartData = {

        lessonId: this.lessonId,
        calories: this.burned,
        date: this.jstoday

      };

      this.dataService.setData(this.UidAdvanced, ChartData);

      this.Finish();

    }
  }


}
