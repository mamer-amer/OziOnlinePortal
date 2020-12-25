import { CommonService } from './../../../Shared/shared-libs/Common.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FundType } from 'src/models/fundType';
import { Pledge } from 'src/models/pledge';
import { PledgeService } from 'src/services/pledge.service';

@Component({
  selector: 'app-pledge-view-all',
  templateUrl: './pledge-view-all.component.html',
  styleUrls: ['./pledge-view-all.component.css']
})
export class PledgeViewAllComponent implements OnInit {
  pledge : any = []; 
  constructor(private pledgeService:PledgeService,private router:Router,private activatedRoute:ActivatedRoute,private commonService:CommonService) { }
  popoverTitle = 'Delete';
  sub:any;
  confirmClicked=false;
 
  moduleAction:any = [];
  isCreate=false;
  isEdit = false;
  isView = false;
  isDelete  = false;
  userType = sessionStorage.getItem('userType');
  moduleId:any;
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
    this.pledgeService.getAll().subscribe(res=>{
      if(res){
        this.pledge = res;
      }
        
    })
  }

  goToCreate(){
    this.router.navigate(['layout/create/pledge'],{queryParams:{moduleId:this.moduleId}})
  }

  edit(obj){
    this.router.navigate(['layout/edit/pledge/'+obj.pledgeId],{queryParams:{moduleId:this.moduleId}})
  }
  delete(obj:Pledge){
    this.confirmClicked = true;
    if(this.confirmClicked){
      this.pledgeService.delete(obj.pledgeId).subscribe(res=>{
        if(res){
          this.getAll();
        }
        console.log("Response of delete is ",res)
      })
    }
    

  }
  details(obj:Pledge){
    
    this.router.navigate(['layout/details/pledge/'+obj.pledgeId])
  }

}
