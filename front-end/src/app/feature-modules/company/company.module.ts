import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewCompanyComponent } from './view-company/view-company.component';
import { FormsModule } from '@angular/forms';
import { ViewSingleCompanyComponent } from './view-single-company/view-single-company.component';



@NgModule({
  declarations: [
    ViewCompanyComponent,
    ViewSingleCompanyComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ViewCompanyComponent
  ]
})
export class CompanyModule { }
