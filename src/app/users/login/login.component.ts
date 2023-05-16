import { Component } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './services/user.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  name: string;
  password: string;

  constructor(
    private readonly router: Router,
    private readonly authService: UserService,
    private messageService: MessageService
  ){}

  onLogin():void{
    const data = {
      name: this.name,
      password: this.password
    }

    this.authService.isAdmin(data);
    console.log(this.authService.admin());
    this.authService.login(data).subscribe(
      todos => {
        localStorage.setItem('token', todos.token);
        this.canActivate();
      },
      error =>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Username Or Password Is Wrong!!' });
        this.authService.logout();
        this.canActivate();
        console.log(error.message);
      },
    );

  }

  canActivate(): boolean {
    if (this.authService.isAuthenticated()){
      this.router.navigate(['/']);
      return true;
    }else{
      this.router.navigate(['/login']);
      return false;
    }
  }
}
