import { Observable } from 'rxjs';
import { API_URLS } from './utils/URLS';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckService {

  
  constructor(private http:HttpClient,private API_URLS:API_URLS) { }

  public getAll():Observable<any>{
    return this.http.get(this.API_URLS.GET_CHECKS);
  }
  public create(obj):Observable<any>{
    return this.http.post(this.API_URLS.SAVE_CHECK,obj)
  }

  public update(obj):Observable<any>{
    return this.http.put(this.API_URLS.GET_CHECK_BY_ID+'/'+obj.checkId,obj)
  }
  public getById(id):Observable<any>{
    return this.http.get(this.API_URLS.GET_CHECK_BY_ID+'/'+id)
  }

  public delete(id){
    return this.http.delete(this.API_URLS.DELELTE_CHECK_BY_ID+'/'+id)
  }
}
