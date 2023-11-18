import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class EquipmentService {
    private backendUrl = 'http://localhost:8080/api/equipments/all'; 

    constructor(private http: HttpClient) {}
  
   
    getEquipmentss(): Observable<any[]> {
        return this.http.get<any[]>(this.backendUrl);
      }
}
