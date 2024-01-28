import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from '../model/company.model';
import { CompanyService } from '../company.service';
import { Equipment } from '../../equipment/model/equipment.model';
import { Appointment, AppointmentStatus } from '../model/appointment.model';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/model/user.model';
interface TemporaryQuantities {
  [equipmentId: number]: number;
}

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
  temporaryQuantities: TemporaryQuantities = {};

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
    const reservationRequests = this.equipments
    .filter(equipment => this.temporaryQuantities[equipment.id] > 0)
    .map(equipment => ({
      equipmentId: equipment.id,
      quantity: this.temporaryQuantities[equipment.id]
    }));
  
    localStorage.setItem('reservationRequests', JSON.stringify(reservationRequests));
    localStorage.setItem('companyId', JSON.stringify(this.company!.id));
  
    
    this.router.navigate(['/new-dates']);
  }
  

  reserveEquipment(appointment: Appointment): void {
    const userId = this.authService.user$.value.id!;
    const reservationRequests = this.equipments
    .filter(equipment => this.temporaryQuantities[equipment.id] > 0)
    .map(equipment => ({
      equipmentId: equipment.id,
      quantity: this.temporaryQuantities[equipment.id]
    }));

    if (reservationRequests.length === 0) {
      alert('You did not select any equipment');
      return;
    }
  
      const areQuantitiesEqual = reservationRequests.every(request => {
        const equipment = this.equipments.find(e => e.id === request.equipmentId);
        return equipment && equipment.reservedQuantity === equipment.quantity;
      });
  
      if (areQuantitiesEqual) {
        alert('Selected equipment is out of stock.');
        return;
      }
  
      this.companyService.createReservation(appointment!.id, reservationRequests, userId)
        .subscribe(
          (response) => {
            alert('Equipment reserved successfully');
            this.getAppointmentsForCompany(this.companyId as number);
            this.getEquipmentsForCompany(this.companyId as number);
            this.temporaryQuantities = {};
            
          },
          (error) => {
            console.error('Error creating reservation:', error);
            alert('Unable to make reservation');
          }
        );
    
  }
  

onQuantityChangeClicked(equipment: Equipment, action: 'increase' | 'decrease') {
  if (!this.temporaryQuantities[equipment.id]) {
    this.temporaryQuantities[equipment.id] = 0;
  }

  if (action === 'increase' && this.temporaryQuantities[equipment.id] < equipment.quantity - equipment.reservedQuantity) {
    this.temporaryQuantities[equipment.id]++;
  } else if (action === 'decrease' && this.temporaryQuantities[equipment.id] > 0) {
    this.temporaryQuantities[equipment.id]--;
  }
}


}
