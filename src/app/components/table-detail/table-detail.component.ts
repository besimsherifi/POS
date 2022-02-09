import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Table } from 'src/app/models/table-model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-table-detail',
  templateUrl: './table-detail.component.html',
  styleUrls: ['./table-detail.component.scss']
})


export class TableDetailComponent implements OnInit, OnDestroy {

  table: Table[] = [];
  tableId: number = 0; 
  meals: any = [];
  routeSub:Subscription = new Subscription;
  price: any = [];
  order: any = [];
  tempOrder: any = [];

  // uniqueCount = ["a","b","c","d","d","e","a","b","c","f","g","h","h","h","e","a"];

  counts:any = {};


  

  constructor(private db: AngularFirestore, private activatedRoute: ActivatedRoute, private http: HttpClient, private data: DataService) { }

    ngOnInit(){
    this.routeSub = this.activatedRoute.params.subscribe((params: Params)=>{
      this.tableId = Number(params['id']);
      });
    this.db.collection('tables', ref => ref.where("number", "==", this.tableId)).valueChanges({ idField: 'propertyId' }).subscribe((res:any)=>{
      this.table = res;
      this.order = res[0].order;
      this.tempOrder = res[0].order;
      console.log(this.order);
      
    }); 


    this.order.forEach((x:any) => { this.counts[x.meal] = (this.counts[x.meal] || 0) + 1; });
    console.log(this.counts)

    
    

  }


  onSubmit(form: NgForm){
    this.db.collection('tables').doc(this.table[0].propertyId).update({reserver: form.controls.reserver.value});
  }

  
  getRandomInt(min = 10, max = 30) : number{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
  }

  async getMeal(meal: string){
   const res:any = await this.data.getMeal(meal).
    toPromise();
    this.meals = res.results;

    // this.data.getMeal(meal).subscribe((res:any)=> {
    //   this.meals = res.results                          kjo perdoret normall kshau ama pse osht async perdoret opsioni nalt
    // });

    this.price = [];
    for (let i = 0; i < this.meals.length; i++) {
      this.price.push(this.getRandomInt());                 //random number generator for prices, the api doesnt provide prices
    } 
  }

  mealClick(meal: any, price:any){
    this.tempOrder.push({meal, price});     //kjo perdoret se firebase nuk i pranon rekordet duplikat ose si regjistron
    // console.log(this.tempOrder);
    
      this.db.collection('tables').doc(this.table[0].propertyId).update({order:(this.tempOrder)})

      this.order.forEach((x:any) => { this.counts[x.meal] = (this.counts[x.meal] || 0) + 1; });
      console.log(this.counts)
      

  }
  



  ngOnDestroy(){
    if(this.routeSub){
      this.routeSub.unsubscribe();
    }
  }

}
