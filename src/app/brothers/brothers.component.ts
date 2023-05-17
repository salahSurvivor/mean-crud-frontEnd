import { Component, Output, EventEmitter } from '@angular/core';
import { BrothersService } from './shared/brothers.service';
import { Brothers } from './shared/brothers';
import { ToggleModalService } from '../services/toggle-modal.service';
import { MessageService } from 'primeng/api';
import { formatDate } from '@angular/common'
import { Router } from '@angular/router';
import { UserService } from '../users/login/services/user.service';

/************Pdf File***************/
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
/****************Exel File***************************/
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

@Component({
  selector: 'app-brothers',
  templateUrl: './brothers.component.html',
  styleUrls: ['./brothers.component.css']
})

export class BrothersComponent {
  brothers: Brothers[] = [];
  date: string;
  dateConvert: string = '-';
  
  @Output() testEmit = new EventEmitter();

  constructor(private brothersService: BrothersService,
              private toggle: ToggleModalService,
              private messageService: MessageService,
              private router: Router,
              private auto: UserService)
  {}

  ngOnInit(){
    this.brothersService
      .readBrothers()
      .subscribe((vl) => {
        this.brothers = vl;
        vl.map((value) => {
          value.date = formatDate(value.date, 'yyyy-MM-dd', 'en-US');
        })
      }); 
  }

  onAdd(data){
    this.brothersService.uploadData(data.imageUpload).subscribe();
    this.brothersService.addBrothers(data.data).subscribe(() => this.ngOnInit());
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Added Succussfuly!!' });
  }

  uploadImage(data){
    this.brothersService.uploadData(data).subscribe();
  }

  onUpdate(data){
    this.brothersService.updateBrothers(data)
      .subscribe((vl) => this.brothers.forEach((value) => {
        if(value._id == vl._id){
          value.name = vl.name;
          value.job = vl.job;
          value.age = vl.age;
          value.image = vl.image;
          value.date = vl.date;
          value.gender = vl.gender;
        }
        this.ngOnInit();
      }));
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Updated Succussfuly!!' });
  }

  onDelete(id): void{
    this.brothersService.deleteUpdate(id)
      .subscribe(() => this.ngOnInit());
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deleted Succussfuly!!' });  
  }

  // export data to the subject
  updateTransfer(data: Brothers){
    this.toggle.updateModal(data);
  }

  onFilter(data): void{

    if(data.date !== '-')
     this.dateConvert = formatDate(data.date, 'yyyy-MM-dd', 'en-US');

    this.brothersService.readBrothers()
      .subscribe((vl) => {
          vl.map((value) => value.date = formatDate(value.date, 'yyyy-MM-dd', 'en-US'));

          this.brothers = vl.filter((value) =>
            value.date.includes(this.dateConvert) &&
            value.name.toString().includes(data.name) &&
            value.job.toString().includes(data.job) &&
            value.age.toString().includes(data.age)             
          );
        });
  }

  generate(id){
    this.brothersService.readById(id).subscribe();
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Page Generated With Success!!' }); 
  }

  onDownload(): void{
    let workbook = new Workbook();

    let worksheet = workbook.addWorksheet("Employee Data");

    let header = ["_id", "name", "job", "age", "image", "date", "gender"];
    
    let headerRow = worksheet.addRow(header);

    for (let x1 of this.brothers)
    {
      let x2=Object.keys(x1);
      let temp=[]
      for(let y of x2)
      {
        temp.push(x1[y])
      }
      worksheet.addRow(temp)
    }

    let fname="Emp Data Sep 2020"

    //add data and file name and download
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, fname+'-'+new Date().valueOf()+'.xlsx');
    });
  }

  /************************************Import Data From Exel*************************************/

  onAddExel(data): void{
    this.brothersService.addBrothers(data)
      .subscribe(() => this.ngOnInit());

    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Added Succussfuly!!' });  
  }


  /***********************************Handle Pdf File*******************************/

  createPDF(data2: Brothers): void {
    const doc = new jsPDF();
    const columns = ['ID', 'Date', 'Gender', 'Job'];
    const data = [
      [data2._id, 
       '22-04-2000',
       data2.gender,
       data2.job],
    ];
    const img = new Image();
    img.src = 'assets/uploads/'+ data2.image;
    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(14);
    doc.addImage(img, "PNG" ,10, 10, 50, 50);
    doc.text(data2.name, 10, 70);

    doc.autoTable(columns, data, {
      margin: { top: 80, right: 10, left: 11 },
    });

    doc.save('table.pdf');
  }

 
}
