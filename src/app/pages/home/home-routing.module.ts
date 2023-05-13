import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent }
  /*{
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'game',
        loadChildren: () => import('./../game/game.module').then(m => m.GameModule),
      },
      {
        path: 'scores',
        loadChildren: () => import('../scores/scores.module').then(m => m.ScoresModule),
      },
      

    ],
    canActivateChild: [AuthGuard]
  },*/
];


/*{
  path: 'registration',
  loadChildren: () => import('./pages/registration/registration.module').then(m => m.RegistrationModule),
},
{
  path: 'login',
  loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
},
{
  path: 'results',
  loadChildren: () => import('./pages/results/results.module').then(m => m.DetailsModule),
},*/

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class HomeRoutingModule { }