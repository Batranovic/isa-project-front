import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Company } from '../model/company.model';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-view-single-company',
  templateUrl: './view-single-company.component.html',
  styleUrls: ['./view-single-company.component.css']
})
export class ViewSingleCompanyComponent {
  companyId: number | undefined;
  company: Company | undefined;

  constructor(private route: ActivatedRoute, private companyService: CompanyService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const companyId = +params.get('id')!;

      // Fetch company details using the company service
      this.companyService.getCompanyDetails(companyId).subscribe((company) => {
        this.company = company;
      });
    });
  }
  
}
