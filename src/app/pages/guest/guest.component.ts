import { AfterViewInit, ChangeDetectorRef, Component, OnInit, Renderer2 } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
//import {SharedService} from '../../shared/shared.service';
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-Guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.scss']
})

export class GuestComponent implements OnInit {
  title = 'Játék;'
  userScores: { date: String; score: any }[] = [];
  choices: string[] = [];
  mainImg = '';
  result = '';
  //message: any;
  i: number=0;
  score: number = 0;
  level: number = 1;
  prevScore: unknown = 0;
  scoresss: number[] = []
  uid: any;
  private userDoc: AngularFirestoreDocument<any> | undefined;
  users: Observable<any> | undefined;
  private userCol: AngularFirestoreCollection<any> | undefined;
  private userCol2: AngularFirestoreCollection<any> | undefined;

  /*
*
*change the number of levels to the number of questions you need
*
* */
  private numberOfLevels: number = 3;


  constructor(private store: AngularFirestore, /*private shared: SharedService,*/ private renderer: Renderer2, private firestore: AngularFirestore, private router: Router, public authService: AuthService) {
  }


  async ngOnInit(): Promise<void> {
    await this.getData(this.level);
    //this.randomRotation();
    //this.getLastGameScore();

  }

  getData(level: number): void {
    let url = this.store.collection("images").doc("set" + level).get();
    url.subscribe((value: any) => {
      this.mainImg = value.get("main_img");
      this.result = value.get("result");
      this.clearSelection();

      const values = Object.values(value.data()) as string[];
      const keys = Object.keys(value.data());

      let data = [];
      for (let i = 0; i < values.length; i++) {
        const v = values[i];
        const k = keys[i];
        const d = { [k]: v };
        data.push(d);
      }

      const newData = data.filter((value) => Object.keys(value)[0] !== "main_img" && Object.keys(value)[0] !== "result");
      this.choices = []
      for (let i = 0; i < newData.length; i++) {
        this.choices.push(Object.values(newData[i])[0]);
      }
      this.choices = this.shuffle(this.choices);
      //console.log(this.choices)
    });

  }

  /*getLastGameScore() {
    this.authService.currentUser$.subscribe(res => {
      let subscription: Subscription;
      this.userCol = this.firestore.collection<any>(`/users/${res?.uid}/scores`);
      subscription = this.userCol.snapshotChanges().subscribe((value: any) => {
        if (value) {
          for (let i = 0; i < value.length; i++) {
            this.prevScore = value[length].payload.doc.data().score;
            subscription.unsubscribe();
            console.log(this.prevScore);
          }
        } else {
          console.log("User does not exist with the user name: " + this.uid)
          subscription.unsubscribe();
          console.log(this.prevScore);

        }
      })
    })

  }*/

  /*randomRotation() {
    const image = document.getElementsByClassName('img-container');
    for (var i = 0; i < image.length; i++) {
      this.renderer.setStyle(
        image[i],
        'transform',
        `rotate(${this.generateAngle()}deg)`
      )
    }
  }*/

  shuffle(array: string[]) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }


    return array;
  }

  selectImage(url: String) {


    if (this.verifyCorrect(url)) {
      this.score++;
    }

    //let subscription: Subscription;
    // this.getTopScores()
    //subscription = this.users.subscribe((value: any) => {
    /*let minutes = '' + now.getMinutes();
    if (minutes.length < 2) minutes = '0' + minutes;*/

    // this.userCol?.add({scoess: this.score})
    //for(this.level=0; this.level < this.numberOfLevels; this.level++){
      if (this.level != this.numberOfLevels) {
        this.level++;
        setTimeout(() => { this.getData(this.level) }, 1000);
      } else {
        {
          alert("Az ön eredménye: " + this.score + "\nA játék végetért.")
          //this.shared.setMessage(this.uid);
          //this.router.navigateByUrl(`/guest`);
          this.reloadCurrentRoute();
          return;
        }
      }
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
}

  



  generateAngle() {
    return (90 * (((Math.floor(Math.random() * 4))) + 1))
  }

  /*getTopScores() {
    let subscription: Subscription;
    this.userCol = this.firestore.collection<any>('users');
    //console.log('ther user Col ', this.userCol);
    subscription = this.userCol.snapshotChanges().subscribe((value: any) => {
      if (value) {
        for (let i = 0; i < value.length; i++) {
          console.log('topscores: ', value[i].payload.doc.data());
          if (value[i].payload.doc.data().score < this.scoresss) {
            this.scoresss.push(value[i].payload.doc.data().score)
          }
          // Object.values(value[i].payload.doc.data());
          // this.topScores.push({
          //   name: value[i].payload.doc.data().userName,
          //   score: value[i].payload.doc.data().score,
          // });
        }
        // console.log(this.topScores);
        subscription.unsubscribe();
      } else {
        subscription.unsubscribe();
      }
    });
  }*/

  formatDate(arg0: number) {
    throw new Error('Method not implemented.');
  }
  verifyCorrect(url: String): boolean {

    const image = document.getElementsByClassName('img-container');
    for (var i = 0; i < image.length; i++) {
      // @ts-ignore
      if (image[i].querySelector("img").getAttribute("src") == this.result) {
        this.renderer.setStyle(
          image[i],
          'box-shadow',
          '0 0 12px 8px rgba(23 145 57 / 82%)'
        )
      } else {
        this.renderer.setStyle(
          image[i],
          'box-shadow',
          'rgba(145 23 23 / 82%) 0px 0px 12px 8px'
        )
      }
    }
    if (url === this.result)
      return true
    return false
  }

  clearSelection() {
    const image = document.getElementsByClassName('img-container');
    for (var i = 0; i < image.length; i++) {
      this.renderer.setStyle(
        image[i],
        'box-shadow',
        '0 0 12px rgb(0 0 0 / 50%)'
      )
    }
  }
}


