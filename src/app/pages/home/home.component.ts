import { Component, OnDestroy, OnInit } from '@angular/core';
import { GAMES } from './../../shared/database/game.database';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, OnDestroy {
  games = GAMES;
  category? = '';

  constructor() { }

  ngOnInit(): void {
    this.category = 'game';
  }

  ngOnDestroy(): void {
    delete this.category;
  }

}
