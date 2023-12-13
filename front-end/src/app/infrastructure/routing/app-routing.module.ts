import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/feature-modules/layout/home/home.component';
import { RegistrationComponent } from '../auth/registration/registration.component';
import { ViewCompanyComponent } from 'src/app/feature-modules/company/view-company/view-company.component';
import { ViewEquipmentComponent } from 'src/app/feature-modules/equipment/view-equipment/view-equipment.component';
import { ActivationLinkComponent } from '../auth/activation-link/activation-link.component';
import { ViewProfileComponent } from 'src/app/feature-modules/view-profile/view-profile.component';
import { LoginComponent } from '../auth/login/login.component';
import { ViewSingleCompanyComponent } from 'src/app/feature-modules/company/view-single-company/view-single-company.component';

const routes: Routes = [
  {path:'home', component: HomeComponent},
  {path:'register', component: RegistrationComponent},
  {path:'view-company', component: ViewCompanyComponent},
  {path:'view-equipment', component: ViewEquipmentComponent},
  {path:'activation-link/:id', component: ActivationLinkComponent},
  {path:'view-profile', component: ViewProfileComponent},
  {path:'login', component: LoginComponent},
  {path:'view-single-company/:id', component: ViewSingleCompanyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
