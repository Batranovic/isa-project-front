import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Company } from '../model/company.model';
import { CompanyService } from '../company.service';
import { Equipment } from '../../equipment/model/equipment.model';
import { Appointment, AppointmentStatus } from '../model/appointment.model';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/model/user.model';

@Component({
  selector: 'app-view-single-company',
  templateUrl: './view-single-company.component.html',
  styleUrls: ['./view-single-company.component.css']
})
export class ViewSingleCompanyComponent implements OnInit {
  companyId: number | undefined;
  company: Company | undefined;
  equipments: Equipment[] = [];
  appointments: Appointment[] = [];
  selectedEquipmentId: number | undefined;
  user: User | undefined;
  
  constructor(private route: ActivatedRoute, private companyService: CompanyService, private authService: AuthService) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const companyId = +params.get('id')!;

      // Fetch company details using the company service
      this.companyService.getCompanyDetails(companyId).subscribe((company) => {
        this.company = company;
        this.getEquipmentsForCompany(companyId);
        this.getAppointmentsForCompany(companyId);
        
      });
      this.authService.user$.subscribe(user => {
        this.user = user;
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

  getAppointmentsForCompany(companyId: number): void {
    this.companyService.getAppointmentsForCompany(companyId).subscribe(
      (appointments) => {
        this.appointments  = appointments;
        console.log('Appointments:', this.appointments);
      },
      (error) => {
        console.error('Error fetching appointments:', error);
      }
    );
  }

  reserveButtonClicked(appointmentId: number): void {
    const userId = this.authService.user$.value.id!; 

    if (this.selectedEquipmentId !== undefined) {
        this.companyService.createReservation(appointmentId, this.selectedEquipmentId, userId).subscribe(
            (response) => {
                console.log('Reservation created successfully:', response);
            },
            (error) => {
                console.error('Error creating reservation:', error);
            }
        );
    } else {
        console.error('Selected equipment ID is undefined.');
        // You might want to handle this case, e.g., show an error message or disable the button.
    }
}


  onRemoveClicked(equipment: Equipment){
    equipment.isAdded = false;
  }
  onAddClicked(equipment: Equipment) {
    equipment.isAdded = true;
    this.selectedEquipmentId = equipment.id; 
  }
}
