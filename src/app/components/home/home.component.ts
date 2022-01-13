import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Table } from 'src/app/models/table-model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  tables:Table[] = [];
  mainFloor = true;

  constructor(private router: Router, private db: AngularFirestore, private http:HttpClient, private data: DataService) { }

  ngOnInit(): void {
    this.data.getTables().subscribe((res:any) => {
      this.tables = res;
    })
  }
  
  tableDetail(id:number){
    this.router.navigate(['details', id]);
  }

  isActive(){

  }

}
