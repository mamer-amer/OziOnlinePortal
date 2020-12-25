import { element } from 'protractor';
import { map } from 'rxjs/operators';
import { CommonService } from './../../../Shared/shared-libs/Common.service';
import { FundType } from './../../../../models/fundType';
import { Router, ActivatedRoute } from '@angular/router';
import { FundService } from './../../../../services/fund.service';
import { Component, OnInit } from '@angular/core';
import { forIn } from 'lodash';

@Component({
  selector: 'app-fund-type-view-all',
  templateUrl: './fund-type-view-all.component.html',
  styleUrls: ['./fund-type-view-all.component.css']
})
export class FundTypeViewAllComponent implements OnInit {

  fundTypes : any = []; 
  moduleId: any;
  constructor(private fundService:FundService,private router:Router,private commonService:CommonService,private activatedRoute:ActivatedRoute) { }
  popoverTitle = 'Delete';
  popoverMessage = 'Are you sure you want to delete this?';
  confirmClicked = false;
  cancelClicked = false;
  moduleAction
  sub:any;

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
    this.fundService.getAll().subscribe(res=>{
      if(res){
        // this.fundTypes = res;

        this.fundTypes = res;
      
        

        
      }
        
    })
  }

  goToCreate(){
    this.router.navigate(['layout/create/fundTypes'],{queryParams:{moduleId:this.moduleId}})
  }

  edit(obj){
    this.router.navigate(['layout/edit/fundTypes/'+obj.fundTypeId],{queryParams:{moduleId:this.moduleId}})
  }
  delete(obj:FundType){
    this.confirmClicked = true;
    if(this.confirmClicked){
      this.fundService.delete(obj.fundTypeId).subscribe(res=>{
        if(res){
          this.getAll();
        }
        console.log("Response of delete is ",res)
      })
    }
    

  }
  details(obj:FundType){
    
    this.router.navigate(['layout/details/fundTypes/'+obj.fundTypeId])
  }

}
