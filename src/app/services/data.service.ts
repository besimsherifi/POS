import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';
import { environment as env } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  waiter = new BehaviorSubject('');

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore, private http: HttpClient) { 
  
  }

  getTables(){
    return this.db.collection('tables', ref => ref.orderBy('number','asc')).valueChanges();
  }

  getMeal(meal: string){
    return this.http.get(`https://api.spoonacular.com/recipes/complexSearch?query=${meal}`);
  }


}
