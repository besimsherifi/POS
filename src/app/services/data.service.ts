import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  waiter = new BehaviorSubject('');

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) { 
  
  }

  getTables(){
    
  }


}
