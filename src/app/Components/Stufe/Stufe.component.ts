import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'app/domain/Cliente';
import { Stufa } from 'app/domain/Stufa';
import { ClientDataServiceService } from 'app/services/ClientDataService.service';
import { StufaDataService } from 'app/services/stufaData.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
@Component({
  selector: 'app-Stufe',
  templateUrl: './Stufe.component.html',
  styleUrls: ['./Stufe.component.scss'],
  providers: [ClientDataServiceService,ConfirmationService]
})
export class StufeComponent implements OnInit {

  constructor(private clientService:ClientDataServiceService,
    private messageService:MessageService,
    private confirmationService: ConfirmationService,
    
    private stufaService:StufaDataService,
    private route: Router) {

}

  
clienti:Cliente[]=[];
selCliente:Cliente={caldaie:[],stufe:[]}
clientDialog:boolean

submitted:boolean
search:string=""
selectedMonth:string=""
months:string[]=["GENNAIO","FEBBRAIO","MARZO","APRILE","MAGGIO","GIUGNO","LUGLIO","AGOSTO","SETTEMBRE","OTTOBRE","NOVEMBRE","DICEMBRE"]

selectedYear:string=""
selectedCitta:string=""

stufe:Stufa[]=[]
filteredStufe:Stufa[]=[]

selStufa:Stufa={}
stufaDialog:boolean=false
cols: any[];

exportColumns: any[]=[];
exportData: any[]=[];
  

  ngOnInit() {
    this.clientService.getAllUsers().subscribe(
      data=>{
        this.clienti=data
        this.populateStufe()
      },
      err=>{
        this.messageService.add({ key: 'tc', severity: 'error', summary: 'Error', detail: 'Errore caricando gli utenti' });
      });
     
     this.exportColumns=[["Nominativo","Recapiti","Città","Indirizzo","Stufa","Anno Scad.","Importo","Note"]]
  }

  populateStufe(){
    //extracting stufe from users
    this.clienti.forEach(c=>{
      c.stufe.forEach(cal=>{
        cal.cliente=c
        this.stufe.push(cal)
      })
    })
    this.stufe=[...this.stufe]
    
  
  }
  exportPdf() {
    

    
    this.exportData= this.filteredStufe.map(c=>([c.cliente.nominativo,c.cliente.telefono+" "+c.cliente.cellulare,c.cliente.citta,c.cliente.indirizzo,c.titolo,c.scadanno,c.importo,c.annotazione]));
    
    console.log(this.stufe)
    var doc = new jsPDF('l', 'mm', [297, 210])
    autoTable(doc,{
      head:this.exportColumns,
      body:this.exportData,
    })
    
    doc.output('dataurlnewwindow');
    
    
  }
  redirect(target: string) {
    this.route.navigate([target]);
  }

  //Metodi Crud Stufe
  editStufa(stufa:Stufa){
    this.selStufa={...stufa}
    this.selStufa.cliente=this.selCliente
    this.stufaDialog=true
  }
  deleteStufa(stufa:Stufa){
    
    this.confirmationService.confirm({
      message: 'Sei sicuro/a di voler eliminare la stufa ' + stufa.titolo + '?',
      header: 'Conferma',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.selCliente.stufe = this.selCliente.stufe.filter(val => val.id !== stufa.id);
          this.stufaService.delete(stufa.id).subscribe(
            success=>{this.messageService.add({key:"tc",severity:'success', summary: 'Successful', detail: 'Stufa Eliminata', life: 3000})},
            err=>{this.messageService.add({key:"tc",severity:'error', summary: 'Errore', detail: 'errore eliminazione stufa', life: 3000});}
          );
          
      }
  });
  }
  saveStufa(){
    this.submitted = true;
    if (this.selStufa.titolo.trim()) {
        if (this.selStufa.id) {
            this.stufaService.save(this.selStufa).subscribe(
              success=>{
              var id = this.stufe.indexOf(this.stufe.find(c=>c.id==success.id))
              this.stufe[id]=success   
              this.messageService.add({key:"tc",severity:'success', summary: 'Successful', detail: 'Stufa modificata con Successo', life: 3000});
                
              },
              err=>{this.messageService.add({key:"tc",severity:'error', summary: 'Errore', detail: 'errore modifica stufa', life: 3000});}
            )
            
        }
        else {

            this.stufaService.add(this.selStufa).subscribe(
              data=>{
                this.selCliente.stufe.push(data)
                this.messageService.add({key:"tc",severity:'success', summary: 'Successful', detail: 'Stufa aggiunta con Successo', life: 3000});
              },
              
              err=>{
                this.messageService.add({key:"tc",severity:'error', summary: 'Errore', detail: 'errore aggiunta stufa', life: 3000});
              }
            );      
        }    
    }
    
    this.stufaDialog = false;
    location.reload()
  }
  hideStufaDialog() {
    this.stufaDialog = false;
    this.submitted = false;
  }
}

