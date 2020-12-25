import { API_URLS } from 'src/services/utils/URLS';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http:HttpClient,private API_URLS:API_URLS) { }

  public getAll():Observable<any>{
    return this.http.get(this.API_URLS.GET_GROUP);
  }
  public create(obj):Observable<any>{
    return this.http.post(this.API_URLS.SAVE_GROUP,obj)
  }

  public update(obj):Observable<any>{
    return this.http.put(this.API_URLS.GET_GROUP_BY_ID+'/'+obj.groupId,obj)
  }
  public getById(id):Observable<any>{
    return this.http.get(this.API_URLS.GET_GROUP_BY_ID+'/'+id)
  }

  public delete(id){
    return this.http.delete(this.API_URLS.DELETE_GROUP_BY_ID+'/'+id)
  }
}
