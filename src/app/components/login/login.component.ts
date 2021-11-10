import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
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
  users: any;
  password: string = '';
  waiter: string = '';


  constructor(private authService: AuthService, private router: Router, private afAuth: AngularFireAuth, private db: AngularFirestore) {

    this.isProgressVisible = false;

    this.loginForm = new FormGroup({
        'email': new FormControl('', [Validators.required, Validators.email]),
        'password': new FormControl('', Validators.required)
    });

    this.firebaseErrorMessage = '';
}

 ngOnInit() {
    if (this.authService.userLoggedIn) {                       // if the user's logged in, navigate them to the dashboard (NOTE: don't use afAuth.currentUser -- it's never null)
        this.router.navigate(['/dashboard']);
    }
     this.db.collection('users').valueChanges().subscribe((res) => {this.users = res
    console.log(this.users);

    })
}

loginUser() {

    // if(this.loginForm.value.email == this.users[0].username){
    //   console.log('ok');
    // }else{
    //   console.log('not ok');
    // }
    
    if(this.waiter == this.users[0].username && this.password == this.users[0].password){
      console.log('ok');
    }else{
      console.log('not ok');
      
    }

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
   
}

chosenWaiter(waiter: string){
  this.waiter = waiter;
  console.log(this.waiter);
}

 click(num: number){
  //  this.password.push(num);
  this.password += num.toString();
   console.log(this.password);
   
 }

 deletePass(){
    let sliced = this.password.slice(0, this.password.length - 1);
    this.password = sliced    
 }

 

}
