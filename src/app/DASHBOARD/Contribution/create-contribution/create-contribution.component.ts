import { FundService } from './../../../../services/fund.service';
import { ToastrService } from 'ngx-toastr';
import { EnumService } from './../../../../services/enum.service';
import { ContributionService } from './../../../../services/contribution.service';
import { Contribution } from './../../../../models/contribution';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CheckService } from 'src/services/check.service';
import { RevenueService } from 'src/services/revenue.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-create-contribution',
  templateUrl: './create-contribution.component.html',
  styleUrls: ['./create-contribution.component.css']
})
export class CreateContributionComponent implements OnInit {

  funds = []
  contributionDto: Contribution = new Contribution();
  routeId: any = undefined;
  contributionTypes = [];
  fundTypes = [];
  paymentTypes = [];
  constructor(private contributionService: ContributionService,
    private enumService: EnumService,
    private fundService: FundService, private revenueService: RevenueService, private router: Router,
    private toastService: ToastrService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.getFunds();
    this.getStatus();
    this.getContributionTypes();
    this.getPaymentTypes();
    this.getRouteId();
    if (this.routeId != undefined) {
      this.getById();
    }


  }


  save() {
    // this.contributionDto.status == true ? this.contributionDto.status = 0 : this.contributionDto.status = 1;
    this.contributionDto.contributionType = parseInt(this.contributionDto.contributionType);
    this.contributionDto.paymentType = parseInt(this.contributionDto.paymentType);
    this.contributionDto.fundTypeId = parseInt(this.contributionDto.fundTypeId);
    if (this.routeId == undefined) {

      this.contributionService.create(this.contributionDto).subscribe(res => {
        if (res) {
          this.toastService.success('Successfully Addedd')
          this.router.navigate(['layout/view/contributions'])
        }
      }), error => {
        this.toastService.error(error);
      }
    }
    else {
      this.contributionDto.contributionId = this.routeId;
      this.contributionService.update(this.contributionDto).subscribe(res => {
        if (res) {
          this.toastService.success('Successfully Updated')
          this.router.navigate(['layout/view/contributions'])
        }
      }), error => this.toastService.error(error);

    }

  }



  getRouteId() {
    this.activatedRoute.params.subscribe(params => {
      this.routeId = params['id'];
    });
  }

  getById() {
    this.contributionService.getById(this.routeId).subscribe(res => {
      if (res) {
        this.contributionDto = res;
        this.contributionDto.Name = res.name;

      }
    })
  }
  back() {
    window.history.go(-1);
  }




  getFunds() {
    this.fundService.getAll().subscribe(res => {
      if (res != null) {
        this.funds = res;
      }
    })
  }

  getPaymentTypes() {
    this.paymentTypes = this.enumService.paymentTypes;
  }
  getContributionTypes() {
    this.contributionTypes = this.enumService.contributionTypes;
  }
  status = []
  getStatus() {
    this.status = this.enumService.status
  }


  hidePaymentDropdown = false;
  hideCheckField = false;
  hideNameField = false
  onSelectedChange(event: any) {
    //if contribution type cash 
    // then payment type is loose cash , invdividual gift
    let id = event.target.value;
    if (id != "null") {
      let name = this.enumService.contributionTypes.find(item => item.id == id);
      switch (name.name) {
        case "Cash":
          this.paymentTypes = this.enumService.paymentTypes;
          this.hidePaymentDropdown = false;
          this.hideNameField = false;
          this.hidePaymentDropdown = false;
          this.hideCheckField = false;
          break;
        case "Check":
          //hide payment types;
          this.contributionDto.paymentType = null;
          this.contributionDto.Name = null;
          this.hidePaymentDropdown = true;
          this.hideNameField = true;
          break;
        case "Other":
          this.contributionDto.paymentType = null;
          this.contributionDto.Name = null;
          this.contributionDto.checkNo = null;
          this.hidePaymentDropdown = true;
          this.hideNameField = true;
          this.hideCheckField = true;
          break;
        default:


      }
    }
    
    else{
      this.hidePaymentDropdown = false;
      this.hideNameField = false;
      this.hidePaymentDropdown = false;
      this.hideCheckField = false;
    }



  }



  onPaymentTypeSelect(event: any) {

    let id = event.target.value;
    if(id!="null"){
      let type = this.enumService.paymentTypes.find(item => item.id == id);


      if (type.id == 2) {
        this.hideNameField = true;
      }
      else {
        this.hideNameField = false;
      }
    }
    else{
      this.hideNameField = false;
    }

  

  }


}
