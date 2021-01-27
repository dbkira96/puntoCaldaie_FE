import { Component, OnInit } from '@angular/core';
import { Cliente } from '../domain/Cliente';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { ClientDataServiceService } from '../services/ClientDataService.service';
import { ifStmt } from '@angular/compiler/src/output/output_ast';
import { Stufa } from 'app/domain/Stufa';
import { Caldaia } from 'app/domain/Caldaia';

@Component({
  selector: 'app-Clienti',
  templateUrl: './Clienti.component.html',
  styleUrls: ['./Clienti.component.scss'],
  providers: [ClientDataServiceService,MessageService,ConfirmationService]
})
export class ClientiComponent implements OnInit {

  constructor(private clientService:ClientDataServiceService,
              private messageService:MessageService,
              private confirmationService: ConfirmationService) {

  }

  clienti:Cliente[]=[];
  selCliente:Cliente={}
  clientDialog:boolean
  submitted:boolean
  search:string
  stufe:Stufa[]=[]
  caldaie:Caldaia[]=[]

  ngOnInit() {
     this.clientService.getAllUsers().subscribe(
      data=>{
        this.clienti=data
      },
      err=>{
        this.messageService.add({ key: 'tc', severity: 'error', summary: 'Error', detail: 'Errore caricando gli utenti' });
      }); 
      
  } 
  loadDataFromFile(filePath:String){
    //"test.js"
    this.clientService.getDataFromJson(filePath).subscribe(
      data=>{
        console.log(data);
        this.clienti=data.clienti;
        this.stufe=data.stufe;
        this.caldaie=data.caldaie
        
       
           
            this.clienti.forEach(cliente=>{
              cliente.caldaie=[]
              cliente.stufe=[]
            })
            this.caldaie.forEach(c=>{
              if (c.cliente!=null){
                var c1:Cliente= this.clienti.find(cliente=>cliente.id==c.cliente.id)
                if (c1!=null) {
                    c1.caldaie.push(c)
                }
                else
                console.log("utente non trovato per caldaia:"+c.cliente.id) 
              }
              else 
                console.log(c)
            })
            this.stufe.forEach(s=>{
              if(s.cliente!=null){
                var c1 = this.clienti.find(cliente=>cliente.id==s.cliente.id)
                if(c1!=null){
                  c1.stufe.push(s)
                }
                else
                 console.log("utente non trovato per stufa:"+s.cliente.id) 
              }
              else
                console.log(s)
            })
            
            this.clienti.forEach(cliente=>{
              cliente.caldaie.forEach(c=>c.cliente=null)
              cliente.stufe.forEach(c=>c.cliente=null)
            })

         
        this.clientService.saveAll(this.clienti).subscribe(
          data=>{
            this.clienti=data
            console.log(data)
          }
        )
         }
        )
  }
  nuovoUtente() {
    this.selCliente = {};
    this.submitted = false;
    this.clientDialog = true;
  }

  editCliente(cliente:Cliente){
    this.selCliente={...cliente};
    this.clientDialog=true;
  }

  deleteCliente(cliente: Cliente) {
    this.confirmationService.confirm({
        message: 'Sei sicuro/a di voler eliminare ' + cliente.nominativo + '?',
        header: 'Conferma',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.clienti = this.clienti.filter(val => val.id !== cliente.id);
            this.selCliente = {};
            this.clientService.delete(cliente.id).subscribe(
              success=>{this.messageService.add({severity:'success', summary: 'Successful', detail: 'Utente Eliminato', life: 3000})},
              err=>{this.messageService.add({severity:'error', summary: 'Errore', detail: 'errore eliminazione utente', life: 3000});}
            );
            
        }
    });
  }

  hideDialog() {
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
              },
              err=>{this.messageService.add({severity:'error', summary: 'Errore', detail: 'errore modifica utente', life: 3000});}
            )
            
        }
        else {

            this.clientService.add(this.selCliente).subscribe(
              data=>{
                this.clienti.push(data)
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Utente aggiunto con Successo', life: 3000});
              },
              
              err=>{
                this.messageService.add({severity:'error', summary: 'Errore', detail: 'errore aggiunta utente', life: 3000});
              }
            );      
        }

        this.clienti = [...this.clienti];
        this.clientDialog = false;
        this.selCliente = {};
    }
  }
  selectCliente(cliente:Cliente){
    this.selCliente=cliente
  }
}
