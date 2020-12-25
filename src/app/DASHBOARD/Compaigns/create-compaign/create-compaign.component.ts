import { ToastrService } from 'ngx-toastr';
import { FundService } from './../../../../services/fund.service';
import { EnumService } from './../../../../services/enum.service';
import { ContributionService } from './../../../../services/contribution.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CompaignService } from './../../../../services/compaign.service';
import { RevenueService } from './../../../../services/revenue.service';
import { CheckService } from 'src/services/check.service';
import { Compaign } from './../../../../models/compaign';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-create-compaign',
  templateUrl: './create-compaign.component.html',
  styleUrls: ['./create-compaign.component.css']
})
export class CreateCompaignComponent implements OnInit {

  compaignDto: Compaign = new Compaign();
  
  fundTypes = [];
  paymentTypes = [];
  routeId: any = undefined;
  message :string;
  wrongVisibleDate = false;
  constructor(private comapignService: CompaignService,private revenueService:RevenueService,
    private toastService:ToastrService,
    private fundTypeService:FundService,
    private enumService:EnumService,
    private router: Router, private activatedRoute: ActivatedRoute,private datePipe:DatePipe) { }

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

    this.getContributions();

  }


  save() {
    // this.compaignDto.status == true ? this.compaignDto.status = 0 : this.compaignDto.status = 1;
    this.compaignDto.fundTypeId = Number(this.compaignDto.fundTypeId);
    if (this.routeId == undefined) {
      this.comapignService.create(this.compaignDto).subscribe(res => {
        if (res) {
          this.toastService.success('Successfully Added')
          this.router.navigate(['layout/view/compaigns'])
        }
      }),error=>{
        this.toastService.error(error)
      }
    }
    else {

      this.comapignService.update(this.compaignDto).subscribe(res => {
        if (res) {
          this.toastService.success('Successfully Updated')

          this.router.navigate(['layout/view/compaigns'])
        }
      }),error=>{
        this.toastService.error(error)
      }
    }

  }



  getRouteId() {
    this.activatedRoute.params.subscribe(params => {
      this.routeId = params['id'];
    });
  }

  getById() {
    this.comapignService.getById(this.routeId).subscribe(res => {
      if (res) {
        this.compaignDto = res;
        this.compaignDto.status = res.status 
        this.compaignDto.campaignGoal = res.campaignGoal;
        this.compaignDto.fundTypeId = this.routeId;
        this.compaignDto.EndDateTime = this.datePipe.transform(res.endDateTime,'yyyy-MM-dd');
        this.compaignDto.StartDateTime = this.datePipe.transform(res.startDateTime,'yyyy-MM-dd');
        this.compaignDto.VisibleDateTime = this.datePipe.transform(res.visibleDateTime,'yyyy-MM-dd');
        this.compaignDto.createdDateTime = this.datePipe.transform(res.createdDateTime,'yyyy-MM-dd');
        this.compaignDto.updatedDate =this.datePipe.transform(res.updatedDateTime,'yyyy-MM-dd');
   
      }
    })
  }
  back(){
    window.history.go(-1);
  }




  getContributions(){
    this.fundTypeService.getAll().subscribe(res=>{
      if(res!=null){
        this.fundTypes = res;
      }
    })
  }

  status = []
  getStatus(){
    this.status=this.enumService.status
  }


  onVisibleDateSelect(event:any){
    console.log(event.target.value);

    if(this.compaignDto.EndDateTime!=null && this.compaignDto.StartDateTime!=null){
      let isValid =  this.validateDateBetweenTwoDates(this.compaignDto.StartDateTime,this.compaignDto.EndDateTime,this.compaignDto.VisibleDateTime);
      isValid == true ? this.wrongVisibleDate = false : this.wrongVisibleDate = true;
      this.message = "Visible date should be between the start & end date !"
    }
    else{
      this.compaignDto.VisibleDateTime = null;
      this.message = "Plese Select the start Date and end Date first"
    }

  }

   getvalidDate = function(d){ return new Date(d) }

   validateDateBetweenTwoDates(fromDate,toDate,givenDate){
      return this.getvalidDate(givenDate) <=this.getvalidDate(toDate) && this.getvalidDate(givenDate) >= this.getvalidDate(fromDate);
  }


}
