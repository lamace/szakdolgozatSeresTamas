import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoresComponent } from './scores.component';
import { MatCardModule } from '@angular/material/card';
import { ScoresRoutingModule } from './scores-routing.module';



@NgModule({
  declarations: [
    ScoresComponent
  ],
  imports: [
    CommonModule, MatCardModule, ScoresRoutingModule
  ],
  exports: [ScoresComponent]
})
export class ScoresModule { }
