import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Registration } from './model/registration.model';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { ApiService } from './apiService.service';
import { Router } from '@angular/router';
import { UserService } from './user.service';

import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   user$ = new BehaviorSubject<User>({email: "", id: 0 });
   private access_token: string | null = null; 

    constructor(private http: HttpClient, private apiService: ApiService, private router: Router, private userService: UserService) {
      const storedToken = localStorage.getItem('jwt');
    if (storedToken) {
      this.access_token = storedToken;
      this.setUser();
    }
    }
  
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

    
    setUser(): void {
      const jwtHelperService = new JwtHelperService();
      const accessToken = this.access_token || "";
      const user: User = {
        id: +jwtHelperService.decodeToken(accessToken).id,
        email: jwtHelperService.decodeToken(accessToken).sub,
      };
  
      this.user$.next(user);
    }

  
    login(user: any): Observable<any> {
      const loginHeaders = new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      });
  
      const body = {
        'email': user.email,
        'password': user.password
      };
  
      this.userService.getMyInfo(user.email);
  
      return this.apiService.post('http://localhost:8080/auth/login', JSON.stringify(body), loginHeaders)
        .pipe(map((res) => {
          console.log('Login success');
          this.access_token = res.body.accessToken;
          localStorage.setItem('jwt', res.body.accessToken);
          this.setUser();
          return res;
        }));
    }


  logout(): void {
    this.router.navigate(['/home']).then(_ => {
      localStorage.removeItem("jwt");
      this.access_token = null;
      this.user$.next({email: "", id: 0});
      }
    );
  }

  checkIfUserExists(): void {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken == null) {
      return;
    }
    this.setUser();
  }
  

  tokenIsPresent() {
    return this.access_token != undefined && this.access_token != null;
  }

  getToken() {
    return this.access_token;
  }
}


