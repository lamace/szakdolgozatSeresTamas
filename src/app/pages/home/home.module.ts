import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SplashScreenComponent } from '../splash-screen/splash-screen.component';
import { SplashScreenModule } from '../splash-screen/splash-screen.module';
import { GameCardModule } from '../game/card/game-card.module';
import { FormsModule } from '@angular/forms';
import { OnHoverModule } from 'src/app/shared/directives/on-hover/on-hover.module';





@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule, FormsModule, SplashScreenModule, GameCardModule, OnHoverModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
