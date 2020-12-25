import { EnumService } from './../../../../services/enum.service';
import { ToastrService } from 'ngx-toastr';
import { RevenueService } from './../../../../services/revenue.service';
import { CheckService } from 'src/services/check.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FundService } from './../../../../services/fund.service';
import { FundType } from './../../../../models/fundType';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-fund-type',
  templateUrl: './create-fund-type.component.html',
  styleUrls: ['./create-fund-type.component.css']
})
export class CreateFundTypeComponent implements OnInit {

  checks = [];
  revenues = [];
  fundTypeDto: FundType = new FundType();
  routeId: any = undefined;
  constructor(private fundService: FundService,private checkService:CheckService,private revenueService:RevenueService,private router: Router, 
    private activatedRoute: ActivatedRoute,private enumService:EnumService,
    private toastService:ToastrService
    ) { }

 moduleId:any;
  ngOnInit(): void {
    this.activatedRoute
    .queryParams
    .subscribe((params)=> {

      this.moduleId = params['moduleId'];

    });
    
    this.getStatus();
    this.getRouteId();
    if (this.routeId != undefined) {
      this.getById();
    }

    this.getChecks();
    this.getRevenues();


  }


  save() {
    // this.fundTypeDto.status == true ? this.fundTypeDto.status = 0 : this.fundTypeDto.status = 1;
    this.fundTypeDto.revenueId = parseInt(this.fundTypeDto.revenueId);
    this.fundTypeDto.CheckId = parseInt(this.fundTypeDto.CheckId);
    if (this.routeId == undefined) {
      this.fundService.create(this.fundTypeDto).subscribe(res => {
        if (res) {
          this.toastService.success('Successfully Added')
          this.router.navigate(['layout/view/fundTypes'],{queryParams:{moduleId:this.moduleId}})
        }
      }),error=>this.toastService.error(error);
    }
    else {
      this.fundService.update(this.fundTypeDto).subscribe(res => {
        if (res) {
          this.toastService.success('Successfully Updated')
          this.router.navigate(['layout/view/fundTypes'],{queryParams:{moduleId:this.moduleId}})
        }
      }),error=>this.toastService.error(error);
    }

  }



  getRouteId() {
    this.activatedRoute.params.subscribe(params => {
      this.routeId = params['id'];
    });
  }

  getById() {
    this.fundService.getById(this.routeId).subscribe(res => {
      if (res) {
        this.fundTypeDto = res;
        this.fundTypeDto.name = res.name;
        this.fundTypeDto.Code = res.code;
        this.fundTypeDto.status = res.status 
        this.fundTypeDto.fundTypeId = res.fundTypeId;
        this.fundTypeDto.CheckId = res.checkId;
        this.fundTypeDto.revenueId = res.revenueId;
      }
    })
  }
  back(){
    window.history.go(-1);
  }




  getChecks(){
    this.checkService.getAll().subscribe(res=>{
      if(res!=null){
        this.checks = res;
      }
    })
  }
  getRevenues(){
    this.revenueService.getAll().subscribe(res=>{
      if(res!=null){
        this.revenues = res;
      }
    })
  }

  status = []
  getStatus(){
    this.status=this.enumService.status
  }


  
}
