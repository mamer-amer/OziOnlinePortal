import { API_URLS } from './utils/URLS';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {environment} from '../environments/environment';
import {catchError} from 'rxjs/operators';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OAuthService {

  constructor(private http:HttpClient,private API_URLS:API_URLS) { }


  public login(loginDTO): Observable<any> {
    
    return this.http.post(this.API_URLS.OAUTH_TOKEN,loginDTO);
  
  }

  public verify(verifyDTO): Observable<any> {
    
    return this.http
      .post(this.API_URLS.OAUTH_VERIFY,verifyDTO);
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
