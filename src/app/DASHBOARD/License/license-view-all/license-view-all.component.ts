import { CommonService } from './../../../Shared/shared-libs/Common.service';
import { License } from './../../../../models/license';
import { Router, ActivatedRoute } from '@angular/router';
import { LicenseService } from './../../../../services/license.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-license-view-all',
  templateUrl: './license-view-all.component.html',
  styleUrls: ['./license-view-all.component.css']
})
export class LicenseViewAllComponent implements OnInit {

  licenses : any = []; 
  moduleId: any;
  constructor(private licenseService:LicenseService,private router:Router,private activatedRoute:ActivatedRoute,private commonService:CommonService) { }
  popoverTitle = 'Delete';
  popoverMessage = 'Are you sure you want to delete this?';
  confirmClicked = false;
  cancelClicked = false;
  moduleAction;
  isCreate=false;
  isEdit = false;
  isView = false;
  isDelete  = false;
  sub:any
  userType = sessionStorage.getItem('userType');
  ngOnInit(): void {
    this.sub = this.activatedRoute
    .queryParams
    .subscribe((params)=> {

      // Defaults to 0 if no query param provided.
           this.moduleId = params['moduleId']
     
     console.log("PARAMS HERE",params['moduleId']);
     
     if(this.userType=='1'){
      this.moduleAction = this.commonService.getModuleAuthroties(params['moduleId']);
      console.log("these are the modules actions ",this.moduleAction);
      for(var data of this.moduleAction){
       if(data.actionId==1){
         this.isCreate = true;
       }
       if(data.actionId==2){
         this.isEdit = true;
       }
       if(data.actionId==3){
         this.isView = true;
       }
       if(data.actionId==4){
         this.isDelete = true;
       }
     }
    
    }

    else{
      //admin case
      this.isCreate = true;
      this.isEdit = true;
      this.isView = true;
      this.isDelete = true;
    }

    });
    this.getAll();
  }

  

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  getAll(){
    this.licenseService.getAll().subscribe(res=>{
      if(res){
        this.licenses = res;
      }
        
    })
  }

  goToCreate(){
    this.router.navigate(['layout/create/license'],{queryParams:{moduleId:this.moduleId}})
  }

  edit(obj:License){
    this.router.navigate(['layout/edit/checks/'+obj.licenseManagementId],{queryParams:{moduleId:this.moduleId}})
  }
  delete(obj:License){
    this.confirmClicked = true;
    if(this.confirmClicked){
      this.licenseService.delete(obj.licenseManagementId).subscribe(res=>{
        if(res){
          this.getAll();
        }
        console.log("Response of delete is ",res)
      })
    }
    

  }
  details(obj:License){
    
    this.router.navigate(['layout/details/license/'+obj.licenseManagementId])
  }

}
