import { Component, Output, EventEmitter, ɵNOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR } from '@angular/core';
import { ToggleModalService } from 'src/app/services/toggle-modal.service';
import { Brothers } from 'src/app/brothers/shared/brothers';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { v1 as uuid} from 'uuid'; 
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-update-brother',
  templateUrl: './update-brother.component.html',
  styleUrls: ['./update-brother.component.css']
})
export class UpdateBrotherComponent {
  @Output() updateData = new EventEmitter();
  @Output() uploadImage = new EventEmitter();

  data: Brothers;
  _id: any;
  name: string;
  job: string;
  age: number;
  gender: string;
  date: string;
  imgReplace: string;
  image: string;
  imageName: string;
  uniqueId: any;
  img: string;

  constructor(private toggle: ToggleModalService){
    this.toggle.onUpdateModal().subscribe((data) => {
      this._id = data._id;
      this.name = data.name;
      this.job = data.job;
      this.age = data.age;
      this.imgReplace = data.image;
      this.image = data.image;
      this.date = formatDate(data.date, 'yyyy-MM-dd', 'en-US');
      this.gender = data.gender;
    });
  }

  validateForm = new FormGroup({
    name: new FormControl('', Validators.required),
    job: new FormControl('', Validators.required),
    age: new FormControl('', [Validators.required,
      Validators.pattern("[0-9]{1,3}")]),
  });

  get Name(): FormControl{
    return this.validateForm.get('name') as FormControl;
  }

  get Job(): FormControl{
    return this.validateForm.get('job') as FormControl;
  }

  get Age(): FormControl{
    return this.validateForm.get('age') as FormControl;
  }

  handleImage(event): void{
    this.uniqueId = uuid();
    this.image = event.target.files;
    this.imageName = event.target.files[0].name;
  }

  onUpdate(): void{
    const data = {
      _id: this._id,
      name: this.name,
      job: this.job,
      age: this.age,
      image: this.img ? this.uniqueId + this.imageName : this.imgReplace,
      date: this.date,
      gender: this.gender
    };
    
    this.updateData.emit(data);

    if(this.img != null){
      const formData = new FormData();

      formData.append('image', this.image[0], this.uniqueId + this.imageName);
      this.uploadImage.emit(formData);
    }

  }
}
