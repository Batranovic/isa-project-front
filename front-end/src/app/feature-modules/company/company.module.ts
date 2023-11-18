import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewCompanyComponent } from './view-company/view-company.component';
import { FormsModule } from '@angular/forms';
import { FilterCompaniesComponent } from './filter-companies/filter-companies.component';



@NgModule({
  declarations: [
    ViewCompanyComponent,
    FilterCompaniesComponent,
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
