import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from '../model/profile.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  public apiUrl = 'http://localhost:8080/api';

  constructor(private http:HttpClient) { }


  getProfile(userId:number) :Observable<Profile>{
    return this.http.get<Profile>(this.apiUrl+'/users/'+userId);
  }
  updateProfile(profile:Profile) :Observable<Profile>{
    return this.http.put<Profile>(this.apiUrl+'/users/'+profile.id,profile);
  }
}
