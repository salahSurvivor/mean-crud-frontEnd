import { Injectable } from '@angular/core';
import { GuardService } from './services/guard.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard{
  constructor(private guard: GuardService,
              private router: Router){}

  canActivate(): boolean{
    if(this.guard.isAdmin())
      return true; 
    else{
      this.router.navigate(['/page404']);
      return false;
    }  
  }
  
}
