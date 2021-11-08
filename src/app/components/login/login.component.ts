import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { collection, doc, setDoc } from "firebase/firestore"; 
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isProgressVisible: boolean = false;
  loginForm: any;
  firebaseErrorMessage: string = '';
  // usersRef = collection(this.db, "cities");
  user: any;


  constructor(private authService: AuthService, private router: Router, private afAuth: AngularFireAuth, private db: AngularFirestore) {

    this.isProgressVisible = false;

    this.loginForm = new FormGroup({
        'email': new FormControl('', [Validators.required, Validators.email]),
        'password': new FormControl('', Validators.required)
    });

    this.firebaseErrorMessage = '';
}

async ngOnInit() {
    if (this.authService.userLoggedIn) {                       // if the user's logged in, navigate them to the dashboard (NOTE: don't use afAuth.currentUser -- it's never null)
        this.router.navigate(['/dashboard']);
    }
     this.db.collection('users').valueChanges().subscribe((res) => {this.user = res
    console.log(this.user);

    })
    await setTimeout(() => {
      console.log(this.user,"timeout");
      
    }, 2);
    
}

loginUser() {
    this.isProgressVisible = true;                          // show the progress indicator as we start the Firebase login process

    if (this.loginForm.invalid)
        return;

    // this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password).then((result) => {
    //     this.isProgressVisible = false;                     // no matter what, when the auth service returns, we hide the progress indicator
    //     if (result == null) {                               // null is success, false means there was an error
    //         console.log('logging in...');
    //         this.router.navigate(['/home']);                // when the user is logged in, navigate them to dashboard
    //     }
    //     else if (result.isValid == false) {
    //         console.log('login error', result);
    //         this.firebaseErrorMessage = result.message;
    //     }
    // });
    if(this.loginForm.value.email == this.user.username){
      console.log('its okay');
      
    }
    console.log(this.user,"lpl");
    
}


}
