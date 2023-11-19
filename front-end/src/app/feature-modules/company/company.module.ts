import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewCompanyComponent } from './view-company/view-company.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ViewCompanyComponent,
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
