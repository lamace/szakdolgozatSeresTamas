import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  message: string[] | undefined
  constructor() { }
  setMessage(message: string[]) {
    this.message = message;
  }
  getMessage() { return this.message; }
}
