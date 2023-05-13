import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  authState,
  createUserWithEmailAndPassword,
  updateProfile,
  UserInfo,
  UserCredential,
} from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { getDoc, updateDoc } from "firebase/firestore";


import { concatMap, from, Observable, of, switchMap } from 'rxjs';


export interface ProfileUser {
  uid: string;
  email: any;
  password: any
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser$ = authState(this.auth);
  constructor(private auth: Auth, public firestore: Firestore, private afAuth: AngularFireAuth) { }

  registration(email: string, password: string): Observable<any> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  login(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
  }

  authenticated(): boolean {
    return this.afAuth.authState !== null;
  }

  currentUserObservable(): any {
    return this.afAuth.authState;
  }

  addUser(uid: any, score: any, userName: any, email: any, password: any, allScoe: []): Observable<any> {
    const ref = doc(this.firestore, "users", uid);
    return from(setDoc(ref, { uid, userName, topScore: 0 }));
  }

  async logout(): Promise<void> {
    await this.afAuth.signOut();
  }

  newPassword(newPassword: string) {
    return this.afAuth.currentUser.then((user: any) => {
      return user.updatePassword(newPassword);
    })
  }


  async updateTopScore(uid: string, newScore: number): Promise<void> {
    const userRef = doc(this.firestore, 'users', uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const userData = userSnap.data();
      const currentTopScore = userData ? userData['topScore'] || 0 : 0;
      if (newScore > currentTopScore) {
        await updateDoc(userRef, { topScore: newScore });
      }
    }
  }
  
  

}
