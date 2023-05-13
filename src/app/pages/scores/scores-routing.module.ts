import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScoresComponent } from './scores.component';

const routes: Routes = [
    {
      path: '',
      component: ScoresComponent,
      data: { title: 'Eredmények' }
    }
  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  
  export class ScoresRoutingModule { }