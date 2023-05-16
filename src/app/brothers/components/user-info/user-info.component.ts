import { Component, Input} from '@angular/core';
import { Brothers } from '../../shared/brothers';
import { ToggleModalService } from 'src/app/services/toggle-modal.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent {
  @Input() brothers: Brothers[];
  bro: Brothers = {
    _id: null,
    name: null,
    job: null,
    age: null,
    image: null,
    date: null,
    gender: null
  };

  constructor(private toggle: ToggleModalService){
    this.toggle.onUpdateModal()
      .subscribe((vl) => this.bro = vl)
  }
}
