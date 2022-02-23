import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Table } from 'src/app/models/table-model';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  tables:Table[] = [];
  mainFloor = true;
  isSmallScreen: boolean = false;

  constructor(private router: Router, private data: DataService, private breakpointObserver: BreakpointObserver) { 
    breakpointObserver.observe('(max-width: 767px)').subscribe(res => {
      if (res.matches) {
        this.isSmallScreen = false;
      } else {
       this.isSmallScreen = true;
      }
    })
  }

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
