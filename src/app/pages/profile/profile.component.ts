import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Auth, getAuth } from "firebase/auth";
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/compat/auth';

AngularFireModule.initializeApp(environment.firebase)

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  hide = true;

  form1: FormGroup = new FormGroup({
    password1: new FormControl('', [Validators.minLength(6), Validators.required]),

  });
  constructor( private router: Router, private authService: AuthService) { }

  navTo(url: string): void {
    this.router.navigateByUrl(url);
  }

  auth = getAuth();
  user = this.auth.currentUser;

  if(user: any) {
    const email = user.email;
    const password = user.password
  };

  ngOnInit(): void {
    this.currentEmail();
  }

  currentEmail(): void {
    this.user?.email
  }



  updatePassword() {
    if (this.form1.invalid) {
      return;
    }
    this.authService.newPassword(this.form1.value.password1).then(
      result => {
        console.log(result);
        this.navTo('/login');

      })
  }

}
