import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Auth2Service } from '../../services/auth2.service';
import { EmailValidator } from "../../validators/email";
import { HomePage } from "../home/home.page";


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public signupForm: FormGroup;

  authState: any = null;

  constructor(
    private afAuth: AngularFireAuth,
    public auth: Auth2Service,
    private router: Router,
    private toast: ToastController,
    private db: AngularFireDatabase,
    public navCtrl: NavController,
    public loading: LoadingController,
    public alertCtrl: AlertController,
    formBuilder: FormBuilder

  ) {

    this.signupForm = formBuilder.group({
      email: [
        "",
        Validators.compose([Validators.required, EmailValidator.isValid])
      ],
      password: [
        "",
        Validators.compose([Validators.minLength(6), Validators.required])
      ]
    });
  }

  ngOnInit() {
  }

  async presentAlert(message: string) {

    const alert = await this.alertCtrl.create({
      header: 'Alert',
      subHeader: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentLoad() {
    const load = await this.loading.create();
    await load.present();
  }

  signupUser(): void {
    if (!this.signupForm.valid) {

    } else {
      const email: string = this.signupForm.value.email;
      const password: string = this.signupForm.value.password;

      this.auth.signupUser(email, password).then(
        user => {
          this.presentAlert("Your account have been created Login to continue");
          this.navCtrl.navigateBack('login');
        },
        error => {

          this.presentAlert(error.message);

        }
      );
    }
  }

}
