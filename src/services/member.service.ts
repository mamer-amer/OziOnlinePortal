import { API_URLS } from 'src/services/utils/URLS';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http:HttpClient,private API_URLS:API_URLS) { }

  public getAll():Observable<any>{
    return this.http.get(this.API_URLS.GET_MEMBER);
  }
  public create(obj):Observable<any>{
    return this.http.post(this.API_URLS.SAVE_MEMBER,obj)
  }

  public update(obj):Observable<any>{
    return this.http.put(this.API_URLS.GET_MEMBER_BY_ID+'/'+obj.memberId,obj)
  }
  public getById(id):Observable<any>{
    return this.http.get(this.API_URLS.GET_MEMBER_BY_ID+'/'+id)
  }

  public delete(id){
    return this.http.delete(this.API_URLS.DELETE_MEMBER_BY_ID+'/'+id)
  }
}
