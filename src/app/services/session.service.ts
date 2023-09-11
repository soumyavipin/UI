import { Injectable } from '@angular/core';
import { UserDetails } from '../UserDetails';


@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private sessionData: UserDetails;

  constructor(
    userDetails: UserDetails) {
    this.sessionData = userDetails;
  }

  setSessionData(userDetails: UserDetails) {
    const userDetailsJSON = JSON.stringify(userDetails);
    localStorage.setItem('userdetails', userDetailsJSON);
  }

  getSessionData() {

    const storedData = localStorage.getItem('userdetails');

    if (storedData) {
      const parsedData = JSON.parse(storedData);
 
    }
    return storedData;
  }

  // clearSessionData() {
  //   this.sessionData = null;
  // }
}
