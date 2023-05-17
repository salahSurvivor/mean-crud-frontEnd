import { Component } from '@angular/core';
import { BrothersService } from '../brothers/shared/brothers.service';
import { MessageService } from 'primeng/api';
import { UserService } from '../users/login/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

export class ContactComponent {
  email: any;
  subject: any;
  text: any;

  constructor(private brother: BrothersService,
              private messageService: MessageService,
              private auten: UserService,
              private router: Router)
  {
  }

  onSend(): void{
    const data = {
      email: this.email,
      subject: this.subject,
      text: this.text
    }

    this.brother.sendEmail(data).subscribe();
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message With Success!!' }); 

    this.email = '';
    this.subject = '';
    this.text = '';
  }

  iCanEnter(): boolean{
    if(this.auten.isAuthenticated()){
      this.router.navigate(['/contact']);
      return true;
    }
    else{
      this.router.navigate(['/login']);
      return false;
    }
  }
}
