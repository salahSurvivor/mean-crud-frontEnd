import { Component, Output, EventEmitter } from '@angular/core';
import { BrothersService } from '../../shared/brothers.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-import-exel-file',
  templateUrl: './import-exel-file.component.html',
  styleUrls: ['./import-exel-file.component.css']
})
export class ImportExelFileComponent {
  @Output() exelData = new EventEmitter();
  show: boolean = false;
  text: string;
  items: any[];

  toggleShow(): void{
    this.show = !this.show;
  }

  constructor(private brotherService: BrothersService){}

  readExcel(event) {
        /* wire up file reader */
        const target: DataTransfer = <DataTransfer>(event.target);
        if (target.files.length !== 1) {
          throw new Error('Cannot use multiple files');
        }
        const reader: FileReader = new FileReader();
        reader.readAsBinaryString(target.files[0]);
        reader.onload = (e: any) => {
          /* create workbook */
          const binarystr: string = e.target.result;
          const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });
    
          /* selected the first sheet */
          const wsname: string = wb.SheetNames[0];
          const ws: XLSX.WorkSheet = wb.Sheets[wsname];
    
          /* save data */
          const data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
          this.items = data;// Data will be logged in array format containing objects
        };
  }

  onAdd(): void{
    this.items.forEach((vl) => {
      const data = {
        name: vl.name,
        job: vl.job,
        age: vl.age,
        image: vl.image,
        date: vl.date,
        gender: vl.gender
      }

      this.exelData.emit(data);
    })

    this.text = null;
  }
}
