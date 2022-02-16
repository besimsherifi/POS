import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { arrayRemove, arrayUnion } from 'firebase/firestore';
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
  total: number = 0;

  uniqueCount = ["a","b","c","d","d","e","a","b","c","f","g","h","h","h","e","a"];

  counts:any = {};


  

  constructor(private db: AngularFirestore, private activatedRoute: ActivatedRoute, private http: HttpClient, private data: DataService) { }

    ngOnInit(){
    this.routeSub = this.activatedRoute.params.subscribe((params: Params)=>{
      this.tableId = Number(params['id']);
      });
    this.db.collection('tables', ref => ref.where("number", "==", this.tableId)).valueChanges({ idField: 'propertyId' }).subscribe((res:any)=>{
      this.table = res;
      this.order = res[0].order;
      if(res[0].order){
        this.tempOrder = res[0].order;
      }
      console.log(this.order);
      if(this.uniqueCount.includes('a')){
        console.log();
        
      }
     
    }); 


    this.order.forEach((x:any) => { this.counts[x.meal] = (this.counts[x.meal] || 0) + 1; });
    // console.log(this.counts)


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

  mealClick(meal: any, price:any, quantity: number){
         //kjo perdoret se firebase nuk i pranon rekordet duplikat ose si regjistron
    // console.log(this.tempOrder);
    
    
    for (let i = 0; i < this.tempOrder.length; i++) {
      const element = this.tempOrder[i];
      // if(element.meal == meal){
      //   this.tempOrder[i].quantity += 1;
      //   this.db.collection('tables').doc(this.table[0].propertyId).update({order:(this.tempOrder)})
      // }else{
        
      //   this.tempOrder.push({meal,price,quantity})
      //   this.db.collection('tables').doc(this.table[0].propertyId).update({order:(this.tempOrder)})

      // }
      
    }

    // for (let i = 0; i < this.order.length; i++) {
    //   const element = this.order[i];
    //   if (element.meal == meal) {
    //     this.
    //   }
      
    // }
        this.db.collection('tables').doc(this.table[0].propertyId).update({
          order:arrayUnion({meal,price,quantity})});


        // this.tempOrder.push({meal,price,quantity: quantity +1})
        // console.log(this.tempOrder,'new method');
        
    
    
      // if(this.tempOrder.includes(obj)){
      //   console.log(meal);
      //   this.tempOrder.push({meal,price,quantity: quantity +1})
      //   this.db.collection('tables').doc(this.table[0].propertyId).update({order:(quantity +=1)})
      // }else{
      //   console.log('seka mealin');
        
      //   this.tempOrder.push({meal, price, quantity});
      //   this.db.collection('tables').doc(this.table[0].propertyId).update({order:(this.tempOrder)})
      // }

      // for (let i = 0; i < this.tempOrder.length; i++) {

        
      
      // if(this.order[i].meal == meal){
      //   console.log(this.order[i].meal);}else{
      //     console.log('blank');
          
      //   }
        // this.db.collection('tables').doc(this.table[0].propertyId).update({order:(quantity +=1)})
      // }else{
        // console.log('seka mealin');
         
        // this.tempOrder.push({meal, price, quantity});
        // this.db.collection('tables').doc(this.table[0].propertyId).update({order:(this.tempOrder)})
      // }
    // }







      // if(this.order){
      //   this.order.forEach((x:any) => { this.counts[x.meal] = (this.counts[x.meal] || 0) + 1; });
      // }
      // console.log(this.counts)
      
    // }
        this.db.collection('tables').doc(this.table[0].propertyId).update({
          order:arrayUnion({meal,price,quantity})})


        // this.tempOrder.push({meal,price,quantity: quantity +1})
        // console.log(this.tempOrder,'new method');
        
    
    
      // if(this.tempOrder.includes(obj)){
      //   console.log(meal);
      //   this.tempOrder.push({meal,price,quantity: quantity +1})
      //   this.db.collection('tables').doc(this.table[0].propertyId).update({order:(quantity +=1)})
      // }else{
      //   console.log('seka mealin');
        
      //   this.tempOrder.push({meal, price, quantity});
      //   this.db.collection('tables').doc(this.table[0].propertyId).update({order:(this.tempOrder)})
      // }

      // for (let i = 0; i < this.tempOrder.length; i++) {

        
      
      // if(this.order[i].meal == meal){
      //   console.log(this.order[i].meal);}else{
      //     console.log('blank');
          
      //   }
        // this.db.collection('tables').doc(this.table[0].propertyId).update({order:(quantity +=1)})
      // }else{
        // console.log('seka mealin');
         
        // this.tempOrder.push({meal, price, quantity});
        // this.db.collection('tables').doc(this.table[0].propertyId).update({order:(this.tempOrder)})
      // }
    // }







      // if(this.order){
      //   this.order.forEach((x:any) => { this.counts[x.meal] = (this.counts[x.meal] || 0) + 1; });
      // }
      // console.log(this.counts)
      

  }

  incrementMeal(meal: any){
    meal.quantity += 1;
    console.log(meal);
    this.total += meal.price
    console.log(this.total);
    
  }

  decrementMeal(meal: any){
    meal.quantity -= 1;
    console.log(meal);
  }

  calculateTotal(){
    this.order.forEach((element:any) =>  this.total += element.price);
    console.log(this.total);
    

  }

  incrementMeal(meal: any){
    meal.quantity += 1;
    console.log(meal);
    this.total += meal.price
    console.log(this.total);
    
  }

  decrementMeal(meal: any){
    meal.quantity -= 1;
    console.log(meal);
    //todo kur de shkoje nder 0 qt ater ta fshoje kajt
  }

  deleteMeal(meal:any){
    this.order.forEach((item:any, index:any ) => {
      if (item == meal){
        this.db.collection('tables').doc(this.table[0].propertyId).update({
          order:arrayRemove(meal)})
      }
    });
  }

  calculateTotal(){
    this.order.forEach((element:any) =>  this.total += element.price);
    console.log(this.total);
  }
  



  ngOnDestroy(){
    if(this.routeSub){
      this.routeSub.unsubscribe();
    }
  }

}
