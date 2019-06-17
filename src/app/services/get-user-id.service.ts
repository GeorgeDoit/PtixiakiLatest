import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class GetUserIdService {

  public Uid: any;

  constructor(
    private afAuth: AngularFireAuth,
  ) { }


  getUserId() {

    this.afAuth.authState.subscribe(user => {

      if (user) {

        this.Uid = user.uid;
        return this.Uid;

      }
    });

  }

}
