import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/feature-modules/layout/home/home.component';
import { RegistrationComponent } from '../auth/registration/registration.component';
import { ViewCompanyComponent } from 'src/app/feature-modules/company/view-company/view-company.component';

const routes: Routes = [
  {path:'home', component: HomeComponent},
  {path:'register', component: RegistrationComponent},
  {path:'view-company', component: ViewCompanyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
