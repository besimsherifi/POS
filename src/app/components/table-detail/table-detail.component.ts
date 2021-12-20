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
  tableId: any; 
  routeSub:Subscription = new Subscription;

  constructor(private db: AngularFirestore, private activatedRoute: ActivatedRoute) { }

   ngOnInit(){
     this.getId()
      this.getData();
   
  }

  getData(){
    setTimeout(() => {
      this.db.collection('tables', ref => ref.where("number", "==", this.tableId)).valueChanges().subscribe((res:any)=>{
        this.table = res;
        console.log(res);
        console.log(this.table,"table");
        
      });
    }, 5000);
    
  }

  getId(){
    setTimeout(() => {
      this.routeSub = this.activatedRoute.params.subscribe((params: Params)=>{
        this.tableId = params['id'];
        console.log(this.tableId);
        });
    }, 4000);
   
  }





  ngOnDestroy(){
    if(this.routeSub){
      this.routeSub.unsubscribe();
    }
  }

}
