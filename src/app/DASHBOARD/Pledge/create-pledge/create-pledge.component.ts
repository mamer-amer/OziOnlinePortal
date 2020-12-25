import { MemberService } from './../../../../services/member.service';
import { DatePipe } from '@angular/common';
import { EnumService } from './../../../../services/enum.service';
import { CompaignService } from './../../../../services/compaign.service';
import { PledgeService } from './../../../../services/pledge.service';
import { Pledge } from './../../../../models/pledge';
import { ContributionService } from './../../../../services/contribution.service';
import { Contribution } from './../../../../models/contribution';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CheckService } from 'src/services/check.service';
import { RevenueService } from 'src/services/revenue.service';

@Component({
  selector: 'app-create-pledge',
  templateUrl: './create-pledge.component.html',
  styleUrls: ['./create-pledge.component.css']
})
export class CreatePledgeComponent implements OnInit {

  compaigns = [];
  membersList = [];

  pledgeDto: Pledge = new Pledge();
  routeId: any = undefined;
  frequencies:any;
  constructor(private pledgeService: PledgeService,
    private enumService:EnumService,
   private compaignService:CompaignService,
   private memberService:MemberService,
   private  datePipe:DatePipe,
    private router: Router, private activatedRoute: ActivatedRoute) { }

    moduleId:any;
  ngOnInit(): void {
    
    this.getFrequencies();
    this.getMembers();
 
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
    this.getCompaigns();


  }


  save() {
    this.pledgeDto.campaignId = parseInt(this.pledgeDto.campaignId);
    this.pledgeDto.frequency = parseInt(this.pledgeDto.frequency);
    this.pledgeDto.memberId = parseInt(this.pledgeDto.memberId);
    if (this.routeId == undefined) {
      this.pledgeService.create(this.pledgeDto).subscribe(res => {
        if (res) {
          this.router.navigate(['layout/view/pledge'],{queryParams:{moduleId:this.moduleId}})
        }
      })
    }
    else {
      this.pledgeDto.pledgeId = parseInt(this.routeId);
      this.pledgeService.update(this.pledgeDto).subscribe(res => {
        if (res) {
          this.router.navigate(['layout/view/pledge'],{queryParams:{moduleId:this.moduleId}})
        }
      })
    }

  }



  getRouteId() {
    this.activatedRoute.params.subscribe(params => {
      this.routeId = params['id'];
    });
  }

  getById() {
    this.pledgeService.getById(this.routeId).subscribe(res => {
      if (res) {
        this.pledgeDto = res;
        this.pledgeDto.StartDateTime = this.datePipe.transform(res.startDateTime,'yyyy-MM-dd');
        this.pledgeDto.EndDateTime = this.datePipe.transform(res.endDateTime,'yyyy-MM-dd');
        
  
   
      }
    })
  }
  back(){
    window.history.go(-1);
  }




  getCompaigns(){
    this.compaignService.getAll().subscribe(res=>{
      if(res!=null){
        this.compaigns = res;
        console.log(this.compaigns);
      }
    })
  }


  getFrequencies(){
 this.frequencies = this.enumService.frequencies
  }

  status = []
  getStatus(){
    this.status=this.enumService.status
  }
 
  getMembers() {
    this.memberService.getAll().subscribe(res => {
      this.membersList = res;
    })
  }


}
