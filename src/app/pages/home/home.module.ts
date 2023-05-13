import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { NavModule } from '../nav/nav.module';
import { HomeRoutingModule } from './home-routing.module';
import { RouterModule } from '@angular/router';
import { AppModule } from 'src/app/app.module';





@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule, HomeRoutingModule, RouterModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class HomeModule { }
