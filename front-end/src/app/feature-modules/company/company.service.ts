import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class CompanyService {


    constructor(private http: HttpClient) {}
  
   
    getCompanies(): Observable<any[]> {
        return this.http.get<any[]>('http://localhost:8080/api/companies/all');
      }
}
