import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Brothers } from '../brothers/shared/brothers';

@Injectable({
  providedIn: 'root'
})
export class ToggleModalService {
  private subject = new Subject<any>;

  constructor() { }

  updateModal(data: Brothers){
    this.subject.next(data); 
  }

  onUpdateModal(): Observable<Brothers>{
    return this.subject.asObservable(); 
  }
}
