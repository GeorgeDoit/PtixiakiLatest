import { Injectable } from '@angular/core';
import firebase from '@firebase/app';
// import Firebase Authentication (optional)
import '@firebase/auth';
// import Firebase Realtime Database (optional)
import '@firebase/database';

import { User } from 'firebase/app';
// import Cloud Firestore (optional)
import '@firebase/firestore';
import { Observable } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Auth2Service {

  // Observable that can change in real time. For example when the user sings in or signs out.
  public user: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.user = this.afAuth.user;
  }


  async loginUser(email: string, password: string): Promise<any> {

    return firebase.auth().signInWithEmailAndPassword(email, password);
  }
  // Database and authentication are not “connected,” like that, creating a user does not store its information inside the database,
  // it saves it in the authentication module of our app, so we need to copy that data inside the database manually.
  async signupUser(email: string, password: string): Promise<any> {

    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(newUserCredential => {
        firebase.database().ref(`/userProfile/${newUserCredential.user.uid}/email`).set(email);
      }).catch(error => {
        console.error(error);
        throw new Error(error);
      });
  }

  // sometimes the app is still listening to the database references, and it creates errors when your security rules are set up,
  // for that, we need to turn the reference off before logging out
  logoutUser(): Promise<any> {

    const userId: string = firebase.auth().currentUser.uid;
    firebase.database().ref(`/userProfile/${userId}`).off();
    const result = firebase.auth().signOut();
    if (result) {
      return this.router.navigate(['login']);
    }
  }

  // Firebase will take care of the reset login. They send an email to your user with a password reset link,
  async resetPassword(email: string): Promise<any> {
    return firebase.auth().sendPasswordResetEmail(email);
  }
}
