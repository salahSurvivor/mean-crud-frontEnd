import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { VoyageService } from '../services/voyage.service';
import { Exp } from '../models/exp';
import { Client } from '../models/client';
import { Mix } from '../models/mix';
/****************Exel File***************************/
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import * as ExcelJS from 'exceljs';

@Component({
  selector: 'app-voyage-add',
  templateUrl: './voyage-add.component.html',
  styleUrls: ['./voyage-add.component.css']
})
export class VoyageAddComponent {
  cnt: any = 0;
  /******Organize Component start********/
  displayActions: boolean = false;
  onList: boolean = true;
  onAdd: boolean = false; 
  onUpdate: boolean = false;
  input: boolean = false;
  showInput: boolean = false;
  grid: boolean = true;
  update: boolean = false;
  isAddExp: boolean = false;
  expId: any; 
  /******Organize Component end********/

  /***********List Voyage Vars Start********/
  //voyage: trajet[];
  exp: Exp[];
  mix: Mix[];
  voyage: Mix;
  expTable: Exp[] = [];
  expDt: Exp[];
  clients: Client[];
  nmrs: any[];
  deleteId: string;
  /***********List Voyage Vars End*********/

  /********voyage addd vars start********/
  date = new Date();
  dateFormat = formatDate(this.date, 'MM/dd/yyyy', 'en-Us');

  numero: string = '';
  dateC: string = this.dateFormat;
  dateD: string = this.dateFormat;
  client: Client;
  reference: string = '';
  cmr: string = '';
  bool1: boolean = false;
  bool2: boolean = false;
  cmtr: string = '';

  expediteur: Client;
  destinateur: Client;
  dateChargementP: any = this.dateFormat;
  retardChargement: string
  retardDeChargement: string;

  /*****When Update*******/
  expediteurU: Client;
  destinateurU: Client;
  dateChargementPU: any = this.dateFormat;
  retardChargementU: string
  retardDeChargementU: string;

  clnt: string;
  counterSplit: any = 0;
  /********voyage addd vars end********/

  dateDebut: String;
  dateFin = '';

  constructor(private voyageService: VoyageService,
              private messageService: MessageService){}

  ngOnInit(): void{
    this.voyageService.numeroSplit().subscribe((vl) => localStorage.setItem('numero', vl));
    this.voyageService.readMix().subscribe((vl) => this.mix = vl);
    this.voyageService.readExp().subscribe((vl) => this.exp = vl);
    this.voyageService.readClient().subscribe((vl) => this.clients = vl);
    this.nullVars();
  }

  toggleActions(id): void{
    this.mix.map((vl) => {
      if(vl._id === id){
        vl.menu = !vl.menu;
      }
    })
  }

  addExp(): void{
    this.cnt++;
    this.input = !this.input;
  }

  deleteExp(id): void{
    this.expTable = this.expTable.filter((vl) => vl.id !== id);
  }

  updateExp(exp): void{
    this.expTable.map((vl) => {
      if(vl.id === exp.id){
        vl.menu = !exp.menu;
      }
    });

    let expediteurConvert: Client;
    let destinateurConvert: Client;
    
    expediteurConvert = this.clients.find((vl) => vl.name === exp.exp);
    destinateurConvert = this.clients.find((vl) => vl.name === exp.dest);

    this.expediteurU =  expediteurConvert;
    this.destinateurU = destinateurConvert;
    this.dateChargementPU = exp.dc;
    this.retardChargementU = exp.rc;
    this.retardDeChargementU = exp.rd;
  }

  onUpdateExp(exp): void{
    this.expTable.map((vl) => {
      if(vl.id === exp.id){
        vl.exp = this.expediteurU.name;
        vl.dest = this.destinateurU.name;
        vl.dc = formatDate(this.dateChargementPU, 'MM/dd/yyyy', 'en-Us');
        vl.rc = this.retardChargementU;
        vl.rd = this.retardDeChargementU; 
      }
  });

  this.expTable.map((vl) => {
      if(vl.id === exp.id){
        vl.menu = !exp.menu;
      }
    });
  }

  addTable(): void{
    this.dateChargementP = formatDate(this.dateChargementP, 'MM/dd/yyyy', 'en-Us');
    this.isAddExp = true;

    const exp = {
        id: Math.random().toString(36).substring(9),
        exp: this.expediteur.name,
        dest: this.destinateur.name,
        dc: formatDate(this.dateC, 'MM/dd/yyyy', 'en-Us'),
        rc: this.retardChargement,
        rd: this.retardDeChargement, 
        menu: false
      }
      
      this.expTable.push(exp);
      this.input = !this.input;
  
      this.expediteur = null;
      this.destinateur = null;
      this.dateC = formatDate(this.date, 'MM/dd/yyyy', 'en-Us');
      this.retardChargement = null;
      this.retardDeChargement = null;
  }

  switchOnAdd(): void{
    this.ngOnInit();
    this.counterSplit = 0;
    this.onList = false;
    this.onUpdate = false;
    this.onAdd = true;  
  }

  switchOnUpdate(mix): void{
    this.ngOnInit();
    this.counterSplit = 0;
    this.onList = false;
    this.onUpdate = true;
    this.onAdd = false;  

    let fixClientFormat = this.clients.find((vl) => vl.name === mix.client);

    this.expId = mix._id;

    this.counterSplit = mix.numero;
    this.dateC = mix.dateC;
    this.dateD = mix.dateD;
    this.client = fixClientFormat;
    this.reference = mix.reference;
    this.cmr = mix.cmr;
    this.bool1 = mix.bool1;
    this.bool2 = mix.bool2;
    this.cmtr = mix.cmtr;
    this.expTable = mix.expediteur
  }

  /*********Voyage Part******/
  addVoyage(): void{
    const year = formatDate(this.date, 'yyyy', 'en-Us');
    const number = localStorage.getItem('numero');
    this.counterSplit += Number(number) + 1 + '/' + year;
    
   const data: Mix = {
      numero: this.counterSplit,
      dateC: formatDate(this.dateC, 'MM/dd/yyyy', 'en-Us'),
      dateD: formatDate(this.dateD, 'MM/dd/yyyy', 'en-Us'),
      client: this.client.name,
      reference: this.reference,
      cmr: this.cmr,
      bool1: this.bool1,
      bool2: this.bool2,
      cmtr: this.cmtr,
      expediteur : this.expTable,
      menu: false,
    }

    this.voyageService.createMix(data).subscribe(() => this.ngOnInit());
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Added Succussfuly!!' });

    this.nullVars();
    this.cancelBtn();
  }

  getId(id){
    this.deleteId = id;
  }

  deleteVoyage(){
    this.voyageService.deleteMix(this.deleteId).subscribe(() => this.ngOnInit());
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deleted Withh Succuss!!' });
  }

  showExpDetail(exp): void{
    this.expDt = exp;
  }

  /*******Client Part*******/
  addClient(): void{
    const data = {
      name: this.clnt
    }
    this.voyageService.createClient(data).subscribe(() => {
        this.ngOnInit();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Added Succussfuly!!' });
      });
  } 
  /**********Update Part*************/

  cancelBtn(): void{
    this.onAdd = false;
    this.onUpdate = false;
    this.onList = true;
    this.ngOnInit();
  }

  updateVoyage(): void{
    const data: Mix = {
      _id: this.expId,
      numero: this.counterSplit,
      dateC: formatDate(this.dateC, 'MM/dd/yyyy', 'en-Us'),
      dateD: formatDate(this.dateD, 'MM/dd/yyyy', 'en-Us'),
      client: this.client.name,
      reference: this.reference,
      cmr: this.cmr,
      bool1: this.bool1,
      bool2: this.bool2,
      cmtr: this.cmtr,
      expediteur : this.expTable,
      menu: false,
    }

    this.voyageService.updateMix(data).subscribe(() => this.ngOnInit());
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Updated Succussfuly!!' });

    this.nullVars();
    this.cancelBtn();
  }

  /**************Make All the Variables null***************/
  nullVars(): void{
    this.dateD = '';
    this.dateDebut = formatDate(this.date, 'MM', 'en-Us') + '/01/' + formatDate(this.date, 'yyyy', 'en-Us');
    this.dateFin = '99/99/9999';
    this.dateC = this.dateFormat;
    this.dateD = this.dateFormat;
    this.reference = '';
    this.numero = '';
    this.client = null;
    this.cmr = null;
    this.bool1 = false;
    this.bool2 = false;
    this.cmtr = null;

    this.dateChargementP = this.dateFormat;
    this.retardChargement = null;
    this.retardDeChargement = null;
    this.isAddExp = false;

    this.expTable = [];
  }
  
  /************Filter Part************/

  onFilter(): void{ 
    let num: any = null;
    let testNull = false;

    if(this.numero !== ''){
      num = [];
      num.push(this.numero);
    }

    if(this.client === null)
      testNull = true;

    if(this.dateFin !== '99/99/9999')
      this.dateFin = formatDate(this.dateFin, 'MM/dd/yyyy', 'en-Us');
  
      
    this.voyageService.readMix()
      .subscribe((value) => this.mix = value.filter((vl) => (
        vl.numero.includes(num ? num[0].numero : '') &&
        vl.reference.includes(this.reference) &&
        vl.client.includes(testNull ? '' : this.client.name) &&
         vl.dateC >= formatDate(String(this.dateDebut), 'MM/dd/yyyy', 'en-Us') && 
         vl.dateC <= this.dateFin
    )));
  }

  search(event) {
    this.voyageService.readMix()
      .subscribe((vl) => this.nmrs = vl.filter((value) => value.numero.includes(event.query)));
  }

  /*********Exel Part***********/
  downloadExel(): void{
    let time = formatDate(this.date, 'shortTime', 'en-Us');
    let date =  formatDate(this.date, 'fullDate', 'en-Us');
    let fullDate = 'Date:  ' + date + ' ' + time;

    let workbook = new Workbook();

    // Set cell styles
    const headerStyle: Partial<ExcelJS.Style> = {
      font: { bold: true },
      alignment: { horizontal: 'center' },
      border: {
        top: { style: 'thin' as ExcelJS.BorderStyle },
        left: { style: 'thin' as ExcelJS.BorderStyle },
        bottom: { style: 'thin' as ExcelJS.BorderStyle },
        right: { style: 'thin' as ExcelJS.BorderStyle }
      },
      fill: {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '4ec3cf' } // Specify the hex color code here
      }
    };
        
    // Set column widths
    const cellStyle: Partial<ExcelJS.Style> = {
      border: {
         top: { style: 'thin' as ExcelJS.BorderStyle },
         left: { style: 'thin' as ExcelJS.BorderStyle },
         bottom: { style: 'thin' as ExcelJS.BorderStyle },
         right: { style: 'thin' as ExcelJS.BorderStyle }
      }
    };

    let worksheet = workbook.addWorksheet("voyage");

    let titleRow = worksheet.addRow(['Voyages', '', '', '', fullDate]);
    titleRow.font = { family: 4, size: 19, bold: true };

    let header = ["Numero", "Date Création", "Date Départ", "Client", "Reference", "Cmr", "Embarquement", "Taxation", "Commentaire"];

    const head = worksheet.addRow(header);
    head.eachCell((cell) => {
      cell.font = headerStyle.font;
      cell.alignment = headerStyle.alignment;
      cell.border = headerStyle.border;
      cell.fill = headerStyle.fill
    })

    // Apply column widths
    header.forEach((width, columnIndex) => {
      const column = worksheet.getColumn(columnIndex + 1);
      column.width = 25;
    });

    for (let x1 of this.mix)
    {
      let data = {
        numero: x1.numero,
        dateC: x1.dateC,
        dateD: x1.dateD,
        client: x1.client,
        reference: x1.reference,
        cmr: x1.cmr,
        bool1: x1.bool1,
        bool2: x1.bool2,
        cmtr: x1.cmtr
      }

      let x2=Object.keys(data);
      let temp=[]
      for(let y of x2)
      {
        temp.push(x1[y]);
      }
      const vy = worksheet.addRow(temp)
      vy.eachCell((cell) => {
        cell.font = cellStyle.font;
        cell.alignment = cellStyle.alignment;
        cell.border = cellStyle.border;
      })
    }

    let fname="Voyage";

    //add data and file name and download
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, fname+'-'+new Date().valueOf()+'.xlsx');
    });
  }
}
