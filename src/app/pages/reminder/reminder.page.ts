import { Component, OnInit } from '@angular/core';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import { Platform, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service.js';
import { AngularFireAuth } from '@angular/fire/auth';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.page.html',
  styleUrls: ['./reminder.page.scss'],
})

export class ReminderPage implements OnInit {

  public myDate: any;
  x: any;
  id = 1;
  test: boolean = false;
  try: any;
  private Uid: string;
  private UidReminder: string;
  time: any;
  timerTable = [];
  i: number = 0;

  constructor(
    private plt: Platform,
    private localNotifications: LocalNotifications,
    public alertController: AlertController,
    private router: Router,
    private dataService: DataService,
    private afAuth: AngularFireAuth,
    private storage: Storage

  ) {

    this.plt.ready().then(() => {
      this.localNotifications.on('click').subscribe(res => {
        let msg = res.data ? res.data.mydata : '';
        this.showAlert(res.title, res.text, msg);
      });

      this.localNotifications.on('trigger').subscribe(res => {
        let msg = res.data ? res.data.mydata : '';
        this.showAlert(res.title, res.text, msg);
      });
    });

  }

  ngOnInit() {

    this.dataService.watchStorageNo4().subscribe((data: string) => {

      if (data == 'reminder') {

        console.log('reminder observable called');
        this.fillTimerTable();
      }

    });

    this.fillTimerTable();

  }

  showAlert(header, sub, msg) {
    this.alertController.create({
      header: header,
      subHeader: sub,
      message: msg,
      buttons: ["Ok"]
    }).then(alert => alert.present());
  }

  setTimer(time) {

    let timer = {

      "id": this.i,
      "time": time,
      "toggle": "false"

    }

    let UidReminder = this.Uid + '/Reminders';
    this.dataService.saveReminder(UidReminder, timer);
    this.i++;
  }

  abort() {
    this.router.navigateByUrl('tabs/settings')
  }

  async fillTimerTable() {

    this.afAuth.authState.subscribe(async user => {

      if (user) {

        this.Uid = user.uid;

        this.UidReminder = this.Uid + '/Reminders';

        await this.storage.get(this.UidReminder).then((val) => {

          this.timerTable = JSON.parse(val);

        });
      }
    });
  }

  deleteTimer(timer) {

    let UidReminder = this.Uid + '/Reminders';

    this.timerTable = this.timerTable.filter(x => x.id !== timer);
    this.dataService.deleteReminder(UidReminder, this.timerTable);

  }

  change(timer) {

    let UidReminder = this.Uid + '/Reminders';
    this.dataService.deleteReminder(UidReminder, this.timerTable);
    let i = 0;

    var hs = timer.time.slice(0, 2);
    var mins = timer.time.slice(3, 5);
    var hours = +hs;
    console.log(hours);
    var minutes = +mins;


    if (timer.toggle == true) {

      this.localNotifications.schedule({
        id: i,
        title: 'Hey',
        text: "Time to train again!",
        trigger: {

          every: {
            hour: hours,
            minute: minutes
          }

        },
        led: 'FF0000',
        sound: 'file://assets/audio/message.mp3',
        foreground: true
      });
    }

    i++;

  }
}


