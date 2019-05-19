import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
<<<<<<< HEAD
import { HomeComponent } from "./home/home.component";
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'login', component: SigninComponent},
  { path: '**', redirectTo: '/' }
=======
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TrackerComponent  } from './tracker/tracker.component';
import { TrackereditComponent } from './trackeredit/trackeredit.component';
import { DetailComponent } from './detail/detail.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tracker', component: TrackerComponent },
  { path: 'trackeredit/:id', component: TrackereditComponent },
  { path: 'detail/:id', component: DetailComponent },
  { path: '**', redirectTo: '/' },
>>>>>>> my commit
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
