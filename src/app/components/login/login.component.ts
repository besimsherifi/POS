import { Component, OnDestroy, OnInit, Pipe, PipeTransform } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'src/app/models/user-model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy{


  users: User[] = [];
  password: string = '';
  waiter: string = '';
  warning = false;
  usersSubscription: Subscription = new Subscription;


  constructor(private dataService: DataService, private router: Router, private afAuth: AngularFireAuth, private db: AngularFirestore) {

  }

  ngOnInit() {
    this.usersSubscription = this.db.collection('users').valueChanges().subscribe((res:any) => {
      this.users = res    
    });
  }

  loginUser() {
    this.users.forEach((user: any) => {
      if (this.waiter == user.username && this.password == user.password) {
        this.router.navigate(['/home']);
      } else if (this.waiter != user.username || this.password != user.password) {
        this.warning = true;
      }
    });
  }

  chosenWaiter(waiter: string) {
    this.waiter = waiter;
    this.dataService.waiter.next(this.waiter);
  }

  isActive(addClass: any) {
    return this.waiter == addClass;
  }

  deletePass() {
    let sliced = this.password.slice(0, this.password.length - 1);
    this.password = sliced
  }


  onCodeChanged(a: any) {
    this.password += a.toString();
    if (this.password.length > 4) this.password = this.password.substring(0, 4);
  }

  onCodeCompleted(a: any) {

  }

  ngOnDestroy(): void {
    if(this.usersSubscription){
      this.usersSubscription.unsubscribe();
    }
  }


}
