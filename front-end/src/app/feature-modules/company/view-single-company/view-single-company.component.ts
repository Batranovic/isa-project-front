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
  selectedEquipmentIds: number[] = [];
  user: User | undefined;
  
  constructor(private route: ActivatedRoute, private companyService: CompanyService, private authService: AuthService) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const companyId = +params.get('id')!;

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

  // Your Angular component

  reserveButtonClicked(appointmentId: number): void {
    const userId = this.authService.user$.value.id!;
  
    if (this.selectedEquipmentIds.length > 0) {
      this.companyService.createReservation(appointmentId, this.selectedEquipmentIds, userId).subscribe({
        next: () => {
          console.log('Reservation created successfully:');
          alert('Successfully reserved!');
        },
        error: (error) => {
          console.error('Error creating reservation:', error);
          alert('Unable to make reservation');
        }
      });
    }
  }
  





onAddRemoveClicked(equipment: Equipment) {
  equipment.isAdded = !equipment.isAdded;

  const index = this.selectedEquipmentIds.indexOf(equipment.id);

  if (equipment.isAdded && index === -1) {
    this.selectedEquipmentIds.push(equipment.id);
  } else if (!equipment.isAdded && index !== -1) {
    this.selectedEquipmentIds.splice(index, 1);
  }
}

}
