import { Component } from '@angular/core';

import { Platform, ToastController, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { timer } from 'rxjs';
import { Network } from '@ionic-native/network/ngx';
import 'firebase/auth';
import { TranslateService } from '@ngx-translate/core';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';

import * as shuffleArray from 'shuffle-array';

@Component({

  selector: 'app-root',
  templateUrl: 'app.component.html'

})

export class AppComponent {

  encourageUsageMessages = [
    'Hey,Dont forget to do some boxing!',
    'Lets learn some more boxing!',
    'Missed some days,come back!',
    'Lets do some shadowBoxing!',
    'Dont forget to drink water!',
    'Common,Lets do a fast workout!',
    'Having smaller but more common meals a day is the way!',
    'Beautifull day to do some boxing!',
    '30 minutes a day will make a difference!',
  ];

  showSplash = true; // <-- show animation

  lastTimeBackPress = 0;
  timePeriodToExit = 2000;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private network: Network,
    private toast: ToastController,
    private translate: TranslateService,
    private alertController: AlertController,
    private localNotification: LocalNotifications

  ) {

    this.platform.backButton.subscribe(() => {

      if (new Date().getTime() - this.lastTimeBackPress >= this.timePeriodToExit) {
        this.lastTimeBackPress = new Date().getTime();
        this.presentAlertConfirm();

      }

    });

    this.initializeApp();

  }

  initializeApp() {

    this.platform.ready().then(() => {

      this.statusBar.styleDefault();
      this.splashScreen.hide();

      timer(3000).subscribe(() => this.showSplash = false) // <-- hide animation after 3s

      shuffleArray(this.encourageUsageMessages).forEach((message, index) => {

        // this.localNotification.schedule({
        //   id: index,
        //   text: message,
        //   trigger: {

        //     in: 1 + (index),
        //     unit: ELocalNotificationTriggerUnit.MINUTE

        //   }
        // });

      });

    });


    this.showDevice();

    this.network.onConnect().subscribe(data => {

      this.displayNetworkUpdate(data.type);

    }, error => console.error(error));

    this.network.onDisconnect().subscribe(data => {

      this.displayNetworkUpdate(data.type);

    }, error => console.error(error));

  }

  async showDevice() {
    const toasty = await this.toast.create({
      message: `You are now using ${this.platform.platforms()}`,
      duration: 3000
    });
    toasty.present();
  }

  async displayNetworkUpdate(connectionState: string) {
    const connectionType = this.network.type;

    const toasty = await this.toast.create({
      message: `You are now ${connectionState} via ${connectionType}.`,
      duration: 3000
    });
    toasty.present();
  }

  async presentAlertConfirm() {

    const alert = await this.alertController.create({
      // header: 'Confirm!',
      message: 'Are you sure you want to exit the app?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => { }
      }, {
        text: 'Close App',
        handler: () => {
          navigator['app'].exitApp();
        }
      }]
    });

    await alert.present();

  }

  private initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');


    if (this.translate.getBrowserLang() !== undefined) {
      this.translate.use(this.translate.getBrowserLang());
    }
    else {
      this.translate.use('en'); // Set your language here
    }
  }

}


