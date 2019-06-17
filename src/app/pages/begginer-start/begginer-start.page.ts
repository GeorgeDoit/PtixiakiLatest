import { Component, OnInit } from "@angular/core";
import * as lessons from "../../../models/begginer.json";
import { AlertController, NavController } from "@ionic/angular";
import { Router, ActivatedRoute } from "@angular/router";
import { DataService } from "src/app/services/data.service.js";
import { formatDate } from "@angular/common";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: 'app-begginer-start',
  templateUrl: './begginer-start.page.html',
  styleUrls: ['./begginer-start.page.scss'],
})
export class BegginerStartPage implements OnInit {

  private Uid: string;
  private UidBegginer: string;
  public warmup: any;
  public exersices: any;
  public noOfItem: any;
  public burned = 0;
  public lessonId: any;

  test: any;

  today = new Date();
  jstoday = "";

  FullWork = [];

  sliderConfig = {
    slidesPerView: 1,
    spaceBetween: 10,
    centeredSlides: true
  };

  constructor(
    public alertController: AlertController,
    private navCtrl: NavController,
    private router: Router,
    private route: ActivatedRoute,
    public dataService: DataService,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit() {

    this.afAuth.authState.subscribe(user => {

      if (user) {

        this.Uid = user.uid;
        this.UidBegginer = this.Uid + '/begginer';

      }
    });

    this.lessonId = this.route.snapshot.paramMap.get("id");

    this.test = this.router.url;


    this.warmup = lessons.warmup;
    this.exersices = lessons.exercises;

    for (let i = 0; i < this.warmup.length; i++) {

      this.FullWork[i] = this.warmup[i];

    }
    for (let i = 0; i < this.exersices.length; i++) {

      this.FullWork.push(this.exersices[i]);
    }

    console.log(this.FullWork);
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

            let lessonId = 'begginer-end/' + this.lessonId;
            this.router.navigateByUrl(lessonId);

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

    if (this.noOfItem < this.FullWork.length) {

      this.noOfItem += 1;

    } else {

      const ChartData = {

        lessonId: this.lessonId,
        calories: this.burned,
        date: this.jstoday

      };

      this.dataService.setData(this.UidBegginer, ChartData);

      this.Finish();

    }
  }

}
