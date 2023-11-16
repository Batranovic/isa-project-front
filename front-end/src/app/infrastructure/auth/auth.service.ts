import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Registration } from './model/registration.model';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
    private backendUrl = 'http://localhost:8080/api/users/create'; // Adjust the URL according to your backend API

    constructor(private http: HttpClient) {}
  
    register(registration: Registration): Observable<any> {
        const url = `${this.backendUrl}`;
        return this.http.post(url, registration).pipe(
          catchError((error: HttpErrorResponse) => {
            console.error('Registration error:', error);
            return throwError('Something went wrong during registration');
          })
        );
      }

}
