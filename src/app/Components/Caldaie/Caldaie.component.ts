import { Component, OnInit } from '@angular/core';
import { Caldaia } from 'app/domain/Caldaia';
import { Cliente } from 'app/domain/Cliente';
import { CaldaiaDataService } from 'app/services/CaldaiaData.service';
import { ClientDataServiceService } from 'app/services/ClientDataService.service';
import { StufaDataService } from 'app/services/stufaData.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { table } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Caldaie',
  templateUrl: './Caldaie.component.html',
  styleUrls: ['./Caldaie.component.scss'],
  providers: [ClientDataServiceService,ConfirmationService]
})
export class CaldaieComponent implements OnInit {

  constructor(private clientService:ClientDataServiceService,
    private messageService:MessageService,
    private confirmationService: ConfirmationService,
    private caldaiaService:CaldaiaDataService,
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

caldaie:Caldaia[]=[]
filteredCaldaie:Caldaia[]=[]

selCaldaia:Caldaia={}
caldaiaDialog:boolean=false
cols: any[];

exportColumns: any[]=[];
exportData: any[]=[];
  

  ngOnInit() {
    this.clientService.getAllUsers().subscribe(
      data=>{
        this.clienti=data
        this.populateCaldaie()
      },
      err=>{
        this.messageService.add({ key: 'tc', severity: 'error', summary: 'Error', detail: 'Errore caricando gli utenti' });
      });
     
     this.exportColumns=[["Nominativo","Recapiti","Città","Indirizzo","Caldaia","Mese Scad.","Anno Scad.","Importo","Note"]]
  }

  populateCaldaie(){
    //extracting caldaie from users
    this.clienti.forEach(c=>{
      c.caldaie.forEach(cal=>{
        cal.cliente=c
        this.caldaie.push(cal)
      })
    })
    this.caldaie=[...this.caldaie]
    
  
  }
  exportPdf() {
    
    

    
    this.exportData= this.filteredCaldaie.map(c=>([c.cliente.nominativo,c.cliente.telefono+" "+c.cliente.cellulare,c.cliente.citta,c.cliente.indirizzo,c.titolo,c.scadenza,c.scadanno,c.importo,c.annotazione]));
    
    console.log(this.exportData)
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

  //Metodi Crud Caldaie
  editCaldaia(caldaia:Caldaia){
    this.selCaldaia={...caldaia}
    this.selCaldaia.cliente=this.selCliente
    this.caldaiaDialog=true
  }
  deleteCaldaia(caldaia:Caldaia){
    
    this.confirmationService.confirm({
      message: 'Sei sicuro/a di voler eliminare la caldaia ' + caldaia.titolo + '?',
      header: 'Conferma',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.selCliente.caldaie = this.selCliente.caldaie.filter(val => val.id !== caldaia.id);
          this.caldaiaService.delete(caldaia.id).subscribe(
            success=>{this.messageService.add({key:"tc",severity:'success', summary: 'Successful', detail: 'Caldaia Eliminata', life: 3000})},
            err=>{this.messageService.add({key:"tc",severity:'error', summary: 'Errore', detail: 'errore eliminazione caldaia', life: 3000});}
          );
          
      }
  });
  }
  saveCaldaia(){
    this.submitted = true;
    if (this.selCaldaia.titolo.trim()) {
        if (this.selCaldaia.id) {
            this.caldaiaService.save(this.selCaldaia).subscribe(
              success=>{
              var id = this.caldaie.indexOf(this.caldaie.find(c=>c.id==success.id))
              this.caldaie[id]=success   
              this.messageService.add({key:"tc",severity:'success', summary: 'Successful', detail: 'Caldaia modificata con Successo', life: 3000});
                
              },
              err=>{this.messageService.add({key:"tc",severity:'error', summary: 'Errore', detail: 'errore modifica caldaia', life: 3000});}
            )
            
        }
        else {

            this.caldaiaService.add(this.selCaldaia).subscribe(
              data=>{
                this.selCliente.caldaie.push(data)
                this.messageService.add({key:"tc",severity:'success', summary: 'Successful', detail: 'Caldaia aggiunta con Successo', life: 3000});
              },
              
              err=>{
                this.messageService.add({key:"tc",severity:'error', summary: 'Errore', detail: 'errore aggiunta caldaia', life: 3000});
              }
            );      
        }    
    }
    
    this.caldaiaDialog = false;
    location.reload()
  }
  hideCaldaiaDialog() {
    this.caldaiaDialog = false;
    this.submitted = false;
  }
}



