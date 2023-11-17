import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewCompanyComponent } from './view-company/view-company.component';



@NgModule({
  declarations: [
    ViewCompanyComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ViewCompanyComponent
  ]
})
export class CompanyModule { }
