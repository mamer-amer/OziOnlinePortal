import { CommonService } from './../../../Shared/shared-libs/Common.service';
import { Contribution } from './../../../../models/contribution';
import { ContributionService } from './../../../../services/contribution.service';
import { Pledge } from './../../../../models/pledge';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FundType } from 'src/models/fundType';

@Component({
  selector: 'app-contribution-view-all',
  templateUrl: './contribution-view-all.component.html',
  styleUrls: ['./contribution-view-all.component.css']
})
export class ContributionViewAllComponent implements OnInit {

  contributions : any = []; 
  moduleId: any;
  constructor(private contributionService:ContributionService,private router:Router,private activatedRoute:ActivatedRoute,private commonService:CommonService) { }
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
    this.contributionService.getAll().subscribe(res=>{
      if(res){
        this.contributions = res;
      }
        
    })
  }

  goToCreate(){
    this.router.navigate(['layout/create/contributions'],{queryParams:{moduleId:this.moduleId}})
  }

  edit(obj){
    this.router.navigate(['layout/edit/contributions/'+obj.contributionId])
  }
  delete(obj:Contribution){
    this.confirmClicked = true;
    if(this.confirmClicked){
      this.contributionService.delete(obj.contributionId).subscribe(res=>{
        if(res){
          this.getAll();
        }
        console.log("Response of delete is ",res)
      })
    }
    

  }
  details(obj:Contribution){
    
    this.router.navigate(['layout/details/contributions/'+obj.contributionId])
  }

}
