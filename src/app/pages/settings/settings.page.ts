import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NavController, AlertController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { DataService } from 'src/app/services/data.service.js';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  lang: any;

  private Uid: string;
  private UidWeight: string;
  private UidBegginer: string;
  private UidIntermediate: string;
  private UidAdvanced: string;

  private keysToRemove: any;


  constructor(
    private navCtrl: NavController,
    public alertController: AlertController,
    public translate: TranslateService,
    private storage: Storage,
    private router: Router,
    private afAuth: AngularFireAuth,
    private dataService: DataService,

  ) { }


  ngOnInit() {

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.Uid = user.uid;
        this.UidWeight = user.uid + '/weight';
        this.UidBegginer = user.uid + '/begginer';
        this.UidIntermediate = user.uid + '/intermediate';
        this.UidAdvanced = user.uid + '/advanced';

        this.keysToRemove = [this.Uid, this.UidWeight, this.UidBegginer, this.UidIntermediate, this.UidAdvanced];
      }
    });
  }

  async Reset() {
    const alert = await this.alertController.create({
      header: 'Are you sure you want to restart your progress?',
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Continue',

          handler: () => {
            for (let key of this.keysToRemove) {
              this.dataService.deleteData(key);
            }
            setTimeout(() => { this.windowReload(); }, 1000);
          }
        }
      ],
      backdropDismiss: false,
    });
    await alert.present();
  }

  async windowReload() {
    await window.location.reload();
  }

  rate() {
    console.log('rate')
  }

  Reminder() {

    this.router.navigateByUrl('reminder')

  }

  restertProgress() {
    this.Reset();
  }

  share() {
    console.log("share");
  }

  Privacy() {
    console.log('clicked')
    this.navCtrl.navigateForward('privacy');
  }

  goHome() {
    this.navCtrl.navigateForward('tabs/home');
  }



}
