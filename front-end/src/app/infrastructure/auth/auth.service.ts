import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Registration } from './model/registration.model';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ApiService } from './apiService.service';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
    private backendUrl = 'http://localhost:8080/api/users/create'; // Adjust the URL according to your backend API
    private access_token = null;

    constructor(private http: HttpClient, private apiService: ApiService, private router: Router, private userService: UserService) {}
  
    register(registration: Registration): Observable<any> {
        const url = `${'http://localhost:8080/api/users/create'}`;
        return this.http.post(url, registration).pipe(
          catchError((error: HttpErrorResponse) => {
            console.error('Registration error:', error);
            return throwError('Something went wrong during registration');
          })
        );
      }

      activateUser(userId: number): Observable<any> {
        const url = `${'http://localhost:8080/api/users'}/activate/${userId}`;
        return this.http.post(url, {});
    }

    
  login(user:any) {
    const loginHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    // const body = `username=${user.username}&password=${user.password}`;
    const body = {
      'email': user.email,
      'password': user.password
    };
    this.userService.getMyInfo(user.email);
    return this.apiService.post('http://localhost:8080/auth/login', JSON.stringify(body), loginHeaders)
      .pipe(map((res) => {
        console.log('Login success');
        this.access_token = res.body.accessToken;
        localStorage.setItem("jwt", res.body.accessToken)
        return res;
      }));
  }

  logout() {
    this.userService.currentUser = null;
    localStorage.removeItem("jwt");
    this.access_token = null;
    this.router.navigate(['/login']);
  }

  tokenIsPresent() {
    return this.access_token != undefined && this.access_token != null;
  }

  getToken() {
    return this.access_token;
  }
}
