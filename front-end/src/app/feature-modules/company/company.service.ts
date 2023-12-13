import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchCompany } from './model/search-company.model';
import { Company } from './model/company.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>('http://localhost:8080/api/companies/all');
  }

  getFilteredCompanies(searchInputs:SearchCompany): Observable<Company[]> {
    return this.http.post<Company[]>('http://localhost:8080/api/companies/search',searchInputs);
  }
  
  getCompanyDetails(companyId: number): Observable<Company> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`, 
    });

    return this.http.get<Company>(`http://localhost:8080/api/companies/${companyId}`, { headers });
  }
}
