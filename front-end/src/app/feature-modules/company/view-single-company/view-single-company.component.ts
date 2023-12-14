import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Company } from '../model/company.model';
import { CompanyService } from '../company.service';
import { Equipment } from '../../equipment/model/equipment.model';

@Component({
  selector: 'app-view-single-company',
  templateUrl: './view-single-company.component.html',
  styleUrls: ['./view-single-company.component.css']
})
export class ViewSingleCompanyComponent implements OnInit {
  companyId: number | undefined;
  company: Company | undefined;
  equipments: Equipment[] = [];

  constructor(private route: ActivatedRoute, private companyService: CompanyService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const companyId = +params.get('id')!;

      // Fetch company details using the company service
      this.companyService.getCompanyDetails(companyId).subscribe((company) => {
        this.company = company;
        this.getEquipmentsForCompany(companyId);
      });
    });
  } 

  getEquipmentsForCompany(companyId: number): void {
    this.companyService.getEquipmentsForCompany(companyId).subscribe(
      (equipments) => {
        this.equipments = equipments;
        console.log('Equipments:', this.equipments);
      },
      (error) => {
        console.error('Error fetching equipments:', error);
      }
    );
  }
  handleAddEquipmentClick(equipment: Equipment){

  }
}
