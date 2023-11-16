import { Component,OnInit } from '@angular/core';
import { Profile } from 'src/app/infrastructure/model/profile.model';
import { ProfileService } from 'src/app/infrastructure/service/profile.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit{

  public myProfile!: Profile;

  constructor(private profileService:ProfileService){

  }

  ngOnInit(){
    let userId = 1;
    this.profileService.getProfile(userId).subscribe((profile:Profile)=>{
      this.myProfile = profile;
      console.log(this.myProfile)
    })
  }

  updateProfile(){
    this.profileService.updateProfile(this.myProfile).subscribe((profile:Profile)=>{
      this.myProfile = profile;
    })
  }

}
