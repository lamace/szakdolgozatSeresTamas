import { Component, HostListener } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  private userCol: AngularFirestoreCollection<any> | undefined;
  uniqName = false;
  userName: any;
  score = 0;
  email: any;
  password: any;
  allScore: [] = [];

  form: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password1: new FormControl('', [Validators.minLength(6), Validators.required]),
    password2: new FormControl('', [Validators.minLength(6), Validators.required]),
  });


  alertMessage = '';
  alertsList: any = {
    user: () => 'Hibás email vagy jelszó',
    server: () => 'A szolgáltatás nem elérhető',
    false: () => ''
  };

  hide = true;
  error = false;

  navTo(url: string): void {
    this.router.navigateByUrl(url);
  }


  constructor(private router: Router, private authService: AuthService, private firestore: AngularFirestore) { }

  @HostListener('document:keydown.enter') onKeydownHandler() {
    this.registration();
  }

  /*registration(): void {

    this.authService.registration(this.form.value.email, this.form.value.password1).then(
      result => {

        console.log(result);
        this.navTo('/login');
      },
      (error) => {
        this.alertMessage = (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password')
          ? this.alertsList.user() : this.alertsList.server();
      }
    )
  }*/



  registration() {
    let subscription: Subscription;
    this.userCol = this.firestore.collection<any>('users');
    subscription = this.userCol.snapshotChanges().subscribe((value: any) => {
      this.uniqName = false;
      if (value) {
        for (let i = 0; i < value.length; i++) {
          console.log('user name is: ', this.userName);

          console.log(
            'the value is: ',
            Object.values(value[i].payload.doc.data()).sort()
          );
          if (
            Object.values(value[i].payload.doc.data()).sort()[1] ==
            this.userName
          ) {
            console.log('the user name has been used');
            this.uniqName = true;
          }
        }


        if (this.form.value.password1 === this.form.value.password2) {
          if (this.uniqName == false) {
            this.authService
              .registration(this.email = this.form.value.email, this.password = this.form.value.password1)
              .pipe(
                switchMap(({ user: { uid } }) =>
                  this.authService.addUser(
                    uid,
                    this.score,
                    this.userName = this.form.value.userName,
                    this.email,
                    this.password,
                    this.allScore,
                  )
                )
              )
              .subscribe(() => {
                this.router.navigate(['/login']);
              });
          }
          
        }


        
      }
      subscription.unsubscribe();

    });

    if (this.email && this.password && this.userName) {
      //console.log('tne uniqName ', this.uniqName);
      this.registration();
      //console.log('tne uniqName ', this.uniqName);
    }

  }









}

















