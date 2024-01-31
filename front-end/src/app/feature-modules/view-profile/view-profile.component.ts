import { Component,OnInit } from '@angular/core';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { Profile } from 'src/app/infrastructure/model/profile.model';
import { ProfileService } from 'src/app/infrastructure/service/profile.service';
import { Appointment } from '../company/model/appointment.model';
import { Reservation, ReservationStatus } from '../company/model/reservation.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit{

  public myProfile!: Profile;
  userId : number | undefined;
  reservations: any[] = [];
  penalPoints: number = 0;
  status: { pending: boolean, canceled: boolean, claimed: boolean } = {
    pending: false,
    canceled: false,
    claimed: false,
  };
  sortColumn: string = 'dateAndTime, duration, price'; 
  sortDirection: 'asc' | 'desc' = 'asc'; 
  constructor(private profileService:ProfileService, private authService: AuthService){
  }

  ngOnInit() {

    this.authService.user$.subscribe(user => {

      if (user.id) {
        this.userId = user.id;
        this.checkPenalPoints()
        this.profileService.getRegisteredUser(this.userId).subscribe((value:any)=>{
          this.penalPoints = value.penalPoints
          console.log(value)
        })
        this.profileService.getProfile(this.userId).subscribe((profile: Profile) => {
          this.myProfile = profile;

          this.profileService.getReservationsForUser(this.userId as number).subscribe(reservations => {
            this.reservations = reservations;
            for (let i = 0; i < this.reservations.length; i++) {
              let dt = new Date(this.reservations[i].appointment.dateAndTime);
              this.reservations[i].appointment.dateAndTime = dt.toLocaleString('en-GB')
            }
          });
        })
      }
    });
  }

  sortTable(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
    this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  
  }

  checkIfExpired(date:string){
    let currentDate = new Date()
    let appoitmentDate = new Date(date)
    const diff = Math.abs(currentDate.valueOf() - appoitmentDate.valueOf());
    const hours = diff / (1000 * 60 * 60);
    console.log(hours)
    if (hours >= 24) {
      return true
    }
    else{
      return false
    }
  }
  

  updateProfile(){
    this.profileService.updateProfile(this.myProfile).subscribe((profile:Profile)=>{
      this.myProfile = profile;
    })
  }

  checkPenalPoints() {
    this.profileService.getRegisteredUser(this.userId!).subscribe((value:any)=>{
      this.penalPoints = value.penalPoints
    })
  }

  cancelReservation(reservationId: number,reservation:any) {
    if (!this.checkIfExpired(reservation.appointment.dateAndTime)) {
      alert("You can't cancel 24 hours before your reservation.")
      return
    }
    const userId = this.authService.user$.value.id!;

    this.profileService.cancelReservationForUser(userId, reservationId).subscribe(
      (response) => {
        this.checkPenalPoints()
        console.log('Reservation canceled successfully:', response);

        this.profileService.getReservationsForUser(this.userId as number).subscribe(reservations => {
          this.reservations = reservations;
          console.log('Updated Reservations:', this.reservations);
        });
      }
    );
  }
  
  claimReservation(reservationId: number) {
    const userId = this.authService.user$.value.id!;

    this.profileService.claimReservationForUser(userId, reservationId).subscribe(
      (response) => {
        console.log('Reservation claimed successfully:', response);

        this.profileService.getReservationsForUser(this.userId as number).subscribe(reservations => {
          this.reservations = reservations;
          console.log('Updated Reservations:', this.reservations);
        });
      }
    );
  }
  pendingStatus: boolean = false;
  canceledStatus: boolean = false;
  claimedStatus: boolean = false;
  expiredStatus: boolean = false;
  
  getFilteredReservations() {
    const selectedStatuses: string[] = [];
  
    if (this.pendingStatus) {
      selectedStatuses.push('PENDING');
    }
    if (this.canceledStatus) {
      selectedStatuses.push('CANCELED');
    }
    if (this.claimedStatus) {
      selectedStatuses.push('CLAIMED');
    }
  
    if (selectedStatuses.length > 0) {
      this.profileService.getReservationsForUser(this.userId as number).subscribe(reservations => {
        this.reservations = reservations.filter((reservation: Reservation) => {
          return selectedStatuses.includes(reservation.status);
        });
        console.log('Filtered Reservations:', this.reservations);
      });
    } else {
      this.profileService.getReservationsForUser(this.userId as number).subscribe(reservations => {
        this.reservations = reservations;
        console.log('All Reservations:', this.reservations);
      });
    }
  }
  
  
}
