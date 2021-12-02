import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})

export class NavBarComponent implements OnInit {

  waiter : string = '';
  open = true;

  close() {
    this.open = false;
  }

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.waiter.subscribe((res) => {
      this.waiter = res;
    });

    setInterval(() => {
      this.currentDate = new Date();  //ki osht procesi i update-imit tminutave
    }, 1);
  }

  currentDate = new Date();


}
