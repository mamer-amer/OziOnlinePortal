import { LoaderService } from './../../../../services/loader.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ModuleAction } from './../../../../models/moduleActions';
import { CommonService } from './../../../Shared/shared-libs/Common.service';
import { Staff } from './../../../../models/staff';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { StaffService } from './../../../../services/staff.service';
import { Component, OnInit ,OnDestroy} from '@angular/core';

@Component({
  selector: 'app-staff-view-all',
  templateUrl: './staff-view-all.component.html',
  styleUrls: ['./staff-view-all.component.css']
})
export class StaffViewAllComponent implements OnInit,OnDestroy{

  staffs : any = []; 
  sub : any;
  moduleAction : Array<ModuleAction> = [];
  constructor(public demoService:LoaderService,private staffService:StaffService,private router:Router,private activatedRoute:ActivatedRoute,private commonService:CommonService) { }
  popoverTitle = 'Delete';
  popoverMessage = 'Are you sure you want to delete this?';
  confirmClicked = false;
  cancelClicked = false;
  isCreate=false;
  isEdit = false;
  isView = false;
  isDelete  = false;
  moduleId:any;
  config :any;
  userType = sessionStorage.getItem('userType');
  ngOnInit(): void {

  
    this.sub = this.activatedRoute
    .queryParams
    .subscribe((params)=> {

      this.moduleId = params['moduleId'];
      // Defaults to 0 if no query param provided.
           this.moduleId = params['moduleId']
     
     console.log("PARAMS HERE",params['moduleId']);
     if (this.userType == '1') {
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
    this.staffService.getAll().subscribe(res=>{
      if(res){
        this.staffs = res;
      }
        
    })
  }

  goToCreate(){
    this.router.navigate(['layout/create/staff'], {queryParams:{moduleId:this.moduleId}})
  }

  edit(obj:Staff){
    this.router.navigate(['layout/edit/staff/'+obj.staffId],{queryParams:{moduleId:this.moduleId}})
  }
  delete(obj:Staff){
    this.confirmClicked = true;
    if(this.confirmClicked){
      this.staffService.delete(obj.staffId).subscribe(res=>{
        if(res){
          this.getAll();
        }
        console.log("Response of delete is ",res)
      })
    }
    

  }
  details(obj:Staff){
    
    this.router.navigate(['layout/details/staff/'+obj.staffId])
  }

 
}
