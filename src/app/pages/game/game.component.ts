import { AfterViewInit, ChangeDetectorRef, Component, OnInit, Renderer2 } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
//import {SharedService} from '../../shared/shared.service';
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})


export class GameComponent implements OnInit {
  title = 'Játék;'
  userScores: { date: String; score: any }[] = [];
  choices: string[] = [];
  mainImg = '';
  result = '';
  message: any;
  score: number = 0;
  level: number = 1;
  prevScore: unknown = 0;
  scoresss: number[] = []
  uid: any;
  private userDoc: AngularFirestoreDocument<any> | undefined;
  users: Observable<any> | undefined;
  private userCol: AngularFirestoreCollection<any> | undefined;
  private userCol2: AngularFirestoreCollection<any> | undefined;
  gameEnded = false;

  /*
*
*change the number of levels to the number of questions you need
*
* */
  private numberOfLevels: number = 3;


  constructor(private store: AngularFirestore, /*private shared: SharedService,*/ private renderer: Renderer2, private firestore: AngularFirestore, private router: Router, public authService: AuthService) {
  }


  async ngOnInit(): Promise<void> {
    this.authService.currentUser$.subscribe(res => {
      this.uid = res?.uid;
    })
    await this.getData(this.level);
    //this.randomRotation();
    this.getLastGameScore();

  }

  getData(level: number): void {
    // Create an array of set numbers
    const setNumbers = ['set1', 'set2', 'set3', 'set4', 'set5'];

    // Retrieve the set number for the specified level
    const setNumber = setNumbers[level - 1];

    // Shuffle the set number to randomize the order
    this.shuffle(setNumbers);

    // Retrieve the set data
    let url = this.store.collection("images").doc(setNumber).get();
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
    });
  }



  /*getData(level: number): void {
    // Create an array of set numbers
    const setNumbers = ['set1', 'set2', 'set3', 'set4', 'set5'];
  
    // Shuffle the set numbers to randomize the order
    this.shuffle(setNumbers);
  
    // Iterate over the set numbers and retrieve each set
    for (const setNumber of setNumbers) {
      let url = this.store.collection("images").doc(setNumber).get();
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
      });
    }
  }*/



  /*getData(level: number): void {
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

}*/

  getLastGameScore() {
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

  }

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
    let subscription: Subscription;
    console.log(this.verifyCorrect(url))
    this.userCol2 = this.firestore.collection<any>(`users/` + this.uid + `/score`);
  
    this.userCol = this.firestore.collection<any>('users');
    this.userDoc = this.firestore.doc<any>('users/' + this.uid);
    this.users = this.userDoc.valueChanges();
  
    subscription = this.users.subscribe((value: any) => {
      if (value) {
        console.log("in select:", value);
        let now = new Date()
        console.log('the date is: ', now.toISOString().split('T')[0]);
  
        let day = now.getDay()
        let month = now.getMonth()
        let year = now.getFullYear()
        let date = now.toISOString().split('T')[0];
  
        if (this.level != this.numberOfLevels) {
          this.level++;
          setTimeout(() => { this.getData(this.level) }, 1000);
        } else {
          if (!this.gameEnded) {
            alert("Az ön eredménye: " + this.score + "\nA játék végetért.")
            this.gameEnded = true;
          } 
          this.userCol?.doc(this.uid).collection('/scores').add({ socress: this.score, date: date }).then(() => {
            this.authService.updateTopScore(this.uid, this.score)
              .then(() => {
                this.router.navigate([`/home/scores`])
                  .then(() => this.getTopScores());
              })
              .catch((error: any) => console.error("Error updating top score: ", error));
            return;
          }).catch((e) => {
            subscription.unsubscribe();
            console.log(e);
          })
          subscription.unsubscribe();
        }
      }
    });
  }
    









/*selectImage(url: String) {

  if (this.verifyCorrect(url)) {
    this.score++;
  }

  let subscription: Subscription;
  console.log(this.verifyCorrect(url))
  this.userCol2 = this.firestore.collection<any>(`users/` + this.uid + `/score`);


  this.userCol = this.firestore.collection<any>('users');
  this.userDoc = this.firestore.doc<any>('users/' + this.uid);
  this.users = this.userDoc.valueChanges();
  // this.getTopScores()
  subscription = this.users.subscribe((value: any) => {
    if (value) {
      console.log("in select:", value);
      let now = new Date()
      console.log('the date is: ', now.toISOString().split('T')[0]);

      let day = now.getDay()
      let month = now.getMonth()
      let year = now.getFullYear()
      /*let minutes = '' + now.getMinutes();
      if (minutes.length < 2) minutes = '0' + minutes;*//*
  
  let date = now.toISOString().split('T')[0];
  // this.userCol?.add({scoess: this.score})
  
  if (this.level != this.numberOfLevels) {
  this.level++
  setTimeout(() => { this.getData(this.level) }, 1000);
  } else {
  this.userCol?.doc(this.uid).collection('/scores').add({ socress: this.score, date: date }
  //this.userCol?.doc(this.uid).updateif({ score: this.score }
  ).then(() => {
  {
  alert("Az ön eredménye: " + this.score + "\nA játék végetért.")
  //this.shared.setMessage(this.uid);
  this.router.navigate([`/home/scores`]);
  return;
  }
  }).catch((e) => {
  subscription.unsubscribe();
  console.log(e);
  })
  subscription.unsubscribe();
  }
  }
   
  })
  }*/

        generateAngle() {
          return (90 * (((Math.floor(Math.random() * 4))) + 1))
        }

        getTopScores() {
          let subscription: Subscription;
          this.userCol = this.firestore.collection<any>('users');
          //console.log('ther user Col ', this.userCol);
          subscription = this.userCol.snapshotChanges().subscribe((value: any) => {
            if (value) {
              for (let i = 0; i < value.length; i++) {
                console.log('topscores: ', value[i].payload.doc.data());
                if (value[i].payload.doc.data().score > this.scoresss) {
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
        }


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
