import { CommonService } from './../../../Shared/shared-libs/Common.service';
import { Group } from './../../../../models/group';
import { Router, ActivatedRoute } from '@angular/router';
import { GroupService } from './../../../../services/group.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-group-view-all',
  templateUrl: './group-view-all.component.html',
  styleUrls: ['./group-view-all.component.css']
})
export class GroupViewAllComponent implements OnInit,OnDestroy {
  groups : any = [];
  sub:any;
  moduleId: any;
  constructor(private groupService:GroupService,private router:Router,private activatedRoute:ActivatedRoute,private commonService:CommonService) { }
  popoverTitle = 'Delete';
  popoverMessage = 'Are you sure you want to delete this?';
  confirmClicked = false;
  cancelClicked = false;
  moduleAction:any=[];
  isCreate=false;
  isEdit = false;
  isView = false;
  isDelete  = false;
  userType = sessionStorage.getItem('userType');
  ngOnInit(): void {
    this.sub = this.activatedRoute
    .queryParams
    .subscribe((params)=> {

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
    this.groupService.getAll().subscribe(res=>{
      if(res){
        this.groups = res;
      }
        
    })
  }

  goToCreate(){
    this.router.navigate(['layout/create/group'],{queryParams:{moduleId:this.moduleId}})
  }

  edit(obj:Group){
    this.router.navigate(['layout/edit/group/'+obj.groupId],{queryParams:{moduleId:this.moduleId}})
  }
  delete(obj:Group){
    this.confirmClicked = true;
    if(this.confirmClicked){
      this.groupService.delete(obj.groupId).subscribe(res=>{
        if(res){
          this.getAll();
        }
        console.log("Response of delete is ",res)
      })
    }
    

  }
  details(obj:Group){
    
    this.router.navigate(['layout/details/group/'+obj.groupId])
  }


}
