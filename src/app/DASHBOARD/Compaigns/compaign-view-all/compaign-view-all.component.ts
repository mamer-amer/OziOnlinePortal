import { CommonService } from './../../../Shared/shared-libs/Common.service';
import { ToastrService } from 'ngx-toastr';
import { Compaign } from './../../../../models/compaign';
import { Router, ActivatedRoute } from '@angular/router';
import { CompaignService } from './../../../../services/compaign.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-compaign-view-all',
  templateUrl: './compaign-view-all.component.html',
  styleUrls: ['./compaign-view-all.component.css']
})
export class CompaignViewAllComponent implements OnInit {

  compaigns : any = []; 
  constructor(private compaignServoce:CompaignService,private router:Router,private toastService:ToastrService,private activatedRoute:ActivatedRoute,private commonService:CommonService) { }
  popoverTitle = 'Delete';
  popoverMessage = 'Are you sure you want to delete this?';
  confirmClicked = false;
  cancelClicked = false;
  sub:any;
  moduleId:any
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
    this.compaignServoce.getAll().subscribe(res=>{
      if(res){
        this.compaigns = res;
     


      }
        
    })
  }

  goToCreate(){
    this.router.navigate(['layout/create/compaigns'],{queryParams:{moduleId:this.moduleId}})
  }

  edit(obj){
    this.router.navigate(['layout/edit/compaigns/'+obj.campaignId])
  }
  delete(obj:Compaign){
    this.confirmClicked = true;
    if(this.confirmClicked){
      this.compaignServoce.delete(obj.campaignId).subscribe(res=>{
        if(res){
          this.toastService.info('Record deleted');
          this.getAll();
        }
        console.log("Response of delete is ",res)
      })
    }
    

  }
  details(obj:Compaign){
    
    this.router.navigate(['layout/details/compaigns/'+obj.campaignId])
  }

}
