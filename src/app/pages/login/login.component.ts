import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.minLength(6), Validators.required])
  });

  alertMessage = '';
  alertsList: any = {
    user: () => 'Hibás email vagy jelszó',
    server: () => 'A szolgáltatás nem elérhető',
    false: () => ''
  };


  @HostListener('document:keydown.enter') onKeydownHandler() {
    this.login();
  }

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.logout();
  }

  navTo(url: string): void {
    this.router.navigateByUrl(url);
  }


  login(): void {
    if (this.form.invalid) {
      return;
    }
    this.authService.login(this.form.value.email, this.form.value.password).then(
      result => { 
        console.log(result);
        this.navTo('/home');
      },
      (error) => {
        this.alertMessage = (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password')
          ? this.alertsList.user() : this.alertsList.server();
      }
    );
  }
}

    /*username: any;
  time: any;
  email: any;
  password: any;
  private userDoc: AngularFirestoreDocument<any> | undefined;
  users: Observable<any> | undefined;
  private userCol: AngularFirestoreCollection<any> | undefined;
  message: string[] = []

  constructor(
    public authService: AuthService,
    private router: Router,
    private shared: SharedService,
    private firestore: AngularFirestore,

  ) {

  }

  ngOnInit(): void {

  }
  signUp() {
    this.router.navigate(['signup'])
  }
  onSubmit() {
    console.log('here ....', this.email, this.password);

    if (this.email && this.password) {
      this.authService.login(this.email, this.password).subscribe(res => {
        this.router.navigate(['game']);
      })
    }


  }*/


