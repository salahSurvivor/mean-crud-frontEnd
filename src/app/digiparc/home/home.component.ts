import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private readonly jwtHelper: JwtHelperService){}

  name: string;

  ngOnInit(){
    const decodeToken = this.jwtHelper.decodeToken(localStorage.getItem('token'));
    this.name = decodeToken.name;
  }
}
