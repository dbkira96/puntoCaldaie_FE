import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientiComponent } from './Clienti/Clienti.component';

const routes: Routes = [
  {path:'clienti',component:ClientiComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
