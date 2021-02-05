import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientiComponent } from './Components/Clienti/Clienti.component';
import{CaldaieComponent}from './Components/Caldaie/Caldaie.component'
import { StufeComponent } from './Components/Stufe/Stufe.component';

const routes: Routes = [
  {path:'clienti',component:ClientiComponent},
  {path:'caldaie',component:CaldaieComponent},
  {path:'',component:ClientiComponent},
  {path:'stufe',component:StufeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
