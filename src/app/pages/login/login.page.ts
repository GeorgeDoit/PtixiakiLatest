import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NavController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { LoadingController } from "@ionic/angular";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EmailValidator } from "../../validators/email";
import { Auth2Service } from "../../services/auth2.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private router: Router,
    public auth: Auth2Service,
    private navCtrl: NavController,
    public alertController: AlertController,
    public loading: LoadingController,
    public formBuilder: FormBuilder
  ) {
    this.loginForm = formBuilder.group({
      email: [
        "",
        Validators.compose([Validators.required, EmailValidator.isValid])
      ],
      password: [
        "",
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: "Alert",
      subHeader: message,
      buttons: ["OK"]
    });

    await alert.present();
  }

  async presentLoad() {
    const load = await this.loading.create();
    await load.present();
  }

  ngOnInit() { }

  async goToSignup() {
    this.navCtrl.navigateForward("register");
  }

  async goToResetPassword() {
    this.navCtrl.navigateForward("reset-password");
  }

  async loginUser() {
    if (!this.loginForm.valid) {

    } else {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      this.auth.loginUser(email, password).then(
        authData => {
          setTimeout(() => { this.windowReload(); }, 1000);
          this.router.navigate(["tabs/home"]);
        },
        error => {
          this.presentAlert(error.message);
        }
      );
    }
  }

  async windowReload() {
    await window.location.reload();
  }
}
