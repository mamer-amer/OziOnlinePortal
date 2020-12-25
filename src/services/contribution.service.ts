import { Observable } from 'rxjs';
import { API_URLS } from './utils/URLS';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContributionService {

  constructor(private http:HttpClient,private API_URLS:API_URLS) { }

  
  public getAll():Observable<any>{
    return this.http.get(this.API_URLS.GET_Contributions);
  }
  public create(obj):Observable<any>{
    return this.http.post(this.API_URLS.SAVE_Contributions,obj)
  }

  public update(obj):Observable<any>{
    return this.http.put(this.API_URLS.GET_Contributions_BY_ID+'/'+obj.contributionId,obj)
  }
  public getById(id):Observable<any>{
    return this.http.get(this.API_URLS.GET_Contributions_BY_ID+'/'+id)
  }

  public delete(id){
    return this.http.delete(this.API_URLS.DELETE_Contributions_BY_ID+'/'+id)
  }
}
