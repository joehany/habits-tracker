import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TrackerComponent  } from './tracker/tracker.component';
import { TrackereditComponent } from './trackeredit/trackeredit.component';
import { DetailComponent } from './detail/detail.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  { path: '', component: DashboardComponent , canActivate: [AuthGuard]},
  { path: 'signup', component: SignupComponent},
  { path: 'login', component: SigninComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'tracker', component: TrackerComponent, canActivate: [AuthGuard] },
  { path: 'trackeredit/:id', component: TrackereditComponent, canActivate: [AuthGuard] },
  { path: 'detail/:id', component: DetailComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
