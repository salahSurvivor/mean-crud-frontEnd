import { Component } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { users } from '../user';
import { MessageService } from 'primeng/api';
import { UserService } from '../login/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-read-user',
  templateUrl: './read-user.component.html',
  styleUrls: ['./read-user.component.css']
})
export class ReadUserComponent {
  users: users[];
  checked: boolean;

  constructor(private userService: UserServiceService,
              private messageService: MessageService,
              private authService: UserService,
              private router: Router
  ){
    this.canActivate();
  }

  ngOnInit(): void{
    this.userService.onRead()
      .subscribe((vl) => this.users = vl);
  }

  onUpdate(data): void{
    this.userService.onUpdate(data)
      .subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Updated!!' });
      })
  }

  onDelete(data): void{
    this.userService.onDelete(data) 
      .subscribe(() => {
        this.ngOnInit();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deleted!!' });
      })
  }

  canActivate(): boolean {
    console.log(this.authService.admin())
    if (this.authService.isAuthenticated() && this.authService.admin()){
      this.router.navigate(['/users']);
      return true;
    }else{
      this.router.navigate(['/page404']);
      return false;
    }
  }
}
