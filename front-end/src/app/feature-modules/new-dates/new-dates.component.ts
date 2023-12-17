import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../company/company.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { Appointment } from '../company/model/appointment.model';
import { User } from 'src/app/infrastructure/model/user.model';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { FreeAppointment } from '../company/model/free-appointment.model';

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
 
  dateForm = new FormGroup({
    date: new FormControl()
  }); 


  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute, private companyService: CompanyService, private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
   
      this.companyId = Number(localStorage.getItem('companyId'));
      this.selectedEquipmentIds = JSON.parse(localStorage.getItem('selectedEquipment')!)
      
      this.authService.user$.subscribe(user => {
        this.user = user;
      });
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
    const userId = this.authService.user$.value.id!;
  
    if (this.selectedEquipmentIds.length > 0) {
      this.companyService.createAppointment(appointment).subscribe({
        next: (createdAppointment: FreeAppointment) => {

          this.companyService.createReservation(createdAppointment.id, this.selectedEquipmentIds, userId).subscribe({
            next: () => {
              console.log('Reservation created successfully:');
              alert('Successfully reserved!');
            },
            error: (error) =>{
              console.error('Error creating reservation:', error);
              alert('Unable to make reservation');
            }
        });


        },
        error: (error) =>{
          console.error('Error creating reservation:', error);
          alert('Unable to make reservation');
        }
      });
     
    }
  }

  
}
