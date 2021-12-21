import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Table } from 'src/app/models/table-model';

@Component({
  selector: 'app-table-detail',
  templateUrl: './table-detail.component.html',
  styleUrls: ['./table-detail.component.scss']
})
export class TableDetailComponent implements OnInit, OnDestroy {

  table: Table[] = [];
  tableId: number = 0; 
  routeSub:Subscription = new Subscription;

  constructor(private db: AngularFirestore, private activatedRoute: ActivatedRoute) { }

   ngOnInit(){
    this.routeSub = this.activatedRoute.params.subscribe((params: Params)=>{
      console.log(params,'params');
      this.tableId = Number(params['id']);
      console.log(this.tableId);
      });
    this.db.collection('tables', ref => ref.where("number", "==", this.tableId)).valueChanges().subscribe((res:any)=>{
      this.table = res;
      console.log(res);
      console.log(this.table,"table");
    });
   
  }



  

  ngOnDestroy(){
    if(this.routeSub){
      this.routeSub.unsubscribe();
    }
  }

}
