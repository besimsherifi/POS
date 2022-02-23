import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})

export class NavBarComponent implements OnInit {

  waiter : string = '';
  open = true;
  @Input() showWaiter: boolean = true;
  @Input() tableNumber: any;

  close() {
    this.open = false;
  }

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.dataService.waiter.subscribe((res) => {
      this.waiter = res;
    });

    setInterval(() => {
      this.currentDate = new Date();  //ki osht procesi i update-imit tminutave
    }, 1);
  }

  onLogOut(){
    this.router.navigate(['/login'])
  }

  currentDate = new Date();


}
