import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter-user',
  templateUrl: './filter-user.component.html',
  styleUrls: ['./filter-user.component.css']
})
export class FilterUserComponent {
  @Output() sendFilter = new EventEmitter();

  toggleFilter: boolean = false;
  nameFilter: string = '';
  jobFilter: string = '';
  ageFilter: string = '';
  dateFilter: string = '-';
  text: string;

  toggleButton(): void{
    this.toggleFilter = !this.toggleFilter;
  }

  onFilter(): void{
    this.sendFilter.emit({
      name: this.nameFilter,
      job: this.jobFilter,
      age: this.ageFilter,
      date: this.dateFilter
    });
  }

}
