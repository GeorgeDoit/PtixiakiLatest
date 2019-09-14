import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Network } from '@ionic-native/network/ngx';
import { Auth2Service } from 'src/app/services/auth2.service';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController, ToastController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service.js';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {

  lessonFinished = null;

  textArray = {};

  firstDay = 1;

  userKg: any;

  UidKg: any;

  lastDay = 30;

  BegginerLessons = [];

  IntermediateLessons = [];

  AdvancedLessons = [];

  customTrainingData = [];

  customTrainingDataId: string;

  private Uid: string;

  private UidTraining: string;

  private UidPlanId: string;

  public val: any;

  public test: any;

  UidTrainings: string;

  CustomUserTrainings = [];
  CustomUserTrainings2 = [];

  lessonPicked: number;
  NavigateTo: string;

  slideOpts = {
    slidesPerView: 1,
    spaceBetween: 10,
    centeredSlides: true,
    initialSlide: 1,
    speed: 400
  };

  slides: any = [
    {
      img: '../../assets/images/test4.jpg',
      title: 'begginer'
    },
    {
      img: '../../assets/images/test3.jpg',
      title: 'intermediate'
    },
    {
      img: '../../assets/images/test2.jpg',
      title: 'advanced'
    },
    {
      img: '../../assets/images/test.jpg',
      title: 'My Training'
    }
  ];

  constructor(

    private router: Router,
    private network: Network,
    public authServ: Auth2Service,
    private storage: Storage,
    private afAuth: AngularFireAuth,
    public alertController: AlertController,
    public toast: ToastController,
    private dataService: DataService

  ) { }

  ngOnInit() {

    this.dataService.watchStorage().subscribe((data: string) => {

      this.AdvancedLessons = [];
      this.BegginerLessons = [];
      this.IntermediateLessons = [];
      this.CustomUserTrainings2 = [];

      if (data === 'changed') {
        this.checkForUser();
        this.checkForPlan();
      }
    });

    this.checkForUser();
    this.checkForPlan();

    this.network.onConnect().subscribe(
      data => { console.log(data); }, error => console.log(error)
    );

    this.network.onDisconnect().subscribe(
      data => { console.log(data); }, error => console.log(error)
    );
  }

  async navigateTo(lessonPicked, Navigation) {

    this.NavigateTo = Navigation + '/' + lessonPicked;

    this.router.navigateByUrl(this.NavigateTo);

  }

  addExersice() {

    this.router.navigateByUrl('add-exercise');

  }

  checkForPlan() {

    this.afAuth.authState.subscribe(async user => {
      if (user) {
        this.Uid = user.uid;
        this.UidTraining = this.Uid + '/Plan';
        await this.storage.get(this.UidTraining).then((val) => {

          this.customTrainingData = JSON.parse(val);

          if (this.customTrainingData != null) {

            this.dataService.deleteTrainingId(this.UidTraining);
            this.CustomUserTrainings = this.customTrainingData;
            this.customTrainingDataId = this.customTrainingData['id'];

            this.UidPlanId = this.Uid + '/' + this.customTrainingDataId;

            this.dataService.setCustomPlanData(this.UidPlanId, this.customTrainingData['data']);

            this.dataService.deleteData(this.UidPlanId);

            if (this.CustomUserTrainings != null) {
              this.UidTrainings = this.Uid + '/UserTrainings'
              this.dataService.saveTrainings(this.UidTrainings, this.CustomUserTrainings);
            }
          }
        });

        this.UidTrainings = this.Uid + '/UserTrainings';

        await this.storage.get(this.UidTrainings).then((val) => {

          this.customTrainingData = JSON.parse(val);

          if (this.customTrainingData != null) {

            this.CustomUserTrainings2 = this.customTrainingData;
          }

        });

        let id = this.Uid + '/' + this.CustomUserTrainings['id'];
        this.dataService.deleteTrainingId(id);

      }
    });
  }

  checkForUser() {

    this.afAuth.authState.subscribe(user => {

      if (user) {

        this.Uid = user.uid;

        var UidBegginer = this.Uid + '/begginer';

        var UidIntermadiate = this.Uid + '/intermediate';

        var UidAdvanced = this.Uid + '/advanced';


        this.storage.get(UidBegginer).then((val) => {

          this.lessonFinished = JSON.parse(val);

          for (var i = this.firstDay; i <= this.lastDay; i++) {

            this.textArray = {
              lessonID: i,
              disabled: false
            };

            this.BegginerLessons.push(this.textArray);
          }

          if (this.lessonFinished) {

            for (var i = 0; i < this.lessonFinished.length; i++) {

              this.BegginerLessons.find(item => item.lessonID == this.lessonFinished[i].lessonId).disabled = true;

            }

          }

        });

        this.storage.get(UidIntermadiate).then((val) => {

          this.lessonFinished = JSON.parse(val);

          // this.dayFinished = Object.keys(this.dayFinished).map(key => ({ type: key, value: this.dayFinished[key] }));

          for (var i = this.firstDay; i <= this.lastDay; i++) {

            this.textArray = {
              lessonID: i,
              disabled: false
            };

            this.IntermediateLessons.push(this.textArray);
          }

          if (this.lessonFinished) {

            for (var i = 0; i < this.lessonFinished.length; i++) {

              this.IntermediateLessons.find(item => item.lessonID == this.lessonFinished[i].lessonId).disabled = true;

            }

          }

        });

        this.storage.get(UidAdvanced).then((val) => {


          this.lessonFinished = JSON.parse(val);

          // this.dayFinished = Object.keys(this.dayFinished).map(key => ({ type: key, value: this.dayFinished[key] }));

          for (var i = this.firstDay; i <= this.lastDay; i++) {

            this.textArray = {
              lessonID: i,
              disabled: false
            };

            this.AdvancedLessons.push(this.textArray);
          }

          if (this.lessonFinished) {

            for (var i = 0; i < this.lessonFinished.length; i++) {
              if (Number(this.lessonFinished[i].lessonId)) {

                this.AdvancedLessons.find(item => item.lessonID == this.lessonFinished[i].lessonId).disabled = true;
              }
            }
          }

        });

      }

    });
  }

  async deleteUserPlan(e) {

    this.CustomUserTrainings2 = this.CustomUserTrainings2.filter(x => x.id !== e['id']);

    this.dataService.setTrainingsData(this.Uid + '/UserTrainings', this.CustomUserTrainings2);

  }

  navigateToPlan(data) {

    let navigationExtras: NavigationExtras = {

      queryParams: {
        exercise: JSON.stringify(data)
      }

    };

    this.router.navigate(['show-users-training'], navigationExtras);

  }

}