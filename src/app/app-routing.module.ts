import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { TableDetailComponent } from './components/table-detail/table-detail.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'reservations', component: ReservationsComponent },
  { path: 'details/:id', component: TableDetailComponent },
  { path: '**', redirectTo:'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
