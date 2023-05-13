import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';



@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule, ProfileRoutingModule, MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule, MatInputModule, ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatListModule,
    MatRadioModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ProfileModule { }
