import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    NavComponent
  ],
  imports: [
    CommonModule, MatToolbarModule, MatButtonModule, MatMenuModule, MatIconModule, RouterModule
  ], 
  exports: [NavComponent], 
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class NavModule { }
