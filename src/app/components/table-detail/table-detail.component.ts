import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as firebase from 'firebase/compat';
import { arrayRemove, arrayUnion, FieldValue } from 'firebase/firestore';
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
  total: number = 0;
  closeResult = '';

  constructor(
    private db: AngularFirestore, 
    private activatedRoute: ActivatedRoute, 
    private data: DataService,
    private modalService: NgbModal) { }

    ngOnInit(){
    this.routeSub = this.activatedRoute.params.subscribe((params: Params)=>{
      this.tableId = Number(params['id']);
      });
    this.db.collection('tables', ref => ref.where("number", "==", this.tableId)).valueChanges({ idField: 'propertyId' }).subscribe((res:any)=>{
      this.table = res;
      this.order = res[0].order;
      if(res[0].total == null || res[0].total < 0){
        this.updateTotal(0)        
      }else{
      this.total = res[0].total;      
      }
    }); 
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
    this.db.collection('tables').doc(this.table[0].propertyId).update({
      order:arrayUnion({meal,price,quantity})});
      this.total += price;
      this.updateTotal(this.total);
  }

  incrementMeal(meal: any){
    meal.quantity += 1;  
    this.total += meal.price;
    // this.updateTotal(this.total)
  }

  decrementMeal(meal: any){
    this.total -= meal.price;
    this.updateTotal(this.total)
    meal.quantity -= 1;
    if(meal.quantity == 0){
      this.deleteMeal(meal);
    }
  }

  deleteMeal(meal:any){
    this.order.forEach((item:any) => {
      if (item == meal){
        this.total -= (meal.price) * meal.quantity
        meal.quantity = 1; 
        this.updateTotal(this.total)
        this.db.collection('tables').doc(this.table[0].propertyId).update({
          order:arrayRemove(meal)});          
      }
    });
  }

  // calculateTotal(){
  //   this.order.forEach((element:any) =>  this.total += element.price);
  // }

  updateTotal(price: number){
    this.db.collection('tables').doc(this.table[0].propertyId).update({total: price});
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(result);
      
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(reason);
      if(reason == 'Cash' || 'Credit Card'){
        this.updateTotal(0);
        this.db.collection('tables').doc(this.table[0].propertyId).update({order: []})
      }
      
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }




  ngOnDestroy(){
    if(this.routeSub){
      this.routeSub.unsubscribe();
    }
  }

}



//todo 1 dialog tchilet kur da boje buy ene ato kit tresetohen vlerat