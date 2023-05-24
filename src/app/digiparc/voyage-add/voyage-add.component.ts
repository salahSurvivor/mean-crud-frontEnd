import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { VoyageService } from '../services/voyage.service';
import { Exp } from '../models/exp';
import { Client } from '../models/client';
import { Mix } from '../models/mix';
import  ObjectID  from 'bson-objectid';

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
  deleteId: string;
  /***********List Voyage Vars End*********/

  /********voyage addd vars start********/
  date = new Date();
  dateFormat = formatDate(this.date, 'MM/dd/yyyy', 'en-Us')

  numero: string = '';
  dateC: string = this.dateFormat;
  dateD: string = this.dateFormat;
  client: Client = {name: ''};
  reference: string = '';
  cmr: string = '';
  bool1: boolean = false;
  bool2: boolean = false;
  cmtr: string = '';

  expediteur: Client = {name: ''};
  destinateur: Client = {name: ''};
  dateChargementP: any = this.dateFormat;
  retardChargement: string
  retardDeChargement: string;
  //cmr2: string = '';

  /*****When Update*******/
  expediteurU: Client = {name: ''};
  destinateurU: Client = {name: ''};
  dateChargementPU: any = this.dateFormat;
  retardChargementU: string
  retardDeChargementU: string;

  clnt: string;
  counterSplit: any = 0;
  /********voyage addd vars end********/

  constructor(private voyageService: VoyageService,
              private messageService: MessageService){}

  ngOnInit(): void{
    this.voyageService.numeroSplit().subscribe((vl) => localStorage.setItem('numero', vl));

    this.voyageService.readMix().subscribe((vl) => this.mix = vl);
    this.voyageService.readExp().subscribe((vl) => this.exp = vl);
    this.voyageService.readClient().subscribe((vl) => this.clients = vl);
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

    this.dateC = this.dateFormat;
    this.dateD = this.dateFormat;
    this.reference = null;
    this.cmr = null;
    this.bool1 = false;
    this.bool2 = false;
    this.cmtr = null;

    this.dateChargementP = this.dateFormat;
    this.retardChargement = null;
    this.retardDeChargement = null;
    this.isAddExp = false;

    this.expTable = [];

    this.onList  = true;
    this.onAdd = false; 
    this.onUpdate = false;
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

    this.dateC = this.dateFormat;
    this.dateD = this.dateFormat;
    this.reference = null;
    this.cmr = null;
    this.bool1 = false;
    this.bool2 = false;
    this.cmtr = null;

    this.dateChargementP = this.dateFormat;
    this.retardChargement = null;
    this.retardDeChargement = null;
    this.isAddExp = false;

    this.expTable = [];

    this.onList  = true;
    this.onAdd = false; 
    this.onUpdate = false;

    this.ngOnInit();
    this.voyageService.readMix().subscribe((vl) => this.mix = vl);
  }
}
