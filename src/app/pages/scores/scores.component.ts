import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.scss'],
})
export class ScoresComponent implements OnInit {
  title = 'Eredmények';
  private userDoc: AngularFirestoreDocument<any> | undefined;
  users: Observable<any> | undefined;
  private userCol: AngularFirestoreCollection<any> | undefined;

  topScores: { name: any; score: any }[] = [];
  userScores: { date: String; score: any }[] = [];
  message: any;

  uid: any;

  constructor(
    private store: AngularFirestore,
    private shared: SharedService,
    private firestore: AngularFirestore,
    private router: Router,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((res) => {
      console.log('there ressssss', res?.uid);

      this.uid = res?.uid;
    });
    this.getUserScores();
    this.getTopScores();
  }



  getTopScores() {
    this.topScores = [];
    let subscription: Subscription;
    this.userCol = this.firestore.collection<any>(`/users`);
    console.log('ther user Col ', this.userCol);
    subscription = this.userCol.snapshotChanges().subscribe((value: any) => {
      if (value) {
        for (let i = 0; i < value.length; i++) {
          console.log('the value is: ', value[i].payload.doc.data().userName);
          Object.values(value[i].payload.doc.data());
            this.topScores.push({
              name: value[i].payload.doc.data().userName,
              score: value[i].payload.doc.data().topScore,
            });
        }
        console.log(this.topScores);
        subscription.unsubscribe();
      } else {
        subscription.unsubscribe();
      }
    });
  }

  getUserScores() {
    let subscription: Subscription;
    console.log('ther uid ', this.uid);
    this.authService.currentUser$.subscribe((res => {
      this.userCol = this.firestore.collection<any>(`/users/${res?.uid}/scores`);
      console.log('ther user Col ', this.userCol);
      subscription = this.userCol.snapshotChanges().subscribe((value: any) => {
        if (value) {
          //console.log('here.....',value);

          for (let i = 0; i < value.length; i++) {
            //console.log('the value is: in socoresss... ', value[i].payload.doc.data());
            Object.values(value[i].payload.doc.data());
            this.userScores.push({
              date: value[i].payload.doc.data().date,
              score: value[i].payload.doc.data().socress,
            });
          }
          console.log(this.topScores);
          subscription.unsubscribe();
        } else {
          subscription.unsubscribe();
        }
      });

    }))



    // this.userCol = this.firestore.collection<any>('users');
    // this.userDoc = this.firestore.doc<any>('users/' + this.uid);
    // console.log('ther user Doc', this.userDoc);

    // this.users = this.userDoc.valueChanges();
    // let subscription = this.users.subscribe((value: any) => {
    //   console.log('in here...', value, this.uid);
    //   if (value) {
    //     console.log(Object.keys(value).length);
    //     for (let i = 0; i < Object.keys(value).length; i++) {
    //       this.userScores.push({
    //         date: this.formatDate(Number(Object.keys(value)[i])),
    //         score: Object.values(value)[i],
    //       });
    //     }
    //     console.log(this.userScores);
    //     subscription.unsubscribe();
    //   } else {
    //   }
    // });
  }

  get sortDate() {
    return this.userScores.sort((a, b) => a.date < b.date ? 1 : -1);
  };

  formatDate(date: number) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear(),
      hour = d.getHours(),
      minutes = d.getMinutes();

    let time = ' ' + hour + ':' + minutes;

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day, time].join('-');
  }

  onClick() {
    this.router.navigate(['/home/game']);
  }
}
