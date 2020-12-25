import { API_URLS } from './utils/URLS';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LicenseService {
  
  constructor(private http:HttpClient,private API_URLS:API_URLS) { }

  public getAll():Observable<any>{
    return this.http.get(this.API_URLS.GET_LICENSES);
  }
  public create(obj):Observable<any>{
    return this.http.post(this.API_URLS.SAVE_LICENSE,obj)
  }

  public update(obj):Observable<any>{
    return this.http.put(this.API_URLS.GET_LICENSE_BY_ID+'/'+obj.licenseManagementId,obj)
  }
  public getById(id):Observable<any>{
    return this.http.get(this.API_URLS.GET_LICENSE_BY_ID+'/'+id)
  }

  public delete(id){
    return this.http.delete(this.API_URLS.DELETE_LICENSE+'/'+id)
  }
}
