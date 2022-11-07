import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameCardComponent } from './game-card.component';
import {MatCardModule} from '@angular/material/card';




@NgModule({
  declarations: [
    GameCardComponent
  ],
  imports: [
    CommonModule, MatCardModule
  ],
  exports: [GameCardComponent]
})
export class GameCardModule { }
