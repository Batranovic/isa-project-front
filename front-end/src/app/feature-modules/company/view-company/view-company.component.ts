import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { Company } from '../model/company.model';
import { SearchCompany } from '../model/search-company.model';
import { FilterInputs } from '../model/filter-inputs.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-company',
  templateUrl: './view-company.component.html',
  styleUrls: ['./view-company.component.css']
})
export class ViewCompanyComponent implements OnInit{
  
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

  constructor(private companyService: CompanyService, private router: Router) {}

  ngOnInit(): void {
    this.getCompanies();
  }
  filterResults(){
    this.newCompanies = this.companies.filter((company:Company)=>{
       return (this.filterInputs.averageGrade1 <= company.averageGrade) && (company.averageGrade <= this.filterInputs.averageGrade2);
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
  
  getCompanies():void {
    this.companyService.getCompanies().subscribe((companies:Company[])=>{
      this.companies = companies;
      this.newCompanies = companies;
    })
  }

  onCompanyCardClick(companyId: number): void {
    // Navigate to the company detail page with the company ID as a parameter
    this.router.navigate(['/view-single-company', companyId]);
  }
}
