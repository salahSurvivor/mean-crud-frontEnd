import { Component } from '@angular/core';
import { LocationService } from './services/location.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent {
  ip: any;
  city: any;
  country: any;

  constructor(private readonly location: LocationService){}

  ngOnInit(): void{
    this.location.getIp().subscribe((vl) => this.ip = vl.ip);
    this.location.getIp().subscribe((vl) => {
      this.location.getInfoIp(vl.ip).subscribe((info) => {
        this.city = info.city;
        this.country = info.country_name;
      })
    })
  }
  
}
