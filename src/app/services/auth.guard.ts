import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Auth2Service } from '../services/auth2.service';
import { Router } from '@angular/router';
import { tap, map, take } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: Auth2Service,
    private router: Router,
    public alertController: AlertController
  ) { }

  async presentAlert() {

    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'You need to login to continue',
      buttons: ['OK']
    });

    await alert.present();
  }

  canActivate(

    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.auth.user.pipe(
      take(1),
      map(user => !!user),
      tap(loggedIn => {
        if (!loggedIn) {

          this.presentAlert();
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
