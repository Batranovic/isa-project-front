import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/feature-modules/layout/home/home.component';
import { RegistrationComponent } from '../auth/registration/registration.component';
import { ViewCompanyComponent } from 'src/app/feature-modules/company/view-company/view-company.component';
import { ViewEquipmentComponent } from 'src/app/feature-modules/equipment/view-equipment/view-equipment.component';
import { ActivationLinkComponent } from '../auth/activation-link/activation-link.component';

const routes: Routes = [
  {path:'home', component: HomeComponent},
  {path:'register', component: RegistrationComponent},
  {path:'view-company', component: ViewCompanyComponent},
  {path:'view-equipment', component: ViewEquipmentComponent},
  {path:'activation-link/:id', component: ActivationLinkComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
