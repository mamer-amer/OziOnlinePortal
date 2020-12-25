import { CommonService } from './../../../Shared/shared-libs/Common.service';
import { Check } from './../../../../models/checks';
import { Router, ActivatedRoute } from '@angular/router';
import { CheckService } from './../../../../services/check.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-view-all',
  templateUrl: './check-view-all.component.html',
  styleUrls: ['./check-view-all.component.css']
})
export class CheckViewAllComponent implements OnInit {

  checks : any = []; 
  moduleId: any;
  constructor(private checkService:CheckService,private router:Router,private activatedRoute:ActivatedRoute,private commonService:CommonService) { }
  popoverTitle = 'Delete';
  popoverMessage = 'Are you sure you want to delete this?';
  confirmClicked = false;
  cancelClicked = false;
  sub:any;
  moduleAction:any = [];
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
    this.checkService.getAll().subscribe(res=>{
      if(res){
        this.checks = res;
      }
        
    })
  }

  goToCreate(){
    this.router.navigate(['layout/create/checks'],{queryParams:{moduleId:this.moduleId}})
  }

  edit(obj:Check){
    this.router.navigate(['layout/edit/checks/'+obj.checkId])
  }
  delete(obj:Check){
    this.confirmClicked = true;
    if(this.confirmClicked){
      this.checkService.delete(obj.checkId).subscribe(res=>{
        if(res){
          this.getAll();
        }
        console.log("Response of delete is ",res)
      })
    }
    

  }
  details(obj:Check){
    
    this.router.navigate(['layout/details/checks/'+obj.checkId])
  }

}
