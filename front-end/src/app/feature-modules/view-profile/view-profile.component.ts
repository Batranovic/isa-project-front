import { Component,OnInit } from '@angular/core';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { Profile } from 'src/app/infrastructure/model/profile.model';
import { ProfileService } from 'src/app/infrastructure/service/profile.service';
import { Appointment } from '../company/model/appointment.model';
import { Reservation } from '../company/model/reservation.model';
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
  constructor(private profileService:ProfileService, private authService: AuthService){

  }

  ngOnInit() {

    this.authService.user$.subscribe(user => {

      if (user.id) {
        this.userId = user.id;

        this.profileService.getProfile(this.userId).subscribe((profile: Profile) => {
          this.myProfile = profile;
          console.log(this.myProfile);

          this.profileService.getReservationsForUser(this.userId as number).subscribe(reservations => {
            this.reservations = reservations;
            console.log('Reservations:', this.reservations);
          });
        });
      }
    });
  }

  updateProfile(){
    this.profileService.updateProfile(this.myProfile).subscribe((profile:Profile)=>{
      this.myProfile = profile;
    })
  }

  cancelReservation(reservationId: number) {
    const userId = this.authService.user$.value.id!;

    this.profileService.cancelReservationForUser(userId, reservationId).subscribe(
      response => {
        console.log('Reservation canceled successfully:', response);

        this.profileService.getReservationsForUser(this.userId as number).subscribe(reservations => {
          this.reservations = reservations;
          console.log('Updated Reservations:', this.reservations);
        });
      },
      error => {
        console.error('Error canceling reservation:', error);
      }
    );
  }
  claimReservation(reservationId: number) {
    const userId = this.authService.user$.value.id!;

    this.profileService.claimReservationForUser(userId, reservationId).subscribe(
      response => {
        console.log('Reservation claimed successfully:', response);

        this.profileService.getReservationsForUser(this.userId as number).subscribe(reservations => {
          this.reservations = reservations;
          console.log('Updated Reservations:', this.reservations);
        });
      },
      error => {
        console.error('Error claiming reservation:', error);
      }
    );
  }
}
