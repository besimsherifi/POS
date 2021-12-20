import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Table } from 'src/app/models/table-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  tables:Table[] = [];
  mainFloor = true;
 

  constructor(private dataService: DataService, private router: Router, private afAuth: AngularFireAuth, private db: AngularFirestore) { }

  ngOnInit(): void {
    this.db.collection('tables', ref => ref.orderBy('number','asc')).valueChanges().subscribe((res:any) => {
      this.tables = res
      console.log(res);
    });
  }
  
  tableDetail(id:number){
    this.router.navigate(['details', id]);
  }

  isActive(){

  }

}
