import { API_URLS } from './utils/URLS';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RevenueService {
  
  constructor(private http:HttpClient,private API_URLS:API_URLS) { }

  
  public getAll():Observable<any>{
    return this.http.get(this.API_URLS.GET_REVENUES);
  }
  public create(obj):Observable<any>{
    return this.http.post(this.API_URLS.SAVE_REVENUE,obj)
  }

  public update(obj):Observable<any>{
    return this.http.put(this.API_URLS.GET_REVENUE_BY_ID+'/'+obj.revenueId,obj)
  }
  public getById(id):Observable<any>{
    return this.http.get(this.API_URLS.GET_REVENUE_BY_ID+'/'+id)
  }

  public delete(id){
    return this.http.delete(this.API_URLS.DELETE_REVENUE+'/'+id)
  }
}
