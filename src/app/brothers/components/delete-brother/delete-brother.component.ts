import { Component, Output, EventEmitter } from '@angular/core';
import { ToggleModalService } from 'src/app/services/toggle-modal.service';

@Component({
  selector: 'app-delete-brother',
  templateUrl: './delete-brother.component.html',
  styleUrls: ['./delete-brother.component.css']
})
export class DeleteBrotherComponent {
  @Output() deleteEmit = new EventEmitter();
  id: any;

  constructor(private toggle: ToggleModalService){
    this.toggle.onUpdateModal()
      .subscribe((vl) => this.id = vl._id);
  }

  onDelete(): void{
    this.deleteEmit.emit(this.id);
  }

}
