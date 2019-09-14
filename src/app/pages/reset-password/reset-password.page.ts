import { Component, OnInit } from '@angular/core';
import { ToastController, NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Auth2Service } from '../../services/auth2.service';
import { EmailValidator } from "../../validators/email";
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  public resetPasswordForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public auth: Auth2Service,
    public alertCtrl: AlertController,
    formBuilder: FormBuilder


  ) {
    this.resetPasswordForm = formBuilder.group({
      email: [
        "",
        Validators.compose([Validators.required, EmailValidator.isValid])
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

  resetPassword(): void {
    if (!this.resetPasswordForm.valid) {

    } else {
      const email: string = this.resetPasswordForm.value.email;
      this.auth.resetPassword(email).then(
        user => {
          this.presentAlert("Check your email for a password reset link");
          return this.navCtrl.navigateBack('login')

        },
        error => {
          this.presentAlert(error.message);

        }
      );
    }
  }
}
