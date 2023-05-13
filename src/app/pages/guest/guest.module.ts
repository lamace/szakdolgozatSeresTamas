import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestComponent } from './guest.component';
import { MatCardModule } from '@angular/material/card';
import { GuestRoutingModule } from './guest-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    GuestComponent
  ],
  imports: [
    CommonModule, MatCardModule, GuestRoutingModule, MatToolbarModule, MatButtonModule, MatMenuModule, MatIconModule, RouterModule

  ]
})
export class GuestModule { }
