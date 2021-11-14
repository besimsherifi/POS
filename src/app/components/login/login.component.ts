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
  warning = false;


  constructor(private authService: AuthService, private router: Router, private afAuth: AngularFireAuth, private db: AngularFirestore) {
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
    this.users.forEach((user: any) => {
      if(this.waiter == user.username && this.password == user.password){
        this.router.navigate(['/home']);
      }else if(this.waiter != user.username || this.password != user.password){
        console.log('wrong password');
        this.warning = true;
      }
    });
}

chosenWaiter(waiter: string){
  this.waiter = waiter;
}

isActive(addClass: any){
  return this.waiter == addClass;
}

 click(num: number){
  this.password += num.toString();
 }

 deletePass(){
    let sliced = this.password.slice(0, this.password.length - 1);
    this.password = sliced    
 }

 

}
