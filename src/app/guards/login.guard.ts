import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GuardService } from './services/guard.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard{
  
  constructor(private userService: GuardService , private router: Router) {}

  canActivate(): boolean {
    if(this.userService.isAuthenticated()){
      return true;
    }
    else{
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}