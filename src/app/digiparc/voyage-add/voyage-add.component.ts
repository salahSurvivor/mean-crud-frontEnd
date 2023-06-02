import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { VoyageService } from '../services/voyage.service';
import { Exp } from '../models/exp';
import { Client } from '../models/client';
import { Mix } from '../models/mix';
/****************Exel Export File***************************/
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import * as ExcelJS from 'exceljs';
/*******************Token*************************/
import { JwtHelperService } from '@auth0/angular-jwt';
/*************Import Exel*************/
import * as XLSX from 'xlsx';
/************Import jsPDf************/
import * as jsPDF from 'jspdf';
/***********Import pdfMake************/
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { style } from '@angular/animations';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
  username: string;
  isClient: boolean = false;
  /******Organize Component end********/

  /***********List Voyage Vars Start********/
  //voyage: trajet[];
  exp: Exp[];
  mix: Mix[];
  vygs: any;
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
  exelTxt: string;

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
              private messageService: MessageService,
              private jwt: JwtHelperService){}

  ngOnInit(): void{
    this.getUserName();
    this.voyageService.numeroSplit({userName: this.username}).subscribe((vl) => localStorage.setItem('numero', vl));
    this.voyageService.readExp().subscribe((vl) => this.exp = vl);
    this.voyageService.readClient({userName: this.username}).subscribe((vl) => this.clients = vl);
    this.nullVars();
  }

  /*******Get the Usename from token*******/
  getUserName(): void{
    const token = this.jwt.decodeToken(localStorage.getItem('token'));
    this.username = token.name;
    this.voyageService.readMix({userName: this.username})
      .subscribe((vl) => this.mix = vl);
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
    if(this.client === null){
      this.isClient = true;
      return;
    }

    const year = formatDate(this.date, 'yyyy', 'en-Us');
    const number = localStorage.getItem('numero');
    this.counterSplit = Number(number) + 1 + '/' + year;
    
   const data: Mix = {
      numero: "0" + this.counterSplit,
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
      userName: this.username
    }

    this.voyageService.createMix(data).subscribe(
      () => {
        this.ngOnInit();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Added Succussfuly!!' });
      }
    );
    

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
      name: this.clnt,
      userName: this.username
    }
    this.voyageService.createClient(data).subscribe(() => {
      this.clients.push(data);
      this.clnt = null;
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
      userName: this.username
    }

    this.voyageService.updateMix(data).subscribe(() => this.ngOnInit());
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Updated Succussfuly!!' });

    this.nullVars();
    this.cancelBtn();
  }

  /**************Make All the Variables null***************/
  nullVars(): void{
    this.clnt = '';
    this.dateD = '';
    this.exelTxt = null;
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
    this.isClient = false;
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
      
    this.voyageService.readMix({userName: this.username})
      .subscribe((value) => this.mix = value.filter((vl) => (
        vl.userName === this.username &&
        vl.numero.includes(num ? num[0].numero : '') &&
        vl.reference.includes(this.reference) &&
        vl.client.includes(testNull ? '' : this.client.name) &&
        vl.dateC >= formatDate(String(this.dateDebut), 'MM/dd/yyyy', 'en-Us') && 
        vl.dateC <= this.dateFin
    )));
  }

  search(event) {
    this.voyageService.readMix({userName: this.username})
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
    let titleRow = worksheet.addRow(['Voyages']);
    titleRow.font = { family: 4, size: 19, bold: true };
    let header = ["Numero", "Date Création", "Date Départ", "Client", "Reference", "Cmr", "Embarquement", "Taxation", "Commentaire"];
    
    const head = worksheet.addRow(header);
    //style the Row header
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
      const vy = worksheet.addRow(temp);
      //style the Rows
      vy.eachCell((cell) => {
        cell.font = cellStyle.font;
        cell.alignment = cellStyle.alignment;
        cell.border = cellStyle.border;
      })
    }

    let fname = "Voyage";

    //add data and file name and download
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, fname+'-'+new Date().valueOf()+'.xlsx');
    });
  }

  /**************Read Exel File*************/
  readExcel(event: any) {
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
      this.vygs = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
    };
  }

  /***************Add Exel File To Db***************/
  onAddExel(): void{
    let i = 0;
    this.vygs.forEach(() => {
      i++;
    })

    let voyages = [];
    for(let j=1; j<i; j++){
      voyages.push(this.vygs[j]);
    }
    const year = formatDate(this.date, 'yyyy', 'en-Us');
    const number = localStorage.getItem('numero');
    let cnt = Number(number) - 1;
   // console.log(voyages);
    voyages.forEach((vl) => {
      cnt = cnt + 1;
      this.counterSplit = cnt + 1 + '/' + year;

      const data = {
        numero: "0" + this.counterSplit,
        dateC: formatDate(vl.__EMPTY, 'MM/dd/yyyy', 'en-Us'),
        dateD: formatDate(vl.__EMPTY_1, 'MM/dd/yyyy', 'en-Us'),
        client: vl.__EMPTY_2,
        reference: vl.__EMPTY_3,
        cmr: vl.__EMPTY_4,
        bool1: vl.__EMPTY_5,
        bool2: vl.__EMPTY_6,
        cmtr: vl.__EMPTY_7,
        expediteur : this.expTable,
        menu: false,
        userName: this.username 
      }

      this.voyageService.createMix(data).subscribe(() => this.ngOnInit());
    });

    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Imported With Succuss!!' });
    this.nullVars();
  }

  imprimer(data: Mix): void{
    const doc = new jsPDF();
    const img = new Image();
    img.src = 'assets/files/logo-digiparc-color.png';
    let adress = 'ARIN EXPRESS MOROCCO SARL - Rue Abi Lhassan Achadili - Tanger / Maroc - ICE : 000023696000020';
    let adressSplit = adress.split('-');
    doc.addImage(img, 'png', 10, 10, 50, 10);
    doc.setFont('helvetica');
    doc.setFontType(200);
    doc.setTextColor(49, 95, 145);
    doc.setFontSize(45);
    doc.lstext('SOGMPS', 80, 25, 1);
    doc.setFontType(700);
    doc.setFontSize(10.5);
    doc.lstext('Transport International de Marchandises Express', 78, 30, 0);
    doc.setTextColor(50, 50, 51);
    doc.setFontSize(12);
    doc.text(adressSplit, 200, 45, 'right');
    doc.setTextColor(0, 0, 0);
    doc.setFontType('bold');
    doc.setFontSize(14);
    doc.text('FACTURE N°'+ data.numero, 85, 70);
    doc.setTextColor(50, 50, 51);
    doc.setFontSize(12);
    doc.setFontType(200);
    //First Table
    doc.rect(10, 80, 190, 28);
    doc.text('Date', 20, 87);
    doc.text('Facture', 18, 92);
    doc.text('01/06/2023', 15, 103.5);
    doc.rect(40, 80, 0, 28);
    doc.text('Date', 50, 87);
    doc.text('Chargement', 45, 92);
    doc.text(data.dateC, 45, 103.5);
    doc.rect(70, 80, 0, 28);
    doc.text('Date', 80, 87);
    doc.text('Déchargement', 73, 92);
    doc.text(data.dateD, 75, 103.5);
    doc.rect(100, 80, 0, 28);
    doc.text('Type Vehicule', 102.5, 90);
    doc.text('Parc', 105, 103.5);
    doc.rect(130, 80, 0, 28);
    doc.text('Matricule', 137, 90);
    doc.text(data.reference, 135, 103.5);
    doc.rect(160, 80, 0, 28);
    doc.text('CMR', 174, 90);
    doc.text(data.cmr, 165, 103.5);
    doc.rect(10, 97, 190, 0)
    //Second Table
    doc.rect(10, 118, 190, 80);
    doc.rect(10, 128, 190, 0);
    doc.rect(160, 118, 0, 80);
    doc.text('Libellées', 76, 124);
    doc.text('Prix Total H.T', 167, 122);
    doc.text('Mad', 175, 126.5);
    doc.setFontSize(11);
    doc.text(`
    - Type Prestation : Transport International / National
    - Type Trajet : Export/ ou Import
    - Point de charge : Usine + Adresse + Pays
    - Point décharge : usine + Adresse + Pays
    

    Prix vente initial ....
    Paralysation (mobilisation) 
    `, 10.5, 129.5);
    doc.text('....', 178, 158);
    doc.text('....', 178, 163);
    //table 3
    doc.rect(130, 200, 70, 30);
    doc.text('TOTAL HT', 135, 206.5);
    doc.text('....', 178, 206.5);
    doc.rect(130, 210, 70, 0);
    doc.rect(160, 200, 0, 30);
    doc.rect(130, 220, 70, 0);
    doc.text('T.V.A 14%', 135, 216.5);
    doc.text('....', 178, 216.5);
    doc.text('TOTAL TTC', 135, 226.5);
    doc.text('....', 178, 226.5);
    doc.text('Arrêté la présente facture à la somme de :', 12, 228);
    doc.setFontSize(9.5);
    doc.text('Conditions de Réglement :', 12, 242);
    //table 4
    doc.setFontSize(12);
    doc.rect(10, 243.5, 190, 15);
    doc.text('Montant TTC', 13, 248.5);
    doc.rect(10, 251, 190, 0);
    doc.rect(40, 243.5, 0, 15);
    doc.text('Mode', 50, 248.5);
    doc.rect(70, 243.5, 0, 15);
    doc.text('Echéance', 73.5, 248.5);
    doc.rect(100, 243.5, 0, 15);
    doc.text('Coordonnées bancaires', 130, 248.5);
    doc.setFontSize(10);
    doc.text(`26, Rue Andaloussi, Building Office Anatolia 4éme Etage N° 14 Tanger (Maroc)
    contact@sogmps.com - www.transport-sogmps.com
    Tél/ Fax : 00212 539 374 401 - GSM 24h : 00212 626 666 315
    Capital Social : 100 000 Mad - Compte Attijari RIB : 007640 001492300000002219
    Agrément de tranport N° : 4579/T/30`, 200, 275, 'right');
    doc.text('PATENTE N° : 50473000 - IF N° : 40121960 - RC N° : 43177 - ICE N° : 001565839000088', 203, 90, -90); 
    doc.save('save.pdf');

    //preview pdf
    /*const pdfDataUri = doc.output('datauristring');
    const newWindow = window.open();
    newWindow.document.write('<iframe src="' + pdfDataUri + '" width="100%" height="100%"></iframe>');*/
  }

  /*onFileSelected(){
    const fileUrl = 'assets/files/logo-digiparc-color.png';
  
    this.http.get(fileUrl, { responseType: 'blob' }).subscribe((blob: Blob) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        // Use the base64String as needed (e.g., send it to the server, display in an <img> tag, etc.)
        console.log(base64String);
      };
      reader.readAsDataURL(blob);
    });
  }*/

  pdfMake(): void{    
    const documentDefinition = {
      content: [
        {
          image: 'data:image/png;base64,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',
          width: 120,
          height: 20
        },
        {text: 'SOGMPS', style: 'header'},
        {text: 'Transport International de Marchandises Express', style: 'header2'},
        {text: `ARIN EXPRESS MOROCCO SARL
        Rue Abi Lhassan Achadili
        Tanger - Maroc
        ICE : 000023696000020`, style: 'adress'},
        {text: 'FACTURE N°23/2021 ', style: 'numero'},
        {
          fontSize: 9.5,
          table: {
            widths: ['*', '*', '*', '*', '*', '*', '*'], // Widths of columns
            body: [
              // Header row
              [
                { text: 'Date Facture', style: 'tableHeader', alignment: 'center' },
                { text: 'Date Chargement', style: 'tableHeader', alignment: 'center' },
                { text: 'Date Déchargement', style: 'tableHeader', alignment: 'center' },
                { text: 'Type Vehicule', style: 'tableHeader', alignment: 'center' },
                { text: 'Matricule ', style: 'tableHeader', alignment: 'center' },
                { text: 'CMR', style: 'tableHeader', alignment: 'center' },
                { text: 'Cour devis étrangère/MAD', style: 'tableHeader', alignment: 'center' },
              ],
              // Data rows
              ['row 1', 'row 2', 'row 3', 'row 4', 'row 5', 'row 6', 'row 7'],
            ],
          }
        },
        {
          margin: [0, 10, 0, 10],
          fontSize: 10,
          table: {
            widths: ['*', 100],
            heights: ['auto', 200],
            body: [
              [
                { text: 'Libellées', style: 'tableHeader2', alignment: 'center' },
                { text: 'Prix Total H.T', style: 'tableHeader2', alignment: 'center' }
              ],
              [
                {text: 'createBlobImageFileAndShow it will create the image blob from the base64 URL which wil be used in working with the image locally or displaying.', style: 'rowMargin1'}, 
                {text: `
                  ....
                  ....
                `, style: 'rowMargin'}
              ]
            ],
          }
        },
        {
          margin: [355, 5],
          fontSize: 10,
          table: {
            widths: [70, 70],
            body: [
              [
                {text: 'TOTAL HT'},
                {text: '...', alignment: 'center'}
              ],
              [
                {text: 'T.V.A 14% '},
                {text: '....', alignment: 'center'}
              ],
              [
                {text: 'TOTAL TTC'},
                {text: '....', alignment: 'center'}
              ]
            ],
          }
        },
        {text: 'Arrêté la présente facture à la somme de :', margin: [0, -18], fontSize: 10},
        {text: 'Conditions de Réglement:', fontSize: 9, margin: [0, 50]},
        {
          margin: [0, -45],
          alignment: 'center',
          fontSize: 10,
          table: {
            widths: ['*', '*', '*', 250],
            body: [
              [
                'Montant TTC', 'Mode', 'Echéance', 'Coordonnées bancaires'
              ],
              [' ', ' ', ' ', '  ']
            ]
          }
        },
        {text: `26, Rue Andaloussi, Building Office Anatolia 4éme Etage N° 14 Tanger (Maroc)
        contact@sogmps.com - www.transport-sogmps.com
        Tél/ Fax : 00212 539 374 401 - GSM 24h : 00212 626 666 315
        Capital Social : 100 000 Mad - Compte Attijari RIB : 007640 001492300000002219
        Agrément de tranport N° : 4579/T/30`, 
        alignment: 'right', margin: [0, 140], fontSize: 10}
      ],
      /*footer: [
        {
          text: '',
          alignment: 'right'
        }
      ],*/
      styles: {
        header: {
          color: '#315f91',
          fontSize: 49,
          alignment: 'center',
          margin: -28
        },
        header2: {
          color: '#315f91',
          fontSize: 9,
          alignment: 'center',
          margin: 22
        },
        adress: {
          color: '#323233',
          float: 'right',
          fontSize: 11,
          alignment: 'right',
        },
        numero: {
          bold: true,
          alignment: 'center',
          margin: 10
        },
        rowMargin: {
          margin: [0, 50],
          alignment: 'center'
        },
        rowMargin1: {
          margin: [2, 20]
        }

      }
    };
    
    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    pdfDocGenerator.open();
    //pdfDocGenerator.download('save.pdf');
  }
} 
