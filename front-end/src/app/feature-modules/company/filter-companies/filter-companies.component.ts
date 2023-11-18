import { Component } from '@angular/core';
import { CompanyService } from '../company.service';
import { SearchCompany } from '../model/search-company.model';
import { Company } from '../model/company.model';
import { FilterInputs } from '../model/filter-inputs.model';

@Component({
  selector: 'app-filter-companies',
  templateUrl: './filter-companies.component.html',
  styleUrls: ['./filter-companies.component.css']
})
export class FilterCompaniesComponent {
  companies: Company[] = [];
  newCompanies: Company[] = []
  searchInputs: SearchCompany = {
    name:'',
    address:''
  }
  filterInputs:FilterInputs ={
    averageGrade1:0,
    averageGrade2:5
  }
  filterActive:Boolean = false;

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
  }
  filterResults(){
    this.newCompanies = this.companies.filter((company:Company)=>{
       return (this.filterInputs.averageGrade1 <= company.averageGrade) && (company.averageGrade <= this.filterInputs.averageGrade2)
    })
  }


  getFilteredCompanies():void {
    this.companyService.getFilteredCompanies(this.searchInputs).subscribe((companies:Company[])=>{
      this.companies = companies;
      this.newCompanies = companies;
      this.filterActive = true;
      this.filterResults();
    })
  }
}
