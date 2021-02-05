import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../domain/Cliente';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { ClientDataServiceService } from '../../services/ClientDataService.service';
import{CaldaiaDataService}from '../../services/CaldaiaData.service'
import { ifStmt } from '@angular/compiler/src/output/output_ast';
import { Stufa } from 'app/domain/Stufa';
import { Caldaia } from 'app/domain/Caldaia';
import { StufaDataService } from 'app/services/stufaData.service';
import{saveAs} from 'file-saver'
import { Router } from '@angular/router';

@Component({
  selector: 'app-Clienti',
  templateUrl: './Clienti.component.html',
  styleUrls: ['./Clienti.component.scss'],
  providers: [ClientDataServiceService,ConfirmationService]
})
export class ClientiComponent implements OnInit {

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
  search:string
  
  caldaie:Caldaia[]=[]
  selCaldaia:Caldaia={}
  caldaiaDialog:boolean=false

  stufe:Stufa[]=[]
  selStufa:Stufa={}
  stufaDialog:Boolean=false
  ngOnInit() {
     this.clientService.getAllUsers().subscribe(
      data=>{
        this.clienti=data
      },
      err=>{
        this.messageService.add({ key: 'tc', severity: 'error', summary: 'Error', detail: 'Errore caricando gli utenti' });
      }); 
      
  } 
  
  nuovoUtente() {
    this.selCliente = {caldaie:[],stufe:[]};
    this.submitted = false;
    this.clientDialog = true;
  }

  editCliente(){
    this.submitted=false
    this.clientDialog=true;
  }

  deleteCliente() {
    
    this.confirmationService.confirm({
        message: 'Sei sicuro/a di voler eliminare ' + this.selCliente.nominativo + '?',
        header: 'Conferma',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.clienti = this.clienti.filter(val => val.id !== this.selCliente.id);
            
            this.clientService.delete(this.selCliente.id).subscribe(
              success=>{this.messageService.add({severity:'success', summary: 'Successful', detail: 'Utente Eliminato', life: 3000})
              this.selCliente={caldaie:[],stufe:[]}
            },
              err=>{this.messageService.add({severity:'error', summary: 'Errore', detail: 'errore eliminazione utente', life: 3000});}
            );
            
        }
    });
  }

  hideClientDialog() {
    this.clientDialog = false;
    this.submitted = false;
  }
  saveCliente() {
    this.submitted = true;

    if (this.selCliente.nominativo.trim()) {
        if (this.selCliente.id) {
            this.clientService.save(this.selCliente).subscribe(
              success=>{
                var modCliente =this.clienti.find(c=>c.id==success.id)
                if (modCliente!=null) modCliente=success
                this.selCliente=success
              },
              err=>{this.messageService.add({severity:'error', summary: 'Errore', detail: 'errore modifica utente', life: 3000});}
            )
            
        }
        else {

            this.clientService.add(this.selCliente).subscribe(
              data=>{
                this.clienti.push(data)
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Utente aggiunto con Successo', life: 3000});
                this.selCliente=data
              },
              
              err=>{
                this.messageService.add({severity:'error', summary: 'Errore', detail: 'errore aggiunta utente', life: 3000});
              }
            );      
        }

        this.clienti = [...this.clienti];
        this.clientDialog = false;
        
    }
  }
  selectCliente(cliente:Cliente){
    this.selCliente=cliente
  }

  //metodi Caldaia

  newCaldaia(){
    this.selCaldaia={}
    this.selCaldaia.cliente=this.selCliente
    this.submitted=false
    this.caldaiaDialog=true;
  }
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
                  this.clientService.getUser(this.selCliente.id).subscribe(
                    c=>{this.selCliente=c}
                  );
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

       
        this.caldaiaDialog = false;
        
    }
  }
  hideCaldaiaDialog() {
    this.caldaiaDialog = false;
    this.submitted = false;
  }

  //metodi Stufe

  newStufa(){
    this.selStufa={}
    this.selStufa.cliente=this.selCliente
    this.submitted=false
    this.stufaDialog=true;
  }
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
                this.clientService.getUser(this.selCliente.id).subscribe(
                  c=>{this.selCliente=c}
                );
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

        this.selCliente.caldaie = [...this.selCliente.caldaie];
        this.stufaDialog = false;
        this.selStufa = {};
    }
  }
  
  
  hideStufaDialog() {
    this.stufaDialog = false;
    this.submitted = false;
  }

  downloadUserData(){
    var FileSaver=require('file-saver')
    var blob = new Blob ([JSON.stringify(this.clienti,null,2)], {type : 'application/json'})
    FileSaver.saveAs(blob,"backup.js")
  }

  fileToUpload: File = null;

  onBasicUpload(files:FileList){
    console.log("file caricato")
    this.fileToUpload=files.item(0)
    console.log(this.fileToUpload)
    const fileReader=new FileReader()
    fileReader.onload=()=>{
      this.clientService.deleteAll().subscribe(
        success=>{
          var clientiAdd=JSON.parse(fileReader.result.toString())
           
              this.clientService.saveAll(clientiAdd).subscribe(
              data=>{this.clienti=data
                this.messageService.add({key:"tc",severity:'success', summary: 'Successful', detail: 'Backup ripristinato con successo', life: 3000});
              }
          );
        }
      )
    }
    fileReader.readAsText(this.fileToUpload)
      
      
      
    
    
  }
  redirect(target: string) {
    this.route.navigate([target]);
  }
}
