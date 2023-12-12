import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import { ApiService } from './apiService.service';
import { User } from '../model/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser!:any;

  constructor(private apiService: ApiService,  private http: HttpClient) {
  }
/*
  getMyInfo() {
    return this.apiService.get('http://localhost:8080/api/users/whoami')
      .pipe(map(user => {
        this.currentUser = user;
        return user;
      }));
  }*/

  getMyInfo(email: string): void {
    this.http.get<User>('http://localhost:8080/api/users/getByEmail/' + email)
      .subscribe(
        user => {
          console.log('Received User:', user);
          this.currentUser = user;
        },
        error => {
          console.error('Error fetching user info:', error);
        }
      );
  }

}
