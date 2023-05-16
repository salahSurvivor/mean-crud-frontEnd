import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brothers } from './brothers';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}


@Injectable({
  providedIn: 'root'
})
export class BrothersService {
  private url = 'http://localhost:3000/brother/';
  private url2 = 'http://localhost:3000/brotherUpload/';
  private emailUrl = 'http://localhost:3000/contactUs/';

  constructor(private http: HttpClient) { }

  // Read Data
  readBrothers(): Observable<Brothers[]>{
    return this.http.get<Brothers[]>(this.url);
  }

  // Get By Id
  readById(id): Observable<Brothers>{
    return this.http.get<Brothers>(this.url + id);
  }

  // Upload Data
  uploadData(data): Observable<any>{
    return this.http.post<any>(this.url2, data);
  }

  // Create Data
  addBrothers(data): Observable<Brothers>{
    return this.http.post<Brothers>(this.url, data);
  }

  // Update Data
  updateBrothers(data): Observable<Brothers>{
    return this.http.put<Brothers>(this.url + data._id, data);
  }

  // Delete Data
  deleteUpdate(id: any): Observable<Brothers>{
    return this.http.delete<Brothers>(this.url + id);
  }

  // Send Email
  sendEmail(data): Observable<any>{
    return this.http.post<any>(this.emailUrl, data);
  }
}
