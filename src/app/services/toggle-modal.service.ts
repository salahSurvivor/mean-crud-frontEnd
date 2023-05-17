import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleModalService {
  private subject = new Subject<any>;

  constructor() { }

  updateModal(data: any){
    this.subject.next(data); 
  }

  onUpdateModal(): Observable<any>{
    return this.subject.asObservable(); 
  }
}
