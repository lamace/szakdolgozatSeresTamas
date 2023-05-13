import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestComponent } from './guest.component';

const routes: Routes = [
    {
      path: '',
      component: GuestComponent,
      data: { title: 'Regisztráció nélküli játék' }
    }
  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  
  export class GuestRoutingModule { }