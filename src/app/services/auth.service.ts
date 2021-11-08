import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userLoggedIn: boolean = false;

  constructor(private router: Router, private afAuth:AngularFireAuth, private afs: AngularFirestore) { 
    this.afAuth.onAuthStateChanged((user) => {
      if (user){
        this.userLoggedIn = true
      }else{
        this.userLoggedIn = false;
      }
    })
  }

  loginUser(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Auth Service: loginUser: success');
        this.router.navigate(['/home']);
      })
  }

  logoutUser(): Promise<void> {
    return this.afAuth.signOut()
      .then(() => {
        this.router.navigate(['/login']);                    
      })
      .catch(error => {
        console.log('Auth Service: logout error...');
        console.log('error code', error.code);
        console.log('error', error);
        if (error.code)
          return error;
      });
  }


}
