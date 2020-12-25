import { ModuleAction } from './../../../models/moduleActions';
import { EnumService } from 'src/services/enum.service';
import { TreeviewItem } from 'ngx-treeview';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URLS } from 'src/services/utils/URLS';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  
  constructor(private http:HttpClient,private API_URLS:API_URLS,private _enumService : EnumService) { }

  public getModules():Observable<any>{
      return this.http.get(this.API_URLS.GET_MODULES);
  }
  public getAllowdMoulesToStaff():Observable<any>{
    let userId = sessionStorage.getItem('userId');
      return this.http.get(this.API_URLS.GET_STAFF_MODULES+'/'+userId+"?isDetailsRequired=true");
}


  public getModuleAuthroties(moduleId):ModuleAction[]{
    let moduleActions:ModuleAction[];
    let modules:any = []
      modules  = localStorage.getItem('modules');
      modules = JSON.parse(modules);
      moduleActions = modules.filter(x=>x.moduleId==moduleId);
      return moduleActions;
  }



  getParents(): TreeviewItem[] {
    let treeArray = [];
   
    
    this.getModules().subscribe(res=>{
    
      const parents = res;
      let actions = this._enumService.actions;
      let childrens = [];
          parents.forEach(element => {
           childrens = [];
            let child:any;
            actions.map(x=>{
              child = {
                 'text' : x.name,
                 'value' : element.moduleId+'_'+x.id
              }
              childrens.push(child);
          });
          const obj =  new TreeviewItem({
            text : element.name,
            value : element.moduleId,
            collapsed : false,
            children : childrens,
            checked : false,
            
          });
        obj.internalChecked = false;  
         obj.children.map(item=>{
          item.internalChecked = false;
        }) 
          
        treeArray.push(obj); 
       
      });
      

      
          console.log(treeArray);

    });
  
    return treeArray;

  }

  intersectArray = [];
  unintersect(arr1, arr2) {

    _.each(arr1, (a) => {
      _.each(arr2, (b) => {

        if (!this.allowedMoules(a, b))
          this.intersectArray.push(a);
      });
    });

    return this.intersectArray;
  };


  allowedMoules(a, b) {
    let isPresent = this.intersectArray.find(module => module.moduleId == b.moduleId);
    if (isPresent == undefined) {
      if (a.moduleId === b.moduleId)
        return true;
      else return false;
    }
  }
}