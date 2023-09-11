
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { EncryptService } from './encrypt.service';
@Injectable({
  providedIn: 'root'
})


export class BaseService {

  private baseUrl: string = 'https://localhost:44354/api';
  public isLoggedIn: boolean = false;
  constructor(
    private httpClient: HttpClient,
    private crypto: EncryptService
  ) { }


  public post(url: string, data: any): any {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    let iv = this.crypto.genIV();
    let encRequest = {
      EncString: this.crypto.encrypt(data, iv),
      Value: iv,
    };
    return this.httpClient.post(this.baseUrl + url, encRequest, { headers })
      .pipe(
        map((response: any) => {
          const decryptedResponse = this.crypto.decrypt(response, iv);
          return JSON.parse(decryptedResponse);
        }),
        catchError(this.handleError)
      )
  }

  public postRequest(url: string, data: any, token: string): any {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'auth-token': token
    });
    let iv = this.crypto.genIV();
    let encRequest = {
      EncString: this.crypto.encrypt(data, iv),
      Value: iv,
    };

    return this.httpClient.post(this.baseUrl + url, encRequest, { headers })
      .pipe(
        map((response: any) => {
          const decryptedResponse = this.crypto.decrypt(response, iv);
          return JSON.parse(decryptedResponse);
        }),
        //catchError(this.handleError<any>('post'))
        catchError(this.handleError)
      )
  }



  private handleError(error: HttpErrorResponse) {

    let errorMessage = 'An error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;

    } else {
      // Server-side error
      // errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.ExceptionMessage}`;
      if (error.error.ExceptionMessage)
        errorMessage = `Error : ${error.error.ExceptionMessage}`;
      else
        errorMessage = `Error : ${error.error}`;
    }

    // You can log the error details here
    //console.error("Error-----------------------",errorMessage);

    // Return an observable with a user-friendly error message
    return throwError(errorMessage);
  }

  public logError(errMsg: any) {
  }


}