import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { orderBy } from 'lodash';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  tables:any[] = [];

  constructor(private dataService: DataService, private router: Router, private afAuth: AngularFireAuth, private db: AngularFirestore) { }

  ngOnInit(): void {
    this.db.collection('tables').valueChanges().subscribe((res) => {
      this.tables = res
      console.log(res);
    });
  }

}
