import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { trajet } from '../models/trajet';
import { Exp } from '../models/exp';
import { Client } from '../models/client';
import { Mix } from '../models/mix';

@Injectable({
  providedIn: 'root'
})
export class VoyageService {
  private trajetUrl = 'http://localhost:3000/trajet/';
  private expUrl = 'http://localhost:3000/exp/';
  private clientUrl = 'http://localhost:3000/client/';
  private numeroUrl = 'http://localhost:3000/last/';
  private mixUrl = 'http://localhost:3000/mix/';

  constructor(private http: HttpClient){}

  /*Trajet Part Start*/
  readTrajet(): Observable<trajet[]>{
    return this.http.get<trajet[]>(this.trajetUrl);
  }

  createTrajet(data): Observable<trajet>{
    return this.http.post<trajet>(this.trajetUrl, data);
  }

  updateTrajet(data: trajet): Observable<trajet>{
    return this.http.put<trajet>(this.trajetUrl + data._id, data);
  }

  deleteTrajet(id): Observable<trajet>{
    return this.http.delete<trajet>(this.trajetUrl + id);
  }
  /*Trajet Part End*/

  /*Expéditeur Part Start*/
  readExp(): Observable<Exp[]>{
    return this.http.get<Exp[]>(this.expUrl);
  }
  
  createExp(data): Observable<Exp>{
    return this.http.post<Exp>(this.expUrl, data);
  }
  
  deleteExp(id): Observable<Exp>{
    return this.http.delete<Exp>(this.expUrl + id);
  }
  /*Expéditeur Part End*/

  /*Client Part Start*/
  readClient(): Observable<Client[]>{
    return this.http.get<Client[]>(this.clientUrl);
  }
  
  createClient(data: Client): Observable<Client>{
    return this.http.post<Client>(this.clientUrl, data);
  }
  /*Client Part End*/

  /*mix part start*/
  readMix(): Observable<Mix[]>{
    return this.http.get<Mix[]>(this.mixUrl);
  }

  createMix(data: Mix): Observable<Mix>{
    return this.http.post<Mix>(this.mixUrl, data);
  }

  deleteMix(id): Observable<Mix>{
    return this.http.delete<Mix>(this.mixUrl + id);
  }

  updateMix(data: Mix): Observable<Mix>{
    return this.http.put<Mix>(this.mixUrl + data._id, data);
  }
  /*mix part end */

  /*Numero Split*/
  numeroSplit(): Observable<any>{
    return this.http.get<any>(this.numeroUrl);
  }
}
