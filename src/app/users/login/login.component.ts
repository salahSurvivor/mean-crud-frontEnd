import { Component } from '@angular/core';
import { GuardService } from 'src/app/guards/services/guard.service';
import { MessageService } from 'primeng/api';
import { ToggleModalService } from 'src/app/services/toggle-modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  name: string;
  password: string;

  constructor(
    private readonly authService: GuardService,
    private messageService: MessageService,
    private toggle: ToggleModalService,
    private router: Router
  ){}

  onLogin():void{
    const data = {
      name: this.name,
      password: this.password
    }

    this.authService.login(data).subscribe(
      todos => {
        localStorage.setItem('token', todos.token);
        this.router.navigate(['/']);  
      },
      error =>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Username Or Password Is Wrong!!' });
        this.authService.logout();
        console.log(error.message);
      },
    );
  }

}
