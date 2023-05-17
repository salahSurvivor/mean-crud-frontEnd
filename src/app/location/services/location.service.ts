import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiUrl = 'https://api.ipify.org?format=json';
  adressIp: any[];

  constructor(private readonly http: HttpClient){}

  getIp(): Observable<any>{
    return this.http.get<any>(this.apiUrl);
  }

  getInfoIp(ip): Observable<any>{
    return this.http.get<any>(`https://ipapi.co/${ip}/json/`);
  }       
}
