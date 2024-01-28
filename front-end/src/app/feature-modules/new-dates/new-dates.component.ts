import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../company/company.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { Appointment } from '../company/model/appointment.model';
import { User } from 'src/app/infrastructure/model/user.model';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { FreeAppointment } from '../company/model/free-appointment.model';
import { Equipment } from '../equipment/model/equipment.model';
import { ReservationRequest } from '../company/model/equipment-quantity.model';


interface TemporaryQuantities {
  [equipmentId: number]: number;
}

@Component({
  selector: 'app-new-dates',
  templateUrl: './new-dates.component.html',
  styleUrls: ['./new-dates.component.css']
})
export class NewDatesComponent {
  companyId: number | undefined;
  appointments: any[] = [];
  selectedEquipmentIds: number[] = [];
  user: User | undefined;
  equipments: Equipment[] = [];  // Define equipments property
  temporaryQuantities: TemporaryQuantities = {};  // Define temporaryQuantities property
  reservationRequests: ReservationRequest[] = [];
  dateForm = new FormGroup({
    date: new FormControl()
  }); 


  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute, private companyService: CompanyService, private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.companyId = Number(localStorage.getItem('companyId'));
    this.reservationRequests = JSON.parse(localStorage.getItem('reservationRequests')!);

    this.authService.user$.subscribe(user => {
      this.user = user;
    });
  
    this.companyService.getEquipmentsForCompany(this.companyId!).subscribe(
      (equipments) => {
        this.equipments = equipments;
      },
      (error) => {
        console.error('Error fetching equipments:', error);
      }
    );
  }

  getAppointmentsForCompany(): void {
    const selectedDate: string = this.dateForm.get('date')!.value;
    

    this.companyService.getFreeAppointmentsForCompany(this.companyId!, selectedDate).subscribe(
      (appointments) => {
        this.appointments  = appointments;
        console.log('Appointments:', this.appointments);
      },
      (error) => {
        console.error('Error fetching appointments:', error);
      }
    );
  }

  reserveButtonClicked(appointment: FreeAppointment): void {
    const userId = this.authService.user$.value.id!

    if (this.reservationRequests.length === 0) {
      alert('You did not select any equipment');
      return;
    }
    this.companyService.createAppointment(appointment).subscribe({
      next: (createdAppointment: FreeAppointment) => {
        this.companyService.createReservation(createdAppointment.id, this.reservationRequests, userId).subscribe({
          next: () => {
            alert('Reservation created successfully');
            this.getAppointmentsForCompany();
          },
          error: (error) => {
            console.error('Error creating reservation:', error);
            alert('Unable to make reservation');
          }
        });
      },
      error: (error) => {
        console.error('Error creating appointment:', error);
      }
    });
  }
  
}
