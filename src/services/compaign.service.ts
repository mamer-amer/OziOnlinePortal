import { Observable } from 'rxjs';
import { API_URLS } from './utils/URLS';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompaignService {

  constructor(private http:HttpClient,private API_URLS:API_URLS) { }

  
  public getAll():Observable<any>{
    return this.http.get(this.API_URLS.GET_COMPAIGNS);
  }
  public create(obj):Observable<any>{
    return this.http.post(this.API_URLS.SAVE_CAMPAIGN,obj)
  }

  public update(obj):Observable<any>{
    return this.http.put(this.API_URLS.GET_COMPAIGN_BY_ID+'/'+obj.campaignId,obj)
  }
  public getById(id):Observable<any>{
    return this.http.get(this.API_URLS.GET_COMPAIGN_BY_ID+'/'+id)
  }

  public delete(id){
    return this.http.delete(this.API_URLS.DELELTE_COMPAIGN_BY_ID+'/'+id)
  }
}
