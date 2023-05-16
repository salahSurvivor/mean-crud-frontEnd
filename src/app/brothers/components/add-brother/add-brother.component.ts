import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-add-brother',
  templateUrl: './add-brother.component.html',
  styleUrls: ['./add-brother.component.css']
})
export class AddBrotherComponent {
  @Output() addBrother = new EventEmitter();
  
  name: string;
  job: string;
  age: number;
  gender: string = 'Men';
  date: Date;
  img: string;
  img2: string;
  imgName: string;
  fileUniqueId: any;

  validateForm = new FormGroup({
    nameForm: new FormControl('', Validators.required),
    jobForm: new FormControl('', Validators.required),
    ageForm: new FormControl('', [
      Validators.required,
      Validators.pattern("[0-9]{1,3}"),
    ]),
    imageForm: new FormControl('', [
      Validators.required,
    ]),
    dateForm: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required)
  });

  get Name(): FormControl{
    return this.validateForm.get('nameForm') as FormControl;
  }

  get Job(): FormControl{
    return this.validateForm.get('jobForm') as FormControl;
  }

  get Age(): FormControl{
    return this.validateForm.get('ageForm') as FormControl;
  }

  get Image(): FormControl{
    return this.validateForm.get('imageForm') as FormControl;
  }

  get Date(): FormControl{
    return this.validateForm.get('dateForm') as FormControl;
  }

  get Gender(): FormControl{
    return this.validateForm.get('gender') as FormControl;
  }

  selectFile(event) {
      this.fileUniqueId = uuid();
      this.img = event.target.files;
      this.imgName = event.target.files[0].name;
  }

  onAdd(): void{
    const formData = new FormData();
    formData.append('image', this.img[0], this.fileUniqueId + this.imgName);

    const data = {
      name: this.name,
      job: this.job,
      age: this.age,
      image: this.fileUniqueId + this.imgName,
      date: this.date,
      gender: this.gender
    }

    this.addBrother.emit({data: data, imageUpload: formData});
  
    this.validateForm.reset();

    this.name = null;
    this.job = null;
    this.age = null;
    this.img2 = null;
    this.date = null;
    this.gender = null;
  }

}
