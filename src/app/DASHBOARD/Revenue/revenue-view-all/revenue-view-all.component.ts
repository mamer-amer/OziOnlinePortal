import { CommonService } from './../../../Shared/shared-libs/Common.service';
import { RevenueService } from './../../../../services/revenue.service';
import { Revenue } from './../../../../models/revenue';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-revenue-view-all',
  templateUrl: './revenue-view-all.component.html',
  styleUrls: ['./revenue-view-all.component.css']
})
export class RevenueViewAllComponent implements OnInit {

  revenues : any = []; 
  moduleId: any;
  constructor(private revnueService:RevenueService,private router:Router,private activatedRoute:ActivatedRoute,private commonService:CommonService) { }
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
  

  getAll(){
    this.revnueService.getAll().subscribe(res=>{
      if(res){
        this.revenues = res;
      }
        
    })
  }

  goToCreate(){
    this.router.navigate(['layout/create/revenue'],{queryParams:{moduleId:this.moduleId}})
  }

  edit(obj:Revenue){
    this.router.navigate(['layout/edit/revenue/'+obj.revenueId],{queryParams:{moduleId:this.moduleId}})
  }
  delete(obj:Revenue){
    this.confirmClicked = true;
    if(this.confirmClicked){
      this.revnueService.delete(obj.revenueId).subscribe(res=>{
        if(res!=null){
          console.log("Response of delete is ",res)
          this.getAll();
        }
      })
    }
    

  }
  details(obj:Revenue){
    
    this.router.navigate(['layout/details/revenue/'+obj.revenueId])
  }

}
