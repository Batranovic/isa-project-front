import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchCompany } from './model/search-company.model';
import { Company } from './model/company.model';
import { Equipment } from '../equipment/model/equipment.model';
import { Reservation } from './model/reservation.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private http: HttpClient) {}

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>('http://localhost:8080/api/companies/all');
  }

  getFilteredCompanies(searchInputs:SearchCompany): Observable<Company[]> {
    return this.http.post<Company[]>('http://localhost:8080/api/companies/search',searchInputs);
  }
  getCompanyDetails(companyId: number): Observable<Company> {
    return this.http.get<Company>(`http://localhost:8080/api/companies/${companyId}`);
  }
  /*
  getCompanyDetails(companyId: number): Observable<Company> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`, 
    });

    return this.http.get<Company>(`http://localhost:8080/api/companies/${companyId}`, { headers });
  }*/

  getEquipmentsForCompany(companyId: number): Observable<any>{
    return this.http.get<any>(`http://localhost:8080/api/companies/equipments/${companyId}`);
  }
  getAppointmentsForCompany(companyId: number): Observable<any>{
    return this.http.get<any>(`http://localhost:8080/api/companies/appointments/${companyId}`);
  }

  createReservation(appointmentId: number, equipmentId: number): Observable<Reservation> {
    return this.http.post<Reservation>(`http://localhost:8080/api/reservations/create/${appointmentId}/${equipmentId}`, {});
  }
}
