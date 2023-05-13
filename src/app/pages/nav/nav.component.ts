import { Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CATEGORIES } from './../../shared/database/category.database';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent  {
  categories = CATEGORIES;

  constructor(private router: Router, private authService: AuthService) { }

  logout(): void{
    this.authService.logout();
    this.router.navigateByUrl('login');
  }

  
}
