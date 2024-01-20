import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  appointments: any[] = [];
  selectedEquipmentIds: number[] = [];
  user: User | undefined;
  
  constructor(private route: ActivatedRoute, private companyService: CompanyService, private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.companyId = +params.get('id')!;

      this.companyService.getCompanyDetails(this.companyId).subscribe((company) => {
        this.company = company;
        this.getEquipmentsForCompany(this.companyId as number);
        this.getAppointmentsForCompany(this.companyId as number);
        
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
  newDatesButton(): void {
    localStorage.setItem('selectedEquipment', JSON.stringify(this.selectedEquipmentIds));
    localStorage.setItem('companyId', JSON.stringify(this.company!.id));
    this.router.navigate(['/new-dates']);
  }

  // Your Angular component

  reserveEquipment(appointment: Appointment): void {
    const userId = this.authService.user$.value.id!;
    
    if (this.selectedEquipmentIds.length > 0 && appointment) {
      if (appointment.status === 1) {
        alert('The selected appointment is not free');
        return;
      }
      if (this.selectedEquipmentIds) {
        const areQuantitiesEqual = this.selectedEquipmentIds.every(equipmentId => {
          const equipment = this.equipments.find(e => e.id === equipmentId);
          return equipment && equipment.reservedQuantity === equipment.quantity;
        });
      
        if (areQuantitiesEqual) {
          alert('Selected equipment is out of stock.');
          return;
        }
      }
      
      this.companyService.createReservation(appointment!.id, this.selectedEquipmentIds, userId)
        .subscribe(
          (response) => {
            alert('Equipment reserved successfully');
            this.getAppointmentsForCompany(this.companyId as number);
          },
          (error) => {
            console.error('Error creating reservation:', error);
            alert('Unable to make reservation');
          }
        );
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
