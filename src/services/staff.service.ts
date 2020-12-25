import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_URLS } from './utils/URLS';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

   
  constructor(private http:HttpClient,private API_URLS:API_URLS) { }

  public getAll():Observable<any>{
    return this.http.get(this.API_URLS.GET_STAFFS);
  }
  public create(obj):Observable<any>{
    return this.http.post(this.API_URLS.SAVE_STAFF,obj)
  }

  public update(obj):Observable<any>{
    return this.http.put(this.API_URLS.GET_STAFF_BY_ID+'/'+obj.staffId,obj)
  }
  public getById(id):Observable<any>{
    return this.http.get(this.API_URLS.GET_STAFF_BY_ID+'/'+id+"?isDetailsRequired=true")
  }
  public getByIdDetailed(id):Observable<any>{
    return this.http.get(this.API_URLS.GET_STAFF_BY_ID+'/'+id+"?isDetailsRequired=true");
  }

  public delete(id){
    return this.http.delete(this.API_URLS.DELETE_STAFF_BY_ID+'/'+id)
  }
}
