import { Component,OnInit } from '@angular/core';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { Profile } from 'src/app/infrastructure/model/profile.model';
import { ProfileService } from 'src/app/infrastructure/service/profile.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit{

  public myProfile!: Profile;
  userId : number | undefined;
  constructor(private profileService:ProfileService, private authService: AuthService){

  }

  ngOnInit() {
    // Subscribe to user$ to get the user information
    this.authService.user$.subscribe(user => {
      // Check if user has an id
      if (user.id) {
        this.userId = user.id;

        // Now you can use userId to fetch the profile
        this.profileService.getProfile(this.userId).subscribe((profile: Profile) => {
          this.myProfile = profile;
          console.log(this.myProfile);
        });
      }
    });
  }

  updateProfile(){
    this.profileService.updateProfile(this.myProfile).subscribe((profile:Profile)=>{
      this.myProfile = profile;
    })
  }

}
